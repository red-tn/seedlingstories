import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

const ILLUS_DIR = 'F:/seedlingstories.co/seedling-stories/seedling-stories-content/01-creation/Illustrations';
const OUT_PATH = 'F:/seedlingstories.co/seedling-stories/public/downloads/god-made-everything-sprouts.pdf';

// 8.5 x 8.5 inch square book at 72 DPI
const PAGE_SIZE = 612; // 8.5 inches * 72
const MARGIN = 40;
const CREAM = rgb(253/255, 248/255, 240/255);
const BARK = rgb(62/255, 39/255, 35/255);
const GOLD = rgb(201/255, 150/255, 59/255);
const BARK_LIGHT = rgb(62/255, 39/255, 35/255);

const pages = [
  {
    image: 'Cover Image.png',
    title: 'GOD MADE\nEVERYTHING!',
    subtitle: 'The Seven Days of Creation',
    scripture: 'Genesis 1:1 – 2:3',
    footer: 'A Sprouts-Level Story for Ages 4–6',
    isCover: true,
  },
  {
    image: 'Day One.png',
    title: 'Day One — Light!',
    bible: 'Read it in your Bible: Genesis 1:1–5',
    text: 'In the beginning, God made everything.\nIt was very dark. There was nothing at all.\nThen God said, "Let there be light!"\n— and beautiful, bright light appeared!',
  },
  {
    image: 'Day Two.png',
    title: 'Day Two — Sky!',
    bible: 'Read it in your Bible: Genesis 1:6–8',
    text: 'God looked at all the water. It was everywhere!\nHe said, "Let there be sky!"\nGod put water up high in fluffy clouds\nand left water down below — with a big,\nbeautiful sky right in the middle.',
  },
  {
    image: 'Day Three.png',
    title: 'Day Three — Land and Plants!',
    bible: 'Read it in your Bible: Genesis 1:9–13',
    text: 'God told the water to move,\nand dry ground appeared!\nThen He filled the land with soft green grass,\ntall trees, and flowers of every color.\nApples and berries and all kinds of fruit\ngrew — it was beautiful!',
  },
  {
    image: 'Day Four.png',
    title: 'Day Four — Sun, Moon, and Stars!',
    bible: 'Read it in your Bible: Genesis 1:14–19',
    text: 'God put a big, warm sun in the sky\nto shine during the day.\nHe made a glowing moon for nighttime\nand scattered sparkling stars everywhere.\nNow there were days and nights —\nand God said, "This is good!"',
  },
  {
    image: 'Day Five.png',
    title: 'Day Five — Fish and Birds!',
    bible: 'Read it in your Bible: Genesis 1:20–23',
    text: 'God filled the ocean with fish!\nBig whales, tiny clownfish,\nand wiggly seahorses.\nThen He filled the sky with birds —\nsoaring eagles, colorful parrots,\nand tiny hummingbirds.',
  },
  {
    image: 'Day Six.png',
    title: 'Day Six — Animals and People!',
    bible: 'Read it in your Bible: Genesis 1:24–31',
    text: 'God made all the land animals —\npuppies, elephants, frogs, and ladybugs!\nThen God did something extra special:\nHe made people in His own image.\nGod looked at EVERYTHING\nand said, "This is very good!"',
  },
  {
    image: 'Day Seven.png',
    title: 'Day Seven — God Rested!',
    bible: 'Read it in your Bible: Genesis 2:1–3',
    text: 'Everything was finished — light, sky, land,\nsun, moon, stars, fish, birds,\nanimals, and people!\nOn the seventh day, God rested.\nHe blessed this day and made it special.\nIt was a day to be still\nand enjoy everything He made.',
  },
  {
    image: 'Day Eight.png',
    title: 'And God Saw That It Was Good.',
    bible: 'Read it in your Bible: Genesis 1:31',
    text: 'God made the light. God made the sky.\nGod made the land, the sea,\nand every plant that grows.\nGod made the sun, the moon,\nand every star.\nGod made the fish, the birds,\nand every animal.\nGod made you.\nAnd God said it was very, very good.',
  },
];

async function generate() {
  const doc = await PDFDocument.create();

  for (const p of pages) {
    const page = doc.addPage([PAGE_SIZE, PAGE_SIZE]);

    // Background
    page.drawRectangle({
      x: 0, y: 0,
      width: PAGE_SIZE, height: PAGE_SIZE,
      color: CREAM,
    });

    // Load and embed image
    const imgBytes = fs.readFileSync(path.join(ILLUS_DIR, p.image));
    const img = await doc.embedJpg(imgBytes);

    if (p.isCover) {
      // COVER LAYOUT: large image centered, title overlay
      const imgSize = PAGE_SIZE - MARGIN * 2;
      page.drawImage(img, {
        x: MARGIN,
        y: PAGE_SIZE - MARGIN - imgSize,
        width: imgSize,
        height: imgSize,
      });

      // Semi-transparent overlay at bottom for text
      page.drawRectangle({
        x: 0, y: 0,
        width: PAGE_SIZE, height: 220,
        color: rgb(253/255, 248/255, 240/255),
        opacity: 0.85,
      });

      // Gold accent line
      page.drawRectangle({
        x: MARGIN + 80, y: 210,
        width: PAGE_SIZE - MARGIN * 2 - 160, height: 3,
        color: GOLD,
      });

      const timesBI = await doc.embedFont(StandardFonts.TimesRomanBoldItalic);
      const timesB = await doc.embedFont(StandardFonts.TimesRomanBold);
      const timesI = await doc.embedFont(StandardFonts.TimesRomanItalic);
      const times = await doc.embedFont(StandardFonts.TimesRoman);

      // Title
      const titleLines = p.title.split('\n');
      let ty = 185;
      for (const line of titleLines) {
        const tw = timesBI.widthOfTextAtSize(line, 42);
        page.drawText(line, {
          x: (PAGE_SIZE - tw) / 2,
          y: ty,
          size: 42,
          font: timesBI,
          color: BARK,
        });
        ty -= 50;
      }

      // Subtitle
      const stw = timesI.widthOfTextAtSize(p.subtitle, 18);
      page.drawText(p.subtitle, {
        x: (PAGE_SIZE - stw) / 2,
        y: 88,
        size: 18,
        font: timesI,
        color: GOLD,
      });

      // Scripture
      const scw = times.widthOfTextAtSize(p.scripture, 14);
      page.drawText(p.scripture, {
        x: (PAGE_SIZE - scw) / 2,
        y: 64,
        size: 14,
        font: times,
        color: rgb(0.4, 0.3, 0.25),
      });

      // Footer
      const fw = times.widthOfTextAtSize(p.footer, 12);
      page.drawText(p.footer, {
        x: (PAGE_SIZE - fw) / 2,
        y: 38,
        size: 12,
        font: times,
        color: rgb(0.5, 0.4, 0.35),
      });

    } else {
      // STORY PAGE LAYOUT: image top half, text bottom half
      const imgW = PAGE_SIZE - MARGIN * 2;
      const imgH = imgW; // square images
      const scaledH = 300;
      const scaledW = 300;

      // Draw image centered in top portion
      page.drawImage(img, {
        x: (PAGE_SIZE - scaledW) / 2,
        y: PAGE_SIZE - MARGIN - scaledH,
        width: scaledW,
        height: scaledH,
      });

      // Gold accent line under image
      page.drawRectangle({
        x: MARGIN + 60, y: PAGE_SIZE - MARGIN - scaledH - 15,
        width: PAGE_SIZE - MARGIN * 2 - 120, height: 2,
        color: GOLD,
      });

      const timesB = await doc.embedFont(StandardFonts.TimesRomanBold);
      const timesI = await doc.embedFont(StandardFonts.TimesRomanItalic);
      const times = await doc.embedFont(StandardFonts.TimesRoman);

      // Title
      const titleY = PAGE_SIZE - MARGIN - scaledH - 42;
      const tw = timesB.widthOfTextAtSize(p.title, 24);
      page.drawText(p.title, {
        x: (PAGE_SIZE - tw) / 2,
        y: titleY,
        size: 24,
        font: timesB,
        color: BARK,
      });

      // Bible reference
      if (p.bible) {
        const bw = timesI.widthOfTextAtSize(p.bible, 11);
        page.drawText(p.bible, {
          x: (PAGE_SIZE - bw) / 2,
          y: titleY - 22,
          size: 11,
          font: timesI,
          color: GOLD,
        });
      }

      // Story text
      const textLines = p.text.split('\n');
      let textY = titleY - 52;
      for (const line of textLines) {
        const lw = times.widthOfTextAtSize(line, 15);
        page.drawText(line, {
          x: (PAGE_SIZE - lw) / 2,
          y: textY,
          size: 15,
          font: times,
          color: rgb(0.3, 0.22, 0.18),
        });
        textY -= 22;
      }
    }
  }

  // BACK PAGE: Discussion Questions + Memory Verse
  const backPage = doc.addPage([PAGE_SIZE, PAGE_SIZE]);
  backPage.drawRectangle({ x: 0, y: 0, width: PAGE_SIZE, height: PAGE_SIZE, color: CREAM });

  const timesB = await doc.embedFont(StandardFonts.TimesRomanBold);
  const timesI = await doc.embedFont(StandardFonts.TimesRomanItalic);
  const times = await doc.embedFont(StandardFonts.TimesRoman);

  // Gold top border
  backPage.drawRectangle({ x: MARGIN, y: PAGE_SIZE - MARGIN, width: PAGE_SIZE - MARGIN * 2, height: 3, color: GOLD });

  let y = PAGE_SIZE - MARGIN - 30;

  // Discussion Questions header
  const dqTitle = 'Discussion Questions';
  const dqw = timesB.widthOfTextAtSize(dqTitle, 22);
  backPage.drawText(dqTitle, { x: (PAGE_SIZE - dqw) / 2, y, size: 22, font: timesB, color: BARK });
  y -= 18;

  const subline = 'For parents, teachers, and small group leaders';
  const slw = timesI.widthOfTextAtSize(subline, 11);
  backPage.drawText(subline, { x: (PAGE_SIZE - slw) / 2, y, size: 11, font: timesI, color: GOLD });
  y -= 35;

  const questions = [
    '1. What was the very first thing God made? (Light! Genesis 1:3)',
    '2. On which day did God make the animals and people? (Day Six)',
    '3. What did God say after He looked at everything He made?\n    ("It was very good!")',
    '4. God made you in His image — that means you are very special!\n    How can you take care of the world God made?',
    '5. God rested on Day Seven. Why do you think rest is important?\n    What do you like to do on rest days with your family?',
  ];

  for (const q of questions) {
    const qLines = q.split('\n');
    for (const ql of qLines) {
      backPage.drawText(ql, { x: MARGIN + 20, y, size: 13, font: times, color: rgb(0.3, 0.22, 0.18) });
      y -= 20;
    }
    y -= 8;
  }

  // Gold divider
  y -= 5;
  backPage.drawRectangle({ x: MARGIN + 80, y, width: PAGE_SIZE - MARGIN * 2 - 160, height: 2, color: GOLD });
  y -= 30;

  // Memory Verse header
  const mvTitle = 'Memory Verse';
  const mvw = timesB.widthOfTextAtSize(mvTitle, 22);
  backPage.drawText(mvTitle, { x: (PAGE_SIZE - mvw) / 2, y, size: 22, font: timesB, color: BARK });
  y -= 35;

  const verse = '"In the beginning, God created the heavens and the earth."';
  const vw = timesI.widthOfTextAtSize(verse, 17);
  backPage.drawText(verse, { x: (PAGE_SIZE - vw) / 2, y, size: 17, font: timesI, color: BARK });
  y -= 24;

  const ref = '— Genesis 1:1 (ESV)';
  const rw = times.widthOfTextAtSize(ref, 13);
  backPage.drawText(ref, { x: (PAGE_SIZE - rw) / 2, y, size: 13, font: times, color: GOLD });
  y -= 40;

  // Tips
  const tipsTitle = 'Tips for Learning:';
  backPage.drawText(tipsTitle, { x: MARGIN + 20, y, size: 13, font: timesB, color: BARK });
  y -= 22;

  const tips = [
    'Have the child repeat the verse one phrase at a time after you.',
    'Use hand motions: point up for "heavens," point down for "earth,"',
    '   spread arms wide for "created."',
    'Practice once a day for a week — by Day 7, they\'ll have it!',
  ];
  for (const t of tips) {
    backPage.drawText('  •  ' + t, { x: MARGIN + 20, y, size: 12, font: times, color: rgb(0.35, 0.28, 0.22) });
    y -= 20;
  }

  // Gold bottom border
  backPage.drawRectangle({ x: MARGIN, y: MARGIN - 5, width: PAGE_SIZE - MARGIN * 2, height: 3, color: GOLD });

  // Brand footer
  const brand = 'Seedling Stories — seedlingstories.co';
  const bw2 = times.widthOfTextAtSize(brand, 10);
  backPage.drawText(brand, { x: (PAGE_SIZE - bw2) / 2, y: MARGIN - 22, size: 10, font: times, color: rgb(0.5, 0.4, 0.35) });

  // Save
  const pdfBytes = await doc.save();
  const outDir = path.dirname(OUT_PATH);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(OUT_PATH, pdfBytes);
  console.log('PDF saved to:', OUT_PATH);
  console.log('Pages:', doc.getPageCount());
  console.log('Size:', (pdfBytes.length / 1024).toFixed(0), 'KB');
}

generate().catch(console.error);
