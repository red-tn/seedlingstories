'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Gift, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden watercolor-bg paper-texture">
      {/* Floating botanical elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large soft gradient blobs */}
        <div className="absolute top-10 -left-20 w-96 h-96 bg-seeds/5 rounded-full blur-3xl gentle-pulse" />
        <div className="absolute bottom-20 -right-20 w-80 h-80 bg-sprouts/5 rounded-full blur-3xl gentle-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-branches/3 rounded-full blur-3xl gentle-pulse" style={{ animationDelay: '4s' }} />

        {/* Floating tier icons */}
        <motion.div
          className="absolute top-20 right-[15%] leaf-float"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25 }}
          transition={{ delay: 1 }}
        >
          <Image src="/images/tier-sprouts.png" alt="" width={48} height={48} className="w-12 h-12" />
        </motion.div>
        <motion.div
          className="absolute bottom-32 left-[10%] leaf-float"
          style={{ animationDelay: '3s' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ delay: 1.5 }}
        >
          <Image src="/images/tier-seeds.png" alt="" width={40} height={40} className="w-10 h-10" />
        </motion.div>
        <motion.div
          className="absolute top-40 left-[20%] leaf-float"
          style={{ animationDelay: '1.5s' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ delay: 2 }}
        >
          <Image src="/images/tier-branches.png" alt="" width={36} height={36} className="w-9 h-9" />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <div className="inline-flex items-center gap-2 bg-gold/10 text-gold-dark px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Bible Stories That Come Alive
              </div>

              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-bark leading-[1.1] mb-6">
                Planting{' '}
                <span className="text-golden">
                  God&apos;s Word
                </span>{' '}
                in Little Hearts
              </h1>

              <p className="text-lg sm:text-xl text-bark/60 leading-relaxed mb-4 max-w-lg mx-auto lg:mx-0">
                Beautiful Bible story packs with printable pages, audio narration,
                worship songs, and animated videos for ages 2&ndash;12.
              </p>

              {/* One-time purchase callout */}
              <p className="text-sm text-sprouts font-semibold mb-8 max-w-lg mx-auto lg:mx-0">
                One-time purchase. Own forever. No subscriptions.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button size="xl" asChild>
                <Link href="/packs">
                  <BookOpen className="w-5 h-5" />
                  Browse Packs
                </Link>
              </Button>
              <Button variant="secondary" size="xl" asChild>
                <Link href="/free">
                  <Gift className="w-5 h-5" />
                  Get a Free Pack
                </Link>
              </Button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-10 flex items-center gap-6 justify-center lg:justify-start text-sm text-bark/40"
            >
              <span className="flex items-center gap-1.5">
                <Image src="/images/icon-verse.png" alt="" width={22} height={22} className="w-5 h-5" /> Scripture-based
              </span>
              <span className="flex items-center gap-1.5">
                <Image src="/images/icon-listen.png" alt="" width={22} height={22} className="w-5 h-5" /> Audio included
              </span>
              <span className="flex items-center gap-1.5">
                <Image src="/images/icon-download.png" alt="" width={22} height={22} className="w-5 h-5" /> Print &amp; play
              </span>
            </motion.div>
          </div>

          {/* Illustration Area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
            className="relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-lg">
              {/* Hero illustration */}
              <div className="relative storybook-border bg-white p-4 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                {/* Decorative corner with logo icon */}
                <div className="absolute -top-4 -right-4 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg border border-gold/20 z-10">
                  <Image src="/images/logo-icon.png" alt="" width={36} height={36} className="w-9 h-9" />
                </div>

                {/* Real hero illustration */}
                <div className="rounded-xl overflow-hidden relative">
                  <Image
                    src="/images/hero-children-tree.png"
                    alt="Children reading Bible stories under a tree"
                    width={600}
                    height={450}
                    className="w-full h-auto"
                    priority
                  />
                  {/* Soft vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
                </div>

                {/* QR badge */}
                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-3 border border-gold/20">
                  <div className="flex items-center gap-2 text-xs text-bark/60">
                    <Image src="/images/icon-qr-scan.png" alt="" width={32} height={32} className="w-8 h-8" />
                    <span className="font-medium">Scan to listen!</span>
                  </div>
                </div>
              </div>

              {/* Background shadow pages */}
              <div className="absolute inset-0 -z-10 storybook-border bg-cream-dark transform rotate-3 translate-x-2 translate-y-2" />
              <div className="absolute inset-0 -z-20 storybook-border bg-cream transform rotate-5 translate-x-4 translate-y-4 opacity-60" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
