'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FileText, BookOpen, Sparkles, Eye } from 'lucide-react';

const steps = [
  { key: 'metadata', label: 'Metadata', icon: FileText },
  { key: 'pages', label: 'Pages', icon: BookOpen },
  { key: 'extras', label: 'Extras', icon: Sparkles },
  { key: 'preview', label: 'Preview & PDF', icon: Eye },
];

export function StepNav({ packId }: { packId: string }) {
  const pathname = usePathname();
  const currentStep = steps.findIndex((s) => pathname.endsWith(`/${s.key}`));

  return (
    <div className="flex items-center gap-1 bg-white rounded-xl border border-gold/10 p-1.5">
      {steps.map((step, i) => {
        const active = pathname.endsWith(`/${step.key}`);
        const completed = i < currentStep;
        return (
          <Link
            key={step.key}
            href={`/admin/packs/${packId}/${step.key}`}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              active
                ? 'bg-gold text-bark shadow-sm'
                : completed
                ? 'text-gold hover:bg-gold/5'
                : 'text-bark/40 hover:text-bark/60 hover:bg-cream/50'
            }`}
          >
            <step.icon className="w-4 h-4" />
            <span className="hidden sm:inline">{step.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
