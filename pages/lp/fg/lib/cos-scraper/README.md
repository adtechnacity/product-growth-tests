# COS Scraper — Capital One Shopping Deal Scraper

A free, TypeScript-first scraper for Capital One Shopping that replaces the [$34/mo Apify actor](https://apify.com/lexis-solutions/capital-one-shopping).

## Why This Exists

| | Apify Actor | COS Scraper |
|---|---|---|
| **Cost** | $34/mo + usage | Free |
| **Speed** | Queue-based (seconds) | Direct API (< 500ms) |
| **Auth required** | No | No |
| **TypeScript** | No (JS) | Full strict types |
| **Caching** | No | Built-in TTL cache |
| **Rate limiting** | No | 300ms min between requests |

---

## Reverse-Engineered Endpoints

COS is a Remix app. All data is available through two mechanisms:
1. **SSR data** — `window.__remixContext` embedded in HTML
2. **Remix data loaders** — `?_data=<route>` returns JSON directly (faster)

### Endpoint Map

#### 1. Homepage Feed (TREND mode)
```
GET https://capitaloneshopping.com/?_data=routes/__app/index
Accept: application/json
```
**Response keys:** `HomePage`, `pageName`, `featuredBrands`, `mobileGameProgress`, `showBankLinkingBanner`

**`HomePage.initialFeedData` contains:**
- `items[]` — 20-25 feed items per page
- `pagination.nextPageToken` — for loading more
- `events[]` — event placements
- `webCarouselEvents[]` — carousel featured offers
- `bonusOffers[]` — threshold-based bonus rewards (e.g., "$5 back on $25 at Amazon")
- `headlineOffers.headlineOffers[]` — daily featured deals with expiry

#### 2. Feed Pagination
```
GET https://capitaloneshopping.com/?pageToken={token}&_data=routes/__app/index
Accept: application/json
```
Returns same structure as homepage. Chain tokens for unlimited pages.

#### 3. App-Level Data (Categories, Events)
```
GET https://capitaloneshopping.com/?_data=routes/__app
Accept: application/json
```
**Returns:**
- `fullCategories[]` — 23 top-level categories with subcategories
- `contentApiData.liveEvents[]` — currently active shopping events
- `StorePage.categories[]` — store/merchant categories
- `accountInteractionInfo` — auth state

#### 4. Category Browsing (PRODUCT mode)
```
GET https://capitaloneshopping.com/c/{slug}/{categoryId}?_data=routes/__app/c.$slug.$catId
Accept: application/json
```
**Query params:** `page` (pagination)

**Returns per category:**
- `offerCategories[id].items[]` — up to 50 products
- `offerCategories[id].total` — total product count
- `offerCategories[id].category` — category metadata + breadcrumb
- `offerCategories[id].aggregations.brands[]` — brand facets with counts
- `CategoryPage.lastPage` — total pages

#### 5. Product Detail
```
GET https://capitaloneshopping.com/p/{slug}/{productId}?_data=routes/__app/p.$title.$productId
Accept: application/json
```
**Returns:**
- `ProductPage.productData` — full product info (title, images, brand, specs, description)
- `ProductPage.variants` — related products (select variants + image variants)
- `ProductPage.cart.items[0].results[]` — price comparison from other vendors
- `ProductPage.cart.items[0].inputData.product.lastQuote` — latest pricing
- `ProductPage.meta` — SEO metadata + canonical URL
- `ProductPage.isComplete` — whether price comparison is done

#### 6. Event Pages
```
GET https://capitaloneshopping.com/event/{slug}?_data=routes/__app/event.$eventSlug
Accept: application/json
```
**Returns:**
- `Events.event.items.stores[]` — merchants participating with cashback rates
- `Events.event.topPromo` — event banner/heading
- `Events.event.active` — whether event is currently running

#### 7. Affiliate Redirect
```
GET https://capitaloneshopping.com/api/v3/r?d={encrypted}&t={jwt}
```
Redirects to merchant site with affiliate tracking. The `t` JWT contains:
- `i` — reward ID
- `u` — user ID
- `d` — domain
- `e` — expiry timestamp
- `t` — reward type (percentage/fixed)
- `a` — reward amount (basis points)
- `p` — max payout (cents)

#### 8. Merchant Logos
```
GET https://images.capitaloneshopping.com/api/v1/logos?domain={domain}&width={px}&type=cropped&fallback=true
```

#### 9. Product Image Proxy
```
GET https://i.capitaloneshopping.com/{base64_encoded_params}
```
The base64 decodes to resize parameters + original image URL.

#### 10. Auth-Protected APIs (require session)
```
GET /api/v1/products/search    → 401
GET /api/v1/categories         → 401
GET /api/v1/feed               → 401
GET /api/v2/feed               → 401
```
These exist but require authentication. The Remix loaders above give us the same data without auth.

---

## Data Schemas

### Feed Item (Trending)
```typescript
{
  type: "great_deal" | "solo_category" | "popular_deal" | "generic_store_placement" | ...
  filterLabel: "Price Drops" | "Exclusive Offers" | "Rewards Offers" | "Popular Deals" | "Events"
  pill: { text: string, backgroundColor: string, textColor: string }
  primaryImage: string       // product image URL
  secondaryImage: string     // merchant logo URL
  primaryText: string        // deal title
  merchantName: string       // store name
  stats: {
    newPrice?: "$79.99"      // current price
    oldPrice?: "$99.99"      // original price
    percentOff?: "20%"
    cashback?: "6%"          // cashback rate
    cashbackAmount?: "$4.80" // dollar amount saved
    priceAfterRewards?: "$75.19"
    priceHistory?: [{ date: "2026-02-08", list_price: 99.99 }, ...]
    productPopularity?: 1836
    rewardType?: "percentage" | "fixed" | "threshold"
    rewardMaxPayout?: "$1,000"
    exclusionsText?: string
    rewardTiers?: [{ reward: { type, value, displayValue }, spendCents, displaySpendValue }]
  }
  href?: string              // affiliate redirect URL
  __mirage?: { trackProps: { contentId, feed, tld, dataType, feedItemId, ... } }
}
```

### Category Product
```typescript
{
  cpid: "2S9PGXHKPL"        // COS product ID
  id: "2S9PGXHKPL"
  asin: "B00DI89WDW"        // Amazon ASIN
  url: "/p/slug/ID"
  product: {
    title: string
    image: string
    images: string[]
    brand: string
    vendor: "amazon.com"
    sku: string
    wbpid: "amazon.com_B00DI89WDW"
    vendorCategory: string
    options: [{ key: "Size", value: "6 feet" }]
    breadcrumb: [{ name, id, slug, isRoot?, isLeaf? }]
  }
  originPricing: { subtotal: 799, total: 865 }  // cents
  matchPricing: { total: 750 | null }            // cents, null = no match
  savings: 115                                    // cents
  stats: { viewCount: 230, viewCount30: 977 }
}
```

### Product Detail
```typescript
{
  productData: {
    cpid, title, url, image, images[], brand, mpn,
    asin, sku, vendor, wbpid, vendorCategory,
    options[], categoryBreadcrumb[], specs[],
    description, stats: { viewCount, viewCount30 },
    lastQuote: {
      origin_total, origin_subtotal, origin_tax, origin_shipping, // cents
      match_total,  // cents or null
      savings,      // cents
    }
  }
  variants: {
    select: ProductVariant[]   // same product, different options
    images: ProductVariant[]   // related products
  }
  cart.items[0].results[]      // price comparison results from other vendors
  meta: { url, canonicalUrl, description }
  isComplete: boolean
}
```

---

## 23 Product Categories

| Category | ID | Subcategories |
|---|---|---|
| Appliances | QDZE5755 | 12 |
| Arts, Crafts & Sewing | QDZYZ455 | 11 |
| Automotive | RYV2O5P5 | 13 |
| Baby Products | RQG6VKQL | 12 |
| Beauty & Personal Care | RQ5KWK08 | 8 |
| Books | DXG2NJEX | 33 |
| CDs & Vinyl Records | K8D51Y85 | 27 |
| Clothing, Shoes & Jewelry | QWDK6JQML | 11 |
| Electronics | NX55M1QX | 13 |
| Health & Household | 8EYQ6Q4X | 9 |
| Home & Kitchen | 8DLN5JKX | 13 |
| Industrial & Scientific | XPW03L33 | 24 |
| Movies & TV | QDVV7L1L | 36 |
| Musical Instruments | 8E60OQ50 | 14 |
| Office Products | 8LP137ER | 3 |
| Patio, Lawn & Garden | Q0DQYD3L | 13 |
| Pet Supplies | QDZE5ZK6 | 10 |
| Smartphones & Accessories | Q4NKLDM5 | 5 |
| Software | NX5N9ML8 | 9 |
| Sports & Outdoor | XWJ2L1PR | 3 |
| Tools & Home Improvement | MR47W61R | 13 |
| Toys & Games | RQG6VL7L | 20 |
| Video Games | X667VY3X | 16 |

---

## Usage

### TREND mode — Trending deals
```typescript
import { fetchTrending, fetchPriceDrops } from "@/lib/cos-scraper";

// All trending deals (2 pages)
const result = await fetchTrending({ maxPages: 2 });
console.log(result.items);        // FeedItem[]
console.log(result.bonusOffers);   // BonusOffer[]
console.log(result.headlineOffers); // HeadlineOffer[]

// Filter by type
const drops = await fetchTrending({ filter: "Price Drops", maxPages: 3 });

// Keyword search within feed
const cameras = await fetchTrending({ keyword: "camera", maxPages: 5 });

// Convenience: just price drops
const priceDrops = await fetchPriceDrops(3);
```

### PRODUCT mode — Category browsing
```typescript
import { browseCategory, findCategory, searchProducts, getCategories } from "@/lib/cos-scraper";

// List all categories
const categories = await getCategories();

// Browse by category
const electronics = await browseCategory({
  categoryId: "NX55M1QX",
  slug: "electronics",
});
console.log(electronics.products); // CategoryProduct[]
console.log(electronics.brands);   // BrandAggregation[]

// Find category by name
const cat = await findCategory("headphones");
if (cat) {
  const headphones = await browseCategory(cat);
}

// Search (finds matching category, then filters)
const results = await searchProducts("sony headphones");
```

### Product detail
```typescript
import { fetchProductDetail, fetchProductByUrl, getPricingSummary } from "@/lib/cos-scraper";

// By slug + ID
const product = await fetchProductDetail("kabel-direkt-6-feet-optical-tosl", "2S9PGXHKPL");
console.log(product.product);   // full product data
console.log(product.variants);  // variants
console.log(product.pricing);   // pricing comparison

// By URL
const p = await fetchProductByUrl("https://capitaloneshopping.com/p/some-product/ABC123");

// Quick pricing summary
const summary = getPricingSummary(product);
// { originPrice: "$8.65", bestPrice: "$7.50", savings: "$1.15", savingsPercent: "13%", vendor: "amazon.com" }
```

### Events
```typescript
import { fetchEvent, fetchLiveEvents } from "@/lib/cos-scraper";

// List active events
const events = await fetchLiveEvents();

// Get event detail with participating stores
const event = await fetchEvent("dream-of-spring-with-these-hot-offers-1");
console.log(event.stores); // EventStore[] with cashback rates
```

### Caching
```typescript
import { clearCache, setCache, getCached } from "@/lib/cos-scraper";

// Cache is automatic (5 min default)
// Clear manually if needed
clearCache();

// Custom cache entries
setCache("my-key", data, 60_000); // 1 minute TTL
```

---

## Architecture

```
cos-scraper/
├── index.ts          # Public API — re-exports everything
├── trending.ts       # TREND mode: homepage feed + pagination + filtering
├── products.ts       # PRODUCT mode: category browsing + search
├── product-detail.ts # Individual product + event detail
├── types.ts          # Full TypeScript interfaces (50+ types)
├── utils.ts          # Fetch helpers, cache, rate limiter, SSR parser
└── README.md         # This file
```

**Data flow:**
1. Request → rate limiter (300ms min gap)
2. Check in-memory cache (TTL-based)
3. Try Remix `_data` JSON loader (fast, ~200ms)
4. Fallback: fetch full HTML + extract `window.__remixContext`
5. Parse + type → return typed result

**No auth required.** All endpoints are public SSR/loader routes. The `/api/v1/*` and `/api/v2/*` endpoints require auth but are unnecessary — the Remix loaders expose the same data.
