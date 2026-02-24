import { useState, useEffect, useRef } from "react";
import type { SavingsResult } from "@/lib/quiz-calculator";
import type { COSMerchantData } from "@/lib/cos-data";

interface ResultHeadlineProps {
  result: SavingsResult;
  merchants: COSMerchantData[];
  isActive: boolean;
}

function formatDollars(n: number): string {
  return Math.round(n).toLocaleString("en-US");
}

function useCountUp(target: number, active: boolean, duration = 1000): number {
  const [value, setValue] = useState(0);
  const startTime = useRef<number | null>(null);
  const rafId = useRef<number>(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!active || target === 0 || hasAnimated.current) {
      if (!active) setValue(0);
      return;
    }

    hasAnimated.current = true;
    startTime.current = null;

    function tick(timestamp: number) {
      if (startTime.current === null) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out: 1 - (1 - t)^3
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));

      if (progress < 1) {
        rafId.current = requestAnimationFrame(tick);
      } else {
        setValue(target); // snap to exact
      }
    }

    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, [target, active, duration]);

  return value;
}

export default function ResultHeadline({
  result,
  merchants,
  isActive,
}: ResultHeadlineProps) {
  if (result.variant === "dollar_range") {
    return <DollarRangeHeadline result={result} isActive={isActive} />;
  }

  return (
    <DealCountHeadline
      result={result}
      merchants={merchants}
      isActive={isActive}
    />
  );
}

function DollarRangeHeadline({
  result,
  isActive,
}: {
  result: SavingsResult;
  isActive: boolean;
}) {
  const animLow = useCountUp(result.savingsLow, isActive);
  const animHigh = useCountUp(result.savingsHigh, isActive);

  return (
    <div className="text-center mb-8">
      <p className="text-[20px] font-medium text-gray-700 mb-1">
        You could save
      </p>
      <p className="text-[28px] md:text-[36px] font-bold text-cta-blue leading-tight">
        ${formatDollars(animLow)} &ndash; ${formatDollars(animHigh)}
      </p>
      <p className="text-[20px] font-medium text-gray-700 mt-1">
        per year on travel
      </p>
      {(result.frequencyLabel || result.partyLabel) && (
        <p className="text-[15px] text-gray-500 mt-3">
          Based on {result.frequencyLabel}
          {result.frequencyLabel && result.partyLabel && " for "}
          {result.partyLabel}
        </p>
      )}
    </div>
  );
}

function DealCountHeadline({
  result,
  merchants,
  isActive,
}: {
  result: SavingsResult;
  merchants: COSMerchantData[];
  isActive: boolean;
}) {
  const animDeals = useCountUp(result.totalDeals, isActive);

  const top3 = merchants.slice(0, 3).map((m) => m.displayName);
  const top3Text =
    top3.length === 3
      ? `${top3[0]}, ${top3[1]}, and ${top3[2]}`
      : top3.join(" and ");

  return (
    <div className="text-center mb-8">
      <p className="text-[20px] font-medium text-gray-700 mb-1">We found</p>
      <p className="text-[28px] md:text-[36px] font-bold text-cta-blue leading-tight">
        {animDeals} active deals
      </p>
      <p className="text-[20px] font-medium text-gray-700 mt-1">
        across your favorite travel sites
      </p>
      {top3.length > 0 && (
        <p className="text-[15px] text-gray-500 mt-3">
          Including {top3Text}
        </p>
      )}
    </div>
  );
}
