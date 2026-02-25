// ============================================================
// COS Scraper — Individual product detail scraping
// ============================================================

import type {
  ProductDetailResult,
  ProductDetail,
  ProductCore,
  EventResult,
  EventPageData,
} from "./types";
import {
  fetchRemixLoader,
  fetchRemixData,
  getLoaderData,
  getCached,
  setCache,
  CosScraperError,
  centsToDollars,
} from "./utils";

// Remix route IDs
const ROUTE_PRODUCT = "routes/__app/p.$title.$productId";
const ROUTE_EVENT = "routes/__app/event.$eventSlug";

interface ProductLoaderData {
  ProductPage: ProductDetail;
  pageName: string;
}

interface EventLoaderData {
  Events: { event: EventPageData };
  pageName: string;
}

/**
 * Fetch detailed product data by slug + ID.
 *
 * Returns full product info including:
 * - Product data (title, images, brand, specs, description)
 * - Pricing comparisons (origin vs match)
 * - Variants (different sizes, colors, etc.)
 * - Price comparison results from other vendors
 * - Meta/SEO data
 */
export async function fetchProductDetail(
  slug: string,
  productId: string
): Promise<ProductDetailResult> {
  const cacheKey = `product:${productId}`;
  const cached = getCached<ProductDetailResult>(cacheKey);
  if (cached) return cached;

  const path = `/p/${slug}/${productId}`;

  let productPage: ProductDetail;

  try {
    // Try fast JSON loader first
    const data = await fetchRemixLoader<ProductLoaderData>(
      path,
      ROUTE_PRODUCT
    );
    productPage = data.ProductPage;
  } catch {
    // Fallback to full HTML
    const ctx = await fetchRemixData(path);
    if (!ctx) {
      throw new CosScraperError(
        `Failed to fetch product ${productId}`,
        500,
        path
      );
    }
    const ld = getLoaderData(ctx, ROUTE_PRODUCT) as ProductLoaderData | null;
    if (!ld?.ProductPage) {
      throw new CosScraperError(
        `Product ${productId} not found`,
        404,
        path
      );
    }
    productPage = ld.ProductPage;
  }

  // Extract product from the most reliable source
  const productData =
    productPage.productData ??
    productPage.cart?.items?.[0]?.inputData?.product;

  if (!productData) {
    throw new CosScraperError(
      `No product data for ${productId}`,
      404,
      path
    );
  }

  // Extract pricing
  const lastQuote = productData.lastQuote;
  const cartItem = productPage.cart?.items?.[0];

  const result: ProductDetailResult = {
    product: productData,
    variants: productPage.variants ?? { select: [], images: [] },
    pricing: {
      originTotal: lastQuote?.origin_total ?? null,
      originSubtotal: lastQuote?.origin_subtotal ?? null,
      originTax: lastQuote?.origin_tax ?? null,
      originShipping: lastQuote?.origin_shipping ?? null,
      matchTotal: lastQuote?.match_total ?? null,
      savings: lastQuote?.savings ?? 0,
    },
    results: cartItem?.results ?? [],
    meta: productPage.meta ?? {
      id: `product:${productId}`,
      url: `https://capitaloneshopping.com${path}`,
    },
    isComplete: productPage.isComplete ?? false,
    timestamp: new Date().toISOString(),
  };

  setCache(cacheKey, result, 10 * 60 * 1000); // 10 min
  return result;
}

/**
 * Fetch product detail from a full COS URL.
 * Parses the slug and productId from the URL.
 *
 * Supports URLs like:
 * - https://capitaloneshopping.com/p/product-slug/PRODUCTID
 * - /p/product-slug/PRODUCTID
 */
export async function fetchProductByUrl(
  url: string
): Promise<ProductDetailResult> {
  const match = url.match(/\/p\/([^/]+)\/([A-Z0-9]+)/);
  if (!match) {
    throw new CosScraperError(
      `Invalid product URL: ${url}`,
      400
    );
  }
  return fetchProductDetail(match[1], match[2]);
}

/**
 * Fetch event page data (limited-time shopping events).
 */
export async function fetchEvent(slug: string): Promise<EventResult> {
  const cacheKey = `event:${slug}`;
  const cached = getCached<EventResult>(cacheKey);
  if (cached) return cached;

  const path = `/event/${slug}`;

  let eventData: EventPageData;

  try {
    const data = await fetchRemixLoader<EventLoaderData>(
      path,
      ROUTE_EVENT
    );
    eventData = data.Events.event;
  } catch {
    const ctx = await fetchRemixData(path);
    if (!ctx) {
      throw new CosScraperError(
        `Failed to fetch event ${slug}`,
        500,
        path
      );
    }
    const ld = getLoaderData(ctx, ROUTE_EVENT) as EventLoaderData | null;
    if (!ld?.Events?.event) {
      throw new CosScraperError(
        `Event ${slug} not found`,
        404,
        path
      );
    }
    eventData = ld.Events.event;
  }

  const result: EventResult = {
    event: eventData,
    stores: eventData.items?.stores ?? [],
    timestamp: new Date().toISOString(),
  };

  setCache(cacheKey, result, 5 * 60 * 1000);
  return result;
}

// ── Convenience functions ─────────────────────────────────

/**
 * Get a simple pricing summary for a product.
 */
export function getPricingSummary(
  result: ProductDetailResult
): {
  originPrice: string | null;
  bestPrice: string | null;
  savings: string | null;
  savingsPercent: string | null;
  vendor: string;
} {
  const p = result.pricing;
  const originPrice = centsToDollars(p.originTotal);
  const matchPrice = centsToDollars(p.matchTotal);
  const savings =
    p.originTotal && p.matchTotal
      ? centsToDollars(p.originTotal - p.matchTotal)
      : null;
  const savingsPercent =
    p.originTotal && p.matchTotal
      ? `${Math.round(((p.originTotal - p.matchTotal) / p.originTotal) * 100)}%`
      : null;

  return {
    originPrice,
    bestPrice: matchPrice ?? originPrice,
    savings,
    savingsPercent,
    vendor: result.product.vendor,
  };
}
