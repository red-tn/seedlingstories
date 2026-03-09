'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AgeBadge } from '@/components/shared/AgeBadge';

export function FeaturedPacks() {
  return (
    <section className="py-20 md:py-28 bg-cream-dark/50 relative overflow-hidden botanical-corners">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-4">
          <span className="inline-block text-sm font-semibold text-gold uppercase tracking-widest mb-3">
            Featured Pack
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-bark mb-4">
            The Creation Story
          </h2>
          <p className="text-bark/60 text-lg max-w-xl mx-auto">
            Our most popular pack &mdash; journey through all 7 days of creation
          </p>
        </div>

        <div className="mt-12 grid lg:grid-cols-2 gap-12 items-center">
          {/* Pack Preview */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="storybook-border bg-white p-8 relative">
              {/* Featured badge */}
              <div className="absolute -top-3 left-6">
                <AgeBadge tier="sprouts" />
              </div>

              {/* Large illustration area */}
              <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-sky/30 via-seeds-light to-sprouts-light flex items-center justify-center mb-6 relative overflow-hidden">
                <Image
                  src="/images/hero-child-meditation.png"
                  alt="Child reading the Creation Story"
                  fill
                  className="object-cover"
                />

                {/* Audio preview overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-3 flex items-center gap-3 shadow-sm">
                  <button className="w-10 h-10 rounded-full bg-gold flex items-center justify-center text-white shrink-0 hover:bg-gold-dark transition-colors">
                    <Play className="w-4 h-4 ml-0.5" />
                  </button>
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-bark">Audio Preview</div>
                    <div className="h-1.5 bg-bark/10 rounded-full mt-1">
                      <div className="h-full w-1/3 bg-gold/50 rounded-full" />
                    </div>
                  </div>
                  <span className="text-xs text-bark/40">0:30</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Pack Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-display text-2xl font-bold text-bark mb-2">
              What&apos;s Included
            </h3>
            <p className="text-bark/60 mb-6">
              Everything you need for a complete Bible story experience:
            </p>

            <div className="space-y-4 mb-8">
              {[
                { image: '/images/icon-read.png', label: '12 beautifully illustrated story pages' },
                { image: '/images/icon-listen.png', label: 'Full audio narration (page-by-page)' },
                { image: '/images/icon-listen.png', label: '"God Made Everything" worship song' },
                { image: '/images/icon-qr-scan.png', label: 'Animated story video (3 min)' },
                { image: '/images/icon-download.png', label: '5 coloring pages + activity sheets' },
                { image: '/images/icon-discuss.png', label: 'Discussion guide for parents' },
                { image: '/images/icon-verse.png', label: 'Memory verse card (Genesis 1:1)' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-cream flex items-center justify-center shrink-0">
                    <Image src={item.image} alt="" width={20} height={20} className="w-5 h-5" />
                  </div>
                  <span className="text-sm text-bark/80">{item.label}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center gap-3 mb-6">
              <span className="font-display text-3xl font-bold text-bark">$14.99</span>
              <span className="text-sm text-bark/40">one-time purchase</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="etsy" size="lg" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Buy on Etsy
                </a>
              </Button>
              <Button variant="gumroad" size="lg" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Buy on Gumroad
                </a>
              </Button>
            </div>

            <p className="mt-4 text-xs text-bark/30 italic">
              Instant digital download. Print at home. QR code included for audio &amp; video.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
