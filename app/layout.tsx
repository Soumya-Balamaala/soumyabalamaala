import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { BackendGate } from '@/components/portfolio/BackendGate';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-inter',
});

const title = 'Soumya Balamaala — Frontend Engineer';
const description =
  'Strategic Frontend Engineer with 4.9 years of expertise in React.js, Next.js & TypeScript, building scalable, production-grade UI architectures. Resolved 100+ critical incidents with zero downtime across fintech platforms, now expanding into Full Stack with Node.js, Express.js & PostgreSQL.';

export const metadata: Metadata = {
  metadataBase: new URL('https://soumyabalamaala.vercel.app'),
  title,
  description,
  openGraph: {
    title,
    description,
    url: '/',
    siteName: 'Soumya Balamaala',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/Portfolio_Logo_-1.png" />
      </head>
      <body className={inter.className}>
        <BackendGate>{children}</BackendGate>
      </body>
    </html>
  );
}
