'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const steps = [
  {
    image: '/images/icon-download.png',
    title: 'Print the Story',
    description: 'Purchase a pack on Etsy or Gumroad. Download and print the beautiful story pages, coloring sheets, and activity cards.',
    color: 'bg-seeds/10 text-seeds-dark',
    border: 'border-seeds/20',
  },
  {
    image: '/images/icon-qr-scan.png',
    title: 'Scan & Listen',
    description: 'Each pack includes a special QR code. Scan it with your phone to unlock exclusive audio narration and worship songs.',
    color: 'bg-sprouts/10 text-sprouts-dark',
    border: 'border-sprouts/20',
  },
  {
    image: '/images/icon-listen.png',
    title: 'Watch It Come Alive',
    description: 'Enjoy animated story videos, sing along with worship songs, and explore discussion questions together as a family.',
    color: 'bg-branches/10 text-branches-dark',
    border: 'border-branches/20',
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Subtle decorative shapes */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-seeds/3 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-sprouts/3 rounded-full translate-x-1/3 translate-y-1/3" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-gold uppercase tracking-widest mb-3">
            Not Just a Printable
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-bark mb-4">
            How It Works
          </h2>
          <p className="text-bark/60 text-lg max-w-xl mx-auto">
            From paper to phone in seconds &mdash; a multimedia Bible experience
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-20 left-[20%] right-[20%] h-px bg-gradient-to-r from-seeds/30 via-sprouts/30 to-branches/30" />

          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="text-center relative"
            >
              {/* Step Number */}
              <div className={`relative inline-flex items-center justify-center w-20 h-20 rounded-2xl ${step.color} border ${step.border} mb-6`}>
                <Image src={step.image} alt="" width={44} height={44} className="w-11 h-11" />
                <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white border-2 border-current flex items-center justify-center text-xs font-bold shadow-sm">
                  {i + 1}
                </div>
              </div>

              {/* Arrow (mobile) */}
              {i < steps.length - 1 && (
                <div className="md:hidden flex justify-center my-4">
                  <ArrowRight className="w-5 h-5 text-bark/20 rotate-90" />
                </div>
              )}

              <h3 className="font-display text-xl font-bold text-bark mb-3">
                {step.title}
              </h3>
              <p className="text-bark/60 text-sm leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
