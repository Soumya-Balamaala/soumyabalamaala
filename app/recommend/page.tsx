import type { Metadata } from 'next';
import { SubpageHeader } from '@/components/portfolio/SubpageHeader';
import { Footer } from '@/components/portfolio/Footer';
import { RecommendSoumya } from '@/components/portfolio/RecommendSoumya';

export const metadata: Metadata = {
  title: 'Recommend Soumya — Soumya Balamaala',
  description: 'Worked with Soumya Balamaala before? Share a recommendation.',
};

export default function RecommendPage() {
  return (
    <main className="min-h-screen bg-white">
      <SubpageHeader />
      <RecommendSoumya />
      <Footer />
    </main>
  );
}
