'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Package, Loader2 } from 'lucide-react';
import type { Pack } from '@/lib/types/pack';

const tierColors: Record<string, string> = {
  seeds: 'bg-seeds/10 text-seeds',
  sprouts: 'bg-sprouts/10 text-sprouts',
  branches: 'bg-branches/10 text-branches',
  roots: 'bg-roots/10 text-roots',
};

export default function AdminDashboard() {
  const [packs, setPacks] = useState<Pack[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/packs')
      .then((r) => r.json())
      .then((data) => { setPacks(data.packs || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

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
                <th className="px-6 py-3 text-xs font-semibold text-bark/50 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-xs font-semibold text-bark/50 uppercase tracking-wider">Age Tier</th>
                <th className="px-6 py-3 text-xs font-semibold text-bark/50 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-xs font-semibold text-bark/50 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-xs font-semibold text-bark/50 uppercase tracking-wider">Updated</th>
              </tr>
            </thead>
            <tbody>
              {packs.map((pack) => (
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
