import type { COSData } from "@/scripts/cos/types";

export interface ToastItem {
  merchantName: string;
  domain: string;
  dealCount: number;
}

export function generateToastItems(data: COSData): ToastItem[] {
  const { merchants } = data;

  if (merchants.length === 0) return [];

  return merchants
    .filter((m) => m.dealCount > 0)
    .sort((a, b) => b.dealCount - a.dealCount)
    .map((m) => ({
      merchantName: m.displayName,
      domain: m.domain,
      dealCount: m.dealCount,
    }));
}

// Keep backward-compatible string export for any other consumers
export function generateToastMessages(data: COSData): string[] {
  return generateToastItems(data).map(
    (item) => `${item.dealCount} active deals on ${item.merchantName} right now`
  );
}
