'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Loader2, Check, ChevronRight, ChevronLeft, Plus, Trash2,
  Upload, Image as ImageIcon, Volume2, ChevronDown, ChevronUp,
} from 'lucide-react';

interface PageData {
  page: number;
  title: string;
  text: string;
  bible_ref?: string;
  image_url: string;
  narration_url?: string;
}

export default function PagesStep() {
  const params = useParams();
  const router = useRouter();
  const packId = params.packId as string;

  const [pages, setPages] = useState<PageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [expandedPage, setExpandedPage] = useState<number | null>(0);
  const [uploading, setUploading] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetch(`/api/admin/packs/${packId}`)
      .then((r) => r.json())
      .then((data) => {
        const narrations = data.content?.page_narrations || [];
        setPages(narrations.length > 0 ? narrations : [{ page: 0, title: 'Cover', text: '', image_url: '' }]);
        setLoading(false);
      });
  }, [packId]);

  const save = useCallback(async () => {
    setSaving(true);
    setSaved(false);
    await fetch(`/api/admin/packs/${packId}/content`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page_narrations: pages }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }, [packId, pages]);

  const updatePage = (index: number, field: keyof PageData, value: string) => {
    setPages((prev) => prev.map((p, i) => i === index ? { ...p, [field]: value } : p));
  };

  const addPage = () => {
    const newPage: PageData = {
      page: pages.length,
      title: '',
      text: '',
      image_url: '',
    };
    setPages([...pages, newPage]);
    setExpandedPage(pages.length);
  };

  const removePage = (index: number) => {
    if (pages.length <= 1) return;
    const updated = pages.filter((_, i) => i !== index).map((p, i) => ({ ...p, page: i }));
    setPages(updated);
    setExpandedPage(null);
  };

  const movePage = (index: number, dir: -1 | 1) => {
    const newIndex = index + dir;
    if (newIndex < 0 || newIndex >= pages.length) return;
    const updated = [...pages];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    setPages(updated.map((p, i) => ({ ...p, page: i })));
    setExpandedPage(newIndex);
  };

  const uploadFile = async (index: number, type: 'page-image' | 'narration', file: File) => {
    const key = `${type}-${index}`;
    setUploading((prev) => ({ ...prev, [key]: true }));

    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    formData.append('page', String(index));

    try {
      const res = await fetch(`/api/admin/packs/${packId}/upload`, { method: 'POST', body: formData });
      const data = await res.json();
      if (data.url) {
        const field = type === 'page-image' ? 'image_url' : 'narration_url';
        updatePage(index, field, data.url);
      }
    } catch (err) {
      console.error('Upload failed:', err);
    }
    setUploading((prev) => ({ ...prev, [key]: false }));
  };

  if (loading) {
    return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-gold animate-spin" /></div>;
  }

  return (
    <div className="max-w-3xl">
      <div className="space-y-3">
        {pages.map((page, i) => {
          const isExpanded = expandedPage === i;
          const isCover = i === 0;

          return (
            <div key={i} className="bg-white rounded-xl border border-gold/10 overflow-hidden">
              {/* Header - always visible */}
              <button
                onClick={() => setExpandedPage(isExpanded ? null : i)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-cream/30 transition-colors cursor-pointer"
              >
                {/* Thumbnail */}
                <div className="w-12 h-12 rounded-lg bg-cream flex items-center justify-center shrink-0 overflow-hidden">
                  {page.image_url ? (
                    <img src={page.image_url} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon className="w-5 h-5 text-bark/20" />
                  )}
                </div>

                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-bark/40">
                      {isCover ? 'Cover' : `Page ${i}`}
                    </span>
                    {page.narration_url && <Volume2 className="w-3 h-3 text-gold" />}
                  </div>
                  <p className="text-sm font-medium text-bark truncate">
                    {page.title || 'Untitled'}
                  </p>
                </div>

                {isExpanded ? <ChevronUp className="w-4 h-4 text-bark/30" /> : <ChevronDown className="w-4 h-4 text-bark/30" />}
              </button>

              {/* Expanded editor */}
              {isExpanded && (
                <div className="px-4 pb-4 border-t border-gold/5 pt-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Image upload */}
                    <div className="space-y-2">
                      <Label>{isCover ? 'Cover Image' : 'Illustration'}</Label>
                      {page.image_url ? (
                        <div className="relative rounded-lg overflow-hidden aspect-square bg-cream">
                          <img src={page.image_url} alt="" className="w-full h-full object-cover" />
                          <label className="absolute bottom-2 right-2 bg-bark/70 text-cream text-xs px-2 py-1 rounded-lg cursor-pointer hover:bg-bark/90 transition-colors">
                            Replace
                            <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                              if (e.target.files?.[0]) uploadFile(i, 'page-image', e.target.files[0]);
                            }} />
                          </label>
                        </div>
                      ) : (
                        <label className={`flex flex-col items-center justify-center aspect-square rounded-lg border-2 border-dashed border-gold/20 bg-cream/50 cursor-pointer hover:border-gold/40 transition-colors ${uploading[`page-image-${i}`] ? 'opacity-50' : ''}`}>
                          {uploading[`page-image-${i}`] ? (
                            <Loader2 className="w-6 h-6 text-gold animate-spin" />
                          ) : (
                            <>
                              <Upload className="w-6 h-6 text-bark/30 mb-2" />
                              <span className="text-xs text-bark/40">Drop image or click</span>
                            </>
                          )}
                          <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                            if (e.target.files?.[0]) uploadFile(i, 'page-image', e.target.files[0]);
                          }} />
                        </label>
                      )}
                    </div>

                    {/* Text fields */}
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <Label>Title</Label>
                        <Input
                          value={page.title}
                          onChange={(e) => updatePage(i, 'title', e.target.value)}
                          placeholder={isCover ? 'Cover' : 'Day One — Light!'}
                        />
                      </div>

                      {!isCover && (
                        <>
                          <div className="space-y-1">
                            <Label>Bible Reference</Label>
                            <Input
                              value={page.bible_ref || ''}
                              onChange={(e) => updatePage(i, 'bible_ref', e.target.value)}
                              placeholder="Genesis 1:1–5"
                            />
                          </div>

                          <div className="space-y-1">
                            <Label>Story Text</Label>
                            <Textarea
                              value={page.text}
                              onChange={(e) => updatePage(i, 'text', e.target.value)}
                              placeholder="In the beginning, God made everything..."
                              rows={4}
                            />
                          </div>
                        </>
                      )}

                      {/* Narration upload */}
                      <div className="space-y-1">
                        <Label>Narration Audio</Label>
                        {page.narration_url ? (
                          <div className="flex items-center gap-2 bg-cream/50 rounded-lg px-3 py-2">
                            <Volume2 className="w-4 h-4 text-gold shrink-0" />
                            <audio src={page.narration_url} controls className="h-8 flex-1" style={{ minWidth: 0 }} />
                            <label className="text-xs text-gold cursor-pointer hover:underline shrink-0">
                              Replace
                              <input type="file" accept="audio/*" className="hidden" onChange={(e) => {
                                if (e.target.files?.[0]) uploadFile(i, 'narration', e.target.files[0]);
                              }} />
                            </label>
                          </div>
                        ) : (
                          <label className={`flex items-center gap-2 px-3 py-2 rounded-lg border border-dashed border-gold/20 bg-cream/30 cursor-pointer hover:border-gold/40 transition-colors text-sm text-bark/40 ${uploading[`narration-${i}`] ? 'opacity-50' : ''}`}>
                            {uploading[`narration-${i}`] ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Upload className="w-4 h-4" />
                            )}
                            Upload MP3
                            <input type="file" accept="audio/*" className="hidden" onChange={(e) => {
                              if (e.target.files?.[0]) uploadFile(i, 'narration', e.target.files[0]);
                            }} />
                          </label>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Page actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-gold/5">
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={() => movePage(i, -1)} disabled={i === 0}>
                        <ChevronUp className="w-4 h-4" /> Move Up
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => movePage(i, 1)} disabled={i === pages.length - 1}>
                        <ChevronDown className="w-4 h-4" /> Move Down
                      </Button>
                    </div>
                    {!isCover && (
                      <Button variant="ghost" size="sm" onClick={() => removePage(i)} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                        <Trash2 className="w-4 h-4 mr-1" /> Remove
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add page */}
      <button
        onClick={addPage}
        className="w-full mt-3 flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-gold/20 text-bark/40 hover:border-gold/40 hover:text-bark/60 transition-colors cursor-pointer"
      >
        <Plus className="w-4 h-4" />
        <span className="text-sm font-medium">Add Page</span>
      </button>

      {/* Bottom actions */}
      <div className="flex items-center justify-between mt-6">
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push(`/admin/packs/${packId}/metadata`)}>
            <ChevronLeft className="w-4 h-4 mr-1" />
            Metadata
          </Button>
          <Button onClick={save} disabled={saving}>
            {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : saved ? <Check className="w-4 h-4 mr-2" /> : null}
            {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Pages'}
          </Button>
        </div>

        <Button variant="outline" onClick={() => { save().then(() => router.push(`/admin/packs/${packId}/extras`)); }}>
          Next: Extras
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}
