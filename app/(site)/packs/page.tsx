import type { Metadata } from 'next';
import { PackGrid } from '@/components/packs/PackGrid';
import { createServiceClient } from '@/lib/supabase/server';
import type { Pack } from '@/lib/types/pack';

export const metadata: Metadata = {
  title: 'Browse Packs',
  description: 'Explore our collection of interactive Bible story packs for kids ages 2-12. Beautiful illustrations, audio narration, and worship songs.',
};

export const revalidate = 60; // revalidate every 60 seconds

export default async function PacksPage() {
  const supabase = createServiceClient();

  const { data } = await supabase
    .from('packs')
    .select('*')
    .eq('status', 'published')
    .order('age_tier')
    .order('sort_order');

  const packs: Pack[] = data || [];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-white border-b border-gold/10 py-16 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-bark mb-4">
            Bible Story Packs
          </h1>
          <p className="text-bark/60 text-lg max-w-2xl mx-auto">
            Beautiful, printable Bible stories with audio narration, worship songs,
            and animated videos. Choose by age group.
          </p>
        </div>
      </section>

      {/* Pack Grid */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {packs.length > 0 ? (
            <PackGrid packs={packs} />
          ) : (
            <div className="text-center py-20">
              <p className="text-bark/40 text-lg">More packs coming soon!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
