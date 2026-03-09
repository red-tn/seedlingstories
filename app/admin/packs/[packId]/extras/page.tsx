'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Loader2, Check, ChevronRight, ChevronLeft, Plus, Trash2,
  Upload, Music, MessageCircle, Sparkles, Image as ImageIcon, BookOpen,
} from 'lucide-react';
import type { PackContent } from '@/lib/types/pack';

export default function ExtrasStep() {
  const params = useParams();
  const router = useRouter();
  const packId = params.packId as string;

  const [content, setContent] = useState<Partial<PackContent>>({});
  const [coloringPages, setColoringPages] = useState<string[]>([]);
  const [memoryVerseCardUrl, setMemoryVerseCardUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetch(`/api/admin/packs/${packId}`)
      .then((r) => r.json())
      .then((data) => {
        const c = data.content || {};
        setContent(c);
        // coloring_pages and memory_verse_card_url stored in pack_content as extra JSONB fields
        setColoringPages((c as Record<string, unknown>).coloring_pages as string[] || []);
        setMemoryVerseCardUrl((c as Record<string, unknown>).memory_verse_card_url as string || '');
        setLoading(false);
      });
  }, [packId]);

  const save = useCallback(async () => {
    setSaving(true);
    setSaved(false);
    await fetch(`/api/admin/packs/${packId}/content`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        song_title: content.song_title || null,
        song_url: content.song_url || null,
        song_lyrics: content.song_lyrics || null,
        discussion_questions: content.discussion_questions || [],
        memory_verse: content.memory_verse || null,
        memory_verse_ref: content.memory_verse_ref || null,
        memory_verse_card_url: memoryVerseCardUrl || null,
        coloring_pages: coloringPages.length > 0 ? coloringPages : null,
      }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }, [packId, content, coloringPages, memoryVerseCardUrl]);

  const uploadFile = async (type: string, file: File, pageNum?: string) => {
    setUploading((prev) => ({ ...prev, [type]: true }));
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    if (pageNum) formData.append('page', pageNum);

    try {
      const res = await fetch(`/api/admin/packs/${packId}/upload`, { method: 'POST', body: formData });
      const data = await res.json();
      setUploading((prev) => ({ ...prev, [type]: false }));
      return data.url || '';
    } catch {
      setUploading((prev) => ({ ...prev, [type]: false }));
      return '';
    }
  };

  const addQuestion = () => {
    setContent((c) => ({
      ...c,
      discussion_questions: [...(c.discussion_questions || []), ''],
    }));
  };

  const updateQuestion = (index: number, value: string) => {
    setContent((c) => ({
      ...c,
      discussion_questions: (c.discussion_questions || []).map((q, i) => i === index ? value : q),
    }));
  };

  const removeQuestion = (index: number) => {
    setContent((c) => ({
      ...c,
      discussion_questions: (c.discussion_questions || []).filter((_, i) => i !== index),
    }));
  };

  if (loading) {
    return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-gold animate-spin" /></div>;
  }

  return (
    <div className="max-w-2xl space-y-6">
      {/* Song Section */}
      <div className="bg-white rounded-2xl border border-gold/10 p-6">
        <h2 className="font-display text-lg font-bold text-bark flex items-center gap-2 mb-4">
          <Music className="w-5 h-5 text-gold" />
          Worship Song
        </h2>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Song Title</Label>
              <Input
                value={content.song_title || ''}
                onChange={(e) => setContent({ ...content, song_title: e.target.value })}
                placeholder="God Made Everything"
              />
            </div>
            <div className="space-y-1">
              <Label>Song Audio</Label>
              {content.song_url ? (
                <div className="flex items-center gap-2 bg-cream/50 rounded-lg px-3 py-2">
                  <audio src={content.song_url} controls className="h-8 flex-1" style={{ minWidth: 0 }} />
                  <label className="text-xs text-gold cursor-pointer hover:underline shrink-0">
                    Replace
                    <input type="file" accept="audio/*" className="hidden" onChange={async (e) => {
                      if (e.target.files?.[0]) {
                        const url = await uploadFile('song', e.target.files[0]);
                        if (url) setContent({ ...content, song_url: url });
                      }
                    }} />
                  </label>
                </div>
              ) : (
                <label className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border border-dashed border-gold/20 bg-cream/30 cursor-pointer hover:border-gold/40 transition-colors text-sm text-bark/40 ${uploading.song ? 'opacity-50' : ''}`}>
                  {uploading.song ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  Upload MP3
                  <input type="file" accept="audio/*" className="hidden" onChange={async (e) => {
                    if (e.target.files?.[0]) {
                      const url = await uploadFile('song', e.target.files[0]);
                      if (url) setContent({ ...content, song_url: url });
                    }
                  }} />
                </label>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <Label>Lyrics</Label>
            <Textarea
              value={content.song_lyrics || ''}
              onChange={(e) => setContent({ ...content, song_lyrics: e.target.value })}
              placeholder="God made the light, God made the sea..."
              rows={4}
            />
          </div>
        </div>
      </div>

      {/* Discussion Questions */}
      <div className="bg-white rounded-2xl border border-gold/10 p-6">
        <h2 className="font-display text-lg font-bold text-bark flex items-center gap-2 mb-4">
          <MessageCircle className="w-5 h-5 text-branches" />
          Discussion Questions
        </h2>

        <div className="space-y-2">
          {(content.discussion_questions || []).map((q, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="w-6 h-6 rounded-full bg-branches/10 text-branches text-xs font-bold flex items-center justify-center shrink-0 mt-2">
                {i + 1}
              </span>
              <Input
                value={q}
                onChange={(e) => updateQuestion(i, e.target.value)}
                placeholder="What is your favorite thing God created?"
                className="flex-1"
              />
              <button
                onClick={() => removeQuestion(i)}
                className="text-bark/30 hover:text-red-500 transition-colors mt-2 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button
            onClick={addQuestion}
            className="flex items-center gap-1.5 text-sm text-gold hover:text-gold/80 transition-colors cursor-pointer mt-2"
          >
            <Plus className="w-4 h-4" />
            Add Question
          </button>
        </div>
      </div>

      {/* Memory Verse */}
      <div className="bg-white rounded-2xl border border-gold/10 p-6">
        <h2 className="font-display text-lg font-bold text-bark flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-gold" />
          Memory Verse
        </h2>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Verse Text</Label>
              <Textarea
                value={content.memory_verse || ''}
                onChange={(e) => setContent({ ...content, memory_verse: e.target.value })}
                placeholder="In the beginning God created the heavens and the earth."
                rows={2}
              />
            </div>
            <div className="space-y-1">
              <Label>Reference</Label>
              <Input
                value={content.memory_verse_ref || ''}
                onChange={(e) => setContent({ ...content, memory_verse_ref: e.target.value })}
                placeholder="Genesis 1:1"
              />
            </div>
          </div>

          {/* Memory Verse Card */}
          <div className="space-y-1">
            <Label>Memory Verse Card Image</Label>
            {memoryVerseCardUrl ? (
              <div className="relative rounded-lg overflow-hidden bg-cream max-w-xs">
                <img src={memoryVerseCardUrl} alt="Memory verse card" className="w-full" />
                <label className="absolute bottom-2 right-2 bg-bark/70 text-cream text-xs px-2 py-1 rounded-lg cursor-pointer hover:bg-bark/90 transition-colors">
                  Replace
                  <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                    if (e.target.files?.[0]) {
                      const url = await uploadFile('memory-verse-card', e.target.files[0]);
                      if (url) setMemoryVerseCardUrl(url);
                    }
                  }} />
                </label>
              </div>
            ) : (
              <label className={`flex flex-col items-center justify-center h-32 max-w-xs rounded-lg border-2 border-dashed border-gold/20 bg-cream/50 cursor-pointer hover:border-gold/40 transition-colors ${uploading['memory-verse-card'] ? 'opacity-50' : ''}`}>
                {uploading['memory-verse-card'] ? (
                  <Loader2 className="w-6 h-6 text-gold animate-spin" />
                ) : (
                  <>
                    <BookOpen className="w-6 h-6 text-bark/30 mb-2" />
                    <span className="text-xs text-bark/40">Upload verse card image</span>
                  </>
                )}
                <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                  if (e.target.files?.[0]) {
                    const url = await uploadFile('memory-verse-card', e.target.files[0]);
                    if (url) setMemoryVerseCardUrl(url);
                  }
                }} />
              </label>
            )}
          </div>
        </div>
      </div>

      {/* Coloring Pages */}
      <div className="bg-white rounded-2xl border border-gold/10 p-6">
        <h2 className="font-display text-lg font-bold text-bark flex items-center gap-2 mb-4">
          <ImageIcon className="w-5 h-5 text-seeds" />
          Coloring Pages
        </h2>

        <div className="grid grid-cols-3 gap-3">
          {coloringPages.map((url, i) => (
            <div key={i} className="relative rounded-lg overflow-hidden bg-cream aspect-square">
              <img src={url} alt={`Coloring page ${i + 1}`} className="w-full h-full object-cover" />
              <button
                onClick={() => setColoringPages(coloringPages.filter((_, j) => j !== i))}
                className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs cursor-pointer hover:bg-red-600"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}

          <label className={`flex flex-col items-center justify-center aspect-square rounded-lg border-2 border-dashed border-gold/20 bg-cream/50 cursor-pointer hover:border-gold/40 transition-colors ${uploading.coloring ? 'opacity-50' : ''}`}>
            {uploading.coloring ? (
              <Loader2 className="w-6 h-6 text-gold animate-spin" />
            ) : (
              <>
                <Plus className="w-6 h-6 text-bark/30 mb-1" />
                <span className="text-xs text-bark/40">Add</span>
              </>
            )}
            <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
              if (e.target.files?.[0]) {
                const url = await uploadFile('coloring', e.target.files[0], String(coloringPages.length + 1));
                if (url) setColoringPages([...coloringPages, url]);
              }
            }} />
          </label>
        </div>
      </div>

      {/* Bottom actions */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push(`/admin/packs/${packId}/pages`)}>
            <ChevronLeft className="w-4 h-4 mr-1" />
            Pages
          </Button>
          <Button onClick={save} disabled={saving}>
            {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : saved ? <Check className="w-4 h-4 mr-2" /> : null}
            {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Extras'}
          </Button>
        </div>

        <Button variant="outline" onClick={() => { save().then(() => router.push(`/admin/packs/${packId}/preview`)); }}>
          Next: Preview & PDF
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}
