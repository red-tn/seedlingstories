'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Gift, CheckCircle2, Loader2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const FREE_PACK_INCLUDES = [
  { image: '/images/icon-read.png', label: '4 illustrated story pages' },
  { image: '/images/icon-download.png', label: '3 coloring pages' },
  { image: '/images/icon-listen.png', label: 'Audio narration' },
  { image: '/images/icon-verse.png', label: 'Memory verse card' },
];

export default function FreePage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'free-page' }),
      });
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Pack Preview */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="storybook-border bg-white p-6 relative">
              <div className="absolute -top-3 -right-3 bg-sprouts text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md">
                100% FREE
              </div>

              <div className="aspect-[3/4] rounded-xl bg-gradient-to-br from-seeds-light via-cream to-sprouts-light flex items-center justify-center relative">
                <div className="text-center px-6">
                  <Image src="/images/hero-child-meditation.png" alt="Free Bible story pack" width={300} height={400} className="mx-auto rounded-lg mb-4" />
                  <p className="font-display text-xl font-bold text-bark/40">
                    7 Days of Creation
                  </p>
                  <p className="text-sm text-bark/25 italic mt-1">Mini Pack</p>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                {FREE_PACK_INCLUDES.map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <Image src={item.image} alt="" width={18} height={18} className="w-4.5 h-4.5" />
                    <span className="text-sm text-bark/60">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 bg-gold/10 text-gold-dark px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Gift className="w-4 h-4" />
              Free Download
            </div>

            <h1 className="font-display text-3xl sm:text-4xl font-bold text-bark mb-4 leading-tight">
              Get Your Free<br />
              <span className="text-golden">Bible Story Pack</span>
            </h1>

            <p className="text-bark/60 text-lg mb-8 leading-relaxed">
              Start your Seedling Stories journey with our &ldquo;7 Days of Creation&rdquo;
              mini pack. Beautiful illustrations, audio narration, and coloring pages &mdash;
              completely free.
            </p>

            {status === 'success' ? (
              <div className="bg-sprouts-light/50 rounded-2xl p-8 border border-sprouts/20">
                <CheckCircle2 className="w-12 h-12 text-sprouts mb-4" />
                <h3 className="font-display text-xl font-bold text-bark mb-2">
                  Check your inbox!
                </h3>
                <p className="text-bark/60 text-sm">
                  Your free pack is on its way. Look for an email from Seedling Stories with your download link.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="text-base"
                />
                <Button type="submit" size="xl" className="w-full" disabled={status === 'loading'}>
                  {status === 'loading' ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Me the Free Pack
                    </>
                  )}
                </Button>
                {status === 'error' && (
                  <p className="text-sm text-red-500">Something went wrong. Please try again.</p>
                )}
                <p className="text-xs text-bark/30 text-center">
                  No spam, ever. Just occasional new pack announcements.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
