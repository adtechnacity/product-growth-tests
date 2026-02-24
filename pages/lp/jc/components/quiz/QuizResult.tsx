import { useState } from "react";
import type { QuizAnswers } from "./types";
import type { COSMerchantData } from "@/lib/cos-data";
import { calculateSavings } from "@/lib/quiz-calculator";
import { CTA_URL } from "@/components/cta-block";
import ResultHeadline from "./ResultHeadline";
import MerchantCard from "./MerchantCard";

interface QuizResultProps {
  answers: QuizAnswers;
  merchants: COSMerchantData[];
  isActive: boolean;
}

const TOP_COUNT = 5;

export default function QuizResult({ answers, merchants, isActive }: QuizResultProps) {
  const [expanded, setExpanded] = useState(false);

  const totalDeals = merchants.reduce((sum, m) => sum + m.dealCount, 0);
  const result = calculateSavings(answers, totalDeals);

  const topMerchants = merchants.slice(0, TOP_COUNT);
  const remainingMerchants = merchants.slice(TOP_COUNT);
  const hasMore = remainingMerchants.length > 0;

  const ctaCopy =
    result.variant === "dollar_range"
      ? `Start Saving $${result.savingsLow.toLocaleString("en-US")} – $${result.savingsHigh.toLocaleString("en-US")}/Year`
      : "Get Started — It\u2019s Free";

  return (
    <div className="flex flex-col items-center min-h-full px-6 py-8 overflow-y-auto">
      <ResultHeadline result={result} merchants={merchants} isActive={isActive} />

      {/* Merchant cards section */}
      <div className="w-full max-w-sm">
        <h3 className="text-[15px] font-semibold text-gray-700 mb-2">
          Top travel deals for you
        </h3>

        <div className="bg-gray-50 rounded-xl px-4">
          {topMerchants.map((m) => (
            <MerchantCard key={m.domain} merchant={m} />
          ))}

          {expanded &&
            remainingMerchants.map((m) => (
              <MerchantCard key={m.domain} merchant={m} />
            ))}
        </div>

        {hasMore && (
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="mt-2 text-[14px] text-cta-blue hover:underline cursor-pointer w-full text-center"
          >
            {expanded
              ? "Show fewer"
              : `+ ${remainingMerchants.length} more travel sites`}
          </button>
        )}
      </div>

      {/* CTA */}
      <div className="flex flex-col items-center gap-3 mt-8 w-full max-w-sm">
        <a className="btn" href={CTA_URL}>
          {ctaCopy}
        </a>
        <p className="text-[13px] text-gray-400">
          Free &middot; 2 min setup &middot; 11M users
        </p>
      </div>
    </div>
  );
}
