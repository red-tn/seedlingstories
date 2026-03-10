'use client';

import { motion } from 'framer-motion';
import { Shield, Heart, Leaf, CreditCard } from 'lucide-react';

const badges = [
  { icon: Shield, label: 'Theologically Grounded' },
  { icon: Leaf, label: 'Screen-Free Storytelling' },
  { icon: CreditCard, label: 'No Subscriptions' },
  { icon: Heart, label: 'Parent-Guided' },
];

export function TrustStrip() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
      className="relative bg-bark py-4 overflow-hidden"
    >
      {/* Subtle texture */}
      <div className="absolute inset-0 opacity-5 paper-texture" />

      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {badges.map((badge, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-cream/70"
            >
              <badge.icon className="w-4 h-4 text-gold" />
              <span className="text-sm font-medium tracking-wide">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
