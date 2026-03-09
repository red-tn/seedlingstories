import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import { createServiceClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Tips, ideas, and inspiration for teaching Bible stories to children.',
};

export const revalidate = 60;

export default async function BlogPage() {
  const supabase = createServiceClient();

  const { data: posts } = await supabase
    .from('blog_posts')
    .select('slug, title, excerpt, cover_image_url, tags, published_at')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  const blogPosts = posts || [];

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
          {blogPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-bark/40 text-lg">Blog posts coming soon!</p>
            </div>
          ) : (
            <div className="space-y-8">
              {blogPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block bg-white rounded-2xl border border-gold/10 overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row">
                    {/* Cover */}
                    <div className="sm:w-48 sm:shrink-0 aspect-video sm:aspect-square bg-gradient-to-br from-seeds-light to-sprouts-light flex items-center justify-center">
                      {post.cover_image_url ? (
                        <img src={post.cover_image_url} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-5xl group-hover:scale-110 transition-transform duration-300">
                          📖
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        {(post.tags || []).map((tag: string) => (
                          <span key={tag} className="text-xs font-medium text-gold bg-gold/10 px-2.5 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <h2 className="font-display text-xl font-bold text-bark mb-2 group-hover:text-gold-dark transition-colors">
                        {post.title}
                      </h2>

                      {post.excerpt && (
                        <p className="text-bark/50 text-sm leading-relaxed mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                      )}

                      <div className="flex items-center justify-between">
                        {post.published_at && (
                          <div className="flex items-center gap-1.5 text-xs text-bark/30">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                          </div>
                        )}
                        <span className="text-sm font-medium text-gold group-hover:text-gold-dark flex items-center gap-1 transition-colors">
                          Read more <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
