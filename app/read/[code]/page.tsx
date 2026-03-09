'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { InteractiveReader } from '@/components/stories/InteractiveReader';
import { Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { Pack, PackContent } from '@/lib/types/pack';

export default function ReadPage() {
  const params = useParams();
  const code = params.code as string;
  const [status, setStatus] = useState<'loading' | 'valid' | 'invalid'>('loading');
  const [pack, setPack] = useState<Pack | null>(null);
  const [content, setContent] = useState<PackContent | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!code) { setStatus('invalid'); return; }

    async function redeem() {
      try {
        const res = await fetch('/api/redeem', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code }),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          setError(data.error || 'Invalid code');
          setStatus('invalid');
          return;
        }

        const data = await res.json();
        setPack(data.pack);
        setContent(data.content);
        setStatus('valid');
      } catch {
        setError('Something went wrong. Please try again.');
        setStatus('invalid');
      }
    }

    redeem();
  }, [code]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bark">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-gold animate-spin mx-auto mb-4" />
          <p className="text-cream/50 font-display">Opening your story...</p>
        </div>
      </div>
    );
  }

  if (status === 'invalid' || !pack || !content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-center max-w-md mx-auto px-4">
          <AlertCircle className="w-12 h-12 text-seeds mx-auto mb-4" />
          <h1 className="font-display text-2xl font-bold text-bark mb-2">Story Not Found</h1>
          <p className="text-bark/50 mb-6">{error || "This code doesn't seem to be valid."}</p>
          <Button asChild>
            <Link href="/redeem">Try Another Code</Link>
          </Button>
        </div>
      </div>
    );
  }

  return <InteractiveReader pack={pack} content={content} />;
}
