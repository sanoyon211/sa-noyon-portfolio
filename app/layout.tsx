import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Toaster } from 'sonner'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

export const metadata: Metadata = {
  title: 'SA Noyon | Frontend Developer',
  description: 'Portfolio of SA Noyon, a passionate Frontend Developer specializing in React, Next.js, and modern web development.',
  keywords: ['Frontend Developer', 'React Developer', 'Next.js Developer', 'Web Developer', 'SA Noyon', 'Bangladesh'],
  authors: [{ name: 'SA Noyon' }],
  creator: 'SA Noyon',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sanoyon.com',
    title: 'SA Noyon | Frontend Developer',
    description: 'Portfolio of SA Noyon, a passionate Frontend Developer specializing in React, Next.js, and modern web development.',
    siteName: 'SA Noyon Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SA Noyon Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SA Noyon | Frontend Developer',
    description: 'Portfolio of SA Noyon, a passionate Frontend Developer specializing in React, Next.js, and modern web development.',
    creator: '@sanoyon',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster theme="dark" position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  )
}
