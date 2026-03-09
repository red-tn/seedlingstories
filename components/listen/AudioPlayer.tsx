'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { formatDuration } from '@/lib/utils/formatters';

interface AudioPlayerProps {
  src: string;
  title?: string;
  duration?: number;
}

export function AudioPlayer({ src, title, duration: initialDuration }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(initialDuration || 0);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const seek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const time = Number(e.target.value);
    audio.currentTime = time;
    setCurrentTime(time);
  }, []);

  const skip = useCallback((seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, Math.min(audio.currentTime + seconds, duration));
  }, [duration]);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  }, [isMuted]);

  const cycleSpeed = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const speeds = [0.75, 1, 1.25];
    const nextIndex = (speeds.indexOf(playbackRate) + 1) % speeds.length;
    const newRate = speeds[nextIndex];
    audio.playbackRate = newRate;
    setPlaybackRate(newRate);
  }, [playbackRate]);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="bg-white rounded-2xl border border-gold/10 p-5 shadow-sm">
      <audio ref={audioRef} src={src} preload="metadata" />

      {title && (
        <div className="text-sm font-semibold text-bark mb-3 truncate">{title}</div>
      )}

      {/* Progress bar */}
      <div className="relative mb-3">
        <input
          type="range"
          min={0}
          max={duration || 100}
          value={currentTime}
          onChange={seek}
          className="audio-range w-full cursor-pointer"
          style={{
            background: `linear-gradient(to right, #C9963B ${progress}%, #F5EDE0 ${progress}%)`,
          }}
        />
      </div>

      {/* Time display */}
      <div className="flex justify-between text-xs text-bark/40 mb-3">
        <span>{formatDuration(Math.floor(currentTime))}</span>
        <span>{formatDuration(Math.floor(duration))}</span>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3">
        <button onClick={toggleMute} className="p-2 text-bark/40 hover:text-bark transition-colors cursor-pointer">
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        <button onClick={() => skip(-10)} className="p-2 text-bark/40 hover:text-bark transition-colors cursor-pointer">
          <SkipBack className="w-5 h-5" />
        </button>

        <button
          onClick={togglePlay}
          className="w-12 h-12 rounded-full bg-gold text-white flex items-center justify-center hover:bg-gold-dark transition-colors shadow-md cursor-pointer"
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
        </button>

        <button onClick={() => skip(10)} className="p-2 text-bark/40 hover:text-bark transition-colors cursor-pointer">
          <SkipForward className="w-5 h-5" />
        </button>

        <button
          onClick={cycleSpeed}
          className="p-2 text-xs font-bold text-bark/40 hover:text-bark transition-colors min-w-[40px] cursor-pointer"
        >
          {playbackRate}x
        </button>
      </div>
    </div>
  );
}
