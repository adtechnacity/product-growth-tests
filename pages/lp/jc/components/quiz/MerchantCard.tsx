import { useState } from "react";
import type { COSMerchantData } from "@/lib/cos-data";
import { getDisplayCashback } from "@/lib/cos-data";

interface MerchantCardProps {
  merchant: COSMerchantData;
}

function LogoFallback({ name }: { name: string }) {
  return (
    <div className="w-10 h-10 rounded-lg bg-cta-blue/10 flex items-center justify-center flex-shrink-0">
      <span className="text-cta-blue font-semibold text-[16px]">
        {name.charAt(0)}
      </span>
    </div>
  );
}

function getDealLine(merchant: COSMerchantData): string {
  const cashback = getDisplayCashback(merchant);
  const codeCount = merchant.couponCodes.length;

  if (codeCount > 0 && cashback) {
    return `${codeCount} codes \u00B7 ${cashback} back`;
  }
  if (cashback) {
    return `${merchant.dealCount} deals \u00B7 ${cashback} back`;
  }
  if (codeCount > 0) {
    return `${codeCount} coupon codes`;
  }
  return `${merchant.dealCount} deals`;
}

export default function MerchantCard({ merchant }: MerchantCardProps) {
  const [imgError, setImgError] = useState(false);
  const logoUrl = `https://images.capitaloneshopping.com/api/v1/logos?domain=${merchant.domain}&width=300`;

  return (
    <div className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-b-0">
      {imgError ? (
        <LogoFallback name={merchant.displayName} />
      ) : (
        <img
          src={logoUrl}
          alt={`${merchant.displayName} logo`}
          width={40}
          height={40}
          className="w-10 h-10 rounded-lg object-contain flex-shrink-0"
          onError={() => setImgError(true)}
        />
      )}
      <div className="min-w-0">
        <p className="text-[16px] font-medium text-gray-900 truncate">
          {merchant.displayName}
        </p>
        <p className="text-[14px] text-gray-500">
          {getDealLine(merchant)}
        </p>
      </div>
    </div>
  );
}
