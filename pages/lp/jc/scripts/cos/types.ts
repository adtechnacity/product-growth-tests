export interface COSDeal {
  description: string;
  url?: string;
}

export interface COSCouponCode {
  code: string;
  description: string;
}

export interface COSCashbackCategory {
  name: string;
  rate: string;
}

export interface COSMerchantData {
  domain: string;
  displayName: string;
  category: "travel" | "retail";
  dealCount: number;
  deals: COSDeal[];
  couponCodes: COSCouponCode[];
  cashbackRate: string | null;
  cashbackType: "percentage" | "cut" | null;
  cashbackCategories?: COSCashbackCategory[];
}

export interface COSChromeStats {
  userCount: string;
  ratingValue: string;
  ratingCount: string;
}

export interface COSData {
  merchants: COSMerchantData[];
  chromeStoreStats: COSChromeStats;
  fetchedAt: string;
}
