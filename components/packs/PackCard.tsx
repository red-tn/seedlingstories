'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Eye, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AgeBadge } from '@/components/shared/AgeBadge';
import { PACK_INCLUDES_ICONS } from '@/lib/utils/constants';
import type { Pack } from '@/lib/types/pack';
import { AGE_TIERS } from '@/lib/utils/age-tiers';

interface PackCardProps {
  pack: Pack;
}

export function PackCard({ pack }: PackCardProps) {
  const tierInfo = AGE_TIERS[pack.age_tier];

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group bg-white rounded-2xl border border-gold/10 overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500"
    >
      {/* Cover Image */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${tierInfo.colorLight} 0%, ${tierInfo.color}15 50%, ${tierInfo.colorLight} 100%)`,
          }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <div className="mb-4 group-hover:scale-110 transition-transform duration-500">
              <Image
                src={AGE_TIERS[pack.age_tier].icon}
                alt={AGE_TIERS[pack.age_tier].label}
                width={72}
                height={72}
                className="w-18 h-18 mx-auto"
              />
            </div>
            <h3 className="font-display text-xl font-bold text-bark/80 mb-1">
              {pack.title}
            </h3>
            {pack.subtitle && (
              <p className="text-sm text-bark/40 italic">{pack.subtitle}</p>
            )}
          </div>
        </div>

        {/* Free badge */}
        {pack.is_free && (
          <div className="absolute top-3 right-3 bg-sprouts text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            FREE
          </div>
        )}

        {/* Series tag */}
        {pack.series_name && (
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-bark/60 text-xs font-medium px-3 py-1 rounded-full">
            {pack.series_name}
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-bark/0 group-hover:bg-bark/5 transition-colors duration-500" />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Age + Scripture */}
        <div className="flex items-center justify-between mb-3">
          <AgeBadge tier={pack.age_tier} size="sm" />
          {pack.scripture_refs && pack.scripture_refs.length > 0 && (
            <span className="text-xs text-bark/40 italic">
              {pack.scripture_refs[0]}
            </span>
          )}
        </div>

        {/* Includes preview */}
        <div className="flex gap-1.5 mb-4 flex-wrap">
          {pack.includes.slice(0, 4).map((item, i) => (
            <Image
              key={i}
              src={PACK_INCLUDES_ICONS[item.type] || '/images/icon-download-alt.png'}
              alt={item.label}
              width={20}
              height={20}
              className="w-5 h-5"
              title={item.label}
            />
          ))}
          {pack.includes.length > 4 && (
            <span className="text-xs text-bark/30">+{pack.includes.length - 4}</span>
          )}
        </div>

        {/* Price + Actions */}
        <div className="flex items-center justify-between">
          <span className="font-display text-lg font-bold text-bark">
            {pack.is_free ? 'Free' : pack.price_display}
          </span>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/packs/${pack.slug}`}>
                <Eye className="w-3.5 h-3.5" />
                Preview
              </Link>
            </Button>
            <Button size="sm" asChild>
              <a href={pack.etsy_url || '#'} target="_blank" rel="noopener noreferrer">
                <ShoppingBag className="w-3.5 h-3.5" />
                Buy
              </a>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
