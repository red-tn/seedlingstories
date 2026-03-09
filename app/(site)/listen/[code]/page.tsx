'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { UnlockedContent } from '@/components/listen/UnlockedContent';
import { Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { Pack, PackContent } from '@/lib/types/pack';

export default function ListenPage() {
  const params = useParams();
  const code = params.code as string;
  const [status, setStatus] = useState<'loading' | 'valid' | 'invalid'>('loading');
  const [data, setData] = useState<{ pack: Pack; content: PackContent } | null>(null);

  useEffect(() => {
    async function redeem() {
      try {
        const res = await fetch('/api/redeem', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code }),
        });

        if (!res.ok) {
          setStatus('invalid');
          return;
        }

        const json = await res.json();
        setData({ pack: json.pack, content: json.content });
        setStatus('valid');
      } catch {
        setStatus('invalid');
      }
    }

    if (code) {
      redeem();
    } else {
      setStatus('invalid');
    }
  }, [code]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-gold animate-spin mx-auto mb-4" />
          <p className="text-bark/50 font-display">Unlocking your content...</p>
        </div>
      </div>
    );
  }

  if (status === 'invalid' || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-center max-w-md mx-auto px-4">
          <AlertCircle className="w-12 h-12 text-seeds mx-auto mb-4" />
          <h1 className="font-display text-2xl font-bold text-bark mb-2">
            Code Not Found
          </h1>
          <p className="text-bark/50 mb-6">
            This code doesn&apos;t seem to be valid. Please check your code and try again.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="secondary" asChild>
              <Link href="/redeem">Try Another Code</Link>
            </Button>
            <Button asChild>
              <Link href="/packs">Browse Packs</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return <UnlockedContent pack={data.pack} content={data.content} />;
}
