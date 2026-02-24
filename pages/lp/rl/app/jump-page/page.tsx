import type { Metadata } from 'next';
import { Suspense } from 'react';
import { TravelDNAQuiz } from '@/components/jump-page/TravelDNAQuiz';

export const metadata: Metadata = {
  title: 'Discover Your Travel DNA — Free | Capital One Shopping',
  description:
    'Take our free 3-question quiz and unlock personalized travel deals with Capital One Shopping — 100% free.',
  robots: 'index, follow',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com'}/jump-page`,
  },
  openGraph: {
    title: 'Discover Your Travel DNA — Free | Capital One Shopping',
    description:
      'Take our free 3-question quiz and unlock personalized travel deals with Capital One Shopping — 100% free.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Discover Your Travel DNA — Free | Capital One Shopping',
    description:
      'Take our free 3-question quiz and unlock personalized travel deals with Capital One Shopping — 100% free.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Discover Your Travel DNA — Free | Capital One Shopping',
  description:
    'Take our free 3-question quiz and unlock personalized travel deals with Capital One Shopping — 100% free.',
  url: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com'}/jump-page`,
};

export default function JumpPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="relative min-h-screen overflow-hidden bg-vibe-ink">
        {/* SSR-visible H1 for SEO — visually hidden but present before hydration */}
        <h1 className="sr-only">What&apos;s Your Travel DNA? Free Quiz from Capital One Shopping</h1>

        {/* Client island — Suspense boundary for useSearchParams in useClickId */}
        <Suspense>
          <TravelDNAQuiz />
        </Suspense>
      </main>
    </>
  );
}
