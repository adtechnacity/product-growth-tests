// ============================================================
// COS Scraper — TREND mode
// Fetches homepage feed with pagination, filtering, events
// ============================================================

import type {
  TrendingOptions,
  TrendingResult,
  FeedItem,
  FeedData,
  BonusOffer,
  HeadlineOffer,
  Category,
  FeaturedBrand,
  LiveEvent,
  FeedPagination,
  FilterLabel,
} from "./types";
import {
  fetchRemixData,
  fetchRemixLoader,
  getLoaderData,
  getCached,
  setCache,
} from "./utils";

// Remix route IDs
const ROUTE_APP = "routes/__app";
const ROUTE_HOME = "routes/__app/index";

interface HomeLoaderData {
  HomePage: {
    initialFeedData: FeedData;
    initialCarouselData: Record<string, unknown>;
    userIdUsedToFetchFeed: string;
    referralTerms: unknown;
    sideBarBlockStructure: string;
    currentCredit: {
      couponCredit: number;
      credit: number;
      currency: string;
      transactions: number;
      lifetimeSavingsAmt: number;
    };
    xdIncentiveOffer: unknown;
    userLocationData: { country: string; location: { zipcode: string } };
  };
  pageName: string;
  featuredBrands: FeaturedBrand[];
  mobileGameProgress: unknown;
  showBankLinkingBanner: boolean;
}

interface AppLoaderData {
  fullCategories: Category[];
  contentApiData: {
    liveEvents: LiveEvent[];
  };
}

/**
 * Fetch trending deals from the COS homepage feed.
 *
 * Supports:
 * - Multi-page pagination via nextPageToken
 * - Client-side filtering by label or keyword
 * - Bonus offers, headline offers, carousel events
 */
export async function fetchTrending(
  options: TrendingOptions = {}
): Promise<TrendingResult> {
  const {
    filter,
    maxPages = 1,
    includeBonusOffers = true,
    includeHeadlineOffers = true,
    includeCarouselEvents = true,
    includeEvents = true,
    keyword,
  } = options;

  // Page 1: get full SSR data (includes categories, brands, events)
  const page1 = await fetchFirstPage();

  let allItems: FeedItem[] = [...page1.feedData.items];
  let pagination = page1.feedData.pagination;

  // Fetch additional pages if requested
  let pagesLoaded = 1;
  while (pagesLoaded < maxPages && pagination?.nextPageToken) {
    try {
      const nextPage = await fetchNextPage(pagination.nextPageToken);
      allItems = allItems.concat(nextPage.items);
      pagination = nextPage.pagination;
      pagesLoaded++;
    } catch {
      break; // Stop on error — return what we have
    }
  }

  // Apply filter
  if (filter) {
    allItems = allItems.filter((item) => item.filterLabel === filter);
  }

  // Apply keyword filter (client-side)
  if (keyword) {
    const kw = keyword.toLowerCase();
    allItems = allItems.filter(
      (item) =>
        item.primaryText?.toLowerCase().includes(kw) ||
        item.merchantName?.toLowerCase().includes(kw)
    );
  }

  return {
    items: allItems,
    bonusOffers: includeBonusOffers
      ? (page1.feedData.bonusOffers ?? [])
      : [],
    headlineOffers: includeHeadlineOffers
      ? (page1.feedData.headlineOffers?.headlineOffers ?? [])
      : [],
    carouselEvents: includeCarouselEvents
      ? (page1.feedData.webCarouselEvents ?? [])
      : [],
    events: includeEvents ? (page1.feedData.events ?? []) : [],
    categories: page1.categories,
    featuredBrands: page1.featuredBrands,
    liveEvents: page1.liveEvents,
    pagination,
    totalFetched: allItems.length,
    timestamp: new Date().toISOString(),
  };
}

// ── Internals ─────────────────────────────────────────────

interface FirstPageResult {
  feedData: FeedData;
  categories: Category[];
  featuredBrands: FeaturedBrand[];
  liveEvents: LiveEvent[];
}

async function fetchFirstPage(): Promise<FirstPageResult> {
  const cacheKey = "trending:page1";
  const cached = getCached<FirstPageResult>(cacheKey);
  if (cached) return cached;

  // Try fast JSON loader first
  try {
    const [homeData, appData] = await Promise.all([
      fetchRemixLoader<HomeLoaderData>("/", ROUTE_HOME),
      fetchRemixLoader<AppLoaderData>("/", ROUTE_APP),
    ]);

    const result: FirstPageResult = {
      feedData: homeData.HomePage.initialFeedData,
      categories: appData.fullCategories ?? [],
      featuredBrands: homeData.featuredBrands ?? [],
      liveEvents: appData.contentApiData?.liveEvents ?? [],
    };

    setCache(cacheKey, result, 3 * 60 * 1000);
    return result;
  } catch {
    // Fallback to full HTML extraction
  }

  // Fallback: fetch full HTML
  const ctx = await fetchRemixData("/");
  if (!ctx) {
    throw new Error("Failed to fetch COS homepage data");
  }

  const homeLd = getLoaderData(ctx, ROUTE_HOME) as HomeLoaderData | null;
  const appLd = getLoaderData(ctx, ROUTE_APP) as AppLoaderData | null;

  if (!homeLd?.HomePage?.initialFeedData) {
    throw new Error("No feed data found in COS homepage");
  }

  const result: FirstPageResult = {
    feedData: homeLd.HomePage.initialFeedData,
    categories: appLd?.fullCategories ?? [],
    featuredBrands: homeLd.featuredBrands ?? [],
    liveEvents: appLd?.contentApiData?.liveEvents ?? [],
  };

  setCache(cacheKey, result, 3 * 60 * 1000);
  return result;
}

async function fetchNextPage(
  pageToken: string
): Promise<{ items: FeedItem[]; pagination: FeedPagination }> {
  const data = await fetchRemixLoader<HomeLoaderData>(
    `/?pageToken=${encodeURIComponent(pageToken)}`,
    ROUTE_HOME
  );

  return {
    items: data.HomePage?.initialFeedData?.items ?? [],
    pagination: data.HomePage?.initialFeedData?.pagination ?? {
      limit: 25,
      nextPageToken: "",
    },
  };
}

// ── Convenience exports ───────────────────────────────────

/** Get only price drop deals */
export async function fetchPriceDrops(
  maxPages = 2
): Promise<FeedItem[]> {
  const result = await fetchTrending({
    filter: "Price Drops",
    maxPages,
  });
  return result.items;
}

/** Get only exclusive offers */
export async function fetchExclusiveOffers(
  maxPages = 2
): Promise<FeedItem[]> {
  const result = await fetchTrending({
    filter: "Exclusive Offers",
    maxPages,
  });
  return result.items;
}

/** Get only rewards offers */
export async function fetchRewardsOffers(
  maxPages = 2
): Promise<FeedItem[]> {
  const result = await fetchTrending({
    filter: "Rewards Offers",
    maxPages,
  });
  return result.items;
}

/** Get all categories available on COS */
export async function fetchCategories(): Promise<Category[]> {
  const page1 = await fetchFirstPage();
  return page1.categories;
}

/** Get live events */
export async function fetchLiveEvents(): Promise<LiveEvent[]> {
  const page1 = await fetchFirstPage();
  return page1.liveEvents;
}
