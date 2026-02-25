// ============================================================
// COS Scraper — Full TypeScript types
// Reverse-engineered from Capital One Shopping SSR/Remix data
// ============================================================

// ── Shared primitives ─────────────────────────────────────

export interface PricePoint {
  date: string;
  list_price: number;
}

export interface ViewPoint {
  date: string;
  views: number;
}

export interface Pill {
  text: string;
  backgroundColor: string;
  textColor: string;
}

export interface MirageTrackProps {
  contentId: string;
  contentRequestId: string;
  contentInstanceId: string;
  feed: string;
  tld: string;
  dataType: string;
  feedItemId: string;
  cactusPromotionId?: string;
  brand?: string;
  displayInfo?: string;
  mirageFeatures?: string;
  page?: string;
  dealsEventId?: string;
  dealsEventPromotionId?: string;
  slug?: string;
}

export interface Mirage {
  trackProps: MirageTrackProps;
  type?: string;
}

// ── Feed / Trending types ─────────────────────────────────

export type FeedItemType =
  | "solo_category"
  | "solo_email"
  | "solo_email_brand"
  | "great_deal"
  | "popular_deal"
  | "generic_store_placement"
  | "event_placement"
  | "generic_event_placement"
  | "placement"
  | "expiring_offer"
  | "bonus_offer"
  | "event_headline_offer"
  | "carousel";

export type FilterLabel =
  | "Exclusive Offers"
  | "Price Drops"
  | "Rewards Offers"
  | "Popular Deals"
  | "Events"
  | "Today's Featured Offers";

export interface RewardTier {
  reward: {
    type: "fixed" | "percentage";
    value: number;
    displayValue: string;
  };
  spendCents: number;
  displaySpendCents: string;
  displaySpendValue: string;
}

export interface FeedItemStats {
  // Price drop info
  newPrice?: string;
  oldPrice?: string;
  percentOff?: string;
  priceHistory?: PricePoint[];
  viewHistory?: ViewPoint[];

  // Cashback info
  cashback?: string;
  cashbackV2?: string;
  cashbackAmount?: string;
  priceAfterRewards?: string;
  rewardType?: "percentage" | "fixed" | "threshold";
  isCutType?: boolean;
  rewardMaxPayout?: string;

  // Popularity
  productPopularity?: number;
  viewRatioVsAvg?: number;

  // Bonus offer tiers
  rewardTiers?: RewardTier[];

  // Exclusions
  exclusionsText?: string;
}

export interface EventData {
  name: string;
  href?: string;
  tier?: string;
  eventId?: string;
  isGeneric?: boolean;
  merchants?: string[];
  eventType?: string;
  additionalMerchantCount?: number;
}

export interface FeedItem {
  type: FeedItemType;
  filterLabel: FilterLabel | string;
  pill?: Pill;
  primaryImage: string;
  secondaryImage: string;
  primaryText: string;
  merchantName: string;
  stats: FeedItemStats;
  __mirage?: Mirage;
  hasVisitedDomain?: boolean;
  href?: string;
  page?: string;
  end?: string; // ISO date for headline offers
  eventData?: EventData;
}

export interface FeedPagination {
  limit: number;
  nextPageToken: string;
}

export interface BonusOffer extends FeedItem {
  type: "bonus_offer";
}

export interface HeadlineOffer extends FeedItem {
  type: "event_headline_offer";
  end: string;
  eventData: EventData;
}

export interface HeadlineOffersData {
  headlineOffers: HeadlineOffer[];
  futureHeadlineOffers?: HeadlineOffer[];
}

export interface FeedData {
  title?: string;
  count: number;
  pagination: FeedPagination;
  items: FeedItem[];
  events: FeedItem[];
  webCarouselEvents: FeedItem[];
  bonusOffers: BonusOffer[];
  headlineOffers: HeadlineOffersData;
}

// ── Category types ────────────────────────────────────────

export interface SubCategory {
  id: string;
  name: string;
  slug: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  subCategories: SubCategory[];
}

export interface StoreCategoryInfo {
  id: string;
  displayName: string;
  slug: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface BreadcrumbItem {
  name: string;
  id: string;
  slug: string;
  isRoot?: boolean;
  isLeaf?: boolean;
}

export interface BrandAggregation {
  key: string;
  count: number;
}

// ── Product types ─────────────────────────────────────────

export interface ProductOption {
  key: string;
  value: string;
}

export interface ProductSpec {
  name: string;
  value: string;
  section?: string;
}

export interface ProductPricing {
  subtotal: number;  // cents
  total: number;     // cents
  tax?: number;
  shipping?: number;
}

export interface ProductStats {
  viewCount: number;
  viewCount30: number;
}

export interface LastQuote {
  userHasPrime: boolean;
  origin_total: number;
  origin_subtotal: number;
  origin_tax: number;
  origin_shipping: number;
  match_total: number | null;
  quote_id: string;
  savings: number;
  received_at: string;
}

export interface ProductCore {
  cpid: string;
  wbid?: string;
  title: string;
  url: string;
  image: string;
  images?: string[];
  brand: string;
  mpn?: string;
  asin?: string;
  sku?: string;
  vendor: string;
  wbpid?: string;
  vendorCategory?: string;
  options?: ProductOption[];
  categoryBreadcrumb?: BreadcrumbItem[];
  breadcrumb?: BreadcrumbItem[];
  stats?: ProductStats;
  specs?: ProductSpec[];
  description?: string;
  amzFirstAvailable?: string;
  firstAvailableDay?: string;
  discount?: number;
  lastQuote?: LastQuote;
}

/** Item from category listing */
export interface CategoryProduct {
  cpid: string;
  id: string;
  asin?: string;
  url: string;
  count: number;
  azOrderCount: number;
  runId: string;
  product: ProductCore;
  savings: number;
  receivedAt: string;
  originPricing: ProductPricing;
  matchPricing: {
    total: number | null;
  };
  stats: ProductStats;
  amzFirstAvailable?: string;
  firstAvailableDay?: string;
}

export interface CategoryData {
  total: number;
  items: CategoryProduct[];
  category: {
    id: string;
    name: string;
    slug: string;
    breadcrumb: BreadcrumbItem[];
    subCategories: SubCategory[];
  };
  aggregations: {
    brands: BrandAggregation[];
  };
}

// ── Product detail types ──────────────────────────────────

export interface ProductResult {
  id: string;
  product: ProductCore & {
    url: string;
    sku: string;
  };
  vendor: string;
  pricing?: {
    total: number;
    subtotal: number;
    tax: number;
    shipping: number;
  };
}

export interface ProductVariant {
  cpid: string;
  id: string;
  asin?: string;
  url: string;
  count: number;
  azOrderCount: number;
  runId: string;
  product: ProductCore;
  savings: number;
  receivedAt: string;
  originPricing: ProductPricing;
  matchPricing: { total: number | null };
  stats: ProductStats;
}

export interface ProductDetail {
  productData: ProductCore;
  variants: {
    select: ProductVariant[];
    images: ProductVariant[];
  };
  cart: {
    id: string;
    deleted: boolean;
    items: Array<{
      id: string;
      runId: string;
      inputData: {
        asin?: string;
        product: ProductCore;
        vendor: string;
        price: number;
        zipcode?: string;
      };
      originResult: ProductResult;
      results: ProductResult[];
      betterResults: ProductResult[];
      allResults: ProductResult[];
      status: string;
      created_at: string;
    }>;
  };
  meta: {
    id: string;
    url: string;
    canonicalUrl?: string;
    description?: string;
    robots?: string;
    sitemap?: boolean;
  };
  isComplete: boolean;
  feedbackData: Record<string, unknown>;
}

// ── Event types ───────────────────────────────────────────

export interface EventStore {
  programCategory: string[];
  componentName: string;
  unitWidth: number;
  image: { url: string; style?: Record<string, unknown> };
  title: { value: string; style?: Record<string, unknown> };
  cta: { value: string; style?: Record<string, unknown> };
  group: string;
  sortIndex: number;
  shouldHighlight: boolean;
  shouldHide: boolean;
  rates: { current: string; boosted?: string };
  offerVMID: string;
  __mirage?: Mirage;
  actions?: Array<{
    type: string;
    props: { target: string; href: string };
  }>;
  mit: boolean;
}

export interface LiveEvent {
  name: string;
  slug: string;
  eventId: string;
  promotionSize: number;
  banner_heading: string;
  __mirage?: Mirage;
}

export interface EventPageData {
  active: boolean;
  eventFallback: boolean;
  topPromo: {
    componentName: string;
    title: { value: string };
    subtitle: Record<string, unknown>;
    heading: { value: string };
    images: Record<string, unknown>;
  };
  subeventCategories: unknown[];
  items: {
    stores: EventStore[];
  };
}

// ── Featured brand ────────────────────────────────────────

export interface FeaturedBrand {
  tld: string;
  displayName: string;
}

// ── Scraper options ───────────────────────────────────────

export interface TrendingOptions {
  /** Filter by label: "Price Drops", "Rewards Offers", etc. */
  filter?: FilterLabel | string;
  /** Maximum number of pages to fetch (default 1, max ~10) */
  maxPages?: number;
  /** Include bonus offers in results */
  includeBonusOffers?: boolean;
  /** Include headline offers in results */
  includeHeadlineOffers?: boolean;
  /** Include carousel events in results */
  includeCarouselEvents?: boolean;
  /** Include regular events in results */
  includeEvents?: boolean;
  /** Keyword to filter results by (client-side) */
  keyword?: string;
}

export interface CategoryBrowseOptions {
  /** Category ID (e.g., "NX55M1QX" for Electronics) */
  categoryId: string;
  /** Category slug (e.g., "electronics") */
  slug: string;
  /** Page number (1-indexed) */
  page?: number;
}

export interface ProductSearchOptions {
  /** Category slug + id for browsing */
  category?: { slug: string; id: string };
  /** Specific product URLs to scrape */
  urls?: string[];
}

export interface ProductDetailOptions {
  /** Product slug (e.g., "kabel-direkt-6-feet-optical-tosl") */
  slug: string;
  /** Product ID (e.g., "2S9PGXHKPL") */
  productId: string;
}

// ── Scraper results ───────────────────────────────────────

export interface TrendingResult {
  items: FeedItem[];
  bonusOffers: BonusOffer[];
  headlineOffers: HeadlineOffer[];
  carouselEvents: FeedItem[];
  events: FeedItem[];
  categories: Category[];
  featuredBrands: FeaturedBrand[];
  liveEvents: LiveEvent[];
  pagination: FeedPagination;
  totalFetched: number;
  timestamp: string;
}

export interface CategoryResult {
  products: CategoryProduct[];
  category: CategoryData["category"];
  brands: BrandAggregation[];
  total: number;
  lastPage: number;
  timestamp: string;
}

export interface ProductDetailResult {
  product: ProductCore;
  variants: ProductDetail["variants"];
  pricing: {
    originTotal: number | null;
    originSubtotal: number | null;
    originTax: number | null;
    originShipping: number | null;
    matchTotal: number | null;
    savings: number;
  };
  results: ProductResult[];
  meta: ProductDetail["meta"];
  isComplete: boolean;
  timestamp: string;
}

export interface EventResult {
  event: EventPageData;
  stores: EventStore[];
  timestamp: string;
}
