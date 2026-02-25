"use client";

import { ORIGINS, getDestinationsForOrigin } from "@/data/routes";

interface RouteStepProps {
  origin: string;
  destination: string;
  onOriginChange: (v: string) => void;
  onDestinationChange: (v: string) => void;
  onNext: () => void;
}

export default function RouteStep({
  origin,
  destination,
  onOriginChange,
  onDestinationChange,
  onNext,
}: RouteStepProps) {
  const destinations = origin ? getDestinationsForOrigin(origin) : [];
  const canProceed = origin && destination;

  function handleSwap() {
    // Only swap if the current destination is also a valid origin
    const newOrigin = destination;
    const newDests = getDestinationsForOrigin(newOrigin);
    const originAsDestValid = newDests.some((d) => d.code === origin);
    onOriginChange(newOrigin);
    onDestinationChange(originAsDestValid ? origin : "");
  }

  return (
    <div className="animate-fade-in">
      {/* Concierge message */}
      <div className="bg-chip-bg rounded-[12px_12px_12px_4px] px-4 py-3 text-[15px] text-text-primary max-w-[88%] mb-5">
        Where are you hoping to fly? I&apos;ll check what business class seats
        are actually going for on that route.
      </div>

      {/* Route card */}
      <div className="rounded-xl border border-gray-200 overflow-visible mb-5">

        {/* From */}
        <div className="px-4 pt-3.5 pb-3">
          <p className="text-[10px] font-semibold tracking-[0.1em] uppercase text-gray-400 mb-1.5 flex items-center gap-1.5">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" /><circle cx="12" cy="12" r="9" />
            </svg>
            From
          </p>
          <div className="relative">
            <select
              value={origin}
              onChange={(e) => {
                onOriginChange(e.target.value);
                onDestinationChange("");
              }}
              className="w-full text-[15px] font-medium text-gray-900 bg-transparent focus:outline-none appearance-none cursor-pointer pr-5 leading-snug"
            >
              <option value="" className="text-gray-400 font-normal">Select departure city</option>
              {ORIGINS.map((o) => (
                <option key={o.code} value={o.code}>
                  {o.city} ({o.code})
                </option>
              ))}
            </select>
            <svg className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>

        {/* Divider + swap */}
        <div className="relative flex items-center px-4">
          <div className="flex-1 border-t border-gray-200" />
          <button
            type="button"
            onClick={handleSwap}
            disabled={!origin || !destination}
            className="mx-2 w-6 h-6 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-400 hover:text-gray-600 hover:border-gray-300 disabled:opacity-30 transition-colors shrink-0"
            title="Swap"
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 16V4m0 0L3 8m4-4l4 4" />
              <path d="M17 8v12m0 0l4-4m-4 4l-4-4" />
            </svg>
          </button>
          <div className="flex-1 border-t border-gray-200" />
        </div>

        {/* To */}
        <div className="px-4 pt-3 pb-3.5">
          <p className="text-[10px] font-semibold tracking-[0.1em] uppercase text-gray-400 mb-1.5 flex items-center gap-1.5">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /><circle cx="12" cy="9" r="2.5" />
            </svg>
            To
          </p>
          <div className="relative">
            <select
              value={destination}
              onChange={(e) => onDestinationChange(e.target.value)}
              disabled={!origin}
              className="w-full text-[15px] font-medium text-gray-900 bg-transparent focus:outline-none appearance-none cursor-pointer pr-5 leading-snug disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <option value="" className="text-gray-400 font-normal">Select destination</option>
              {destinations.map((d) => (
                <option key={d.code} value={d.code}>
                  {d.city} ({d.code})
                </option>
              ))}
            </select>
            <svg className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>

      </div>

      {/* Next button */}
      <div className="flex justify-end">
        <button
          onClick={onNext}
          disabled={!canProceed}
          className="bg-navy hover:bg-navy-hover disabled:opacity-40 disabled:cursor-not-allowed text-white text-[14px] font-semibold px-5 h-[44px] rounded-lg transition-colors duration-150"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
