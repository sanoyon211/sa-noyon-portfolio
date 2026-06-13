import { notFound } from 'next/navigation';
import Link from 'next/link';
import { IconArrowLeft } from '@tabler/icons-react';
import { GlassHeader } from '@/components/glass-header';
import { blogPosts } from '@/data/blog';

// Generate static params for all blog posts
export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = blogPosts.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#000] text-black dark:text-white transition-colors duration-300">
      <GlassHeader />
      <main className="pt-32 pb-20 px-8 md:px-16 lg:px-24 max-w-3xl mx-auto">
        <Link 
          href="/blog" 
          className="inline-flex items-center text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white mb-8 transition-colors"
        >
          <IconArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>
        
        <article>
          <header className="mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
              <time>{post.date}</time>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </header>
          
          <div 
            className="prose dark:prose-invert prose-lg max-w-none prose-headings:font-semibold prose-a:text-purple-600 dark:prose-a:text-purple-400"
            dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
          />
        </article>
      </main>
    </div>
  );
}
