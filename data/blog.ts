export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  readTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'my-journey-into-web-development',
    title: 'My Journey into Web Development',
    date: 'June 10, 2026',
    excerpt: 'How I started learning the MERN stack and built my first full-stack application.',
    readTime: '5 min read',
    content: `
# How It Started

I began my journey into web development out of pure curiosity. I was always fascinated by how websites worked behind the scenes. From simply inspecting elements in the browser, I slowly transitioned into learning HTML, CSS, and eventually JavaScript.

## Learning the MERN Stack

After getting comfortable with the frontend, I wanted to build full-stack applications. That's when I discovered the MERN stack (MongoDB, Express.js, React, Node.js). 

Here are some of the key things I learned:
- **React**: Component-based architecture changed how I thought about UI.
- **Node & Express**: Building REST APIs became second nature.
- **MongoDB**: The flexibility of NoSQL databases allowed me to prototype quickly.

## Looking Forward

I am currently working as an Industrial Trainee at BD Calling IT Industry, where I'm gaining real-world experience. My goal is to become a top-tier Full-Stack Developer and contribute to open-source projects.
    `
  },
  {
    slug: 'why-nextjs-is-the-future',
    title: 'Why Next.js is the Future of React',
    date: 'June 12, 2026',
    excerpt: 'A brief overview of why I chose Next.js for my portfolio and future projects.',
    readTime: '4 min read',
    content: `
# The Power of Next.js

When I first learned React, I loved the component model, but dealing with routing, SEO, and SSR was always a hassle. Then came Next.js.

## Key Features

1. **App Router**: The new App Router in Next.js 13+ makes layouts and nested routing incredibly intuitive.
2. **Server Components**: React Server Components allow us to fetch data securely on the server without sending unnecessary JavaScript to the client.
3. **Image Optimization**: The built-in \`<Image />\` component handles resizing, lazy loading, and modern formats like WebP automatically.

Building my portfolio with Next.js was a breeze, and I highly recommend it to any React developer looking to level up their frontend game.
    `
  }
];
