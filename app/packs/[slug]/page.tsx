import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { AgeBadge } from '@/components/shared/AgeBadge';
import { BuyButtons } from '@/components/packs/BuyButtons';
import { PackIncludes } from '@/components/packs/PackIncludes';
import { Button } from '@/components/ui/button';

// Demo pack data — will be replaced with Supabase query
const DEMO_PACK = {
  id: '4',
  slug: 'the-creation-story',
  title: 'The Creation Story',
  subtitle: '7 days of wonder',
  description: 'Journey through all seven days of creation in this beautifully illustrated pack designed for early readers ages 4-6. Each page brings a day of creation to life with vibrant watercolor illustrations, age-appropriate narrative text, and an exclusive QR code that unlocks audio narration, a worship song ("God Made Everything"), and an animated story video.\n\nPerfect for bedtime reading, Sunday School lessons, homeschool devotions, or just quality time with your little one. The included coloring pages and activity sheets extend the learning beyond the story itself.',
  age_tier: 'sprouts' as const,
  age_label: 'Ages 4-6',
  scripture_refs: ['Genesis 1:1-2:3'],
  price_display: '$14.99',
  etsy_url: '#',
  gumroad_url: '#',
  cover_image_url: null,
  preview_images: null,
  preview_audio_url: null,
  is_featured: true,
  is_free: false,
  sort_order: 1,
  includes: [
    { type: 'story-pages', label: '12 Illustrated Story Pages' },
    { type: 'coloring-pages', label: '5 Coloring Pages' },
    { type: 'audio-narration', label: 'Full Audio Narration (page-by-page)' },
    { type: 'worship-song', label: '"God Made Everything" Worship Song' },
    { type: 'animated-video', label: 'Animated Story Video (3 min)' },
    { type: 'activity-sheets', label: 'Activity Sheets' },
    { type: 'discussion-guide', label: 'Parent Discussion Guide' },
    { type: 'memory-verse-card', label: 'Memory Verse Card (Genesis 1:1)' },
  ],
  status: 'published' as const,
  series_name: 'Creation & Wonder',
  created_at: '',
  updated_at: '',
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: DEMO_PACK.title,
    description: DEMO_PACK.description?.slice(0, 160),
  };
}

export default function PackDetailPage() {
  const pack = DEMO_PACK;

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
                <Image
                  src="/images/hero-child-meditation.png"
                  alt={pack.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Preview gallery thumbnails */}
              <div className="mt-4 grid grid-cols-3 gap-2">
                {['/images/tier-seeds.png', '/images/tier-sprouts.png', '/images/tier-branches.png'].map((src, i) => (
                  <div key={i} className="aspect-square rounded-lg bg-cream flex items-center justify-center border border-gold/10 p-3">
                    <Image src={src} alt="" width={48} height={48} className="w-12 h-12" />
                  </div>
                ))}
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
                {pack.price_display}
              </span>
              <span className="text-sm text-bark/40">one-time purchase</span>
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
            <div className="mb-8">
              <h2 className="font-display text-lg font-bold text-bark mb-3">About This Pack</h2>
              <div className="text-bark/60 text-sm leading-relaxed whitespace-pre-line">
                {pack.description}
              </div>
            </div>

            {/* What's Included */}
            <div className="mb-8">
              <PackIncludes includes={pack.includes} />
            </div>

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
