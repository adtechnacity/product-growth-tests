// ============================================================
// Server-side deal fetcher for ISR pages
// Fetches from our cos-deals-api proxy on srv1312041.
// Falls back to direct COS scraping, then hardcoded deals.
//
// Vercel env vars needed:
//   COS_PROXY_URL  — e.g. http://<server-ip>:3847/api/cos-deals
//   COS_API_KEY    — the API key for the proxy
// ============================================================

import {
  fetchTrending,
  type FeedItem,
  type TrendingResult,
} from "@/lib/cos-scraper";

// ── Types ─────────────────────────────────────────────────
export interface Deal {
  id: string;
  primaryText: string;
  merchantName: string;
  primaryImage: string;
  secondaryImage: string;
  oldPrice: string | null;
  newPrice: string | null;
  percentOff: string | null;
  cashback: string | null;
  cashbackAmount: string | null;
  priceAfterRewards: string | null;
  filterLabel: string;
  type: string;
  pill: string | null;
  priceHistory: Array<{ date: string; list_price: number }>;
  productPopularity: number | null;
  exclusionsText: string | null;
  rewardMaxPayout: string | null;
  href: string | null;
}

export interface DealsData {
  deals: Deal[];
  bonusOffers: unknown[];
  headlineOffers: unknown[];
  categories: unknown[];
  liveEvents: unknown[];
  count: number;
  totalFetched: number;
  timestamp: string;
  source: "proxy" | "direct" | "fallback";
}

// ── Hardcoded fallback deals (last resort) ────────────────
const FALLBACK_DEALS: Deal[] = [
  {
    id: "fallback-1",
    primaryText: "Keurig K-Classic Coffee Maker",
    merchantName: "Target",
    primaryImage: "",
    secondaryImage: "",
    oldPrice: "$149.99",
    newPrice: "$109.00",
    percentOff: "27%",
    cashback: "3%",
    cashbackAmount: "$3.27",
    priceAfterRewards: "$105.73",
    filterLabel: "Price Drops",
    type: "price_drop",
    pill: null,
    priceHistory: [],
    productPopularity: null,
    exclusionsText: null,
    rewardMaxPayout: null,
    href: null,
  },
  {
    id: "fallback-2",
    primaryText: "Apple AirPods Pro (2nd Gen)",
    merchantName: "Walmart",
    primaryImage: "",
    secondaryImage: "",
    oldPrice: "$249.00",
    newPrice: "$189.99",
    percentOff: "24%",
    cashback: "2%",
    cashbackAmount: "$3.80",
    priceAfterRewards: "$186.19",
    filterLabel: "Price Drops",
    type: "price_drop",
    pill: null,
    priceHistory: [],
    productPopularity: null,
    exclusionsText: null,
    rewardMaxPayout: null,
    href: null,
  },
  {
    id: "fallback-3",
    primaryText: "Dyson V8 Cordless Vacuum",
    merchantName: "Best Buy",
    primaryImage: "",
    secondaryImage: "",
    oldPrice: "$419.99",
    newPrice: "$349.99",
    percentOff: "17%",
    cashback: "4%",
    cashbackAmount: "$14.00",
    priceAfterRewards: "$335.99",
    filterLabel: "Price Drops",
    type: "price_drop",
    pill: null,
    priceHistory: [],
    productPopularity: null,
    exclusionsText: null,
    rewardMaxPayout: null,
    href: null,
  },
  {
    id: "fallback-4",
    primaryText: "Samsung Galaxy Buds2 Pro",
    merchantName: "Amazon",
    primaryImage: "",
    secondaryImage: "",
    oldPrice: "$229.99",
    newPrice: "$159.99",
    percentOff: "30%",
    cashback: "1%",
    cashbackAmount: "$1.60",
    priceAfterRewards: "$158.39",
    filterLabel: "Price Drops",
    type: "price_drop",
    pill: null,
    priceHistory: [],
    productPopularity: null,
    exclusionsText: null,
    rewardMaxPayout: null,
    href: null,
  },
  {
    id: "fallback-5",
    primaryText: "Ninja Professional Blender",
    merchantName: "Kohl's",
    primaryImage: "",
    secondaryImage: "",
    oldPrice: "$99.99",
    newPrice: "$69.99",
    percentOff: "30%",
    cashback: "5%",
    cashbackAmount: "$3.50",
    priceAfterRewards: "$66.49",
    filterLabel: "Price Drops",
    type: "price_drop",
    pill: null,
    priceHistory: [],
    productPopularity: null,
    exclusionsText: null,
    rewardMaxPayout: null,
    href: null,
  },
];

// ── Fetch from our proxy server ───────────────────────────
async function fetchFromProxy(): Promise<DealsData | null> {
  const proxyUrl = process.env.COS_PROXY_URL;
  const apiKey = process.env.COS_API_KEY;

  if (!proxyUrl) {
    console.log("[fetchDeals] No COS_PROXY_URL configured, skipping proxy");
    return null;
  }

  try {
    const res = await fetch(proxyUrl, {
      headers: {
        "x-api-key": apiKey || "",
      },
      // Let Next.js ISR handle revalidation — match page's revalidate period
      next: { revalidate: 120 },
      signal: AbortSignal.timeout(10000), // 10s timeout
    });

    if (!res.ok) {
      console.error(`[fetchDeals] Proxy returned ${res.status}`);
      return null;
    }

    const data = await res.json();
    if (!data.deals || data.deals.length === 0) {
      console.log("[fetchDeals] Proxy returned empty deals");
      return null;
    }

    return { ...data, source: "proxy" as const };
  } catch (err) {
    console.error("[fetchDeals] Proxy fetch failed:", err);
    return null;
  }
}

// ── Direct COS scraping fallback ──────────────────────────
function feedItemToDeal(item: FeedItem): Deal {
  const trackProps = item.__mirage?.trackProps;
  return {
    id: trackProps?.feedItemId ?? trackProps?.contentInstanceId ?? item.primaryText,
    primaryText: item.primaryText?.trim() ?? "",
    merchantName: item.merchantName ?? "",
    primaryImage: item.primaryImage ?? "",
    secondaryImage: item.secondaryImage ?? "",
    oldPrice: item.stats?.oldPrice ?? null,
    newPrice: item.stats?.newPrice ?? null,
    percentOff: item.stats?.percentOff ?? null,
    cashback: item.stats?.cashback ?? null,
    cashbackAmount: item.stats?.cashbackAmount ?? null,
    priceAfterRewards: item.stats?.priceAfterRewards ?? null,
    filterLabel: item.filterLabel ?? "",
    type: item.type,
    pill: item.pill?.text ?? null,
    priceHistory: item.stats?.priceHistory ?? [],
    productPopularity: item.stats?.productPopularity ?? null,
    exclusionsText: item.stats?.exclusionsText ?? null,
    rewardMaxPayout: item.stats?.rewardMaxPayout ?? null,
    href: item.href ?? null,
  };
}

async function fetchDirectFromCOS(): Promise<DealsData | null> {
  try {
    console.log("[fetchDeals] Trying direct COS scraping...");
    const result: TrendingResult = await fetchTrending({
      maxPages: 2,
      includeBonusOffers: true,
      includeHeadlineOffers: true,
      includeCarouselEvents: false,
      includeEvents: false,
    });

    const allDeals = result.items
      .filter((item) => item.primaryText?.trim())
      .map(feedItemToDeal);

    const priceDrops = allDeals.filter((d) => d.newPrice && d.oldPrice);
    const cashbackOffers = allDeals.filter(
      (d) =>
        !d.newPrice &&
        d.cashback &&
        d.type !== "generic_store_placement" &&
        d.type !== "event_placement"
    );
    const combined = [...priceDrops, ...cashbackOffers];

    if (combined.length === 0) return null;

    const bonusOffers = result.bonusOffers.map((bo) => ({
      merchantName: bo.merchantName,
      pill: bo.pill?.text ?? null,
      rewardTiers: bo.stats?.rewardTiers ?? [],
      exclusionsText: bo.stats?.exclusionsText ?? null,
    }));

    const headlineOffers = result.headlineOffers.map((ho) => ({
      primaryText: ho.primaryText,
      merchantName: ho.merchantName,
      primaryImage: ho.primaryImage,
      cashback: ho.stats?.cashback ?? null,
      end: ho.end ?? null,
      eventHref: ho.eventData?.href ?? null,
    }));

    return {
      deals: combined,
      bonusOffers,
      headlineOffers,
      categories: result.categories.map((c) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        subCount: c.subCategories?.length ?? 0,
      })),
      liveEvents: result.liveEvents.map((e) => ({
        name: e.name,
        slug: e.slug,
        offers: e.promotionSize,
      })),
      count: combined.length,
      totalFetched: result.totalFetched,
      timestamp: result.timestamp,
      source: "direct" as const,
    };
  } catch (err) {
    console.error("[fetchDeals] Direct COS scraping failed:", err);
    return null;
  }
}

// ── Main exported function ────────────────────────────────
export async function fetchDealsForISR(): Promise<DealsData> {
  // 1. Try proxy (fast, cached on our server)
  const proxyData = await fetchFromProxy();
  if (proxyData) {
    console.log(`[fetchDeals] Got ${proxyData.count} deals from proxy`);
    return proxyData;
  }

  // 2. Fall back to direct COS scraping
  const directData = await fetchDirectFromCOS();
  if (directData) {
    console.log(`[fetchDeals] Got ${directData.count} deals from direct COS`);
    return directData;
  }

  // 3. Last resort: hardcoded fallback
  console.log("[fetchDeals] Using hardcoded fallback deals");
  return {
    deals: FALLBACK_DEALS,
    bonusOffers: [],
    headlineOffers: [],
    categories: [],
    liveEvents: [],
    count: FALLBACK_DEALS.length,
    totalFetched: FALLBACK_DEALS.length,
    timestamp: new Date().toISOString(),
    source: "fallback" as const,
  };
}
