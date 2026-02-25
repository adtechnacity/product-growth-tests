// ============================================================
// /api/deals — Secondary endpoint for direct API access
// Fetches from proxy first, falls back to direct COS, then hardcoded.
//
// Vercel env vars needed:
//   COS_PROXY_URL  — e.g. http://<server-ip>:3847/api/cos-deals
//   COS_API_KEY    — the API key for the proxy
// ============================================================

import { NextResponse } from "next/server";
import {
  fetchTrending,
  type FeedItem,
  type TrendingResult,
} from "@/lib/cos-scraper";

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

function feedItemToDeal(item: FeedItem): Deal {
  const trackProps = item.__mirage?.trackProps;
  return {
    id:
      trackProps?.feedItemId ??
      trackProps?.contentInstanceId ??
      item.primaryText,
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

/* ── Hardcoded fallback ── */
const FALLBACK_RESPONSE = {
  deals: [
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
  ],
  bonusOffers: [],
  headlineOffers: [],
  categories: [],
  liveEvents: [],
  count: 2,
  totalFetched: 2,
  timestamp: new Date().toISOString(),
  source: "fallback",
};

/* ── Try fetching from our proxy server ── */
async function fetchFromProxy(
  filter?: string,
  keyword?: string,
  pages?: number
): Promise<Response | null> {
  const proxyUrl = process.env.COS_PROXY_URL;
  const apiKey = process.env.COS_API_KEY;

  if (!proxyUrl) return null;

  try {
    const url = new URL(proxyUrl);
    if (filter) url.searchParams.set("filter", filter);
    if (keyword) url.searchParams.set("keyword", keyword);
    if (pages) url.searchParams.set("pages", String(pages));

    const res = await fetch(url.toString(), {
      headers: { "x-api-key": apiKey || "" },
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.deals && data.deals.length > 0) {
        return NextResponse.json(
          { ...data, source: "proxy" },
          {
            headers: {
              "Cache-Control":
                "public, s-maxage=120, stale-while-revalidate=3600",
            },
          }
        );
      }
    }
  } catch (err) {
    console.error("[api/deals] Proxy fetch failed:", err);
  }

  return null;
}

/* ── Direct COS scraping fallback ── */
async function fetchDirectCOS(
  filter?: string,
  keyword?: string,
  pages?: number
): Promise<Response | null> {
  try {
    const result: TrendingResult = await fetchTrending({
      filter: filter as FeedItem["filterLabel"],
      keyword,
      maxPages: pages || 2,
      includeBonusOffers: true,
      includeHeadlineOffers: true,
      includeCarouselEvents: false,
      includeEvents: false,
    });

    const allDeals: Deal[] = result.items
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
    for (let i = combined.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [combined[i], combined[j]] = [combined[j], combined[i]];
    }

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

    return NextResponse.json(
      {
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
        source: "direct",
      },
      {
        headers: {
          "Cache-Control":
            "public, s-maxage=120, stale-while-revalidate=3600",
        },
      }
    );
  } catch (err) {
    console.error("[api/deals] Direct COS scraping failed:", err);
    return null;
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const filter = url.searchParams.get("filter") ?? undefined;
    const keyword = url.searchParams.get("keyword") ?? undefined;
    const pages = Math.min(
      parseInt(url.searchParams.get("pages") ?? "2", 10),
      5
    );

    // 1. Try proxy
    const proxyRes = await fetchFromProxy(filter, keyword, pages);
    if (proxyRes) return proxyRes;

    // 2. Try direct COS
    const directRes = await fetchDirectCOS(filter, keyword, pages);
    if (directRes) return directRes;

    // 3. Hardcoded fallback
    return NextResponse.json(FALLBACK_RESPONSE, {
      headers: {
        "Cache-Control": "public, s-maxage=120, stale-while-revalidate=3600",
      },
    });
  } catch (error) {
    console.error("Deal API error:", error);
    return NextResponse.json(FALLBACK_RESPONSE, {
      status: 500,
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=3600",
      },
    });
  }
}
