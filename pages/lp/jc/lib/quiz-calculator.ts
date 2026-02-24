import type { QuizAnswers } from "@/components/quiz/types";

export interface SavingsResult {
  variant: "dollar_range" | "deal_count";
  savingsLow: number;
  savingsHigh: number;
  baseSpend: number;
  totalDeals: number;
  frequencyLabel: string;
  partyLabel: string;
}

const SAVINGS_RATE_LOW = 0.02;
const SAVINGS_RATE_HIGH = 0.05;
const DOLLAR_RANGE_THRESHOLD = 150;

const FREQUENCY_LABELS: Record<string, string> = {
  low: "1-2 trips/year",
  mid: "3-5 trips/year",
  high: "6+ trips/year",
};

const PARTY_LABELS: Record<string, string> = {
  solo: "1 traveler",
  couple: "2 travelers",
  family: "3-5 travelers",
  group: "6+ travelers",
};

export function calculateSavings(
  answers: QuizAnswers,
  totalTravelDeals: number
): SavingsResult {
  const hasFrequency = answers.frequency != null;
  const hasPartySize = answers.partySize != null;

  // No answers at all — deal_count variant with generic labels
  if (!hasFrequency && !hasPartySize) {
    return {
      variant: "deal_count",
      savingsLow: 0,
      savingsHigh: 0,
      baseSpend: 0,
      totalDeals: totalTravelDeals,
      frequencyLabel: "",
      partyLabel: "",
    };
  }

  const tripsMidpoint = answers.frequency?.value ?? 4; // default mid
  const costPerTrip = answers.partySize?.value ?? 2400; // default couple

  const baseSpend = tripsMidpoint * costPerTrip;
  const savingsLow = Math.round(baseSpend * SAVINGS_RATE_LOW);
  const savingsHigh = Math.round(baseSpend * SAVINGS_RATE_HIGH);

  const variant =
    savingsLow >= DOLLAR_RANGE_THRESHOLD ? "dollar_range" : "deal_count";

  const frequencyLabel =
    FREQUENCY_LABELS[answers.frequency?.key ?? ""] ?? "";
  const partyLabel =
    PARTY_LABELS[answers.partySize?.key ?? ""] ?? "";

  return {
    variant,
    savingsLow,
    savingsHigh,
    baseSpend,
    totalDeals: totalTravelDeals,
    frequencyLabel,
    partyLabel,
  };
}
