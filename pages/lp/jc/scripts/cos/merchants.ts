export interface MerchantConfig {
  domain: string;
  displayName: string;
}

export const TRAVEL_MERCHANTS: MerchantConfig[] = [
  { domain: "expedia.com", displayName: "Expedia" },
  { domain: "hotels.com", displayName: "Hotels.com" },
  { domain: "southwest.com", displayName: "Southwest Airlines" },
  { domain: "united.com", displayName: "United Airlines" },
  { domain: "priceline.com", displayName: "Priceline" },
  { domain: "hilton.com", displayName: "Hilton" },
  { domain: "marriott.com", displayName: "Marriott" },
  { domain: "vrbo.com", displayName: "Vrbo" },
  { domain: "booking.com", displayName: "Booking.com" },
];

export const RETAIL_MERCHANTS: MerchantConfig[] = [
  { domain: "amazon.com", displayName: "Amazon" },
  { domain: "target.com", displayName: "Target" },
  { domain: "nike.com", displayName: "Nike" },
  { domain: "walmart.com", displayName: "Walmart" },
  { domain: "bestbuy.com", displayName: "Best Buy" },
  { domain: "macys.com", displayName: "Macy's" },
  { domain: "adidas.com", displayName: "Adidas" },
  { domain: "sephora.com", displayName: "Sephora" },
  { domain: "homedepot.com", displayName: "The Home Depot" },
];

export const ALL_MERCHANTS: MerchantConfig[] = [
  ...TRAVEL_MERCHANTS,
  ...RETAIL_MERCHANTS,
];
