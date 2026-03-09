'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { ETSY_SHOP_URL, GUMROAD_URL } from '@/lib/utils/constants';

export function StoreLinks() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-display text-2xl font-bold text-bark mb-2">
            Shop Our Packs
          </h2>
          <p className="text-bark/50 text-sm">
            Available on your favorite platforms
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <motion.a
            href={ETSY_SHOP_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-4 px-8 py-5 bg-[#F1641E]/5 border-2 border-[#F1641E]/20 rounded-2xl hover:border-[#F1641E]/40 transition-colors w-full sm:w-auto"
          >
            <div className="text-3xl">🏪</div>
            <div className="text-left">
              <div className="font-display font-bold text-bark">Shop on Etsy</div>
              <div className="text-xs text-bark/40">Browse our full collection</div>
            </div>
            <ExternalLink className="w-4 h-4 text-bark/30 ml-auto sm:ml-4" />
          </motion.a>

          <motion.a
            href={GUMROAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-4 px-8 py-5 bg-[#FF90E8]/5 border-2 border-[#FF90E8]/20 rounded-2xl hover:border-[#FF90E8]/40 transition-colors w-full sm:w-auto"
          >
            <div className="text-3xl">🛍️</div>
            <div className="text-left">
              <div className="font-display font-bold text-bark">Shop on Gumroad</div>
              <div className="text-xs text-bark/40">Instant digital delivery</div>
            </div>
            <ExternalLink className="w-4 h-4 text-bark/30 ml-auto sm:ml-4" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
