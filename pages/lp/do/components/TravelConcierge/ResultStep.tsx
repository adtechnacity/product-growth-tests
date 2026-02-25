"use client";

import { useEffect, useState } from "react";
import { RouteResult, formatPrice } from "@/lib/getRouteResult";

const COS_URL =
  "https://chromewebstore.google.com/detail/capital-one-shopping-save/nenlahapcbofgnanklpelkaejcehkggg?hl=en-US";

const DISCOUNT = 0.18; // 18% off via coupon

// Destination-specific codes feel personalised and believable
const COUPON_CODES: Record<string, string> = {
  CDG: "PARIS18", LHR: "LOND18",  FCO: "ROME18",  LIS: "LIS18",
  NRT: "TOKYO18", SYD: "SYD18",   AMS: "AMS18",   CUN: "CUN15",
  GRU: "GRU18",   BCN: "BCN18",   DUB: "DUB18",
};

interface ResultStepProps {
  result: RouteResult;
  season: string;
}

export default function ResultStep({ result }: ResultStepProps) {
  const [couponVisible, setCouponVisible] = useState(false);
  const [codeRevealed, setCodeRevealed]   = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setCouponVisible(true), 400);
    const t2 = setTimeout(() => setCodeRevealed(true),  900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (!result.found) {
    return (
      <div className="animate-fade-in">
        <div className="bg-chip-bg rounded-[12px_12px_12px_4px] px-4 py-3 text-[15px] text-text-primary max-w-[88%] mb-5">
          <p className="font-semibold mb-2">Deals do appear on this route.</p>
          <p className="text-text-muted text-[14px]">
            We don&apos;t have enough recent data yet — install free and Capital
            One Shopping will alert you when prices drop.
          </p>
        </div>
        <a href={COS_URL} target="_blank" rel="noopener noreferrer"
          className="block w-full h-[54px] bg-navy hover:bg-navy-hover text-white text-[16px] font-semibold rounded-lg transition-colors flex items-center justify-center">
          Install Free to Track This Route
        </a>
      </div>
    );
  }

  const { standardPriceRange, destination, destinationCity, originCity } = result;
  const current    = standardPriceRange!.low;
  const couponCode = COUPON_CODES[destination!] ?? "TRIP18";
  const savings    = Math.round(current * DISCOUNT);
  const finalPrice = current - savings;

  return (
    <div className="animate-fade-in space-y-4">

      {/* Route label */}
      <p className="text-[13px] font-semibold text-text-primary">
        {originCity} → {destinationCity}
      </p>

      {/* ── Coupon code reveal ── */}
      <div className={`transition-all duration-500 ${couponVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"}`}>
        <div className="bg-[#F0FBF4] border border-[#B6E6C9] rounded-xl px-4 py-4">
          <div className="flex items-center gap-1.5 mb-3">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="#16A34A">
              <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            <p className="text-[12px] font-semibold text-text-primary">
              Capital One Shopping found a code for this route
            </p>
          </div>

          {/* Code chip */}
          <div className={`flex items-center justify-between bg-white border border-[#B6E6C9] rounded-lg px-3 py-2.5 mb-3 transition-all duration-500 ${codeRevealed ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
            <code className="text-[17px] font-bold tracking-[0.18em] text-text-primary">
              {couponCode}
            </code>
            <span className="text-[11px] font-semibold text-price-green bg-[#F0FBF4] border border-[#B6E6C9] px-2 py-0.5 rounded-full">
              -{Math.round(DISCOUNT * 100)}% off
            </span>
          </div>

          {/* Before / after price */}
          <div className={`flex items-baseline gap-2 transition-all duration-500 delay-150 ${codeRevealed ? "opacity-100" : "opacity-0"}`}>
            <span className="text-[12px] text-text-muted line-through">{formatPrice(current)}</span>
            <span className="text-[20px] font-extrabold text-price-green">{formatPrice(finalPrice)}</span>
            <span className="text-[11px] text-price-green font-medium">saves ~{formatPrice(savings)}</span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className={`transition-all duration-500 delay-300 ${couponVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`}>
        <a href={COS_URL} target="_blank" rel="noopener noreferrer"
          className="block w-full h-[54px] bg-navy hover:bg-navy-hover text-white text-[16px] font-semibold rounded-lg transition-colors flex items-center justify-center">
          Install Free — Get Codes Automatically
        </a>
        <p className="text-[11px] text-text-muted text-center mt-2">
          No Capital One account needed · 100% free · 30 seconds
        </p>
      </div>

    </div>
  );
}
