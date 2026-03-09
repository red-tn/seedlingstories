import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { notFound } from 'next/navigation';
import { createServiceClient } from '@/lib/supabase/server';
import { AgeBadge } from '@/components/shared/AgeBadge';
import { BuyButtons } from '@/components/packs/BuyButtons';
import { PackIncludes } from '@/components/packs/PackIncludes';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const supabase = createServiceClient();
  const { data: pack } = await supabase.from('packs').select('title, description').eq('slug', slug).single();

  if (!pack) return { title: 'Pack Not Found' };
  return {
    title: pack.title,
    description: pack.description?.slice(0, 160) || undefined,
  };
}

export default async function PackDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = createServiceClient();

  const { data: pack } = await supabase
    .from('packs')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!pack) notFound();

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gold/10">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <Link href="/packs" className="inline-flex items-center gap-1.5 text-sm text-bark/40 hover:text-bark transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to all packs
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Cover & Preview */}
          <div>
            <div className="storybook-border bg-white p-6 sticky top-24">
              <div className="aspect-[3/4] rounded-xl bg-gradient-to-br from-sprouts-light via-sky/20 to-seeds-light flex items-center justify-center relative overflow-hidden">
                {pack.cover_image_url ? (
                  <Image
                    src={pack.cover_image_url}
                    alt={pack.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <Image
                    src="/images/hero-child-meditation.png"
                    alt={pack.title}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Right: Details */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <AgeBadge tier={pack.age_tier} />
              {pack.series_name && (
                <span className="text-sm text-bark/40 bg-cream px-3 py-1 rounded-full">
                  {pack.series_name}
                </span>
              )}
            </div>

            <h1 className="font-display text-3xl sm:text-4xl font-bold text-bark mb-2">
              {pack.title}
            </h1>
            {pack.subtitle && (
              <p className="text-lg text-bark/50 italic mb-4">{pack.subtitle}</p>
            )}

            {/* Scripture */}
            {pack.scripture_refs && pack.scripture_refs.length > 0 && (
              <div className="flex items-center gap-2 mb-6">
                <BookOpen className="w-4 h-4 text-gold" />
                <span className="text-sm text-bark/50">
                  {pack.scripture_refs.join(' · ')}
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-display text-4xl font-bold text-bark">
                {pack.is_free ? 'Free' : pack.price_display}
              </span>
              {!pack.is_free && <span className="text-sm text-bark/40">one-time purchase</span>}
            </div>

            {/* Buy Buttons */}
            <div className="mb-8">
              <BuyButtons etsyUrl={pack.etsy_url} gumroadUrl={pack.gumroad_url} isFree={pack.is_free} />
              <p className="mt-3 text-xs text-bark/30 italic">
                Instant digital download. Print at home. QR code included.
              </p>
            </div>

            {/* Divider */}
            <div className="vine-divider mb-6" />

            {/* Description */}
            {pack.description && (
              <div className="mb-8">
                <h2 className="font-display text-lg font-bold text-bark mb-3">About This Pack</h2>
                <div className="text-bark/60 text-sm leading-relaxed whitespace-pre-line">
                  {pack.description}
                </div>
              </div>
            )}

            {/* What's Included */}
            {pack.includes && pack.includes.length > 0 && (
              <div className="mb-8">
                <PackIncludes includes={pack.includes} />
              </div>
            )}

            {/* How It Works Mini */}
            <div className="bg-cream rounded-2xl p-6 border border-gold/10">
              <h3 className="font-display text-lg font-bold text-bark mb-4">How It Works</h3>
              <div className="space-y-3">
                {[
                  { step: '1', text: 'Purchase and download the PDF pack' },
                  { step: '2', text: 'Print the story pages and activities' },
                  { step: '3', text: 'Scan the QR code to unlock audio, video & song' },
                ].map((s) => (
                  <div key={s.step} className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-gold/10 text-gold-dark text-xs font-bold flex items-center justify-center shrink-0">
                      {s.step}
                    </span>
                    <span className="text-sm text-bark/70">{s.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <BuyButtons etsyUrl={pack.etsy_url} gumroadUrl={pack.gumroad_url} isFree={pack.is_free} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
