'use client';

import Image from 'next/image';
import { AGE_TIERS, AGE_TIER_ORDER, type AgeTier } from '@/lib/utils/age-tiers';

interface AgeFilterProps {
  selected: AgeTier | 'all';
  onChange: (tier: AgeTier | 'all') => void;
}

export function AgeFilter({ selected, onChange }: AgeFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <button
        onClick={() => onChange('all')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
          selected === 'all'
            ? 'bg-bark text-cream shadow-sm'
            : 'bg-white text-bark/60 border border-bark/10 hover:border-bark/20'
        }`}
      >
        All Ages
      </button>
      {AGE_TIER_ORDER.map((tier) => {
        const info = AGE_TIERS[tier];
        const isActive = selected === tier;
        return (
          <button
            key={tier}
            onClick={() => onChange(tier)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
              isActive
                ? 'text-white shadow-sm'
                : 'bg-white text-bark/60 border border-bark/10 hover:border-bark/20'
            }`}
            style={isActive ? { backgroundColor: info.color } : {}}
          >
            <Image src={info.icon} alt="" width={20} height={20} className="w-5 h-5 inline-block mr-1" />
            {info.label} ({info.ageRange})
          </button>
        );
      })}
    </div>
  );
}
