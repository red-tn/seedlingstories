import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Tips, ideas, and inspiration for teaching Bible stories to children.',
};

const DEMO_POSTS = [
  {
    slug: 'teaching-creation-story',
    title: 'How to Teach the Creation Story to Young Children',
    excerpt: 'Practical tips and creative ideas for bringing Genesis 1 alive for kids ages 2-6, including hands-on activities and conversation starters.',
    cover_emoji: '🌍',
    tags: ['Teaching Tips', 'Creation'],
    date: '2026-02-15',
  },
  {
    slug: 'why-bible-stories-matter',
    title: 'Why Bible Stories Matter for Child Development',
    excerpt: 'Research-backed insights on how scripture-based storytelling supports moral development, empathy, and a sense of identity in children.',
    cover_emoji: '📖',
    tags: ['Parenting', 'Faith'],
    date: '2026-02-01',
  },
  {
    slug: 'printable-bible-activities',
    title: '5 Printable Bible Activities for Family Devotions',
    excerpt: 'Free downloadable activities that make family devotion time more engaging and interactive for kids of all ages.',
    cover_emoji: '🎨',
    tags: ['Activities', 'Free Resources'],
    date: '2026-01-20',
  },
  {
    slug: 'using-packs-in-sunday-school',
    title: 'How to Use Seedling Stories Packs in Sunday School',
    excerpt: 'A step-by-step guide for Sunday School teachers and children\'s ministry leaders on integrating our packs into your curriculum.',
    cover_emoji: '⛪',
    tags: ['Sunday School', 'Teaching Tips'],
    date: '2026-01-10',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-white border-b border-gold/10 py-16 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-bark mb-4">
            Blog
          </h1>
          <p className="text-bark/60 text-lg max-w-2xl mx-auto">
            Tips, ideas, and inspiration for planting God&apos;s Word in little hearts
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="space-y-8">
            {DEMO_POSTS.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block bg-white rounded-2xl border border-gold/10 overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Cover */}
                  <div className="sm:w-48 sm:shrink-0 aspect-video sm:aspect-square bg-gradient-to-br from-seeds-light to-sprouts-light flex items-center justify-center">
                    <span className="text-5xl group-hover:scale-110 transition-transform duration-300">
                      {post.cover_emoji}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      {post.tags.map((tag) => (
                        <span key={tag} className="text-xs font-medium text-gold bg-gold/10 px-2.5 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h2 className="font-display text-xl font-bold text-bark mb-2 group-hover:text-gold-dark transition-colors">
                      {post.title}
                    </h2>

                    <p className="text-bark/50 text-sm leading-relaxed mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-bark/30">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </div>
                      <span className="text-sm font-medium text-gold group-hover:text-gold-dark flex items-center gap-1 transition-colors">
                        Read more <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
