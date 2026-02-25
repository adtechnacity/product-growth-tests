import { ROUTES, Route } from "@/data/routes";

export interface RouteResult {
  found: boolean;
  origin?: string;
  originCity?: string;
  destination?: string;
  destinationCity?: string;
  cosFoundRange?: { low: number; high: number };
  standardPriceRange?: { low: number; high: number };
  averageSaving?: number;
}

export function getRouteResult(origin: string, destination: string): RouteResult {
  const route: Route | undefined = ROUTES.find(
    (r) => r.origin === origin && r.destination === destination
  );

  if (!route) {
    return { found: false };
  }

  return {
    found: true,
    origin: route.origin,
    originCity: route.originCity,
    destination: route.destination,
    destinationCity: route.destinationCity,
    cosFoundRange: route.cosFoundRange,
    standardPriceRange: route.standardPriceRange,
    averageSaving: route.averageSaving,
  };
}

export function formatPrice(n: number): string {
  return "$" + n.toLocaleString("en-US");
}
