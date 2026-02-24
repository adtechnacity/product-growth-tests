export interface VibeEvent {
  event_name: string;
  component_id: string;
  timestamp: string; // ISO 8601
  url: string; // window.location.pathname
  metadata?: Record<string, unknown>;
}

export type QuizStep = 'vibe' | 'pace' | 'crew' | 'loading' | 'result';

export interface QuizAnswers {
  vibe: 'beach' | 'nightmarket' | null;
  pace: number; // 0–100
  crew: 'solo' | 'couple' | 'squad' | null;
}

export type VibeSlug = 'adventure' | 'culture' | 'relax' | 'party';

export interface VibePersona {
  slug: VibeSlug;
  headline: string;
  subheadline: string;
  ctaLabel: string;
  ctaHref: string;
}

// --- Savings Quiz (jump-page-2) ---

export type SavingsQuizStep =
  | 'shopping'
  | 'deal_method'
  | 'regret'
  | 'spend'
  | 'importance'
  | 'dream'
  | 'loading'
  | 'result';

export interface SavingsQuizAnswers {
  shopping: 'fashion' | 'electronics' | 'home' | 'travel' | null;
  dealMethod: 'search_codes' | 'wait_sales' | 'listed_price' | 'use_tool' | null;
  regret: 'all_the_time' | 'once_or_twice' | 'not_sure' | 'never' | null;
  monthlySpend: number; // 0-1000
  importance: number; // 1-5
  dream: 'travel' | 'food' | 'bills' | 'savings' | null;
}

export type SavingsSlug = 'savvy' | 'hunter' | 'casual';

export interface SavingsPersona {
  slug: SavingsSlug;
  headline: string;
  subheadline: string;
  ctaLabel: string;
  ctaHref: string;
  score: number;
  yearlySavings: number;
}
