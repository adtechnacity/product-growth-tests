import type { Metadata } from 'next';
import type { VibeSlug, VibePersona } from '@/types';
import { CTA_HREF } from '@/lib/cta-config';
import { ResultsCTA } from './ResultsCTA';
import { ShareButtons } from './ShareButtons';

const PERSONAS: Record<VibeSlug, VibePersona> = {
  adventure: {
    slug: 'adventure',
    headline: "You're an Adventure Seeker",
    subheadline:
      'Wild trails, heart-pounding experiences, and jaw-dropping views — Capital One Shopping has hand-picked free deals made for thrill-chasers like you.',
    ctaLabel: 'Get My Free Adventure Deals',
    ctaHref: CTA_HREF,
  },
  culture: {
    slug: 'culture',
    headline: "You're a Culture Collector",
    subheadline:
      'Hidden galleries, street markets, ancient temples, and local food scenes — unlock free deals with Capital One Shopping.',
    ctaLabel: 'Get My Free Culture Deals',
    ctaHref: CTA_HREF,
  },
  relax: {
    slug: 'relax',
    headline: "You're a Total Escapist",
    subheadline:
      'No itinerary, no rush. Just pristine beaches, hammocks, and free deals from Capital One Shopping that let you truly switch off.',
    ctaLabel: 'Get My Free Escape Deals',
    ctaHref: CTA_HREF,
  },
  party: {
    slug: 'party',
    headline: "You're a Nightlife Legend",
    subheadline:
      'Rooftop bars, electric nightlife, legendary festivals — Capital One Shopping finds the free deals that keep the good times going.',
    ctaLabel: 'Get My Free Party Deals',
    ctaHref: CTA_HREF,
  },
};

const FALLBACK: VibePersona = {
  slug: 'adventure',
  headline: 'Your Perfect Trip Awaits',
  subheadline:
    'Capital One Shopping has curated the best free travel deals for every type of explorer. Find yours today — 100% free.',
  ctaLabel: 'Get My Free Travel Deals',
  ctaHref: CTA_HREF,
};

const VIBE_ACCENTS: Record<VibeSlug, { from: string; emoji: string }> = {
  adventure: { from: 'from-orange-500', emoji: '🏔️' },
  culture: { from: 'from-blue-500', emoji: '🏛️' },
  relax: { from: 'from-vibe-teal', emoji: '🌴' },
  party: { from: 'from-purple-500', emoji: '🎉' },
};

export const metadata: Metadata = {
  title: 'Your Travel DNA Results | Capital One Shopping — Free',
  description: 'Your free personalized travel deals from Capital One Shopping, based on your Travel DNA quiz.',
  robots: 'index, follow',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com'}/results`,
  },
};

interface ResultsPageProps {
  searchParams: { vibe?: string; skipped_from?: string; ref?: string };
}

export default function ResultsPage({ searchParams }: ResultsPageProps) {
  const rawVibe = searchParams.vibe;
  const isSkipPath = rawVibe === 'skip';
  const skippedFrom = searchParams.skipped_from ?? null;
  const referrerClickId = searchParams.ref ?? null;

  const isValidVibe = rawVibe && rawVibe in PERSONAS;
  const persona = isValidVibe ? PERSONAS[rawVibe as VibeSlug] : FALLBACK;
  const accent = isValidVibe
    ? VIBE_ACCENTS[rawVibe as VibeSlug]
    : { from: 'from-vibe-coral', emoji: '✈️' };

  const isReferred = referrerClickId !== null && referrerClickId.length > 0;

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
        {isReferred && isValidVibe && (
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-vibe-gold bg-vibe-gold/10 border border-vibe-gold/20 px-4 py-1.5 rounded-full mb-4">
            Your friend is a {persona.headline.replace("You're a ", '').replace("You're an ", '')}!
          </span>
        )}

        {/* Vibe tag */}
        {isValidVibe && !isReferred && (
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-vibe-coral bg-vibe-coral/10 border border-vibe-coral/20 px-4 py-1.5 rounded-full mb-6">
            Your Travel DNA: {rawVibe}
          </span>
        )}

        {/* Headline */}
        <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight mb-6 text-balance">
          {persona.headline}
        </h1>

        {/* Subheadline */}
        <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-10 text-balance">
          {persona.subheadline}
        </p>

        {/* CTA section — always use client island now (for share + referral tracking) */}
        <ResultsCTA
          ctaLabel={persona.ctaLabel}
          ctaHref={persona.ctaHref}
          skippedFrom={skippedFrom}
          referrerClickId={referrerClickId}
          isReferred={isReferred}
        />

        {/* Share section */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-white/50 text-sm mb-4">
            Challenge your friends — what&apos;s THEIR Travel DNA?
          </p>
          <ShareButtons
            vibeSlug={persona.slug}
            vibeHeadline={persona.headline.replace("You're a ", '').replace("You're an ", '')}
          />
        </div>
      </div>
    </main>
  );
}
