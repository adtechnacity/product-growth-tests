import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { ALL_MERCHANTS, TRAVEL_MERCHANTS } from "./cos/merchants";
import { fetchMerchantPage, delay, FETCH_DELAY_MS } from "./cos/fetcher";
import { parseMerchantPage } from "./cos/parser";
import type { COSData, COSMerchantData } from "./cos/types";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const DEFAULTS_PATH = resolve(ROOT, "data/cos-data.defaults.json");
const OUTPUT_PATH = resolve(ROOT, "data/cos-data.json");

async function main() {
  const startTime = Date.now();

  // 1. Load defaults
  const defaults: COSData = JSON.parse(readFileSync(DEFAULTS_PATH, "utf-8"));
  const defaultsByDomain = new Map(
    defaults.merchants.map((m) => [m.domain, m]),
  );

  const travelDomains = new Set(TRAVEL_MERCHANTS.map((m) => m.domain));

  console.error(`[cos-fetcher] Fetching data for ${ALL_MERCHANTS.length} merchants...`);

  // 2. Fetch + parse each merchant
  let fetchedCount = 0;
  let fallbackCount = 0;
  const merchants: COSMerchantData[] = [];

  for (const merchant of ALL_MERCHANTS) {
    const category = travelDomains.has(merchant.domain) ? "travel" as const : "retail" as const;
    const defaultData = defaultsByDomain.get(merchant.domain);

    // Rate limit (skip delay before first request)
    if (merchants.length > 0) {
      await delay(FETCH_DELAY_MS);
    }

    const html = await fetchMerchantPage(merchant.domain);

    if (html) {
      // Parse fetched HTML
      const parsed = parseMerchantPage(
        html,
        merchant.domain,
        merchant.displayName,
      );

      // Merge: fetched data (deals, counts, codes) + defaults (cashback, categories)
      const merged: COSMerchantData = {
        domain: merchant.domain,
        displayName: merchant.displayName,
        category,
        dealCount: parsed.dealCount ?? defaultData?.dealCount ?? 0,
        deals: parsed.deals ?? [],
        couponCodes:
          parsed.couponCodes && parsed.couponCodes.length > 0
            ? parsed.couponCodes
            : defaultData?.couponCodes ?? [],
        cashbackRate: defaultData?.cashbackRate ?? null,
        cashbackType: defaultData?.cashbackType ?? null,
        cashbackCategories: defaultData?.cashbackCategories,
      };

      merchants.push(merged);
      fetchedCount++;
      console.error(`[cos-fetcher] ✓ ${merchant.displayName}: ${merged.dealCount} deals`);
    } else {
      // Full fallback to defaults
      if (defaultData) {
        merchants.push({ ...defaultData, category });
        console.error(`[cos-fetcher] ✗ ${merchant.displayName}: using fallback`);
      } else {
        merchants.push({
          domain: merchant.domain,
          displayName: merchant.displayName,
          category,
          dealCount: 0,
          deals: [],
          couponCodes: [],
          cashbackRate: null,
          cashbackType: null,
        });
        console.error(`[cos-fetcher] ✗ ${merchant.displayName}: no fallback available`);
      }
      fallbackCount++;
    }
  }

  // 3. Build output
  const output: COSData = {
    merchants,
    chromeStoreStats: defaults.chromeStoreStats,
    fetchedAt: new Date().toISOString(),
  };

  // 4. Write output
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2) + "\n");

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.error(
    `[cos-fetcher] Done in ${elapsed}s — ${fetchedCount}/${ALL_MERCHANTS.length} fetched, ${fallbackCount} using fallback`,
  );
  console.error(`[cos-fetcher] Output: ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error("[cos-fetcher] Fatal error:", err);
  process.exit(1);
});
