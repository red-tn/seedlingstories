import Image from 'next/image';
import { PACK_INCLUDES_ICONS } from '@/lib/utils/constants';
import type { PackInclude } from '@/lib/types/pack';

interface PackIncludesProps {
  includes: PackInclude[];
}

export function PackIncludes({ includes }: PackIncludesProps) {
  return (
    <div className="space-y-3">
      <h3 className="font-display text-lg font-bold text-bark">What&apos;s Included</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {includes.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 bg-cream/50 rounded-xl px-4 py-3 border border-gold/5"
          >
            <Image
              src={PACK_INCLUDES_ICONS[item.type] || '/images/icon-download-alt.png'}
              alt=""
              width={24}
              height={24}
              className="w-6 h-6 shrink-0"
            />
            <span className="text-sm text-bark/70">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
