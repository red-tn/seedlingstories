import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import { EmailCapture } from '@/components/landing/EmailCapture';

export const metadata: Metadata = {
  title: 'How to Teach the Creation Story to Young Children',
};

export default function BlogPostPage() {
  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gold/10">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-bark/40 hover:text-bark transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to blog
          </Link>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Meta */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-medium text-gold bg-gold/10 px-2.5 py-1 rounded-full flex items-center gap-1">
            <Tag className="w-3 h-3" />
            Teaching Tips
          </span>
          <span className="text-xs text-bark/30 flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            February 15, 2026
          </span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl font-bold text-bark mb-6 leading-tight">
          How to Teach the Creation Story to Young Children
        </h1>

        {/* Cover */}
        <div className="aspect-video rounded-2xl bg-gradient-to-br from-seeds-light via-sky/20 to-sprouts-light flex items-center justify-center mb-10">
          <span className="text-8xl">🌍</span>
        </div>

        {/* Content */}
        <div className="prose prose-bark max-w-none">
          <div className="space-y-6 text-bark/70 leading-relaxed">
            <p className="text-lg">
              The creation story in Genesis 1 is one of the most foundational narratives in the Bible,
              and it&apos;s also one of the most accessible for young children. The sequential structure
              (Day 1, Day 2, etc.) naturally appeals to how children learn and remember.
            </p>

            <h2 className="font-display text-2xl font-bold text-bark mt-10 mb-4">
              Start with Wonder
            </h2>
            <p>
              Before diving into the text, take your child outside. Look at the sky, the trees, the animals.
              Ask: &ldquo;Who do you think made all of this?&rdquo; Let them wonder before you tell them the answer.
              This builds natural curiosity and makes the story feel personal.
            </p>

            <h2 className="font-display text-2xl font-bold text-bark mt-10 mb-4">
              Use Multi-Sensory Learning
            </h2>
            <p>
              Children learn best when multiple senses are engaged. Here are some ideas for each day of creation:
            </p>
            <ul className="space-y-2 ml-4">
              <li><strong>Day 1 (Light):</strong> Turn off the lights, then turn them on dramatically. &ldquo;Let there be light!&rdquo;</li>
              <li><strong>Day 2 (Sky):</strong> Go outside and lie on a blanket looking up at the clouds.</li>
              <li><strong>Day 3 (Plants):</strong> Plant a seed together in a small pot.</li>
              <li><strong>Day 4 (Sun, Moon, Stars):</strong> Make a paper plate sun and a tin foil moon.</li>
              <li><strong>Day 5 (Fish & Birds):</strong> Visit a pond or birdwatch in your backyard.</li>
              <li><strong>Day 6 (Animals & People):</strong> Play with stuffed animals, then look in a mirror together.</li>
              <li><strong>Day 7 (Rest):</strong> Have a special &ldquo;rest time&rdquo; with a treat and quiet music.</li>
            </ul>

            <h2 className="font-display text-2xl font-bold text-bark mt-10 mb-4">
              Reinforce with Repetition
            </h2>
            <p>
              Young children thrive on repetition. Read the creation story multiple times throughout the week.
              Use a Seedling Stories pack to give them different ways to engage with the same story &mdash;
              printed pages one day, audio narration the next, coloring pages on another day, and the
              animated video as a special treat.
            </p>

            <div className="storybook-border bg-gradient-to-br from-gold/5 to-seeds-light/30 p-6 text-center my-10">
              <p className="font-display text-lg font-bold text-bark italic">
                &ldquo;In the beginning God created the heavens and the earth.&rdquo;
              </p>
              <p className="text-sm text-bark/40 mt-2">&mdash; Genesis 1:1</p>
            </div>

            <h2 className="font-display text-2xl font-bold text-bark mt-10 mb-4">
              Make It Personal
            </h2>
            <p>
              The most powerful part of the creation story for a child isn&apos;t Day 1 or Day 4 &mdash;
              it&apos;s Day 6. The moment when God made <em>them</em>. Emphasize that God made each
              child on purpose, with love, and that He said it was &ldquo;very good.&rdquo;
            </p>
          </div>
        </div>

        {/* Related packs cross-sell */}
        <div className="mt-16 bg-cream rounded-2xl p-8 border border-gold/10 text-center">
          <h3 className="font-display text-xl font-bold text-bark mb-2">
            Ready to bring the Creation Story alive?
          </h3>
          <p className="text-bark/50 text-sm mb-4">
            Our Creation Story pack includes everything mentioned in this article.
          </p>
          <Link
            href="/packs/the-creation-story"
            className="inline-flex items-center gap-2 text-gold font-semibold hover:text-gold-dark transition-colors"
          >
            View The Creation Story Pack →
          </Link>
        </div>
      </article>

      {/* Email Capture */}
      <EmailCapture />
    </div>
  );
}
