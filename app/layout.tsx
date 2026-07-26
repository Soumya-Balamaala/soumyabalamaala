import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Soumya Balamaala — Frontend Developer',
  description:
    'Strategic Frontend Developer with 4.5+ years of expertise in React.js and Material UI, expanding into Full Stack development with Node.js and Express.js.',

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
