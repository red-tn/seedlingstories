import type { Metadata } from 'next';
import Image from 'next/image';
import { Heart, BookOpen, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About',
  description: 'Seedling Stories plants God\'s Word in little hearts through beautiful, interactive Bible story packs.',
};

const GROWTH_STAGES = [
  { icon: '/images/tier-seeds.png', name: 'Seeds', age: '2–4', desc: 'Planting the first seeds of faith — God made me, God loves me.' },
  { icon: '/images/tier-sprouts.png', name: 'Sprouts', age: '4–6', desc: 'Growing in wonder — learning key Bible stories and kindness.' },
  { icon: '/images/tier-branches.png', name: 'Branches', age: '6–9', desc: 'Reaching outward — character studies, parables, and application.' },
  { icon: '/images/tier-roots.png', name: 'Roots', age: '9–12', desc: 'Going deeper — theology, apologetics, and personal reflection.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-white border-b border-gold/10 py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 bg-seeds/5 rounded-full blur-2xl" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-sprouts/5 rounded-full blur-2xl" />
        </div>
        <div className="max-w-3xl mx-auto px-4 relative">
          <Image src="/images/logo-icon.png" alt="" width={56} height={56} className="w-14 h-14 mx-auto mb-6" />
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-bark mb-6">
            About Seedling Stories
          </h1>
          <p className="text-bark/60 text-xl leading-relaxed">
            We believe that the stories of the Bible are the most important stories
            a child will ever hear. Our mission is to make those stories
            <em className="text-gold"> beautiful, accessible, and unforgettable</em>.
          </p>
        </div>
      </section>

      {/* The Name */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-3xl font-bold text-bark mb-6">
            Why &ldquo;Seedling Stories&rdquo;?
          </h2>
          <p className="text-bark/60 text-lg leading-relaxed mb-8">
            A seedling is a young plant, just beginning to grow. When we share God&apos;s Word
            with children, we&apos;re planting seeds of faith in their hearts &mdash; seeds that
            will grow into deep roots, strong branches, and beautiful fruit throughout their lives.
          </p>
          <div className="storybook-border bg-gradient-to-br from-gold/5 to-sprouts-light/30 p-8 text-center">
            <p className="font-display text-xl font-bold text-bark italic leading-relaxed">
              &ldquo;Train up a child in the way he should go: and when he is old,
              he will not depart from it.&rdquo;
            </p>
            <p className="text-sm text-bark/40 mt-3 font-semibold">&mdash; Proverbs 22:6</p>
          </div>
        </div>
      </section>

      {/* Growth Stages */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-3xl font-bold text-bark text-center mb-12">
            Growing Together
          </h2>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-seeds via-sprouts via-branches to-roots hidden sm:block" />

            <div className="space-y-10">
              {GROWTH_STAGES.map((stage, i) => (
                <div key={stage.name} className="flex gap-6 items-start">
                  <div className="w-16 h-16 rounded-2xl bg-cream border-2 border-gold/20 flex items-center justify-center shrink-0 relative z-10">
                    <Image src={stage.icon} alt={stage.name} width={44} height={44} className="w-11 h-11" />
                  </div>
                  <div className="pt-2">
                    <h3 className="font-display text-xl font-bold text-bark">
                      {stage.name}
                      <span className="text-sm font-normal text-bark/40 ml-2">Ages {stage.age}</span>
                    </h3>
                    <p className="text-bark/60 mt-1">{stage.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-3xl font-bold text-bark text-center mb-12">
            What We Believe
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { icon: BookOpen, title: 'Scripture-Centered', desc: 'Every story is rooted in the Bible. We preserve theological integrity while making stories age-appropriate.' },
              { icon: Heart, title: 'Made with Love', desc: 'Each pack is carefully crafted with beautiful illustrations, gentle narration, and thoughtful activities.' },
              { icon: Sparkles, title: 'Faith-Forming', desc: 'We don\'t just tell stories — we create experiences that plant God\'s Word deep in a child\'s heart.' },
            ].map((value) => (
              <div key={value.title} className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gold/10 mb-4">
                  <value.icon className="w-7 h-7 text-gold" />
                </div>
                <h3 className="font-display text-lg font-bold text-bark mb-2">{value.title}</h3>
                <p className="text-bark/50 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
