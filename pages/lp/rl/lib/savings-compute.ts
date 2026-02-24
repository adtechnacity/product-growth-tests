import type { SavingsQuizAnswers, SavingsSlug, SavingsPersona } from '@/types';
import { SAVINGS_CTA_HREF } from './cta-config';

export function computeSavingsScore(answers: SavingsQuizAnswers): number {
  let score = 50;

  if (answers.dealMethod === 'use_tool') score += 20;
  else if (answers.dealMethod === 'search_codes') score += 10;
  else if (answers.dealMethod === 'wait_sales') score += 5;

  if (answers.regret === 'all_the_time') score -= 20;
  else if (answers.regret === 'once_or_twice') score -= 10;
  else if (answers.regret === 'never') score += 10;

  score += (answers.importance - 3) * 5;

  return Math.max(0, Math.min(100, score));
}

export function computeSavingsEstimate(monthlySpend: number): number {
  return Math.round(monthlySpend * 0.18 * 12);
}

export function computePersonaSlug(score: number): SavingsSlug {
  if (score >= 70) return 'savvy';
  if (score >= 40) return 'hunter';
  return 'casual';
}

export function buildSavingsPersona(answers: SavingsQuizAnswers): SavingsPersona {
  const score = computeSavingsScore(answers);
  const slug = computePersonaSlug(score);
  const yearlySavings = computeSavingsEstimate(answers.monthlySpend);

  const personas: Record<SavingsSlug, Omit<SavingsPersona, 'score' | 'yearlySavings' | 'ctaHref'>> = {
    savvy: {
      slug: 'savvy',
      headline: `You're a Savvy Shopper leaving $${yearlySavings}/year on the table`,
      subheadline:
        "You know the game — but you're still missing deals. Capital One Shopping automatically finds and applies coupons so you never overpay.",
      ctaLabel: 'Activate My Savings Plan',
    },
    hunter: {
      slug: 'hunter',
      headline: `You're a Deal Hunter missing $${yearlySavings}/year in savings`,
      subheadline:
        'You put in the effort to find deals — let Capital One Shopping do the heavy lifting automatically, for free.',
      ctaLabel: 'Start Saving Automatically',
    },
    casual: {
      slug: 'casual',
      headline: "You're a Casual Buyer — here's what you're missing",
      subheadline: `Based on your spending, you could be saving $${yearlySavings}/year with zero effort. Capital One Shopping finds every deal automatically.`,
      ctaLabel: "Add to Chrome — It's Free",
    },
  };

  return { ...personas[slug], score, yearlySavings, ctaHref: SAVINGS_CTA_HREF };
}
