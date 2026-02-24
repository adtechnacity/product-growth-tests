'use client';

import Link from 'next/link';
import { useCallback, useEffect } from 'react';
import { useVibeLog } from '@/hooks/useVibeLog';
import type { SavingsSlug } from '@/types';

interface ResultsCTAProps {
  ctaHref: string;
  isSkipped: boolean;
  referrerClickId: string | null;
  isReferred: boolean;
  personaSlug: SavingsSlug;
}

export function ResultsCTA({ ctaHref, isSkipped, referrerClickId, isReferred, personaSlug }: ResultsCTAProps) {
  const { logEvent } = useVibeLog('savings_quiz_results_v1');

  useEffect(() => {
    if (isReferred && referrerClickId) {
      logEvent('referral_landing', {
        referrer_clickid: referrerClickId,
        referrer_source: 'social_share',
        quiz_type: 'savings',
      });
    }
  }, [isReferred, referrerClickId, logEvent]);

  useEffect(() => {
    if (isReferred && referrerClickId) {
      sessionStorage.setItem('vibe_referrer', referrerClickId);
    }
  }, [isReferred, referrerClickId]);

  const handleCtaClick = useCallback(() => {
    if (isSkipped) {
      logEvent('skip_cta_click', { persona: personaSlug });
    }
    if (isReferred && referrerClickId) {
      logEvent('referral_cta_click', {
        cta_type: 'extension',
        referrer_clickid: referrerClickId,
        persona: personaSlug,
      });
    }
  }, [isSkipped, isReferred, referrerClickId, personaSlug, logEvent]);

  const handleQuizCtaClick = useCallback(() => {
    if (isReferred && referrerClickId) {
      logEvent('referral_cta_click', {
        cta_type: 'quiz',
        referrer_clickid: referrerClickId,
        persona: personaSlug,
      });
    }
  }, [isReferred, referrerClickId, personaSlug, logEvent]);

  const extensionHref = isReferred && referrerClickId
    ? `${ctaHref}&ref=${referrerClickId}`
    : ctaHref;

  const CTA_LABELS: Record<SavingsSlug, string> = {
    savvy: 'Activate My Savings Plan',
    hunter: 'Start Saving Automatically',
    casual: "Add to Chrome — It's Free",
  };

  return (
    <>
      {isReferred ? (
        <>
          <Link
            href={`/jump-page-2?ref=${referrerClickId}`}
            onClick={handleQuizCtaClick}
            className="btn inline-flex items-center gap-3 bg-vibe-gold text-vibe-ink font-bold px-10 py-5 rounded-2xl text-xl hover:bg-vibe-gold/90 transition-colors duration-200 shadow-2xl shadow-vibe-gold/20"
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
          <Link
            href={extensionHref}
            onClick={handleCtaClick}
            className="btn inline-flex items-center gap-3 bg-vibe-gold text-vibe-ink font-bold px-10 py-5 rounded-2xl text-xl hover:bg-vibe-gold/90 transition-colors duration-200 shadow-2xl shadow-vibe-gold/20"
          >
            {CTA_LABELS[personaSlug]}
            <span aria-hidden="true">&rarr;</span>
          </Link>
          <div className="mt-8">
            <Link
              href="/jump-page-2"
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
