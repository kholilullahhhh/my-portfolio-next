import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/components/providers/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { Navigation } from '@/components/common/navigation';
import { Footer } from '@/components/common/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Muhammad Kholilullah - Full Stack Developer Portfolio',
  description: 'Professional portfolio showcasing modern web development projects, skills, and expertise in React, Next.js, TypeScript, and more.',
  keywords: ['Full Stack Developer', 'React', 'Next.js', 'TypeScript', 'Web Development', 'Portfolio'],
  authors: [{ name: 'Muhammad Kholilullah' }],
  creator: 'Muhammad Kholilullah',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://johndoe.dev',
    title: 'Muhammad Kholilullah - Full Stack Developer Portfolio',
    description: 'Professional portfolio showcasing modern web development projects and expertise.',
    siteName: 'Muhammad Kholilullah Portfolio',
    images: [
      {
        url: 'https://placehold.co/1200x630/6366F1/FFFFFF?text=John+Doe+Portfolio',
        width: 1200,
        height: 630,
        alt: 'Muhammad Kholilullah - Full Stack Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muhammad Kholilullah - Full Stack Developer Portfolio',
    description: 'Professional portfolio showcasing modern web development projects and expertise.',
    images: ['https://placehold.co/1200x630/6366F1/FFFFFF?text=John+Doe+Portfolio'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Muhammad Kholilullah',
  jobTitle: 'Full Stack Developer',
  description: 'Experienced full stack developer specializing in React, Next.js, and modern web technologies.',
  url: 'https://johndoe.dev',
  sameAs: [
    'https://github.com/johndoe',
    'https://linkedin.com/in/johndoe',
    'https://twitter.com/johndoe',
  ],
  knowsAbout: [
    'React',
    'Next.js',
    'TypeScript',
    'Node.js',
    'Laravel',
    'Web Development',
    'Software Engineering',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <Providers
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <Navigation />
        </Providers>
      </body>
    </html>
  );
}