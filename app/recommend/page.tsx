import { SubpageHeader } from '@/components/portfolio/SubpageHeader';
import { Footer } from '@/components/portfolio/Footer';
import { RecommendSoumya } from '@/components/portfolio/RecommendSoumya';
import { VisitorTracker } from '@/components/portfolio/VisitorTracker';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Recommend Soumya — Soumya Balamaala',
  description: 'Worked with Soumya Balamaala before? Share a recommendation.',
  path: '/recommend',
});

export default function RecommendPage() {
  return (
    <main className="min-h-screen bg-white">
      <VisitorTracker page="recommend" />
      <SubpageHeader />
      <RecommendSoumya />
      <Footer />
    </main>
  );
}
