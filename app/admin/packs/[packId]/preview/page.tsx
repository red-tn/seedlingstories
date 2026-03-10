'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Loader2, Download, Check, ChevronLeft, Rocket, Eye,
  Image as ImageIcon, Volume2, Music, MessageCircle, Sparkles, BookOpen,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';
import type { Pack, PackContent } from '@/lib/types/pack';

interface PageData {
  page: number;
  title: string;
  text: string;
  bible_ref?: string;
  image_url: string;
  narration_url?: string;
}

export default function PreviewStep() {
  const params = useParams();
  const packId = params.packId as string;

  const [pack, setPack] = useState<Pack | null>(null);
  const [content, setContent] = useState<PackContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState(false);
  const [inviteCode, setInviteCode] = useState('');

  useEffect(() => {
    fetch(`/api/admin/packs/${packId}`)
      .then((r) => r.json())
      .then((data) => {
        setPack(data.pack);
        setContent(data.content);
        setPublished(data.pack?.status === 'published');
        setLoading(false);
      });
  }, [packId]);

  const generatePdf = async () => {
    setGenerating(true);
    try {
      const res = await fetch(`/api/admin/packs/${packId}/pdf`, { method: 'POST' });
      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      }
    } catch (err) {
      console.error('PDF generation failed:', err);
    }
    setGenerating(false);
  };

  const handlePublish = async () => {
    setPublishing(true);
    try {
      await fetch(`/api/admin/packs/${packId}/publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inviteCode: inviteCode || undefined }),
      });
      setPublished(true);
    } catch (err) {
      console.error('Publish failed:', err);
    }
    setPublishing(false);
  };

  if (loading || !pack) {
    return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-gold animate-spin" /></div>;
  }

  const pages = (content?.page_narrations || []) as unknown as PageData[];
  const questions = content?.discussion_questions || [];
  const coloringPages = (content as unknown as Record<string, unknown>)?.coloring_pages as string[] || [];

  // Completeness checklist
  const checks = [
    { label: `${pages.length} pages`, ok: pages.length > 1, icon: ImageIcon },
    { label: `Images on all pages`, ok: pages.length > 0 && pages.every((p) => p.image_url), icon: ImageIcon },
    { label: `Narration on ${pages.filter((p) => p.narration_url).length}/${pages.length} pages`, ok: pages.length > 0 && pages.filter((p) => p.narration_url).length === pages.length, icon: Volume2 },
    { label: `Song: ${content?.song_title || 'none'}`, ok: !!content?.song_url, icon: Music },
    { label: `${questions.length} discussion questions`, ok: questions.length > 0, icon: MessageCircle },
    { label: `Memory verse`, ok: !!content?.memory_verse, icon: Sparkles },
    { label: `${coloringPages.length} coloring pages`, ok: coloringPages.length > 0, icon: BookOpen },
  ];

  return (
    <div className="max-w-3xl space-y-6">
      {/* Completeness checklist */}
      <div className="bg-white rounded-2xl border border-gold/10 p-6">
        <h2 className="font-display text-lg font-bold text-bark mb-4 flex items-center gap-2">
          <Eye className="w-5 h-5 text-gold" />
          Pack Checklist
        </h2>

        <div className="grid grid-cols-2 gap-2">
          {checks.map((check, i) => (
            <div key={i} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${check.ok ? 'bg-sprouts/5 text-sprouts' : 'bg-cream text-bark/40'}`}>
              {check.ok ? <Check className="w-4 h-4" /> : <check.icon className="w-4 h-4" />}
              {check.label}
            </div>
          ))}
        </div>
      </div>

      {/* Page preview grid */}
      <div className="bg-white rounded-2xl border border-gold/10 p-6">
        <h2 className="font-display text-lg font-bold text-bark mb-4">Page Preview</h2>

        {pages.length === 0 ? (
          <p className="text-bark/40 text-sm text-center py-8">No pages added yet. Go to the Pages step to add content.</p>
        ) : (
          <>
            {/* Cover page — featured large */}
            {pages[0] && (
              <div className="mb-4 rounded-xl overflow-hidden border border-gold/10 bg-cream flex gap-4 p-4">
                <div className="w-40 h-40 rounded-lg overflow-hidden bg-cream shrink-0">
                  {pages[0].image_url ? (
                    <img src={pages[0].image_url} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-bark/10" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gold uppercase tracking-wider mb-1">Cover</p>
                  <p className="font-display text-lg font-bold text-bark">{pack.title}</p>
                  {pack.subtitle && <p className="text-sm text-bark/50 mt-0.5">{pack.subtitle}</p>}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {pages[0].narration_url && (
                      <span className="inline-flex items-center gap-1 text-xs bg-gold/10 text-gold px-2 py-0.5 rounded-full">
                        <Volume2 className="w-3 h-3" /> Audio
                      </span>
                    )}
                    <span className="text-xs bg-bark/5 text-bark/50 px-2 py-0.5 rounded-full capitalize">{pack.age_tier}</span>
                    {pack.scripture_refs?.map((ref, j) => (
                      <span key={j} className="text-xs bg-bark/5 text-bark/50 px-2 py-0.5 rounded-full">{ref}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Story pages grid */}
            {pages.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {pages.slice(1).map((page, i) => (
                  <div key={i + 1} className="rounded-lg overflow-hidden border border-gold/10 bg-cream">
                    <div className="aspect-square bg-cream relative">
                      {page.image_url ? (
                        <img src={page.image_url} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon className="w-6 h-6 text-bark/10" />
                        </div>
                      )}
                      {page.narration_url && (
                        <div className="absolute bottom-1 right-1 w-5 h-5 bg-gold rounded-full flex items-center justify-center">
                          <Volume2 className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="px-2 py-1.5">
                      <p className="text-[10px] font-medium text-bark/40">Page {i + 1}</p>
                      <p className="text-xs font-medium text-bark truncate">{page.title || 'Untitled'}</p>
                      {page.text && <p className="text-[10px] text-bark/30 truncate mt-0.5">{page.text}</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Coloring pages preview */}
      {coloringPages.length > 0 && (
        <div className="bg-white rounded-2xl border border-gold/10 p-6">
          <h2 className="font-display text-lg font-bold text-bark mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-seeds" />
            Coloring Pages
          </h2>
          <div className="grid grid-cols-4 gap-3">
            {coloringPages.map((url, i) => (
              <div key={i} className="rounded-lg overflow-hidden border border-gold/10 bg-cream">
                <img src={url} alt={`Coloring ${i + 1}`} className="w-full aspect-square object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Live reader preview link */}
      {published && (
        <div className="bg-white rounded-2xl border border-gold/10 p-6">
          <h2 className="font-display text-lg font-bold text-bark mb-2">Live Reader</h2>
          {inviteCode && (
            <Link
              href={`/read/${inviteCode}`}
              target="_blank"
              className="inline-flex items-center gap-2 text-gold hover:underline text-sm"
            >
              seedlingstories.co/read/{inviteCode}
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      )}

      {/* PDF Generation */}
      <div className="bg-white rounded-2xl border border-gold/10 p-6">
        <h2 className="font-display text-lg font-bold text-bark mb-4 flex items-center gap-2">
          <Download className="w-5 h-5 text-gold" />
          Generate PDF
        </h2>

        <div className="flex items-center gap-3">
          <Button onClick={generatePdf} disabled={generating || pages.length < 2}>
            {generating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Generate Storybook PDF
              </>
            )}
          </Button>

          {pdfUrl && (
            <a
              href={pdfUrl}
              download={`${pack.slug}-storybook.pdf`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sprouts/10 text-sprouts text-sm font-medium hover:bg-sprouts/20 transition-colors"
            >
              <Check className="w-4 h-4" />
              Download PDF
            </a>
          )}
        </div>
      </div>

      {/* Publish */}
      <div className="bg-white rounded-2xl border border-gold/10 p-6">
        <h2 className="font-display text-lg font-bold text-bark mb-4 flex items-center gap-2">
          <Rocket className="w-5 h-5 text-gold" />
          Publish
        </h2>

        {published ? (
          <div className="flex items-center gap-2 text-sprouts text-sm font-medium">
            <Check className="w-5 h-5" />
            This pack is published!
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-1 max-w-xs">
              <Label>Invite Code (for QR link)</Label>
              <Input
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                placeholder="GOD-MADE-EVERYTHING"
              />
              <p className="text-xs text-bark/40">
                Readers access at: /read/{inviteCode || '...'}
              </p>
            </div>

            <Button onClick={handlePublish} disabled={publishing}>
              {publishing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  <Rocket className="w-4 h-4 mr-2" />
                  Publish Pack
                </>
              )}
            </Button>
          </div>
        )}
      </div>

      {/* Back nav */}
      <div className="flex">
        <Button variant="outline" onClick={() => window.history.back()}>
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Extras
        </Button>
      </div>
    </div>
  );
}
