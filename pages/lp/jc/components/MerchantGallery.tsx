import type { COSMerchantData } from "@/lib/cos-data";

interface MerchantGalleryProps {
  merchants: COSMerchantData[];
  title?: string;
}

function MerchantCard({ merchant }: { merchant: COSMerchantData }) {
  const logoUrl = `https://images.capitaloneshopping.com/api/v1/logos?domain=${merchant.domain}&width=300`;
  const codeCount = merchant.couponCodes.length;

  return (
    <div className="flex items-center gap-4 rounded-lg border border-gray-200 p-4">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logoUrl}
        alt={`${merchant.displayName} logo`}
        width={80}
        height={40}
        loading="lazy"
        className="h-10 w-20 shrink-0 object-contain"
      />
      <div className="min-w-0">
        <p className="font-bold text-headline">{merchant.displayName}</p>
        <p className="text-sm text-gray-600">
          {merchant.dealCount} deals
          {merchant.cashbackRate && (
            <span> &middot; {merchant.cashbackRate} back</span>
          )}
          {codeCount > 0 && (
            <span>
              {" "}
              &middot; {codeCount} promo {codeCount === 1 ? "code" : "codes"}
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

export function MerchantGallery({ merchants, title }: MerchantGalleryProps) {
  if (merchants.length === 0) return null;

  return (
    <section>
      {title && (
        <h2 className="text-xl font-bold text-headline mb-4">{title}</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {merchants.map((merchant) => (
          <MerchantCard key={merchant.domain} merchant={merchant} />
        ))}
      </div>
    </section>
  );
}
