import type { Metadata } from 'next';
import type { SavingsSlug } from '@/types';
import { computeSavingsEstimate } from '@/lib/savings-compute';
import { SAVINGS_CTA_HREF } from '@/lib/cta-config';
import { ResultsCTA } from './ResultsCTA';
import { ShareButtons } from '../results/ShareButtons';

const PERSONA_ACCENTS: Record<SavingsSlug, { from: string; emoji: string }> = {
  savvy: { from: 'from-vibe-gold', emoji: '🏆' },
  hunter: { from: 'from-vibe-coral', emoji: '🎯' },
  casual: { from: 'from-blue-500', emoji: '💡' },
};

const PERSONA_LABELS: Record<SavingsSlug, string> = {
  savvy: 'Savvy Shopper',
  hunter: 'Deal Hunter',
  casual: 'Casual Buyer',
};

export const metadata: Metadata = {
  title: 'Your Savings Score | Capital One Shopping — Free',
  description: 'See your personalized savings estimate and start saving automatically with Capital One Shopping.',
  robots: 'index, follow',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com'}/results-2`,
  },
};

interface Results2PageProps {
  searchParams: {
    persona?: string;
    score?: string;
    spend?: string;
    skipped?: string;
    ref?: string;
  };
}

export default function Results2Page({ searchParams }: Results2PageProps) {
  const rawPersona = searchParams.persona;
  const rawScore = searchParams.score;
  const rawSpend = searchParams.spend;
  const isSkipped = searchParams.skipped === '1';
  const referrerClickId = searchParams.ref ?? null;

  const isValidPersona = rawPersona && ['savvy', 'hunter', 'casual'].includes(rawPersona);
  const personaSlug: SavingsSlug = isValidPersona ? (rawPersona as SavingsSlug) : 'casual';
  const score = rawScore ? Math.max(0, Math.min(100, parseInt(rawScore, 10) || 50)) : 50;
  const spend = rawSpend ? Math.max(0, parseInt(rawSpend, 10) || 200) : 200;

  const yearlySavings = computeSavingsEstimate(spend);
  const accent = PERSONA_ACCENTS[personaSlug];
  const personaLabel = PERSONA_LABELS[personaSlug];

  const isReferred = referrerClickId !== null && referrerClickId.length > 0;

  // Build headline dynamically
  const headline = personaSlug === 'casual'
    ? "You're a Casual Buyer — here's what you're missing"
    : personaSlug === 'hunter'
    ? `You're a Deal Hunter missing $${yearlySavings}/year in savings`
    : `You're a Savvy Shopper leaving $${yearlySavings}/year on the table`;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-16">
      {/* Background gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${accent.from}/20 via-vibe-ink to-vibe-ink pointer-events-none`}
      />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Emoji */}
        <div className="text-7xl mb-6">{accent.emoji}</div>

        {/* Referral banner */}
        {isReferred && (
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-vibe-gold bg-vibe-gold/10 border border-vibe-gold/20 px-4 py-1.5 rounded-full mb-4">
            Your friend is a {personaLabel}!
          </span>
        )}

        {/* Persona tag */}
        {!isReferred && (
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-vibe-gold bg-vibe-gold/10 border border-vibe-gold/20 px-4 py-1.5 rounded-full mb-6">
            Your Savings Profile: {personaLabel}
          </span>
        )}

        {/* Score visual */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-28 h-28 rounded-full border-4 border-vibe-gold/30 bg-vibe-gold/5">
            <div className="text-center">
              <p className="font-display text-3xl font-bold text-white">{score}</p>
              <p className="text-white/50 text-xs">/100</p>
            </div>
          </div>
          <p className="text-white/40 text-xs mt-2 uppercase tracking-widest">Savings Score</p>
        </div>

        {/* Headline */}
        <h1 className="font-display text-3xl md:text-5xl font-bold text-white leading-tight mb-4 text-balance">
          {headline}
        </h1>

        {/* Projected savings */}
        <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-4 text-balance">
          Based on your ${spend}/month spending, you could be saving{' '}
          <span className="text-vibe-gold font-bold">${yearlySavings}/year</span>{' '}
          with zero effort.
        </p>

        {/* Social proof */}
        <p className="text-white/40 text-sm mb-8">
          Join 17 million+ shoppers who save automatically with Capital One Shopping
        </p>

        {/* CTA */}
        <ResultsCTA
          ctaHref={SAVINGS_CTA_HREF}
          isSkipped={isSkipped}
          referrerClickId={referrerClickId}
          isReferred={isReferred}
          personaSlug={personaSlug}
        />

        {/* Microcopy */}
        <p className="text-white/30 text-xs mt-4">
          Takes 3 seconds. Works on 30,000+ stores. Free forever.
        </p>

        {/* Share section */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-white/50 text-sm mb-4">
            Challenge your friends — what&apos;s THEIR Savings Score?
          </p>
          <ShareButtons
            vibeSlug={personaSlug}
            vibeHeadline={personaLabel}
          />
        </div>
      </div>
    </main>
  );
}
