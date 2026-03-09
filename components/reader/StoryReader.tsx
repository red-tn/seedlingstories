'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Home, BookOpen } from 'lucide-react';
import Link from 'next/link';
import type { PageNarration } from '@/lib/types/pack';
import type { AgeTier } from '@/lib/utils/age-tiers';
import { AGE_TIERS } from '@/lib/utils/age-tiers';

interface StoryReaderProps {
  title: string;
  ageTier: AgeTier;
  pages: PageNarration[];
}

export function StoryReader({ title, ageTier, pages }: StoryReaderProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);

  const tierInfo = AGE_TIERS[ageTier];

  const goToPage = useCallback((index: number) => {
    setDirection(index > currentPage ? 1 : -1);
    setCurrentPage(index);
  }, [currentPage]);

  const nextPage = useCallback(() => {
    if (currentPage < pages.length - 1) goToPage(currentPage + 1);
  }, [currentPage, pages.length, goToPage]);

  const prevPage = useCallback(() => {
    if (currentPage > 0) goToPage(currentPage - 1);
  }, [currentPage, goToPage]);

  const page = pages[currentPage];
  if (!page) return null;

  // Text size based on age tier
  const textSizeClass = ageTier === 'seeds' ? 'text-2xl leading-loose' :
                        ageTier === 'sprouts' ? 'text-xl leading-relaxed' :
                        ageTier === 'branches' ? 'text-lg leading-relaxed' :
                        'text-base leading-relaxed';

  // Touch target size
  const buttonSize = ageTier === 'seeds' ? 'w-16 h-16' :
                     ageTier === 'sprouts' ? 'w-14 h-14' :
                     'w-12 h-12';

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gold/10 px-4 py-3 flex items-center justify-between z-20">
        <Link href="/packs" className="p-2 text-bark/40 hover:text-bark transition-colors">
          <Home className="w-5 h-5" />
        </Link>
        <div className="text-center">
          <div className="font-display text-sm font-bold text-bark">{title}</div>
          <div className="text-xs text-bark/40">
            Page {currentPage + 1} of {pages.length}
          </div>
        </div>
        <div className="p-2">
          <BookOpen className="w-5 h-5 text-bark/20" />
        </div>
      </header>

      {/* Page Content */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentPage}
            custom={direction}
            initial={{ opacity: 0, x: direction * 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -100 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute inset-0 flex flex-col"
          >
            {/* Illustration */}
            <div
              className="flex-1 min-h-0 flex items-center justify-center p-6"
              style={{ backgroundColor: tierInfo.colorLight }}
            >
              <div className="text-center">
                <div className="text-8xl mb-4">
                  {currentPage === 0 ? '🌅' :
                   currentPage === 1 ? '🌊' :
                   currentPage === 2 ? '🌸' :
                   currentPage === 3 ? '⭐' :
                   currentPage === 4 ? '🐠' :
                   currentPage === 5 ? '🦁' : '🌈'}
                </div>
                <p className="font-display text-bark/20 text-sm italic">
                  {page.title}
                </p>
              </div>
            </div>

            {/* Text */}
            <div className="bg-white p-6 sm:p-10 shadow-inner">
              <p className={`font-body text-bark text-center max-w-2xl mx-auto ${textSizeClass}`}>
                {page.text}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {currentPage > 0 && (
          <button
            onClick={prevPage}
            className={`absolute left-3 top-1/2 -translate-y-1/2 ${buttonSize} rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center text-bark/60 hover:text-bark hover:bg-white transition-all z-10 cursor-pointer`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
        {currentPage < pages.length - 1 && (
          <button
            onClick={nextPage}
            className={`absolute right-3 top-1/2 -translate-y-1/2 ${buttonSize} rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center text-bark/60 hover:text-bark hover:bg-white transition-all z-10 cursor-pointer`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Progress Bar */}
      <div className="bg-white px-4 py-3 border-t border-gold/10">
        <div className="flex gap-1.5 max-w-md mx-auto">
          {pages.map((_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i)}
              className={`flex-1 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                i === currentPage
                  ? 'bg-gold'
                  : i < currentPage
                  ? 'bg-gold/30'
                  : 'bg-bark/10'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
