'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, CheckCircle2, Loader2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function EmailCapture() {
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
        body: JSON.stringify({ email, source: 'homepage' }),
      });
      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream to-seeds-light/30" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gold/10 mb-6">
            <Gift className="w-8 h-8 text-gold" />
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-bold text-bark mb-4">
            Get a FREE Bible Story Pack
          </h2>
          <p className="text-bark/60 text-lg mb-8">
            Sign up and receive our &ldquo;7 Days of Creation&rdquo; mini pack &mdash;
            complete with story pages, coloring sheets, and audio narration.
          </p>

          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-sprouts-light/50 rounded-2xl p-8 border border-sprouts/20"
            >
              <CheckCircle2 className="w-12 h-12 text-sprouts mx-auto mb-4" />
              <h3 className="font-display text-xl font-bold text-bark mb-2">
                Check your inbox!
              </h3>
              <p className="text-bark/60 text-sm">
                Your free pack is on its way. Look for an email from Seedling Stories.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
              />
              <Button type="submit" size="lg" disabled={status === 'loading'}>
                {status === 'loading' ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Me the Pack
                  </>
                )}
              </Button>
            </form>
          )}

          {status === 'error' && (
            <p className="mt-3 text-sm text-red-500">
              Something went wrong. Please try again.
            </p>
          )}

          <p className="mt-4 text-xs text-bark/30">
            No spam, ever. Just occasional new pack announcements.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
