import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Home, Church, Lightbulb, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'For Parents',
  description: 'Resources for parents using Seedling Stories — discussion guides, homeschool ideas, and Sunday School curriculum tips.',
};

const USAGE_IDEAS = [
  {
    icon: Home,
    title: 'Bedtime Devotions',
    desc: 'Print the story pages and read them together before bed. Scan the QR code for the audio narration — your child can listen and look at the pictures as they drift off to sleep.',
    color: 'bg-seeds/10 text-seeds-dark',
  },
  {
    icon: BookOpen,
    title: 'Homeschool Curriculum',
    desc: 'Each pack includes enough material for a week of lessons: read the story Monday, do activities Tuesday–Thursday, watch the video and discuss on Friday.',
    color: 'bg-sprouts/10 text-sprouts-dark',
  },
  {
    icon: Church,
    title: 'Sunday School',
    desc: 'Our packs are perfect for children\'s ministry. Print multiple copies of the coloring pages and activity sheets. Use the animated video as a classroom opener.',
    color: 'bg-branches/10 text-branches-dark',
  },
  {
    icon: Lightbulb,
    title: 'Family Worship',
    desc: 'Play the worship song together as a family. Use the discussion questions to spark meaningful conversations about faith, character, and applying God\'s Word.',
    color: 'bg-roots/10 text-roots-dark',
  },
];

export default function ParentsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-white border-b border-gold/10 py-16 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-bark mb-4">
            For Parents &amp; Educators
          </h1>
          <p className="text-bark/60 text-lg max-w-2xl mx-auto">
            Ideas and resources for making the most of your Seedling Stories packs
          </p>
        </div>
      </section>

      {/* Usage Ideas */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl font-bold text-bark mb-10 text-center">
            Ways to Use Our Packs
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {USAGE_IDEAS.map((idea) => (
              <div key={idea.title} className="bg-white rounded-2xl border border-gold/10 p-6 glow-card">
                <div className={`w-12 h-12 rounded-xl ${idea.color} flex items-center justify-center mb-4`}>
                  <idea.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-lg font-bold text-bark mb-2">{idea.title}</h3>
                <p className="text-bark/50 text-sm leading-relaxed">{idea.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Discussion Guide */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-2xl font-bold text-bark mb-4">
            Discussion Guide Tips
          </h2>
          <p className="text-bark/60 mb-8">
            Each pack includes discussion questions. Here&apos;s how to make the most of them:
          </p>
          <div className="text-left bg-cream rounded-2xl p-8 border border-gold/10 space-y-4">
            {[
              'Start with "what" questions before "why" — let younger children describe what they see and hear before asking for deeper meaning.',
              'It\'s okay if your child says "I don\'t know." Reframe the question or share your own answer as a starting point.',
              'Connect the story to their life: "Have you ever felt scared like David? What helped you feel brave?"',
              'Don\'t rush. A single good conversation is worth more than covering every question.',
              'End with prayer — even a simple "Thank you, God, for this story" keeps the moment sacred.',
            ].map((tip, i) => (
              <div key={i} className="flex gap-3">
                <span className="w-7 h-7 rounded-full bg-gold/10 text-gold-dark text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-bark/60 text-sm leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        <div className="max-w-md mx-auto px-4">
          <h2 className="font-display text-2xl font-bold text-bark mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-bark/50 mb-6">
            Try a free pack or browse our full collection.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="secondary" size="lg" asChild>
              <Link href="/free">Get Free Pack</Link>
            </Button>
            <Button size="lg" asChild>
              <Link href="/packs">
                Browse Packs <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
