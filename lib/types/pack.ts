import type { AgeTier } from '@/lib/utils/age-tiers';

export interface Pack {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  age_tier: AgeTier;
  age_label: string | null;
  scripture_refs: string[] | null;
  price_display: string;
  etsy_url: string | null;
  gumroad_url: string | null;
  cover_image_url: string | null;
  preview_images: string[] | null;
  preview_audio_url: string | null;
  is_featured: boolean;
  is_free: boolean;
  sort_order: number;
  includes: PackInclude[];
  status: 'draft' | 'published';
  series_name: string | null;
  created_at: string;
  updated_at: string;
}

export interface PackInclude {
  type: string;
  label: string;
  count?: number;
}

export interface PackContent {
  id: string;
  pack_id: string;
  narration_full_url: string | null;
  narration_duration_seconds: number | null;
  page_narrations: PageNarration[] | null;
  song_title: string | null;
  song_url: string | null;
  song_lyrics: string | null;
  song_duration_seconds: number | null;
  video_url: string | null;
  video_duration_seconds: number | null;
  video_thumbnail_url: string | null;
  discussion_questions: string[] | null;
  memory_verse: string | null;
  memory_verse_ref: string | null;
}

export interface PageNarration {
  page: number;
  title: string;
  audio_url: string;
  illustration_url: string;
  text: string;
  word_timings?: WordTiming[];
}

export interface WordTiming {
  word: string;
  start: number;
  end: number;
}

export interface InviteCode {
  id: string;
  code: string;
  pack_id: string;
  is_active: boolean;
  redeemed_count: number;
  created_at: string;
}
