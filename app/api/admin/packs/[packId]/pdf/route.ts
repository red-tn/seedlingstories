import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

const PAGE_SIZE = 612;
const MARGIN = 40;
const CREAM = rgb(253/255, 248/255, 240/255);
const BARK = rgb(62/255, 39/255, 35/255);
const GOLD = rgb(201/255, 150/255, 59/255);

interface PageData {
  page: number;
  title: string;
  text: string;
  bible_ref?: string;
  image_url: string;
  narration_url?: string;
}

async function fetchImageBytes(url: string): Promise<Uint8Array> {
  const res = await fetch(url);
  return new Uint8Array(await res.arrayBuffer());
}

function wrapText(text: string, font: Awaited<ReturnType<typeof PDFDocument.prototype.embedFont>>, fontSize: number, maxWidth: number): string[] {
  const lines: string[] = [];
  for (const paragraph of text.split('\n')) {
    const words = paragraph.split(' ');
    let currentLine = '';
    for (const word of words) {
      const test = currentLine ? `${currentLine} ${word}` : word;
      if (font.widthOfTextAtSize(test, fontSize) > maxWidth) {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = test;
      }
    }
    if (currentLine) lines.push(currentLine);
  }
  return lines;
}

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ packId: string }> }
) {
  try {
    const { packId } = await params;
    const supabase = createServiceClient();

    const [packRes, contentRes] = await Promise.all([
      supabase.from('packs').select('*').eq('id', packId).single(),
      supabase.from('pack_content').select('*').eq('pack_id', packId).single(),
    ]);

    if (packRes.error || !packRes.data) {
      return NextResponse.json({ error: 'Pack not found' }, { status: 404 });
    }
    if (contentRes.error || !contentRes.data) {
      return NextResponse.json({ error: 'Pack content not found' }, { status: 404 });
    }

    const pack = packRes.data;
    const content = contentRes.data;
    const pages: PageData[] = (content.page_narrations || []) as PageData[];

    if (pages.length === 0) {
      return NextResponse.json({ error: 'No pages to generate' }, { status: 400 });
    }

    const doc = await PDFDocument.create();
    const timesB = await doc.embedFont(StandardFonts.TimesRomanBold);
    const timesBI = await doc.embedFont(StandardFonts.TimesRomanBoldItalic);
    const timesI = await doc.embedFont(StandardFonts.TimesRomanItalic);
    const times = await doc.embedFont(StandardFonts.TimesRoman);

    const tierLabels: Record<string, string> = {
      seeds: 'A Seeds-Level Story for Ages 2–4',
      sprouts: 'A Sprouts-Level Story for Ages 4–6',
      branches: 'A Branches-Level Story for Ages 6–9',
      roots: 'A Roots-Level Story for Ages 9–12',
    };

    for (let i = 0; i < pages.length; i++) {
      const p = pages[i];
      const pdfPage = doc.addPage([PAGE_SIZE, PAGE_SIZE]);

      pdfPage.drawRectangle({ x: 0, y: 0, width: PAGE_SIZE, height: PAGE_SIZE, color: CREAM });

      // Load image
      let img;
      try {
        const imgBytes = await fetchImageBytes(p.image_url);
        // Try JPEG first, fall back to PNG
        try { img = await doc.embedJpg(imgBytes); }
        catch { img = await doc.embedPng(imgBytes); }
      } catch {
        // Skip image if it fails
      }

      if (i === 0) {
        // COVER PAGE
        if (img) {
          const imgSize = PAGE_SIZE - MARGIN * 2;
          pdfPage.drawImage(img, { x: MARGIN, y: PAGE_SIZE - MARGIN - imgSize, width: imgSize, height: imgSize });
        }

        pdfPage.drawRectangle({ x: 0, y: 0, width: PAGE_SIZE, height: 220, color: CREAM, opacity: 0.85 });
        pdfPage.drawRectangle({ x: MARGIN + 80, y: 210, width: PAGE_SIZE - MARGIN * 2 - 160, height: 3, color: GOLD });

        // Title
        const titleText = pack.title.toUpperCase().replace(/ /g, '\n') || 'UNTITLED';
        const titleLines = titleText.split('\n');
        let ty = 185;
        for (const line of titleLines) {
          const tw = timesBI.widthOfTextAtSize(line, 42);
          pdfPage.drawText(line, { x: (PAGE_SIZE - tw) / 2, y: ty, size: 42, font: timesBI, color: BARK });
          ty -= 50;
        }

        // Subtitle
        if (pack.subtitle) {
          const stw = timesI.widthOfTextAtSize(pack.subtitle, 18);
          pdfPage.drawText(pack.subtitle, { x: (PAGE_SIZE - stw) / 2, y: 88, size: 18, font: timesI, color: GOLD });
        }

        // Scripture refs
        const scriptureText = pack.scripture_refs?.join(', ') || '';
        if (scriptureText) {
          const scw = times.widthOfTextAtSize(scriptureText, 14);
          pdfPage.drawText(scriptureText, { x: (PAGE_SIZE - scw) / 2, y: 64, size: 14, font: times, color: rgb(0.4, 0.3, 0.25) });
        }

        // Footer
        const footer = tierLabels[pack.age_tier] || '';
        if (footer) {
          const fw = times.widthOfTextAtSize(footer, 12);
          pdfPage.drawText(footer, { x: (PAGE_SIZE - fw) / 2, y: 38, size: 12, font: times, color: rgb(0.5, 0.4, 0.35) });
        }
      } else {
        // STORY PAGE
        const scaledH = 300;
        const scaledW = 300;

        if (img) {
          pdfPage.drawImage(img, { x: (PAGE_SIZE - scaledW) / 2, y: PAGE_SIZE - MARGIN - scaledH, width: scaledW, height: scaledH });
        }

        pdfPage.drawRectangle({ x: MARGIN + 60, y: PAGE_SIZE - MARGIN - scaledH - 15, width: PAGE_SIZE - MARGIN * 2 - 120, height: 2, color: GOLD });

        const titleY = PAGE_SIZE - MARGIN - scaledH - 42;
        const tw = timesB.widthOfTextAtSize(p.title, 24);
        pdfPage.drawText(p.title, { x: (PAGE_SIZE - tw) / 2, y: titleY, size: 24, font: timesB, color: BARK });

        if (p.bible_ref) {
          const bibleText = `Read it in your Bible: ${p.bible_ref}`;
          const bw = timesI.widthOfTextAtSize(bibleText, 11);
          pdfPage.drawText(bibleText, { x: (PAGE_SIZE - bw) / 2, y: titleY - 22, size: 11, font: timesI, color: GOLD });
        }

        const textLines = wrapText(p.text || '', times, 15, PAGE_SIZE - MARGIN * 2 - 40);
        let textY = titleY - 52;
        for (const line of textLines) {
          const lw = times.widthOfTextAtSize(line, 15);
          pdfPage.drawText(line, { x: (PAGE_SIZE - lw) / 2, y: textY, size: 15, font: times, color: rgb(0.3, 0.22, 0.18) });
          textY -= 22;
        }
      }
    }

    // BACK PAGE: Discussion Questions + Memory Verse
    if ((content.discussion_questions && content.discussion_questions.length > 0) || content.memory_verse) {
      const backPage = doc.addPage([PAGE_SIZE, PAGE_SIZE]);
      backPage.drawRectangle({ x: 0, y: 0, width: PAGE_SIZE, height: PAGE_SIZE, color: CREAM });
      backPage.drawRectangle({ x: MARGIN, y: PAGE_SIZE - MARGIN, width: PAGE_SIZE - MARGIN * 2, height: 3, color: GOLD });

      let y = PAGE_SIZE - MARGIN - 30;

      if (content.discussion_questions && content.discussion_questions.length > 0) {
        const dqTitle = 'Discussion Questions';
        const dqw = timesB.widthOfTextAtSize(dqTitle, 22);
        backPage.drawText(dqTitle, { x: (PAGE_SIZE - dqw) / 2, y, size: 22, font: timesB, color: BARK });
        y -= 18;

        const subline = 'For parents, teachers, and small group leaders';
        const slw = timesI.widthOfTextAtSize(subline, 11);
        backPage.drawText(subline, { x: (PAGE_SIZE - slw) / 2, y, size: 11, font: timesI, color: GOLD });
        y -= 35;

        for (let qi = 0; qi < content.discussion_questions.length; qi++) {
          const qText = `${qi + 1}. ${content.discussion_questions[qi]}`;
          const qLines = wrapText(qText, times, 13, PAGE_SIZE - MARGIN * 2 - 60);
          for (const ql of qLines) {
            backPage.drawText(ql, { x: MARGIN + 20, y, size: 13, font: times, color: rgb(0.3, 0.22, 0.18) });
            y -= 20;
          }
          y -= 8;
        }
      }

      if (content.memory_verse) {
        y -= 5;
        backPage.drawRectangle({ x: MARGIN + 80, y, width: PAGE_SIZE - MARGIN * 2 - 160, height: 2, color: GOLD });
        y -= 30;

        const mvTitle = 'Memory Verse';
        const mvw = timesB.widthOfTextAtSize(mvTitle, 22);
        backPage.drawText(mvTitle, { x: (PAGE_SIZE - mvw) / 2, y, size: 22, font: timesB, color: BARK });
        y -= 35;

        const verseText = `"${content.memory_verse}"`;
        const verseLines = wrapText(verseText, timesI, 17, PAGE_SIZE - MARGIN * 2 - 80);
        for (const vl of verseLines) {
          const vlw = timesI.widthOfTextAtSize(vl, 17);
          backPage.drawText(vl, { x: (PAGE_SIZE - vlw) / 2, y, size: 17, font: timesI, color: BARK });
          y -= 26;
        }

        if (content.memory_verse_ref) {
          const refText = `— ${content.memory_verse_ref}`;
          const rw = times.widthOfTextAtSize(refText, 13);
          backPage.drawText(refText, { x: (PAGE_SIZE - rw) / 2, y, size: 13, font: times, color: GOLD });
        }
      }

      backPage.drawRectangle({ x: MARGIN, y: MARGIN - 5, width: PAGE_SIZE - MARGIN * 2, height: 3, color: GOLD });
      const brand = 'Seedling Stories — seedlingstories.co';
      const bw = times.widthOfTextAtSize(brand, 10);
      backPage.drawText(brand, { x: (PAGE_SIZE - bw) / 2, y: MARGIN - 22, size: 10, font: times, color: rgb(0.5, 0.4, 0.35) });
    }

    const pdfBytes = await doc.save();

    return new Response(Buffer.from(pdfBytes), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${pack.slug}-storybook.pdf"`,
      },
    });
  } catch (err) {
    console.error('PDF generation error:', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
