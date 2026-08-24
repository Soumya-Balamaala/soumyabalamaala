import { SubpageHeader } from '@/components/portfolio/SubpageHeader';
import { Footer } from '@/components/portfolio/Footer';
import { ReferralHub } from '@/components/portfolio/ReferralHub';
import { VisitorTracker } from '@/components/portfolio/VisitorTracker';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Referral Hub — Soumya Balamaala',
  description: "Browse open referral jobs or submit your resume directly to Soumya Balamaala.",
  path: '/referral-hub',
});

export default function ReferralHubPage() {
  return (
    <main className="min-h-screen bg-white">
      <VisitorTracker page="referral-hub" />
      <SubpageHeader />
      <ReferralHub />
      <Footer />
    </main>
  );
}
