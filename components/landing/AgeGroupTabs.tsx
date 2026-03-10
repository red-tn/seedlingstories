'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { AGE_TIERS, AGE_TIER_ORDER, type AgeTier } from '@/lib/utils/age-tiers';
import { PackCard } from '@/components/packs/PackCard';
import type { Pack } from '@/lib/types/pack';

// Fallback demo packs used when no real packs exist for a tier
const FALLBACK_PACKS: Record<AgeTier, Pack[]> = {
  seeds: [
    { id: '1', slug: 'god-made-me', title: 'God Made Me!', subtitle: 'A creation story for little ones', description: 'A gentle introduction to God as our Creator, with tactile illustrations perfect for tiny hands.', age_tier: 'seeds', age_label: 'Ages 2-4', scripture_refs: ['Psalm 139:14'], price_display: '$14.99', etsy_url: '#', gumroad_url: '#', cover_image_url: null, preview_images: null, preview_audio_url: null, is_featured: true, is_free: false, sort_order: 1, includes: [{ type: 'story-pages', label: '8 Story Pages' }, { type: 'coloring-pages', label: '4 Coloring Pages' }, { type: 'audio-narration', label: 'Audio Narration' }], status: 'published', series_name: 'Creation & Wonder', created_at: '', updated_at: '' },
    { id: '2', slug: 'gods-beautiful-world', title: "God's Beautiful World", subtitle: 'Exploring creation day by day', description: 'Journey through each day of creation with vibrant watercolor illustrations and soothing narration.', age_tier: 'seeds', age_label: 'Ages 2-4', scripture_refs: ['Genesis 1:1-31'], price_display: '$14.99', etsy_url: '#', gumroad_url: '#', cover_image_url: null, preview_images: null, preview_audio_url: null, is_featured: false, is_free: false, sort_order: 2, includes: [{ type: 'story-pages', label: '10 Story Pages' }, { type: 'audio-narration', label: 'Audio Narration' }, { type: 'worship-song', label: 'Worship Song' }], status: 'published', series_name: 'Creation & Wonder', created_at: '', updated_at: '' },
    { id: '3', slug: 'gods-love-is-big', title: "God's Love Is Big!", subtitle: 'Learning about God\'s endless love', description: 'Simple, powerful reminders of how much God loves each child.', age_tier: 'seeds', age_label: 'Ages 2-4', scripture_refs: ['1 John 4:8'], price_display: '$14.99', etsy_url: '#', gumroad_url: '#', cover_image_url: null, preview_images: null, preview_audio_url: null, is_featured: false, is_free: true, sort_order: 3, includes: [{ type: 'story-pages', label: '8 Story Pages' }, { type: 'coloring-pages', label: '3 Coloring Pages' }], status: 'published', series_name: null, created_at: '', updated_at: '' },
  ],
  sprouts: [
    { id: '4', slug: 'the-creation-story', title: 'The Creation Story', subtitle: '7 days of wonder', description: 'The complete creation narrative adapted for early readers with interactive audio and activities.', age_tier: 'sprouts', age_label: 'Ages 4-6', scripture_refs: ['Genesis 1:1-2:3'], price_display: '$14.99', etsy_url: '#', gumroad_url: '#', cover_image_url: null, preview_images: null, preview_audio_url: null, is_featured: true, is_free: false, sort_order: 1, includes: [{ type: 'story-pages', label: '12 Story Pages' }, { type: 'audio-narration', label: 'Audio Narration' }, { type: 'worship-song', label: 'Worship Song' }, { type: 'animated-video', label: 'Animated Video' }], status: 'published', series_name: 'Creation & Wonder', created_at: '', updated_at: '' },
    { id: '5', slug: 'noahs-big-boat', title: "Noah's Big Boat", subtitle: 'An adventure of faith', description: 'The story of Noah and God\'s faithfulness, with animals, rain, and a rainbow of promise.', age_tier: 'sprouts', age_label: 'Ages 4-6', scripture_refs: ['Genesis 6-9'], price_display: '$14.99', etsy_url: '#', gumroad_url: '#', cover_image_url: null, preview_images: null, preview_audio_url: null, is_featured: false, is_free: false, sort_order: 2, includes: [{ type: 'story-pages', label: '12 Story Pages' }, { type: 'coloring-pages', label: '5 Coloring Pages' }, { type: 'audio-narration', label: 'Audio Narration' }], status: 'published', series_name: 'Heroes of Faith', created_at: '', updated_at: '' },
    { id: '6', slug: 'david-and-goliath', title: 'David & Goliath', subtitle: 'Courage with God', description: 'Young David faces the giant — a story of bravery and trust in God.', age_tier: 'sprouts', age_label: 'Ages 4-6', scripture_refs: ['1 Samuel 17'], price_display: '$14.99', etsy_url: '#', gumroad_url: '#', cover_image_url: null, preview_images: null, preview_audio_url: null, is_featured: false, is_free: false, sort_order: 3, includes: [{ type: 'story-pages', label: '12 Story Pages' }, { type: 'audio-narration', label: 'Audio Narration' }, { type: 'activity-sheets', label: 'Activity Sheets' }], status: 'published', series_name: 'Heroes of Faith', created_at: '', updated_at: '' },
  ],
  branches: [
    { id: '7', slug: 'the-good-samaritan', title: 'The Good Samaritan', subtitle: 'Who is my neighbor?', description: 'Jesus\' powerful parable about showing love and kindness to everyone.', age_tier: 'branches', age_label: 'Ages 6-9', scripture_refs: ['Luke 10:25-37'], price_display: '$14.99', etsy_url: '#', gumroad_url: '#', cover_image_url: null, preview_images: null, preview_audio_url: null, is_featured: true, is_free: false, sort_order: 1, includes: [{ type: 'story-pages', label: '16 Story Pages' }, { type: 'audio-narration', label: 'Audio Narration' }, { type: 'discussion-guide', label: 'Discussion Guide' }, { type: 'memory-verse-card', label: 'Memory Verse Card' }], status: 'published', series_name: 'Words of Jesus', created_at: '', updated_at: '' },
    { id: '8', slug: 'the-prodigal-son', title: 'The Prodigal Son', subtitle: 'A father\'s love', description: 'The beautiful story of forgiveness, redemption, and a father who never stopped waiting.', age_tier: 'branches', age_label: 'Ages 6-9', scripture_refs: ['Luke 15:11-32'], price_display: '$14.99', etsy_url: '#', gumroad_url: '#', cover_image_url: null, preview_images: null, preview_audio_url: null, is_featured: false, is_free: false, sort_order: 2, includes: [{ type: 'story-pages', label: '16 Story Pages' }, { type: 'audio-narration', label: 'Audio Narration' }, { type: 'worship-song', label: 'Worship Song' }], status: 'published', series_name: 'Words of Jesus', created_at: '', updated_at: '' },
  ],
  roots: [
    { id: '9', slug: 'armor-of-god', title: 'The Armor of God', subtitle: 'Standing firm in faith', description: 'An in-depth study of Ephesians 6 with journaling prompts and reflection questions.', age_tier: 'roots', age_label: 'Ages 9-12', scripture_refs: ['Ephesians 6:10-18'], price_display: '$14.99', etsy_url: '#', gumroad_url: '#', cover_image_url: null, preview_images: null, preview_audio_url: null, is_featured: true, is_free: false, sort_order: 1, includes: [{ type: 'story-pages', label: '20 Story Pages' }, { type: 'audio-narration', label: 'Audio Narration' }, { type: 'discussion-guide', label: 'Discussion Guide' }, { type: 'activity-sheets', label: 'Journal Prompts' }], status: 'published', series_name: 'Armor of God', created_at: '', updated_at: '' },
    { id: '10', slug: 'queen-esther', title: 'Queen Esther', subtitle: 'For such a time as this', description: 'The courageous story of Esther who risked everything to save her people.', age_tier: 'roots', age_label: 'Ages 9-12', scripture_refs: ['Esther 1-10'], price_display: '$14.99', etsy_url: '#', gumroad_url: '#', cover_image_url: null, preview_images: null, preview_audio_url: null, is_featured: false, is_free: false, sort_order: 2, includes: [{ type: 'story-pages', label: '20 Story Pages' }, { type: 'audio-narration', label: 'Audio Narration' }, { type: 'memory-verse-card', label: 'Memory Verse Card' }], status: 'published', series_name: 'Heroes of Faith', created_at: '', updated_at: '' },
  ],
};

interface AgeGroupTabsProps {
  packs?: Pack[];
}

export function AgeGroupTabs({ packs = [] }: AgeGroupTabsProps) {
  const [activeTier, setActiveTier] = useState<AgeTier>('sprouts');

  // Group fetched packs by age_tier, falling back to demo data for empty tiers
  const packsByTier = useMemo(() => {
    const grouped: Record<AgeTier, Pack[]> = {
      seeds: [],
      sprouts: [],
      branches: [],
      roots: [],
    };

    for (const pack of packs) {
      if (grouped[pack.age_tier]) {
        grouped[pack.age_tier].push(pack);
      }
    }

    // Fall back to hardcoded data for any tier with no real packs
    for (const tier of AGE_TIER_ORDER) {
      if (grouped[tier].length === 0) {
        grouped[tier] = FALLBACK_PACKS[tier];
      }
    }

    return grouped;
  }, [packs]);

  return (
    <section className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-bark mb-4">
            Stories for Every Stage
          </h2>
          <p className="text-bark/60 text-lg max-w-2xl mx-auto">
            From first words to independent reading &mdash; our packs grow with your child.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {AGE_TIER_ORDER.map((tier) => {
            const info = AGE_TIERS[tier];
            const isActive = activeTier === tier;
            return (
              <button
                key={tier}
                onClick={() => setActiveTier(tier)}
                className={`
                  relative px-5 py-3 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer
                  ${isActive
                    ? 'text-white shadow-lg scale-105'
                    : 'text-bark/60 bg-white border border-bark/10 hover:border-bark/20 hover:bg-cream'
                  }
                `}
                style={isActive ? { backgroundColor: info.color } : {}}
              >
                <Image src={info.icon} alt="" width={24} height={24} className="w-6 h-6 mr-1.5 inline-block" />
                {info.label}
                <span className="ml-1.5 text-xs opacity-70">({info.ageRange})</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTierIndicator"
                    className="absolute inset-0 rounded-full -z-10"
                    style={{ backgroundColor: info.color }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Pack Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTier}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {packsByTier[activeTier].map((pack, i) => (
              <motion.div
                key={pack.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <PackCard pack={pack} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Description */}
        <motion.div
          key={`desc-${activeTier}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-8"
        >
          <p className="text-bark/50 text-sm italic">
            {AGE_TIERS[activeTier].description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
