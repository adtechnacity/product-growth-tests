'use client';

import Link from 'next/link';
import { useCallback, useEffect } from 'react';
import { useVibeLog } from '@/hooks/useVibeLog';

interface ResultsCTAProps {
  ctaLabel: string;
  ctaHref: string;
  skippedFrom: string | null;
  referrerClickId: string | null;
  isReferred: boolean;
}

export function ResultsCTA({ ctaLabel, ctaHref, skippedFrom, referrerClickId, isReferred }: ResultsCTAProps) {
  const { logEvent } = useVibeLog('jump_page_results_v1');

  // Fire referral_landing event on mount if referred
  useEffect(() => {
    if (isReferred && referrerClickId) {
      logEvent('referral_landing', {
        referrer_clickid: referrerClickId,
        referrer_source: 'social_share',
      });
    }
  }, [isReferred, referrerClickId, logEvent]);

  // Store referrer clickid in sessionStorage
  useEffect(() => {
    if (isReferred && referrerClickId) {
      sessionStorage.setItem('vibe_referrer', referrerClickId);
    }
  }, [isReferred, referrerClickId]);

  const handleCtaClick = useCallback(() => {
    if (skippedFrom) {
      logEvent('skip_cta_click', {
        skipped_from_step: skippedFrom,
        persona: 'fallback',
      });
    }
    if (isReferred && referrerClickId) {
      logEvent('referral_cta_click', {
        cta_type: 'extension',
        referrer_clickid: referrerClickId,
      });
    }
  }, [skippedFrom, isReferred, referrerClickId, logEvent]);

  const handleQuizCtaClick = useCallback(() => {
    if (isReferred && referrerClickId) {
      logEvent('referral_cta_click', {
        cta_type: 'quiz',
        referrer_clickid: referrerClickId,
      });
    }
  }, [isReferred, referrerClickId, logEvent]);

  // Build CTA href with referral param if applicable
  const extensionHref = isReferred && referrerClickId
    ? `${ctaHref}&ref=${referrerClickId}`
    : ctaHref;

  const quizHref = isReferred && referrerClickId
    ? `/jump-page?ref=${referrerClickId}`
    : '/jump-page';

  return (
    <>
      {/* Referred visitors: primary CTA = take quiz, secondary = extension */}
      {isReferred ? (
        <>
          <Link
            href={quizHref}
            onClick={handleQuizCtaClick}
            className="btn inline-flex items-center gap-3 bg-vibe-coral text-white font-bold px-10 py-5 rounded-2xl text-xl hover:bg-vibe-coral/90 transition-colors duration-200 shadow-2xl shadow-vibe-coral/20"
          >
            Take the quiz yourself
            <span aria-hidden="true">&rarr;</span>
          </Link>
          <div className="mt-4">
            <Link
              href={extensionHref}
              onClick={handleCtaClick}
              className="btn text-white/60 hover:text-white/90 text-sm transition-colors duration-200 underline underline-offset-4"
            >
              Get the free extension now
            </Link>
          </div>
        </>
      ) : (
        <>
          {/* Standard CTA */}
          <Link
            href={extensionHref}
            onClick={handleCtaClick}
            className="btn inline-flex items-center gap-3 bg-vibe-coral text-white font-bold px-10 py-5 rounded-2xl text-xl hover:bg-vibe-coral/90 transition-colors duration-200 shadow-2xl shadow-vibe-coral/20"
          >
            {ctaLabel}
            <span aria-hidden="true">&rarr;</span>
          </Link>
          <div className="mt-8">
            <Link
              href="/jump-page"
              className="btn text-white/40 hover:text-white/70 text-sm transition-colors duration-200 underline underline-offset-4"
            >
              Retake the quiz
            </Link>
          </div>
        </>
      )}
    </>
  );
}
