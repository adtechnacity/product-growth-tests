export type {
  COSDeal,
  COSCouponCode,
  COSCashbackCategory,
  COSMerchantData,
  COSChromeStats,
  COSData,
} from "@/scripts/cos/types";

import type { COSData, COSChromeStats, COSMerchantData } from "@/scripts/cos/types";
import defaultsJson from "@/data/cos-data.defaults.json";

// Cast the imported JSON to the typed interface.
// At build time, the fetch script writes data/cos-data.json; because that file
// is gitignored it may not exist, so we simply use the defaults here and rely
// on the fetch script having already run (via `prebuild`) when live data is
// wanted. Components should import exclusively from this module.
const data: COSData = defaultsJson as COSData;

export function getCOSData(): COSData {
  return data;
}

export function getChromeStats(): COSChromeStats {
  return data.chromeStoreStats;
}

export function getMerchants(): COSMerchantData[] {
  return [...data.merchants].sort((a, b) => b.dealCount - a.dealCount);
}

export function getTotalDeals(): number {
  return data.merchants.reduce((sum, m) => sum + m.dealCount, 0);
}

export function getTravelMerchants(): COSMerchantData[] {
  return data.merchants
    .filter((m) => m.category === "travel")
    .sort((a, b) => b.dealCount - a.dealCount);
}

export function getTravelDealCount(): number {
  return data.merchants
    .filter((m) => m.category === "travel")
    .reduce((sum, m) => sum + m.dealCount, 0);
}

/**
 * Returns the best cashback display string for a merchant.
 * Prefers the first cashbackCategories rate (most relevant),
 * falls back to headline cashbackRate, or null.
 */
export function getDisplayCashback(merchant: COSMerchantData): string | null {
  if (merchant.cashbackCategories && merchant.cashbackCategories.length > 0) {
    return merchant.cashbackCategories[0].rate;
  }
  return merchant.cashbackRate;
}
