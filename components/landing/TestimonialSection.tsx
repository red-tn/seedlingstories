'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    text: "My 4-year-old asks to 'read the God story' every single night. The QR code for audio narration is genius — she can listen while looking at the pictures herself.",
    author: 'Sarah M.',
    role: 'Mom of 3',
    rating: 5,
  },
  {
    text: "We use these packs for our Sunday School class. The kids love the coloring pages and the animated videos keep them engaged. Worth every penny!",
    author: 'Pastor James',
    role: 'Children\'s Ministry Director',
    rating: 5,
  },
  {
    text: "Finally, Bible stories that are beautiful AND theologically solid. My 8-year-old actually wants to do the discussion questions. That never happened before!",
    author: 'Rebecca T.',
    role: 'Homeschool Mom',
    rating: 5,
  },
];

export function TestimonialSection() {
  return (
    <section className="py-20 md:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-bark mb-4">
            Loved by Families
          </h2>
          <p className="text-bark/60 text-lg">
            Hear from parents and educators using Seedling Stories
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="relative bg-white rounded-2xl p-8 shadow-sm border border-gold/10 glow-card"
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-gold/20 mb-4" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-seeds fill-current" />
                ))}
              </div>

              {/* Text */}
              <p className="text-bark/70 text-sm leading-relaxed mb-6 italic">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/20 to-sprouts/20 flex items-center justify-center text-sm font-bold text-bark/40">
                  {t.author[0]}
                </div>
                <div>
                  <div className="text-sm font-semibold text-bark">{t.author}</div>
                  <div className="text-xs text-bark/40">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
