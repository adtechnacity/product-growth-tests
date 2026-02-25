// ============================================================
// COS Scraper — Shared utilities
// ============================================================

const BASE_URL = "https://capitaloneshopping.com";

const DEFAULT_HEADERS: Record<string, string> = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  "Accept-Language": "en-US,en;q=0.9",
  "Accept-Encoding": "gzip, deflate, br",
};

// ── Rate limiter ──────────────────────────────────────────

let lastRequestTime = 0;
const MIN_DELAY_MS = 300; // minimum 300ms between requests

async function rateLimit(): Promise<void> {
  const now = Date.now();
  const elapsed = now - lastRequestTime;
  if (elapsed < MIN_DELAY_MS) {
    await new Promise((r) => setTimeout(r, MIN_DELAY_MS - elapsed));
  }
  lastRequestTime = Date.now();
}

// ── Simple in-memory cache ────────────────────────────────

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

const cache = new Map<string, CacheEntry<unknown>>();
const DEFAULT_TTL_MS = 5 * 60 * 1000; // 5 minutes

export function getCached<T>(key: string): T | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    cache.delete(key);
    return null;
  }
  return entry.data as T;
}

export function setCache<T>(key: string, data: T, ttlMs = DEFAULT_TTL_MS): void {
  cache.set(key, { data, expiresAt: Date.now() + ttlMs });
}

export function clearCache(): void {
  cache.clear();
}

// ── Fetch helpers ─────────────────────────────────────────

/**
 * Fetch a COS page as HTML and extract the __remixContext JSON.
 * This is the primary data source — all routes embed SSR data.
 */
export async function fetchRemixData(
  path: string
): Promise<Record<string, unknown> | null> {
  const cacheKey = `remix:${path}`;
  const cached = getCached<Record<string, unknown>>(cacheKey);
  if (cached) return cached;

  await rateLimit();

  const url = `${BASE_URL}${path}`;
  const res = await fetch(url, {
    headers: {
      ...DEFAULT_HEADERS,
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    },
  });

  if (!res.ok) {
    throw new CosScraperError(
      `HTTP ${res.status} fetching ${url}`,
      res.status
    );
  }

  const html = await res.text();
  const data = parseRemixContext(html);
  if (data) {
    setCache(cacheKey, data, 3 * 60 * 1000); // 3 min TTL for SSR
  }
  return data;
}

/**
 * Fetch a COS Remix _data endpoint (JSON loader).
 * Faster than full HTML — used for pagination and subsequent loads.
 */
export async function fetchRemixLoader<T = Record<string, unknown>>(
  path: string,
  route: string,
  params?: Record<string, string>
): Promise<T> {
  await rateLimit();

  const url = new URL(`${BASE_URL}${path}`);
  url.searchParams.set("_data", route);
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      url.searchParams.set(k, v);
    }
  }

  const res = await fetch(url.toString(), {
    headers: {
      ...DEFAULT_HEADERS,
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    throw new CosScraperError(
      `HTTP ${res.status} from loader ${route}`,
      res.status
    );
  }

  return (await res.json()) as T;
}

// ── SSR data extraction ───────────────────────────────────

/**
 * Parse window.__remixContext from HTML string.
 * Uses a single regex — fast and reliable since Remix always emits this.
 */
export function parseRemixContext(
  html: string
): Record<string, unknown> | null {
  const match = html.match(
    /window\.__remixContext\s*=\s*(\{.+?\});\s*(?:<\/script>|window\.)/s
  );
  if (!match) return null;

  try {
    return JSON.parse(match[1]);
  } catch {
    // Try a more permissive extraction
    const match2 = html.match(
      /window\.__remixContext\s*=\s*(\{[\s\S]+?\});/
    );
    if (match2) {
      try {
        return JSON.parse(match2[1]);
      } catch {
        return null;
      }
    }
    return null;
  }
}

/**
 * Drill into the Remix context to get loader data for a specific route.
 */
export function getLoaderData(
  ctx: Record<string, unknown>,
  route: string
): Record<string, unknown> | null {
  const state = ctx.state as Record<string, unknown> | undefined;
  if (!state) return null;
  const loaderData = state.loaderData as Record<string, unknown> | undefined;
  if (!loaderData) return null;
  return (loaderData[route] as Record<string, unknown>) ?? null;
}

// ── Error class ───────────────────────────────────────────

export class CosScraperError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public endpoint?: string
  ) {
    super(message);
    this.name = "CosScraperError";
  }
}

// ── Misc helpers ──────────────────────────────────────────

/** Convert cents to formatted dollar string */
export function centsToDollars(cents: number | null | undefined): string | null {
  if (cents == null) return null;
  return `$${(cents / 100).toFixed(2)}`;
}

/** Safely extract a nested value */
export function dig<T>(
  obj: unknown,
  ...keys: string[]
): T | undefined {
  let current: unknown = obj;
  for (const key of keys) {
    if (current == null || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[key];
  }
  return current as T;
}

/** Build COS product URL from slug + id */
export function productUrl(slug: string, id: string): string {
  return `${BASE_URL}/p/${slug}/${id}`;
}

/** Build COS category URL from slug + id */
export function categoryUrl(slug: string, id: string): string {
  return `${BASE_URL}/c/${slug}/${id}`;
}

/** Build COS event URL from slug */
export function eventUrl(slug: string): string {
  return `${BASE_URL}/event/${slug}`;
}

export { BASE_URL, DEFAULT_HEADERS };
