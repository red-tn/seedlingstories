import type { Metadata } from 'next';
import { PackGrid } from '@/components/packs/PackGrid';
import type { Pack } from '@/lib/types/pack';

export const metadata: Metadata = {
  title: 'Browse Packs',
  description: 'Explore our collection of interactive Bible story packs for kids ages 2-12. Beautiful illustrations, audio narration, and worship songs.',
};

// Demo packs — will be replaced with Supabase query
const ALL_PACKS: Pack[] = [
  { id: '1', slug: 'god-made-me', title: 'God Made Me!', subtitle: 'A creation story for little ones', description: 'A gentle introduction to God as our Creator.', age_tier: 'seeds', age_label: 'Ages 2-4', scripture_refs: ['Psalm 139:14'], price_display: '$14.99', etsy_url: '#', gumroad_url: '#', cover_image_url: null, preview_images: null, preview_audio_url: null, is_featured: true, is_free: false, sort_order: 1, includes: [{ type: 'story-pages', label: '8 Story Pages' }, { type: 'coloring-pages', label: '4 Coloring Pages' }, { type: 'audio-narration', label: 'Audio Narration' }], status: 'published', series_name: 'Creation & Wonder', created_at: '', updated_at: '' },
  { id: '2', slug: 'gods-beautiful-world', title: "God's Beautiful World", subtitle: 'Exploring creation day by day', description: 'Journey through each day of creation.', age_tier: 'seeds', age_label: 'Ages 2-4', scripture_refs: ['Genesis 1:1-31'], price_display: '$14.99', etsy_url: '#', gumroad_url: '#', cover_image_url: null, preview_images: null, preview_audio_url: null, is_featured: false, is_free: false, sort_order: 2, includes: [{ type: 'story-pages', label: '10 Story Pages' }, { type: 'audio-narration', label: 'Audio Narration' }, { type: 'worship-song', label: 'Worship Song' }], status: 'published', series_name: 'Creation & Wonder', created_at: '', updated_at: '' },
  { id: '3', slug: 'gods-love-is-big', title: "God's Love Is Big!", subtitle: "Learning about God's endless love", description: 'Simple, powerful reminders of how much God loves each child.', age_tier: 'seeds', age_label: 'Ages 2-4', scripture_refs: ['1 John 4:8'], price_display: '$14.99', etsy_url: '#', gumroad_url: '#', cover_image_url: null, preview_images: null, preview_audio_url: null, is_featured: false, is_free: true, sort_order: 3, includes: [{ type: 'story-pages', label: '8 Story Pages' }, { type: 'coloring-pages', label: '3 Coloring Pages' }], status: 'published', series_name: null, created_at: '', updated_at: '' },
  { id: '4', slug: 'the-creation-story', title: 'The Creation Story', subtitle: '7 days of wonder', description: 'The complete creation narrative adapted for early readers.', age_tier: 'sprouts', age_label: 'Ages 4-6', scripture_refs: ['Genesis 1:1-2:3'], price_display: '$14.99', etsy_url: '#', gumroad_url: '#', cover_image_url: null, preview_images: null, preview_audio_url: null, is_featured: true, is_free: false, sort_order: 1, includes: [{ type: 'story-pages', label: '12 Story Pages' }, { type: 'audio-narration', label: 'Audio Narration' }, { type: 'worship-song', label: 'Worship Song' }, { type: 'animated-video', label: 'Animated Video' }], status: 'published', series_name: 'Creation & Wonder', created_at: '', updated_at: '' },
  { id: '5', slug: 'noahs-big-boat', title: "Noah's Big Boat", subtitle: 'An adventure of faith', description: "The story of Noah and God's faithfulness.", age_tier: 'sprouts', age_label: 'Ages 4-6', scripture_refs: ['Genesis 6-9'], price_display: '$14.99', etsy_url: '#', gumroad_url: '#', cover_image_url: null, preview_images: null, preview_audio_url: null, is_featured: false, is_free: false, sort_order: 2, includes: [{ type: 'story-pages', label: '12 Story Pages' }, { type: 'coloring-pages', label: '5 Coloring Pages' }, { type: 'audio-narration', label: 'Audio Narration' }], status: 'published', series_name: 'Heroes of Faith', created_at: '', updated_at: '' },
  { id: '6', slug: 'david-and-goliath', title: 'David & Goliath', subtitle: 'Courage with God', description: 'Young David faces the giant.', age_tier: 'sprouts', age_label: 'Ages 4-6', scripture_refs: ['1 Samuel 17'], price_display: '$14.99', etsy_url: '#', gumroad_url: '#', cover_image_url: null, preview_images: null, preview_audio_url: null, is_featured: false, is_free: false, sort_order: 3, includes: [{ type: 'story-pages', label: '12 Story Pages' }, { type: 'audio-narration', label: 'Audio Narration' }, { type: 'activity-sheets', label: 'Activity Sheets' }], status: 'published', series_name: 'Heroes of Faith', created_at: '', updated_at: '' },
  { id: '7', slug: 'the-good-samaritan', title: 'The Good Samaritan', subtitle: 'Who is my neighbor?', description: "Jesus' powerful parable about showing love.", age_tier: 'branches', age_label: 'Ages 6-9', scripture_refs: ['Luke 10:25-37'], price_display: '$14.99', etsy_url: '#', gumroad_url: '#', cover_image_url: null, preview_images: null, preview_audio_url: null, is_featured: true, is_free: false, sort_order: 1, includes: [{ type: 'story-pages', label: '16 Story Pages' }, { type: 'audio-narration', label: 'Audio Narration' }, { type: 'discussion-guide', label: 'Discussion Guide' }, { type: 'memory-verse-card', label: 'Memory Verse Card' }], status: 'published', series_name: 'Words of Jesus', created_at: '', updated_at: '' },
  { id: '8', slug: 'the-prodigal-son', title: 'The Prodigal Son', subtitle: "A father's love", description: 'The beautiful story of forgiveness.', age_tier: 'branches', age_label: 'Ages 6-9', scripture_refs: ['Luke 15:11-32'], price_display: '$14.99', etsy_url: '#', gumroad_url: '#', cover_image_url: null, preview_images: null, preview_audio_url: null, is_featured: false, is_free: false, sort_order: 2, includes: [{ type: 'story-pages', label: '16 Story Pages' }, { type: 'audio-narration', label: 'Audio Narration' }, { type: 'worship-song', label: 'Worship Song' }], status: 'published', series_name: 'Words of Jesus', created_at: '', updated_at: '' },
  { id: '9', slug: 'armor-of-god', title: 'The Armor of God', subtitle: 'Standing firm in faith', description: 'An in-depth study of Ephesians 6.', age_tier: 'roots', age_label: 'Ages 9-12', scripture_refs: ['Ephesians 6:10-18'], price_display: '$14.99', etsy_url: '#', gumroad_url: '#', cover_image_url: null, preview_images: null, preview_audio_url: null, is_featured: true, is_free: false, sort_order: 1, includes: [{ type: 'story-pages', label: '20 Story Pages' }, { type: 'audio-narration', label: 'Audio Narration' }, { type: 'discussion-guide', label: 'Discussion Guide' }, { type: 'activity-sheets', label: 'Journal Prompts' }], status: 'published', series_name: 'Armor of God', created_at: '', updated_at: '' },
  { id: '10', slug: 'queen-esther', title: 'Queen Esther', subtitle: 'For such a time as this', description: 'The courageous story of Esther.', age_tier: 'roots', age_label: 'Ages 9-12', scripture_refs: ['Esther 1-10'], price_display: '$14.99', etsy_url: '#', gumroad_url: '#', cover_image_url: null, preview_images: null, preview_audio_url: null, is_featured: false, is_free: false, sort_order: 2, includes: [{ type: 'story-pages', label: '20 Story Pages' }, { type: 'audio-narration', label: 'Audio Narration' }, { type: 'memory-verse-card', label: 'Memory Verse Card' }], status: 'published', series_name: 'Heroes of Faith', created_at: '', updated_at: '' },
];

export default function PacksPage() {
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
          <PackGrid packs={ALL_PACKS} />
        </div>
      </section>
    </div>
  );
}
