'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, Play, Pause, Music,
  MessageCircle, Sparkles, Volume2, VolumeX, X,
  ArrowLeft, Library,
} from 'lucide-react';
import type { Pack, PackContent } from '@/lib/types/pack';

interface StoryPage {
  page: number;
  title: string;
  bible_ref?: string;
  image_url: string;
  text: string;
  narration_url?: string;
}

interface InteractiveReaderProps {
  pack: Pack;
  content: PackContent;
}

export function InteractiveReader({ pack, content }: InteractiveReaderProps) {
  const pages: StoryPage[] = (content.page_narrations as unknown as StoryPage[]) || [];
  const [currentPage, setCurrentPage] = useState(0);
  const [showSong, setShowSong] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [direction, setDirection] = useState(0);

  // Per-page narration audio state
  const narrationRef = useRef<HTMLAudioElement>(null);
  const [narrationPlaying, setNarrationPlaying] = useState(false);
  const [narrationProgress, setNarrationProgress] = useState(0);
  const [narrationDuration, setNarrationDuration] = useState(0);

  // Song state
  const songRef = useRef<HTMLAudioElement>(null);
  const [songPlaying, setSongPlaying] = useState(false);
  const [songProgress, setSongProgress] = useState(0);
  const [songDuration, setSongDuration] = useState(0);

  const page = pages[currentPage];
  const totalPages = pages.length;
  const isCover = currentPage === 0;

  const goToPage = useCallback((n: number) => {
    if (n < 0 || n >= totalPages) return;
    setDirection(n > currentPage ? 1 : -1);
    setCurrentPage(n);
    // Stop narration when changing pages
    setNarrationPlaying(false);
    setNarrationProgress(0);
    setNarrationDuration(0);
  }, [currentPage, totalPages]);

  const nextPage = useCallback(() => goToPage(currentPage + 1), [currentPage, goToPage]);
  const prevPage = useCallback(() => goToPage(currentPage - 1), [currentPage, goToPage]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); nextPage(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); prevPage(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [nextPage, prevPage]);

  // Touch swipe
  const touchStartX = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? nextPage() : prevPage(); }
  };

  // Per-page narration handlers
  const toggleNarration = () => {
    if (!narrationRef.current) return;
    if (narrationPlaying) {
      narrationRef.current.pause();
    } else {
      narrationRef.current.play();
    }
    setNarrationPlaying(!narrationPlaying);
  };

  // Stop and reset narration audio when page changes
  useEffect(() => {
    const audio = narrationRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [currentPage]);

  useEffect(() => {
    const audio = narrationRef.current;
    if (!audio) return;
    const onTime = () => { setNarrationProgress(audio.currentTime); setNarrationDuration(audio.duration || 0); };
    const onEnd = () => { setNarrationPlaying(false); setNarrationProgress(0); };
    const onLoaded = () => { setNarrationDuration(audio.duration || 0); };
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('ended', onEnd);
    audio.addEventListener('loadedmetadata', onLoaded);
    return () => {
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('ended', onEnd);
      audio.removeEventListener('loadedmetadata', onLoaded);
    };
  }, []);

  // Song audio handlers
  const toggleSongPlay = () => {
    if (!songRef.current) return;
    if (songPlaying) { songRef.current.pause(); }
    else { songRef.current.play(); }
    setSongPlaying(!songPlaying);
  };

  useEffect(() => {
    const song = songRef.current;
    if (!song) return;
    const onTime = () => { setSongProgress(song.currentTime); setSongDuration(song.duration || 0); };
    const onEnd = () => setSongPlaying(false);
    song.addEventListener('timeupdate', onTime);
    song.addEventListener('ended', onEnd);
    return () => { song.removeEventListener('timeupdate', onTime); song.removeEventListener('ended', onEnd); };
  }, []);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  // Page animation variants
  const pageVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0, scale: 0.95 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0, scale: 0.95 }),
  };

  if (!page) return null;

  return (
    <div className="min-h-screen bg-bark flex flex-col">
      {/* Hidden audio elements */}
      {content.song_url && (
        <audio ref={songRef} src={content.song_url} preload="metadata" />
      )}
      {page.narration_url && (
        <audio ref={narrationRef} src={page.narration_url} preload="metadata" key={`narration-${currentPage}`} />
      )}

      {/* Top navigation bar */}
      <div className="bg-bark-dark/80 backdrop-blur-sm border-b border-cream/10 z-30">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            href="/packs"
            className="flex items-center gap-2 text-cream/60 hover:text-cream transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Books</span>
          </Link>

          <h1 className="font-display text-sm sm:text-base font-semibold text-cream/80 truncate max-w-[200px] sm:max-w-none">
            {pack.title}
          </h1>

          <div className="flex items-center gap-2">
            <Link
              href="/packs"
              className="flex items-center gap-1.5 text-cream/50 hover:text-cream transition-colors text-xs"
            >
              <Library className="w-4 h-4" />
              <span className="hidden sm:inline">Library</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main reader area */}
      <div
        className="flex-1 relative flex items-center justify-center px-4 py-6 md:py-10"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Left arrow */}
        {currentPage > 0 && (
          <button
            onClick={prevPage}
            className="absolute left-2 md:left-6 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-cream/70 hover:text-cream hover:bg-white/20 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Right arrow */}
        {currentPage < totalPages - 1 && (
          <button
            onClick={nextPage}
            className="absolute right-2 md:right-6 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-cream/70 hover:text-cream hover:bg-white/20 transition-all cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Book */}
        <div className="w-full max-w-2xl mx-auto">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentPage}
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="bg-cream rounded-2xl shadow-2xl overflow-hidden"
              style={{ boxShadow: '0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,150,59,0.2)' }}
            >
              {isCover ? (
                /* COVER PAGE */
                <div className="relative">
                  <div className="aspect-square relative">
                    <Image
                      src={page.image_url}
                      alt={page.title}
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/20 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
                    <div className="h-0.5 w-32 bg-gold mx-auto mb-4" />
                    <h1 className="font-display text-3xl sm:text-4xl font-bold text-bark leading-tight mb-2">
                      GOD MADE<br />EVERYTHING!
                    </h1>
                    <p className="font-display text-lg text-gold italic">The Seven Days of Creation</p>
                    <p className="text-bark/40 text-sm mt-2">Genesis 1:1 – 2:3</p>
                    <p className="text-bark/30 text-xs mt-4">Tap or swipe to begin →</p>
                  </div>
                </div>
              ) : (
                /* STORY PAGES */
                <div>
                  {/* Illustration with voiceover button */}
                  <div className="relative aspect-square">
                    <Image
                      src={page.image_url}
                      alt={page.title}
                      fill
                      className="object-cover"
                      priority
                    />

                    {/* Voiceover button - bottom right of image */}
                    {page.narration_url && (
                      <div className="absolute bottom-3 right-3 z-10 flex items-center gap-2">
                        {/* Mini progress bar (visible when playing) */}
                        {narrationPlaying && narrationDuration > 0 && (
                          <div className="bg-black/40 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-2">
                            <div className="w-16 h-1 bg-white/20 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gold rounded-full transition-all"
                                style={{ width: `${(narrationProgress / narrationDuration) * 100}%` }}
                              />
                            </div>
                            <span className="text-white/60 text-[10px] tabular-nums">
                              {formatTime(narrationProgress)}
                            </span>
                          </div>
                        )}
                        <button
                          onClick={toggleNarration}
                          className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all cursor-pointer ${
                            narrationPlaying
                              ? 'bg-gold text-bark hover:bg-gold/90'
                              : 'bg-black/40 backdrop-blur-sm text-white/80 hover:bg-black/60 hover:text-white'
                          }`}
                          title={narrationPlaying ? 'Pause narration' : 'Listen to this page'}
                        >
                          {narrationPlaying ? <Pause className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Text panel */}
                  <div className="p-6 sm:p-8 border-t-2 border-gold/20">
                    <h2 className="font-display text-xl sm:text-2xl font-bold text-bark mb-1">
                      {page.title}
                    </h2>
                    {page.bible_ref && (
                      <p className="text-gold text-xs sm:text-sm italic mb-3">
                        Read it in your Bible: {page.bible_ref}
                      </p>
                    )}
                    <div className="text-bark/70 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                      {page.text?.replace(/\\n/g, '\n')}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-bark-dark border-t border-cream/10">
        {/* Page indicator dots */}
        <div className="flex justify-center gap-1.5 pt-3 pb-2">
          {pages.map((_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                i === currentPage ? 'w-6 bg-gold' : 'w-1.5 bg-cream/20 hover:bg-cream/40'
              }`}
            />
          ))}
        </div>

        {/* Controls */}
        <div className="max-w-2xl mx-auto px-4 pb-4 flex items-center justify-between">
          <span className="text-cream/40 text-xs font-medium">
            {currentPage === 0 ? 'Cover' : `Page ${currentPage} of ${totalPages - 1}`}
          </span>

          <div className="flex items-center gap-2">
            {/* Song button */}
            {content.song_url && (
              <button
                onClick={() => { setShowSong(!showSong); setShowQuestions(false); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  showSong ? 'bg-gold text-bark' : 'bg-cream/10 text-cream/60 hover:text-cream hover:bg-cream/20'
                }`}
              >
                <Music className="w-3.5 h-3.5" />
                Song
              </button>
            )}

            {/* Discussion button */}
            {content.discussion_questions && content.discussion_questions.length > 0 && (
              <button
                onClick={() => { setShowQuestions(!showQuestions); setShowSong(false); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  showQuestions ? 'bg-gold text-bark' : 'bg-cream/10 text-cream/60 hover:text-cream hover:bg-cream/20'
                }`}
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Discuss
              </button>
            )}
          </div>

          <span className="text-cream/30 text-xs">
            {pack.title}
          </span>
        </div>
      </div>

      {/* Song panel overlay */}
      <AnimatePresence>
        {showSong && content.song_url && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-30 bg-bark border-t border-gold/20 shadow-2xl"
          >
            <div className="max-w-2xl mx-auto p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-display text-lg font-bold text-cream flex items-center gap-2">
                    <Music className="w-5 h-5 text-gold" />
                    {content.song_title || 'Worship Song'}
                  </h3>
                  <p className="text-cream/40 text-xs mt-0.5">Sing along!</p>
                </div>
                <button
                  onClick={() => setShowSong(false)}
                  className="text-cream/40 hover:text-cream transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Song player */}
              <div className="flex items-center gap-3 mb-4">
                <button
                  onClick={toggleSongPlay}
                  className="w-10 h-10 rounded-full bg-gold flex items-center justify-center text-bark shrink-0 hover:bg-gold-dark transition-colors cursor-pointer"
                >
                  {songPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>
                <div className="flex-1">
                  <div className="h-1.5 bg-cream/10 rounded-full overflow-hidden cursor-pointer"
                    onClick={(e) => {
                      if (!songRef.current || !songDuration) return;
                      const rect = e.currentTarget.getBoundingClientRect();
                      songRef.current.currentTime = ((e.clientX - rect.left) / rect.width) * songDuration;
                    }}
                  >
                    <div
                      className="h-full bg-gold rounded-full transition-all"
                      style={{ width: songDuration ? `${(songProgress / songDuration) * 100}%` : '0%' }}
                    />
                  </div>
                </div>
                <span className="text-cream/40 text-xs tabular-nums">
                  {formatTime(songProgress)} / {formatTime(songDuration)}
                </span>
              </div>

              {/* Lyrics */}
              {content.song_lyrics && (
                <div className="bg-cream/5 rounded-xl p-4 max-h-40 overflow-y-auto">
                  <p className="text-cream/60 text-sm leading-relaxed whitespace-pre-line">
                    {content.song_lyrics}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Discussion panel overlay */}
      <AnimatePresence>
        {showQuestions && content.discussion_questions && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-30 bg-bark border-t border-gold/20 shadow-2xl"
          >
            <div className="max-w-2xl mx-auto p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-lg font-bold text-cream flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-branches" />
                  Talk About It Together
                </h3>
                <button
                  onClick={() => setShowQuestions(false)}
                  className="text-cream/40 hover:text-cream transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 max-h-60 overflow-y-auto">
                {content.discussion_questions.map((q, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-branches/20 text-branches text-xs font-bold flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <p className="text-cream/70 text-sm pt-0.5">{q}</p>
                  </div>
                ))}
              </div>

              {/* Memory verse */}
              {content.memory_verse && (
                <div className="mt-4 pt-4 border-t border-cream/10 text-center">
                  <Sparkles className="w-5 h-5 text-gold mx-auto mb-2" />
                  <p className="font-display text-base font-bold text-cream italic">
                    &ldquo;{content.memory_verse}&rdquo;
                  </p>
                  {content.memory_verse_ref && (
                    <p className="text-cream/40 text-xs mt-1">— {content.memory_verse_ref}</p>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
