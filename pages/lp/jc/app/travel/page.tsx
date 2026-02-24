import type { Metadata } from "next";
import { getTravelMerchants, getChromeStats, getCOSData, getMerchants } from "@/lib/cos-data";
import { generateToastItems } from "@/app/lib/toast-messages";
import TravelPage from "@/components/TravelPage";

export const metadata: Metadata = {
  title: "Travel Savings | Capital One Shopping",
  description:
    "Discover how Capital One Shopping helps you find travel deals, coupon codes, and cashback on flights, hotels, and more.",
};

export default function TravelRoute() {
  const merchants = getTravelMerchants();
  const allMerchants = getMerchants();
  const chromeStats = getChromeStats();
  const toastItems = generateToastItems(getCOSData());
  return <TravelPage merchants={merchants} allMerchants={allMerchants} chromeStats={chromeStats} toastItems={toastItems} />;
}
