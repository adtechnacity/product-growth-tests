// ============================================================
// COS Scraper — PRODUCT mode
// Category browsing, product search by category
// ============================================================

import type {
  CategoryBrowseOptions,
  CategoryResult,
  CategoryProduct,
  CategoryData,
  BrandAggregation,
  Category,
} from "./types";
import {
  fetchRemixLoader,
  getCached,
  setCache,
  CosScraperError,
} from "./utils";

// Remix route IDs
const ROUTE_CATEGORY = "routes/__app/c.$slug.$catId";

interface CategoryLoaderData {
  offerCategories: Record<string, CategoryData>;
  currentCategoryQuery: unknown;
  CategoryPage: { lastPage: number };
  pageName: string;
}

/**
 * Browse products by category.
 *
 * Uses the Remix _data loader for fast JSON responses.
 * Returns up to 50 products per page.
 */
export async function browseCategory(
  options: CategoryBrowseOptions
): Promise<CategoryResult> {
  const { categoryId, slug, page = 1 } = options;

  const cacheKey = `cat:${categoryId}:${page}`;
  const cached = getCached<CategoryResult>(cacheKey);
  if (cached) return cached;

  const path = `/c/${slug}/${categoryId}`;
  const params: Record<string, string> = {};
  if (page > 1) {
    params.page = String(page);
  }

  const data = await fetchRemixLoader<CategoryLoaderData>(
    path,
    ROUTE_CATEGORY,
    params
  );

  const catData = data.offerCategories?.[categoryId];
  if (!catData) {
    throw new CosScraperError(
      `Category ${categoryId} not found`,
      404,
      path
    );
  }

  if (catData.category && "error" in catData.category) {
    throw new CosScraperError(
      `Category error: ${(catData.category as { error: string }).error}`,
      404,
      path
    );
  }

  const result: CategoryResult = {
    products: catData.items ?? [],
    category: catData.category,
    brands: catData.aggregations?.brands ?? [],
    total: catData.total,
    lastPage: data.CategoryPage?.lastPage ?? 0,
    timestamp: new Date().toISOString(),
  };

  setCache(cacheKey, result, 5 * 60 * 1000);
  return result;
}

/**
 * Browse ALL products in a category (multi-page).
 * Fetches pages sequentially until lastPage or maxPages.
 */
export async function browseCategoryAll(
  slug: string,
  categoryId: string,
  maxPages = 10
): Promise<CategoryResult> {
  const first = await browseCategory({ categoryId, slug, page: 1 });
  const allProducts = [...first.products];

  const totalPages = first.lastPage || 1;
  const pagesToFetch = Math.min(totalPages, maxPages);

  for (let page = 2; page <= pagesToFetch; page++) {
    try {
      const pageResult = await browseCategory({ categoryId, slug, page });
      allProducts.push(...pageResult.products);
    } catch {
      break;
    }
  }

  return {
    ...first,
    products: allProducts,
    total: first.total,
  };
}

/**
 * Get all top-level categories with their subcategories.
 * Uses the app-level loader data.
 */
export async function getCategories(): Promise<Category[]> {
  const cacheKey = "categories:all";
  const cached = getCached<Category[]>(cacheKey);
  if (cached) return cached;

  const data = await fetchRemixLoader<{ fullCategories: Category[] }>(
    "/",
    "routes/__app"
  );

  const categories = data.fullCategories ?? [];
  setCache(cacheKey, categories, 30 * 60 * 1000); // 30 min
  return categories;
}

/**
 * Find a category by name (case-insensitive).
 * Searches both top-level and subcategories.
 */
export async function findCategory(
  name: string
): Promise<{ slug: string; id: string; name: string } | null> {
  const categories = await getCategories();
  const lower = name.toLowerCase();

  for (const cat of categories) {
    if (cat.name.toLowerCase().includes(lower)) {
      return { slug: cat.slug, id: cat.id, name: cat.name };
    }
    for (const sub of cat.subCategories ?? []) {
      if (sub.name.toLowerCase().includes(lower)) {
        return { slug: sub.slug, id: sub.id, name: sub.name };
      }
    }
  }

  return null;
}

/**
 * Search for products by keyword within a category.
 * COS doesn't have a public search API, so we find the best
 * matching category and browse it.
 */
export async function searchProducts(
  keyword: string,
  maxResults = 50
): Promise<CategoryProduct[]> {
  // Find the best matching category for the keyword
  const cat = await findCategory(keyword);
  if (!cat) {
    // Fallback: search across all categories
    const categories = await getCategories();
    const results: CategoryProduct[] = [];

    for (const category of categories.slice(0, 5)) {
      try {
        const catResult = await browseCategory({
          categoryId: category.id,
          slug: category.slug,
        });
        // Filter by keyword match
        const matching = catResult.products.filter((p) => {
          const title = p.product?.title?.toLowerCase() ?? "";
          const brand = p.product?.brand?.toLowerCase() ?? "";
          const kw = keyword.toLowerCase();
          return title.includes(kw) || brand.includes(kw);
        });
        results.push(...matching);
        if (results.length >= maxResults) break;
      } catch {
        continue;
      }
    }

    return results.slice(0, maxResults);
  }

  const catResult = await browseCategory({
    categoryId: cat.id,
    slug: cat.slug,
  });

  // If keyword is more specific than the category name, filter
  const kw = keyword.toLowerCase();
  if (kw !== cat.name.toLowerCase()) {
    return catResult.products.filter((p) => {
      const title = p.product?.title?.toLowerCase() ?? "";
      const brand = p.product?.brand?.toLowerCase() ?? "";
      return title.includes(kw) || brand.includes(kw);
    });
  }

  return catResult.products;
}

/**
 * Get aggregated brand data for a category.
 * Useful for knowing what brands are available.
 */
export async function getCategoryBrands(
  slug: string,
  categoryId: string
): Promise<BrandAggregation[]> {
  const result = await browseCategory({ categoryId, slug });
  return result.brands;
}
