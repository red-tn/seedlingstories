'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { QrCode, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function RedeemPage() {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/redeem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code.trim() }),
      });

      if (!res.ok) {
        setError('Invalid code. Please check and try again.');
        setIsLoading(false);
        return;
      }

      // Code is valid — redirect to listen page
      router.push(`/listen/${code.trim()}`);
    } catch {
      setError('Something went wrong. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gold/10 mb-6">
            <QrCode className="w-8 h-8 text-gold" />
          </div>
          <h1 className="font-display text-3xl font-bold text-bark mb-3">
            Redeem Your Code
          </h1>
          <p className="text-bark/50">
            Enter the code from your Seedling Stories pack to unlock exclusive audio, video, and more.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="e.g. GOD-MADE-EVERYTHING"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setError('');
              }}
              className="text-center text-lg font-mono tracking-widest"
              required
              autoFocus
            />
          </div>

          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          <Button type="submit" className="w-full" size="lg" disabled={isLoading || !code.trim()}>
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                Unlock Content
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </form>

        <div className="mt-8 bg-cream-dark/50 rounded-2xl p-6 border border-gold/10">
          <h3 className="font-display text-sm font-bold text-bark mb-3">Where do I find my code?</h3>
          <div className="space-y-2 text-sm text-bark/50">
            <p>Your code is printed on the last page of your story pack PDF, right next to the QR code.</p>
            <p>It looks like this: <span className="font-mono text-bark bg-white px-2 py-0.5 rounded">GOD-MADE-EVERYTHING</span></p>
          </div>
        </div>

        <p className="text-center mt-6 text-sm text-bark/30">
          Don&apos;t have a pack yet?{' '}
          <a href="/packs" className="text-gold hover:text-gold-dark underline">
            Browse our collection
          </a>
        </p>
      </div>
    </div>
  );
}
