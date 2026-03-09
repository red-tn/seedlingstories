'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Package, Loader2, ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';
import type { Pack } from '@/lib/types/pack';

const tierColors: Record<string, string> = {
  seeds: 'bg-seeds/10 text-seeds',
  sprouts: 'bg-sprouts/10 text-sprouts',
  branches: 'bg-branches/10 text-branches',
  roots: 'bg-roots/10 text-roots',
};

type SortKey = 'title' | 'age_tier' | 'status' | 'price' | 'updated_at';
type SortDir = 'asc' | 'desc';

const tierOrder: Record<string, number> = { seeds: 0, sprouts: 1, branches: 2, roots: 3 };

function SortIcon({ column, sortKey, sortDir }: { column: SortKey; sortKey: SortKey; sortDir: SortDir }) {
  if (sortKey !== column) return <ArrowUpDown className="w-3 h-3 ml-1 opacity-30" />;
  return sortDir === 'asc'
    ? <ArrowUp className="w-3 h-3 ml-1" />
    : <ArrowDown className="w-3 h-3 ml-1" />;
}

export default function AdminDashboard() {
  const [packs, setPacks] = useState<Pack[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortKey, setSortKey] = useState<SortKey>('updated_at');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  useEffect(() => {
    fetch('/api/admin/packs')
      .then((r) => r.json())
      .then((data) => { setPacks(data.packs || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  }

  const sorted = useMemo(() => {
    return [...packs].sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case 'title':
          cmp = a.title.localeCompare(b.title);
          break;
        case 'age_tier':
          cmp = (tierOrder[a.age_tier] ?? 99) - (tierOrder[b.age_tier] ?? 99);
          break;
        case 'status':
          cmp = a.status.localeCompare(b.status);
          break;
        case 'price':
          cmp = (a.is_free ? 0 : 1) - (b.is_free ? 0 : 1)
            || (a.price_display || '').localeCompare(b.price_display || '');
          break;
        case 'updated_at':
          cmp = new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime();
          break;
      }
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [packs, sortKey, sortDir]);

  const columns: { key: SortKey; label: string }[] = [
    { key: 'title', label: 'Title' },
    { key: 'age_tier', label: 'Age Tier' },
    { key: 'status', label: 'Status' },
    { key: 'price', label: 'Price' },
    { key: 'updated_at', label: 'Updated' },
  ];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-bark">Packs</h1>
          <p className="text-bark/50 text-sm mt-1">{packs.length} total packs</p>
        </div>
        <Link href="/admin/packs/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Pack
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 text-gold animate-spin" />
        </div>
      ) : packs.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gold/10">
          <Package className="w-12 h-12 text-bark/20 mx-auto mb-3" />
          <p className="text-bark/50">No packs yet. Create your first one!</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gold/10 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gold/10 text-left">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    className="px-6 py-3 text-xs font-semibold text-bark/50 uppercase tracking-wider cursor-pointer select-none hover:text-bark/80 transition-colors"
                  >
                    <span className="inline-flex items-center">
                      {col.label}
                      <SortIcon column={col.key} sortKey={sortKey} sortDir={sortDir} />
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((pack) => (
                <tr key={pack.id} className="border-b border-gold/5 hover:bg-cream/30 transition-colors">
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/packs/${pack.id}`}
                      className="font-display font-semibold text-bark hover:text-gold transition-colors"
                    >
                      {pack.title}
                    </Link>
                    {pack.subtitle && (
                      <p className="text-bark/40 text-xs mt-0.5">{pack.subtitle}</p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${tierColors[pack.age_tier] || ''}`}>
                      {pack.age_tier}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={pack.status === 'published' ? 'default' : 'outline'}>
                      {pack.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-bark/60">
                    {pack.is_free ? 'Free' : pack.price_display}
                  </td>
                  <td className="px-6 py-4 text-sm text-bark/40">
                    {new Date(pack.updated_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
