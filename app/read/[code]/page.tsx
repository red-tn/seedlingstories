'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { StoryReader } from '@/components/reader/StoryReader';
import { Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { PageNarration } from '@/lib/types/pack';

const DEMO_PAGES: PageNarration[] = [
  { page: 1, title: 'Day 1 — Light', audio_url: '', illustration_url: '', text: 'In the very beginning, before anything else existed, there was only darkness. Everything was quiet and still. Then God spoke! "Let there be light!" He said. And suddenly, beautiful golden light burst through the darkness, filling everything with warmth and brightness.' },
  { page: 2, title: 'Day 2 — Sky', audio_url: '', illustration_url: '', text: 'On the second day, God looked at all the water everywhere. "I will make a beautiful sky!" He said. And the sky stretched out wide and blue above the waters. God made fluffy white clouds to float across it like cotton candy.' },
  { page: 3, title: 'Day 3 — Land & Plants', audio_url: '', illustration_url: '', text: 'Then God gathered the waters together into oceans and seas. Dry land appeared! God filled the land with green grass, tall trees that reached toward the sky, and colorful flowers of every shape and size. Roses, daisies, and sunflowers bloomed everywhere!' },
  { page: 4, title: 'Day 4 — Sun, Moon & Stars', audio_url: '', illustration_url: '', text: 'God made the bright, warm sun to light up the day. He made the gentle, silver moon to glow softly at night. And then He scattered millions and millions of twinkling stars across the dark sky like tiny diamonds.' },
  { page: 5, title: 'Day 5 — Fish & Birds', audio_url: '', illustration_url: '', text: 'On the fifth day, God filled the oceans with fish of every color — orange clownfish, blue tangs, and graceful dolphins. He filled the sky with birds that could sing and soar — cardinals, eagles, and tiny hummingbirds!' },
  { page: 6, title: 'Day 6 — Animals & People', audio_url: '', illustration_url: '', text: 'God made all the animals — lions with golden manes, elephants with long trunks, bunnies with soft fur, and puppies with wagging tails. Then, the most special creation of all — God made people! He made you!' },
  { page: 7, title: 'Day 7 — Rest', audio_url: '', illustration_url: '', text: 'On the seventh day, God looked at everything He had made — the light, the sky, the land, the plants, the sun, the moon, the stars, the fish, the birds, the animals, and the people. And God said, "It is very good!" Then God rested.' },
];

export default function ReadPage() {
  const params = useParams();
  const code = params.code as string;
  const [status, setStatus] = useState<'loading' | 'valid' | 'invalid'>('loading');

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus(code ? 'valid' : 'invalid');
    }, 800);
    return () => clearTimeout(timer);
  }, [code]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-gold animate-spin mx-auto mb-4" />
          <p className="text-bark/50 font-display">Opening your story...</p>
        </div>
      </div>
    );
  }

  if (status === 'invalid') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-center max-w-md mx-auto px-4">
          <AlertCircle className="w-12 h-12 text-seeds mx-auto mb-4" />
          <h1 className="font-display text-2xl font-bold text-bark mb-2">Story Not Found</h1>
          <p className="text-bark/50 mb-6">This code doesn&apos;t seem to be valid.</p>
          <Button asChild>
            <Link href="/redeem">Try Another Code</Link>
          </Button>
        </div>
      </div>
    );
  }

  return <StoryReader title="The Creation Story" ageTier="sprouts" pages={DEMO_PAGES} />;
}
