// ============================================================
// COS Scraper — Main entry point
// Capital One Shopping deal scraper
// ============================================================

// Re-export everything
export * from "./types";

// Trending / Feed
export {
  fetchTrending,
  fetchPriceDrops,
  fetchExclusiveOffers,
  fetchRewardsOffers,
  fetchCategories,
  fetchLiveEvents,
} from "./trending";

// Products / Category browsing
export {
  browseCategory,
  browseCategoryAll,
  getCategories,
  findCategory,
  searchProducts,
  getCategoryBrands,
} from "./products";

// Product detail
export {
  fetchProductDetail,
  fetchProductByUrl,
  fetchEvent,
  getPricingSummary,
} from "./product-detail";

// Utilities
export {
  clearCache,
  getCached,
  setCache,
  centsToDollars,
  productUrl,
  categoryUrl,
  eventUrl,
  CosScraperError,
} from "./utils";
