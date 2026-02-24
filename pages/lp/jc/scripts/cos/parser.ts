import * as cheerio from "cheerio";
import type { COSDeal, COSCouponCode, COSMerchantData } from "./types";

/**
 * Parses HTML from a COS coupon page to extract structured merchant data
 * from JSON-LD blocks. Defensive throughout — never throws.
 */
export function parseMerchantPage(
  html: string,
  domain: string,
  displayName: string
): Partial<COSMerchantData> {
  const empty: Partial<COSMerchantData> = {
    domain,
    displayName,
    dealCount: 0,
    deals: [],
    couponCodes: [],
  };

  let $: cheerio.CheerioAPI;
  try {
    $ = cheerio.load(html);
  } catch {
    return empty;
  }

  // Collect all JSON-LD blocks
  const jsonLdBlocks: unknown[] = [];
  $('script[type="application/ld+json"]').each((_, el) => {
    const raw = $(el).text();
    try {
      jsonLdBlocks.push(JSON.parse(raw));
    } catch {
      // Skip malformed JSON-LD blocks
    }
  });

  if (jsonLdBlocks.length === 0) {
    return empty;
  }

  const dealCount = extractDealCount(jsonLdBlocks);
  const deals = extractDeals(jsonLdBlocks);
  const couponCodes = extractCouponCodes(deals);

  return {
    domain,
    displayName,
    dealCount: dealCount ?? deals.length,
    deals,
    couponCodes,
  };
}

/**
 * Looks for a "(\d+) active" pattern in a WebPage description or any
 * top-level description field across all JSON-LD blocks.
 */
function extractDealCount(blocks: unknown[]): number | null {
  const activePattern = /(\d+)\s+active/i;

  for (const block of blocks) {
    if (!isRecord(block)) continue;

    // Check WebPage type first
    if (block["@type"] === "WebPage" && typeof block.description === "string") {
      const match = block.description.match(activePattern);
      if (match) return parseInt(match[1], 10);
    }

    // Check any object with a description field
    if (typeof block.description === "string") {
      const match = block.description.match(activePattern);
      if (match) return parseInt(match[1], 10);
    }
  }

  return null;
}

/**
 * Extracts deals from ItemList JSON-LD blocks. Each itemListElement should
 * contain an item with @type "Offer" that has name and url fields.
 */
function extractDeals(blocks: unknown[]): COSDeal[] {
  const deals: COSDeal[] = [];

  for (const block of blocks) {
    if (!isRecord(block)) continue;
    if (block["@type"] !== "ItemList") continue;

    const elements = block.itemListElement;
    if (!Array.isArray(elements)) continue;

    for (const element of elements) {
      if (!isRecord(element)) continue;

      const item = element.item;
      if (!isRecord(item)) continue;
      if (item["@type"] !== "Offer") continue;

      const description = typeof item.name === "string" ? item.name : "";
      if (!description) continue;

      const deal: COSDeal = { description };
      if (typeof item.url === "string" && item.url) {
        deal.url = item.url;
      }

      deals.push(deal);
    }
  }

  return deals;
}

/**
 * Identifies coupon codes from the deals array. A deal is considered a coupon
 * code if:
 * - Its description starts with "Code" or "Coupon Code"
 * - It contains an ALL_CAPS alphanumeric word of 4+ characters (promo code pattern)
 *
 * The code is extracted via regex from the description.
 */
function extractCouponCodes(deals: COSDeal[]): COSCouponCode[] {
  const couponCodes: COSCouponCode[] = [];
  const codePattern = /\b([A-Z0-9]{4,20})\b/;
  const prefixPattern = /^(Code|Coupon Code)\b/i;

  for (const deal of deals) {
    const desc = deal.description;

    // Check if description starts with "Code" or "Coupon Code"
    const hasPrefix = prefixPattern.test(desc);

    // Check for ALL_CAPS promo code pattern
    const codeMatch = desc.match(codePattern);
    const hasPromoCode = codeMatch !== null;

    if (hasPrefix || hasPromoCode) {
      // Extract the actual code from the description
      const code = codeMatch ? codeMatch[1] : null;
      if (code) {
        couponCodes.push({
          code,
          description: desc,
        });
      }
    }
  }

  return couponCodes;
}

/**
 * Type guard: checks if a value is a non-null object (record).
 */
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
