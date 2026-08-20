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

function formatMarkdown(content: string): string {
  const lines = content.trim().split('\n');
  const htmlLines: string[] = [];
  let inUnorderedList = false;
  let inOrderedList = false;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();

    if (!line) {
      if (inUnorderedList) {
        htmlLines.push('</ul>');
        inUnorderedList = false;
      }
      if (inOrderedList) {
        htmlLines.push('</ol>');
        inOrderedList = false;
      }
      continue;
    }

    // Inline formatting: Bold, inline code
    line = line
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-neutral-900 dark:text-white font-semibold">$1</strong>')
      .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-purple-600 dark:text-purple-400 font-mono text-sm">$1</code>');

    // Headings
    if (line.startsWith('### ')) {
      if (inUnorderedList) { htmlLines.push('</ul>'); inUnorderedList = false; }
      if (inOrderedList) { htmlLines.push('</ol>'); inOrderedList = false; }
      htmlLines.push(`<h3 class="text-xl font-bold mt-6 mb-3 text-neutral-900 dark:text-white">${line.slice(4)}</h3>`);
    } else if (line.startsWith('## ')) {
      if (inUnorderedList) { htmlLines.push('</ul>'); inUnorderedList = false; }
      if (inOrderedList) { htmlLines.push('</ol>'); inOrderedList = false; }
      htmlLines.push(`<h2 class="text-2xl font-bold mt-8 mb-4 text-neutral-900 dark:text-white">${line.slice(3)}</h2>`);
    } else if (line.startsWith('# ')) {
      if (inUnorderedList) { htmlLines.push('</ul>'); inUnorderedList = false; }
      if (inOrderedList) { htmlLines.push('</ol>'); inOrderedList = false; }
      htmlLines.push(`<h1 class="text-3xl font-extrabold mt-8 mb-4 text-neutral-900 dark:text-white">${line.slice(2)}</h1>`);
    }
    // Unordered List (- item or * item)
    else if (line.startsWith('- ') || line.startsWith('* ')) {
      if (!inUnorderedList) {
        if (inOrderedList) { htmlLines.push('</ol>'); inOrderedList = false; }
        htmlLines.push('<ul class="list-disc list-inside space-y-2 my-4 text-neutral-700 dark:text-neutral-300">');
        inUnorderedList = true;
      }
      htmlLines.push(`<li>${line.slice(2)}</li>`);
    }
    // Ordered List (1. item)
    else if (/^\d+\.\s/.test(line)) {
      if (!inOrderedList) {
        if (inUnorderedList) { htmlLines.push('</ul>'); inUnorderedList = false; }
        htmlLines.push('<ol class="list-decimal list-inside space-y-2 my-4 text-neutral-700 dark:text-neutral-300">');
        inOrderedList = true;
      }
      const itemText = line.replace(/^\d+\.\s/, '');
      htmlLines.push(`<li>${itemText}</li>`);
    }
    // Regular Paragraph
    else {
      if (inUnorderedList) { htmlLines.push('</ul>'); inUnorderedList = false; }
      if (inOrderedList) { htmlLines.push('</ol>'); inOrderedList = false; }
      htmlLines.push(`<p class="my-4 text-neutral-700 dark:text-neutral-300 leading-relaxed">${line}</p>`);
    }
  }

  if (inUnorderedList) htmlLines.push('</ul>');
  if (inOrderedList) htmlLines.push('</ol>');

  return htmlLines.join('\n');
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
          <header className="mb-10 border-b border-neutral-200 dark:border-neutral-800 pb-8">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">{post.title}</h1>
            <div className="flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
              <time>{post.date}</time>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </header>
          
          <div 
            className="prose dark:prose-invert prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: formatMarkdown(post.content) }}
          />
        </article>
      </main>
    </div>
  );
}
