'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Plus, Loader2 } from 'lucide-react';

export default function NewPackPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [ageTier, setAgeTier] = useState('sprouts');
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const res = await fetch('/api/admin/packs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, slug, age_tier: ageTier }),
    });

    const data = await res.json();
    if (data.pack) {
      router.push(`/admin/packs/${data.pack.id}/metadata`);
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-lg">
      <h1 className="font-display text-3xl font-bold text-bark mb-6">New Pack</h1>

      <form onSubmit={handleCreate} className="space-y-5">
        <div className="space-y-2">
          <Label>Pack Title</Label>
          <Input
            placeholder="e.g. The Creation Story"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            autoFocus
          />
        </div>

        <div className="space-y-2">
          <Label>Age Tier</Label>
          <Select value={ageTier} onChange={(e) => setAgeTier(e.target.value)}>
            <option value="seeds">Seeds (Ages 2–4)</option>
            <option value="sprouts">Sprouts (Ages 4–6)</option>
            <option value="branches">Branches (Ages 6–9)</option>
            <option value="roots">Roots (Ages 9–12)</option>
          </Select>
        </div>

        <Button type="submit" disabled={loading || !title.trim()}>
          {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
          Create Pack
        </Button>
      </form>
    </div>
  );
}
