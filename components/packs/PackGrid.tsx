'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Pack } from '@/lib/types/pack';
import type { AgeTier } from '@/lib/utils/age-tiers';
import { PackCard } from './PackCard';
import { AgeFilter } from './AgeFilter';

interface PackGridProps {
  packs: Pack[];
}

export function PackGrid({ packs }: PackGridProps) {
  const [filter, setFilter] = useState<AgeTier | 'all'>('all');

  const filtered = filter === 'all' ? packs : packs.filter((p) => p.age_tier === filter);

  return (
    <div>
      <div className="mb-10">
        <AgeFilter selected={filter} onChange={setFilter} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((pack, i) => (
            <motion.div
              key={pack.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <PackCard pack={pack} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <div className="text-4xl mb-4">🌱</div>
          <p className="text-bark/40 font-display text-lg">
            More packs coming soon for this age group!
          </p>
        </div>
      )}
    </div>
  );
}
