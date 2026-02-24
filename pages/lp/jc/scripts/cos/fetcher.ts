export const COS_BASE_URL = "https://capitaloneshopping.com/s";
export const FETCH_DELAY_MS = 1500;

const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

/**
 * Simple delay utility for rate-limiting between requests.
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Fetches the Capital One Shopping coupon page HTML for a given merchant domain.
 *
 * Returns the HTML string on success, or `null` on any failure
 * (non-200 status, timeout, network error). Never throws.
 */
export async function fetchMerchantPage(
  domain: string,
): Promise<string | null> {
  const url = `${COS_BASE_URL}/${domain}/coupon`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);

  try {
    const response = await fetch(url, {
      headers: { "User-Agent": USER_AGENT },
      signal: controller.signal,
    });

    if (!response.ok) {
      console.error(
        `[fetcher] ${domain}: HTTP ${response.status} ${response.statusText}`,
      );
      return null;
    }

    return await response.text();
  } catch (error: unknown) {
    if (error instanceof Error && error.name === "AbortError") {
      console.error(`[fetcher] ${domain}: request timed out after 10s`);
    } else {
      const message =
        error instanceof Error ? error.message : String(error);
      console.error(`[fetcher] ${domain}: ${message}`);
    }
    return null;
  } finally {
    clearTimeout(timeout);
  }
}
