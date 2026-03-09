'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, ArrowRight } from 'lucide-react';
import { AudioPlayer } from './AudioPlayer';
import { AgeBadge } from '@/components/shared/AgeBadge';
import { Button } from '@/components/ui/button';
import type { Pack, PackContent } from '@/lib/types/pack';

interface UnlockedContentProps {
  pack: Pack;
  content: PackContent;
}

export function UnlockedContent({ pack, content }: UnlockedContentProps) {
  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-white border-b border-gold/10">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AgeBadge tier={pack.age_tier} />
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-bark mt-4 mb-2">
              {pack.title}
            </h1>
            {pack.subtitle && (
              <p className="text-bark/50 italic">{pack.subtitle}</p>
            )}
            <div className="mt-3 inline-flex items-center gap-2 bg-gold/10 text-gold-dark px-4 py-1.5 rounded-full text-sm font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              Your Exclusive Content
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
        {/* Audio Narration */}
        {content.narration_full_url && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="font-display text-xl font-bold text-bark mb-4 flex items-center gap-2">
              <Image src="/images/icon-listen.png" alt="" width={28} height={28} className="w-7 h-7" /> Audio Narration
            </h2>
            <AudioPlayer
              src={content.narration_full_url}
              title={`${pack.title} — Full Narration`}
              duration={content.narration_duration_seconds || undefined}
            />

            {/* Page-by-page narration */}
            {content.page_narrations && content.page_narrations.length > 0 && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
                {content.page_narrations.map((pn) => (
                  <button
                    key={pn.page}
                    className="bg-white rounded-xl p-3 border border-gold/10 text-left hover:border-gold/30 transition-colors cursor-pointer"
                  >
                    <div className="text-xs text-bark/40 mb-1">Page {pn.page}</div>
                    <div className="text-sm font-medium text-bark truncate">{pn.title}</div>
                  </button>
                ))}
              </div>
            )}
          </motion.section>
        )}

        {/* Worship Song */}
        {content.song_url && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="font-display text-xl font-bold text-bark mb-4 flex items-center gap-2">
              <Image src="/images/icon-listen.png" alt="" width={28} height={28} className="w-7 h-7" /> Sing Along: {content.song_title}
            </h2>
            <AudioPlayer
              src={content.song_url}
              title={content.song_title || 'Worship Song'}
              duration={content.song_duration_seconds || undefined}
            />
            {content.song_lyrics && (
              <div className="mt-4 bg-white rounded-2xl border border-gold/10 p-6">
                <h3 className="text-sm font-semibold text-bark/50 uppercase tracking-wider mb-3">Lyrics</h3>
                <p className="text-bark/70 text-sm leading-relaxed whitespace-pre-line">
                  {content.song_lyrics}
                </p>
              </div>
            )}
          </motion.section>
        )}

        {/* Video */}
        {content.video_url && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="font-display text-xl font-bold text-bark mb-4 flex items-center gap-2">
              <Image src="/images/icon-qr-scan.png" alt="" width={28} height={28} className="w-7 h-7" /> Animated Story
            </h2>
            <div className="bg-white rounded-2xl border border-gold/10 overflow-hidden">
              <video
                controls
                poster={content.video_thumbnail_url || undefined}
                className="w-full aspect-video bg-bark/5"
                preload="metadata"
              >
                <source src={content.video_url} type="video/mp4" />
              </video>
            </div>
          </motion.section>
        )}

        {/* Discussion Questions */}
        {content.discussion_questions && content.discussion_questions.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="font-display text-xl font-bold text-bark mb-4 flex items-center gap-2">
              <Image src="/images/icon-discuss.png" alt="" width={28} height={28} className="w-7 h-7" />
              Talk About It Together
            </h2>
            <div className="bg-white rounded-2xl border border-gold/10 p-6 space-y-4">
              {content.discussion_questions.map((q, i) => (
                <div key={i} className="flex gap-3">
                  <span className="w-7 h-7 rounded-full bg-branches/10 text-branches-dark text-xs font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <p className="text-bark/70 text-sm pt-1">{q}</p>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Memory Verse */}
        {content.memory_verse && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="storybook-border bg-gradient-to-br from-gold/5 to-seeds-light/30 p-8 text-center">
              <Image src="/images/icon-verse.png" alt="" width={32} height={32} className="w-8 h-8 mx-auto mb-3" />
              <p className="font-display text-xl sm:text-2xl font-bold text-bark italic leading-relaxed mb-3">
                &ldquo;{content.memory_verse}&rdquo;
              </p>
              {content.memory_verse_ref && (
                <p className="text-sm text-bark/50 font-semibold">
                  &mdash; {content.memory_verse_ref}
                </p>
              )}
            </div>
          </motion.section>
        )}

        {/* Cross-sell */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center py-8"
        >
          <Image src="/images/icon-read.png" alt="" width={36} height={36} className="w-9 h-9 mx-auto mb-3" />
          <h2 className="font-display text-2xl font-bold text-bark mb-2">
            Want More Stories?
          </h2>
          <p className="text-bark/50 mb-6">
            Explore our full collection of Bible story packs
          </p>
          <Button size="lg" asChild>
            <Link href="/packs">
              Browse All Packs
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </motion.section>
      </div>
    </div>
  );
}
