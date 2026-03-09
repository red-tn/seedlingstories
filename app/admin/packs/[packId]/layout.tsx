'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { StepNav } from '@/components/admin/StepNav';
import { ArrowLeft, Loader2 } from 'lucide-react';
import type { Pack } from '@/lib/types/pack';

export default function PackWizardLayout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const packId = params.packId as string;
  const [pack, setPack] = useState<Pack | null>(null);

  useEffect(() => {
    fetch(`/api/admin/packs/${packId}`)
      .then((r) => r.json())
      .then((data) => setPack(data.pack))
      .catch(() => {});
  }, [packId]);

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/admin"
          className="text-bark/40 hover:text-bark transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <h1 className="font-display text-2xl font-bold text-bark">
            {pack ? pack.title : <Loader2 className="w-5 h-5 animate-spin inline" />}
          </h1>
          {pack?.subtitle && <p className="text-bark/40 text-sm">{pack.subtitle}</p>}
        </div>
      </div>

      {/* Step navigation */}
      <div className="mb-6">
        <StepNav packId={packId} />
      </div>

      {/* Step content */}
      {children}
    </div>
  );
}
