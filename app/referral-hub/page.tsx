import type { Metadata } from 'next';
import { SubpageHeader } from '@/components/portfolio/SubpageHeader';
import { Footer } from '@/components/portfolio/Footer';
import { ReferralHub } from '@/components/portfolio/ReferralHub';

export const metadata: Metadata = {
  title: 'Referral Hub — Soumya Balamaala',
  description: "Browse open referral jobs or join Soumya Balamaala's referral network.",
};

export default function ReferralHubPage() {
  return (
    <main className="min-h-screen bg-white">
      <SubpageHeader />
      <ReferralHub />
      <Footer />
    </main>
  );
}
