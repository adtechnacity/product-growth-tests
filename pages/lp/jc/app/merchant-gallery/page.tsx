import type { Metadata } from "next";
import { MerchantGallery } from "@/components/MerchantGallery";
import type { COSMerchantData } from "@/scripts/cos/types";
import cosDataDefaults from "@/data/cos-data.defaults.json";

export const metadata: Metadata = {
  title: "Merchant Gallery — Capital One Shopping",
  description: "See deals, cashback rates, and promo codes from top travel and retail merchants.",
};

const CTA_URL = "https://cos-rd.com/go";

export default function MerchantGalleryPage() {
  const merchants = cosDataDefaults.merchants as COSMerchantData[];
  const travel = merchants.filter((m) => m.category === "travel");
  const retail = merchants.filter((m) => m.category === "retail");

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-[960px] px-6 py-8 md:px-12">
        <header className="mb-8">
          <h1 className="text-headline text-[1.8125rem] md:text-[2.75rem] font-bold leading-tight mb-2">
            Deals You&apos;re Missing Out On
          </h1>
          <p className="text-gray-600 text-lg">
            Capital One Shopping automatically finds deals at checkout across
            hundreds of stores. Here are just a few.
          </p>
        </header>

        <div className="space-y-10">
          <MerchantGallery merchants={travel} title="Travel Deals" />

          <div className="flex justify-center">
            <a className="btn" href={CTA_URL}>
              Add to Browser — It&apos;s free.
            </a>
          </div>

          <MerchantGallery merchants={retail} title="Top Retail Deals" />

          <div className="flex justify-center">
            <a className="btn" href={CTA_URL}>
              Add to Browser — It&apos;s free.
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
