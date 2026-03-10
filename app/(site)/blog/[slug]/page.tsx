import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import { createServiceClient } from '@/lib/supabase/server';
import { EmailCapture } from '@/components/landing/EmailCapture';

export const revalidate = 60;

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = createServiceClient();

  const { data: post } = await supabase
    .from('blog_posts')
    .select('title, excerpt, seo_title, seo_description, cover_image_url')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: post.seo_title || post.title,
    description: post.seo_description || post.excerpt || undefined,
    openGraph: {
      title: post.seo_title || post.title,
      description: post.seo_description || post.excerpt || undefined,
      ...(post.cover_image_url ? { images: [{ url: post.cover_image_url }] } : {}),
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const supabase = createServiceClient();

  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (!post) {
    notFound();
  }

  const publishedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : null;

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gold/10">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-bark/40 hover:text-bark transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to blog
          </Link>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          {(post.tags || []).map((tag: string) => (
            <span
              key={tag}
              className="text-xs font-medium text-gold bg-gold/10 px-2.5 py-1 rounded-full flex items-center gap-1"
            >
              <Tag className="w-3 h-3" />
              {tag}
            </span>
          ))}
          {publishedDate && (
            <span className="text-xs text-bark/30 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {publishedDate}
            </span>
          )}
        </div>

        <h1 className="font-display text-3xl sm:text-4xl font-bold text-bark mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Cover */}
        <div className="aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-seeds-light via-sky/20 to-sprouts-light flex items-center justify-center mb-10">
          {post.cover_image_url ? (
            <img
              src={post.cover_image_url}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-8xl">📖</span>
          )}
        </div>

        {/* Content */}
        {post.content && (
          <div
            className="prose prose-bark max-w-none text-bark/70 leading-relaxed
              [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-bark [&_h2]:mt-10 [&_h2]:mb-4
              [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-bark [&_h3]:mt-8 [&_h3]:mb-3
              [&_p]:mb-4 [&_p:first-child]:text-lg
              [&_ul]:space-y-2 [&_ul]:ml-4 [&_ul]:list-disc [&_ul]:text-bark/70
              [&_ol]:space-y-2 [&_ol]:ml-4 [&_ol]:list-decimal [&_ol]:text-bark/70
              [&_li]:pl-1
              [&_a]:text-gold [&_a]:underline [&_a]:hover:text-gold-dark
              [&_blockquote]:border-l-4 [&_blockquote]:border-gold/30 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-bark/50
              [&_strong]:text-bark [&_strong]:font-semibold
              [&_img]:rounded-xl [&_img]:my-6"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        )}
      </article>

      {/* Email Capture */}
      <EmailCapture />
    </div>
  );
}
