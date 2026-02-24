import type { Metadata } from 'next';
import { Suspense } from 'react';
import { SavingsQuiz } from '@/components/jump-page-2/SavingsQuiz';

export const metadata: Metadata = {
  title: 'What\'s Your Savings Score? | Capital One Shopping — Free',
  description:
    'Take this 60-second quiz to find out how much money you\'re leaving on the table — and how to save automatically with Capital One Shopping.',
  robots: 'index, follow',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com'}/jump-page-2`,
  },
};

export default function JumpPage2() {
  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Quiz',
            name: "What's Your Savings Score?",
            description:
              'A 60-second quiz to discover how much you could save on online shopping with Capital One Shopping.',
            educationalAlignment: {
              '@type': 'AlignmentObject',
              alignmentType: 'teaches',
              targetName: 'Personal Finance',
            },
          }),
        }}
      />
      <Suspense>
        <SavingsQuiz />
      </Suspense>
    </>
  );
}
