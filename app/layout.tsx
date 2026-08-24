import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-inter',
});

const title = 'Soumya Balamaala — Frontend Developer';
const description =
  'Strategic Frontend Developer with 4.5+ years of expertise in React.js and Material UI, expanding into Full Stack development with Node.js and Express.js.';

export const metadata: Metadata = {
  metadataBase: new URL('https://soumyabalamaala.vercel.app'),
  title,
  description,
  openGraph: {
    title,
    description,
    url: '/',
    siteName: 'Soumya Balamaala',
    images: [{ url: '/Soumya.png', width: 1200, height: 1200, alt: 'Soumya Balamaala' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/Soumya.png'],
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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
