'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loader2, Check, ChevronRight } from 'lucide-react';
import type { Pack } from '@/lib/types/pack';

export default function MetadataStep() {
  const params = useParams();
  const router = useRouter();
  const packId = params.packId as string;

  const [pack, setPack] = useState<Pack | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [slug, setSlug] = useState('');
  const [ageTier, setAgeTier] = useState('sprouts');
  const [ageLabel, setAgeLabel] = useState('');
  const [description, setDescription] = useState('');
  const [scriptureRefs, setScriptureRefs] = useState('');
  const [priceDisplay, setPriceDisplay] = useState('$0.00');
  const [seriesName, setSeriesName] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isFree, setIsFree] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/packs/${packId}`)
      .then((r) => r.json())
      .then((data) => {
        const p = data.pack as Pack;
        setPack(p);
        setTitle(p.title || '');
        setSubtitle(p.subtitle || '');
        setSlug(p.slug || '');
        setAgeTier(p.age_tier || 'sprouts');
        setAgeLabel(p.age_label || '');
        setDescription(p.description || '');
        setScriptureRefs(p.scripture_refs?.join(', ') || '');
        setPriceDisplay(p.price_display || '$0.00');
        setSeriesName(p.series_name || '');
        setIsFeatured(p.is_featured);
        setIsFree(p.is_free);
        setLoading(false);
      });
  }, [packId]);

  const save = useCallback(async () => {
    setSaving(true);
    setSaved(false);
    const refs = scriptureRefs.split(',').map((s) => s.trim()).filter(Boolean);
    await fetch(`/api/admin/packs/${packId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title, subtitle: subtitle || null, slug, age_tier: ageTier,
        age_label: ageLabel || null, description: description || null,
        scripture_refs: refs.length > 0 ? refs : null,
        price_display: priceDisplay, series_name: seriesName || null,
        is_featured: isFeatured, is_free: isFree,
      }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }, [packId, title, subtitle, slug, ageTier, ageLabel, description, scriptureRefs, priceDisplay, seriesName, isFeatured, isFree]);

  if (loading) {
    return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-gold animate-spin" /></div>;
  }

  const tierAgeLabels: Record<string, string> = {
    seeds: 'Ages 2-4',
    sprouts: 'Ages 4-6',
    branches: 'Ages 6-9',
    roots: 'Ages 9-12',
  };

  return (
    <div className="max-w-2xl">
      <div className="bg-white rounded-2xl border border-gold/10 p-6 space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 space-y-2">
            <Label>Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="The Creation Story" />
          </div>

          <div className="space-y-2">
            <Label>Subtitle</Label>
            <Input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} placeholder="7 days of wonder" />
          </div>

          <div className="space-y-2">
            <Label>Slug</Label>
            <Input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="the-creation-story" />
          </div>

          <div className="space-y-2">
            <Label>Age Tier</Label>
            <Select value={ageTier} onChange={(e) => { setAgeTier(e.target.value); setAgeLabel(tierAgeLabels[e.target.value] || ''); }}>
              <option value="seeds">Seeds (Ages 2–4)</option>
              <option value="sprouts">Sprouts (Ages 4–6)</option>
              <option value="branches">Branches (Ages 6–9)</option>
              <option value="roots">Roots (Ages 9–12)</option>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Age Label</Label>
            <Input value={ageLabel} onChange={(e) => setAgeLabel(e.target.value)} placeholder="Ages 4-6" />
          </div>

          <div className="col-span-2 space-y-2">
            <Label>Description</Label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="The complete creation narrative..." rows={3} />
          </div>

          <div className="space-y-2">
            <Label>Scripture References (comma-separated)</Label>
            <Input value={scriptureRefs} onChange={(e) => setScriptureRefs(e.target.value)} placeholder="Genesis 1:1-2:3" />
          </div>

          <div className="space-y-2">
            <Label>Series Name</Label>
            <Input value={seriesName} onChange={(e) => setSeriesName(e.target.value)} placeholder="Creation & Wonder" />
          </div>

          <div className="space-y-2">
            <Label>Price Display</Label>
            <Input value={priceDisplay} onChange={(e) => setPriceDisplay(e.target.value)} placeholder="$14.99" />
          </div>

          <div className="flex items-center gap-6 pt-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} className="w-4 h-4 rounded border-gold/30 text-gold focus:ring-gold/20" />
              <span className="text-sm text-bark">Featured</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={isFree} onChange={(e) => setIsFree(e.target.checked)} className="w-4 h-4 rounded border-gold/30 text-gold focus:ring-gold/20" />
              <span className="text-sm text-bark">Free Pack</span>
            </label>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-6">
        <Button onClick={save} disabled={saving}>
          {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : saved ? <Check className="w-4 h-4 mr-2" /> : null}
          {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Metadata'}
        </Button>

        <Button variant="outline" onClick={() => { save().then(() => router.push(`/admin/packs/${packId}/pages`)); }}>
          Next: Pages
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}
