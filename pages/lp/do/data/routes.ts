export interface Route {
  origin: string;
  originCity: string;
  destination: string;
  destinationCity: string;
  standardPriceRange: { low: number; high: number };
  cosFoundRange: { low: number; high: number };
  averageSaving: number;
}

export const ROUTES: Route[] = [
  { origin: "JFK", originCity: "New York",      destination: "CDG", destinationCity: "Paris",      standardPriceRange: { low: 480, high: 920  }, cosFoundRange: { low: 395, high: 755 }, averageSaving: 165 },
  { origin: "JFK", originCity: "New York",      destination: "LHR", destinationCity: "London",     standardPriceRange: { low: 390, high: 760  }, cosFoundRange: { low: 320, high: 625 }, averageSaving: 140 },
  { origin: "JFK", originCity: "New York",      destination: "FCO", destinationCity: "Rome",       standardPriceRange: { low: 460, high: 880  }, cosFoundRange: { low: 378, high: 722 }, averageSaving: 152 },
  { origin: "JFK", originCity: "New York",      destination: "LIS", destinationCity: "Lisbon",     standardPriceRange: { low: 380, high: 720  }, cosFoundRange: { low: 312, high: 590 }, averageSaving: 128 },
  { origin: "LAX", originCity: "Los Angeles",   destination: "NRT", destinationCity: "Tokyo",      standardPriceRange: { low: 580, high: 1080 }, cosFoundRange: { low: 476, high: 886 }, averageSaving: 198 },
  { origin: "LAX", originCity: "Los Angeles",   destination: "CDG", destinationCity: "Paris",      standardPriceRange: { low: 560, high: 1040 }, cosFoundRange: { low: 460, high: 853 }, averageSaving: 190 },
  { origin: "LAX", originCity: "Los Angeles",   destination: "SYD", destinationCity: "Sydney",     standardPriceRange: { low: 720, high: 1340 }, cosFoundRange: { low: 590, high: 1099}, averageSaving: 248 },
  { origin: "LAX", originCity: "Los Angeles",   destination: "LHR", destinationCity: "London",     standardPriceRange: { low: 530, high: 980  }, cosFoundRange: { low: 435, high: 804 }, averageSaving: 182 },
  { origin: "ORD", originCity: "Chicago",       destination: "LHR", destinationCity: "London",     standardPriceRange: { low: 420, high: 800  }, cosFoundRange: { low: 345, high: 656 }, averageSaving: 145 },
  { origin: "ORD", originCity: "Chicago",       destination: "AMS", destinationCity: "Amsterdam",  standardPriceRange: { low: 400, high: 760  }, cosFoundRange: { low: 328, high: 624 }, averageSaving: 138 },
  { origin: "MIA", originCity: "Miami",         destination: "CUN", destinationCity: "Cancun",     standardPriceRange: { low: 160, high: 360  }, cosFoundRange: { low: 131, high: 295 }, averageSaving:  55 },
  { origin: "MIA", originCity: "Miami",         destination: "GRU", destinationCity: "São Paulo",  standardPriceRange: { low: 500, high: 940  }, cosFoundRange: { low: 410, high: 771 }, averageSaving: 172 },
  { origin: "SFO", originCity: "San Francisco", destination: "FCO", destinationCity: "Rome",       standardPriceRange: { low: 560, high: 1060 }, cosFoundRange: { low: 459, high: 869 }, averageSaving: 192 },
  { origin: "ATL", originCity: "Atlanta",       destination: "BCN", destinationCity: "Barcelona",  standardPriceRange: { low: 480, high: 900  }, cosFoundRange: { low: 394, high: 738 }, averageSaving: 165 },
  { origin: "BOS", originCity: "Boston",        destination: "DUB", destinationCity: "Dublin",     standardPriceRange: { low: 340, high: 680  }, cosFoundRange: { low: 279, high: 558 }, averageSaving: 118 },
];

export const ORIGINS = Array.from(new Set(ROUTES.map((r) => r.origin))).map((code) => {
  const route = ROUTES.find((r) => r.origin === code)!;
  return { code, city: route.originCity };
});

export function getDestinationsForOrigin(origin: string) {
  return ROUTES
    .filter((r) => r.origin === origin)
    .map((r) => ({ code: r.destination, city: r.destinationCity }));
}
