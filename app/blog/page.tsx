import Link from 'next/link';
import { GlassHeader } from '@/components/glass-header';
import { blogPosts } from '@/data/blog';

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#000] text-black dark:text-white transition-colors duration-300">
      <GlassHeader />
      <main className="pt-32 pb-20 px-8 md:px-16 lg:px-24 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-12">Blog</h1>
        
        <div className="space-y-8">
          {blogPosts.map((post) => (
            <article key={post.slug} className="group border-b border-neutral-200 dark:border-white/10 pb-8">
              <Link href={`/blog/${post.slug}`}>
                <h2 className="text-2xl font-semibold mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {post.title}
                </h2>
                <div className="flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                  <time>{post.date}</time>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <p className="text-neutral-600 dark:text-neutral-300">
                  {post.excerpt}
                </p>
                <div className="mt-4 text-purple-600 dark:text-purple-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Read more →
                </div>
              </Link>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
