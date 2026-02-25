"use client";

import { useEffect, useState } from "react";

// Card 1 visual — Skyscanner logo cropped to circle
function InstallVisual() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="relative">
        <svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <clipPath id="skyscanner-clip">
              <circle cx="40" cy="40" r="40" />
            </clipPath>
          </defs>
          <circle cx="40" cy="40" r="40" fill="#00A1DE" />
          {/* S traced as a thick stroked bezier path — matches Skyscanner logo proportions */}
          <path
            d="M 57,16 C 60,7 14,7 14,27 C 14,43 66,40 66,56 C 66,73 20,74 20,63"
            fill="none"
            stroke="white"
            strokeWidth="15"
            strokeLinecap="round"
            clipPath="url(#skyscanner-clip)"
          />
        </svg>
        {/* Extension badge */}
        <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-amber-400 rounded-full flex items-center justify-center shadow-sm">
          <span className="text-[13px]">+</span>
        </div>
      </div>
    </div>
  );
}

// Card 2 visual — animated route scan progress bar
function ScanVisual() {
  const [progress, setProgress] = useState(35);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) return 20;
        return p + 2;
      });
    }, 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-3 px-6 w-full">
      <div className="w-full">
        {/* Progress bar */}
        <div className="h-[6px] bg-[#E8E2D9] rounded-full overflow-hidden mb-3">
          <div
            className="h-full bg-navy rounded-full transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-[11px] text-text-muted text-center mb-0.5">Trying coupon codes…</p>
        <p className="text-[13px] font-bold text-text-primary text-center">JFK → CDG</p>
      </div>
    </div>
  );
}

// Card 3 visual — price comparison result
function SaveVisual() {
  const fares = [
    { code: "Standard fare", price: "$4,800", saved: false },
    { code: "SmartFares fare", price: "$780", saved: true },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-full gap-2 px-6 w-full">
      {fares.map(({ code, price, saved }) => (
        <div
          key={code}
          className={`w-full flex items-center justify-between rounded-lg px-3 py-2
            ${saved ? "bg-[#F0FBF4] border border-[#B6E6C9]" : "bg-[#F8F7F4] border border-[#E8E2D9]"}`}
        >
          <span className={`text-[10px] font-medium ${saved ? "text-price-green" : "text-text-muted"}`}>
            {code}
          </span>
          <div className="flex items-center gap-1.5">
            <span className={`text-[13px] font-bold ${saved ? "text-price-green" : "text-[#C8C2BB] line-through"}`}>
              {price}
            </span>
            {saved && <span className="text-price-green text-[12px]">✓</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

const steps = [
  {
    number: "1",
    title: "Install",
    body: "Add Capital One Shopping once — it runs quietly in the background while you plan your trips.",
    Visual: InstallVisual,
  },
  {
    number: "2",
    title: "Shop",
    body: "Search flights, hotels, or rental cars like you normally do. No new websites to learn.",
    Visual: ScanVisual,
  },
  {
    number: "3",
    title: "Save",
    body: "Capital One Shopping checks for better prices and offers automatically, so you don't miss hidden travel deals.",
    Visual: SaveVisual,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-12">
      <h2 className="text-[28px] sm:text-[32px] font-bold text-text-primary text-center mb-2 leading-tight">
        Easy as 1, 2, 3.
      </h2>
      <p className="text-[13px] text-text-muted text-center mb-10">
        How Gary flew Business Class for $780 instead of $4,800
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {steps.map(({ number, title, body, Visual }) => (
          <div
            key={number}
            className="bg-white rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.07)] border border-[#F0EDE8] flex flex-col overflow-hidden"
          >
            {/* Visual area */}
            <div className="h-[180px] flex items-center justify-center bg-[#FAFAF8] border-b border-[#F0EDE8]">
              <Visual />
            </div>

            {/* Text area */}
            <div className="px-5 py-4">
              <p className="text-[13px] font-bold text-text-primary mb-0.5">
                {number}. {title}
              </p>
              <p className="text-[12px] text-text-muted leading-relaxed">{body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
