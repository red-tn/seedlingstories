'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { UnlockedContent } from '@/components/listen/UnlockedContent';
import { Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { Pack, PackContent } from '@/lib/types/pack';

// Demo data for preview — will be replaced with API call
const DEMO_DATA: { pack: Pack; content: PackContent } = {
  pack: {
    id: '4', slug: 'the-creation-story', title: 'The Creation Story', subtitle: '7 days of wonder',
    description: '', age_tier: 'sprouts', age_label: 'Ages 4-6', scripture_refs: ['Genesis 1:1-2:3'],
    price_display: '$14.99', etsy_url: '#', gumroad_url: '#', cover_image_url: null,
    preview_images: null, preview_audio_url: null, is_featured: true, is_free: false,
    sort_order: 1, includes: [], status: 'published', series_name: 'Creation & Wonder',
    created_at: '', updated_at: '',
  },
  content: {
    id: '1', pack_id: '4',
    narration_full_url: null,
    narration_duration_seconds: 180,
    page_narrations: [
      { page: 1, title: 'Day 1 — Light', audio_url: '', illustration_url: '', text: 'In the very beginning, there was nothing but darkness. Then God said, "Let there be light!" And beautiful, golden light filled everything.' },
      { page: 2, title: 'Day 2 — Sky', audio_url: '', illustration_url: '', text: 'God looked at the water everywhere and said, "I will make a beautiful sky!" And the sky stretched out wide and blue above the waters.' },
      { page: 3, title: 'Day 3 — Land & Plants', audio_url: '', illustration_url: '', text: 'Then God gathered the waters together and made dry land appear. He filled the land with green grass, tall trees, and colorful flowers.' },
      { page: 4, title: 'Day 4 — Sun, Moon & Stars', audio_url: '', illustration_url: '', text: 'God made the bright sun to warm the day, the gentle moon to light the night, and millions of twinkling stars across the sky.' },
    ],
    song_title: 'God Made Everything',
    song_url: null,
    song_lyrics: 'God made the sun, God made the moon,\nGod made the stars that shine.\nGod made the trees, God made the seas,\nGod made you and me!\n\n(Chorus)\nEverything, everything,\nGod made everything!\nLet us sing, let us sing,\nGod made everything!',
    song_duration_seconds: 120,
    video_url: null,
    video_duration_seconds: 180,
    video_thumbnail_url: null,
    discussion_questions: [
      'What is your favorite thing that God created?',
      'Why do you think God made so many different animals?',
      'How does it make you feel to know that God made you special?',
      'Can you name something beautiful that God made outside?',
    ],
    memory_verse: 'In the beginning God created the heavens and the earth.',
    memory_verse_ref: 'Genesis 1:1',
  },
};

export default function ListenPage() {
  const params = useParams();
  const code = params.code as string;
  const [status, setStatus] = useState<'loading' | 'valid' | 'invalid'>('loading');
  const [data, setData] = useState<{ pack: Pack; content: PackContent } | null>(null);

  useEffect(() => {
    // In production, call /api/redeem to validate code
    // For demo, show content after a brief loading state
    const timer = setTimeout(() => {
      if (code) {
        setData(DEMO_DATA);
        setStatus('valid');
      } else {
        setStatus('invalid');
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [code]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-gold animate-spin mx-auto mb-4" />
          <p className="text-bark/50 font-display">Unlocking your content...</p>
        </div>
      </div>
    );
  }

  if (status === 'invalid' || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-center max-w-md mx-auto px-4">
          <AlertCircle className="w-12 h-12 text-seeds mx-auto mb-4" />
          <h1 className="font-display text-2xl font-bold text-bark mb-2">
            Code Not Found
          </h1>
          <p className="text-bark/50 mb-6">
            This code doesn&apos;t seem to be valid. Please check your code and try again.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="secondary" asChild>
              <Link href="/redeem">Try Another Code</Link>
            </Button>
            <Button asChild>
              <Link href="/packs">Browse Packs</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return <UnlockedContent pack={data.pack} content={data.content} />;
}
