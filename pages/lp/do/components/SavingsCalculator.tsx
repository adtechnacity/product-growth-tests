"use client";

import { useEffect, useRef, useState } from "react";

const INTL_SAVINGS = 320;
const DOM_SAVINGS  = 85;
const MIN_TRIPS    = 1;
const MAX_TRIPS    = 6;

function useAnimatedNumber(target: number, duration = 480) {
  const [display, setDisplay] = useState(target);
  const rafRef  = useRef<number | null>(null);
  const fromRef = useRef(target);

  useEffect(() => {
    const from  = fromRef.current;
    const start = performance.now();
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);

    function step(now: number) {
      const t     = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(from + (target - from) * eased));
      if (t < 1) rafRef.current = requestAnimationFrame(step);
      else fromRef.current = target;
    }

    rafRef.current = requestAnimationFrame(step);
    return () => { if (rafRef.current !== null) cancelAnimationFrame(rafRef.current); };
  }, [target, duration]);

  return display;
}

export default function SavingsCalculator() {
  const [trips, setTrips]   = useState(3);
  const [isIntl, setIsIntl] = useState(true);

  const target   = trips * (isIntl ? INTL_SAVINGS : DOM_SAVINGS);
  const animated = useAnimatedNumber(target);

  return (
    <section className="w-full bg-[#F5F1EB] py-20 border-t border-dashed border-[#D4CEC6]">
      <div className="max-w-[1200px] mx-auto px-5 flex flex-col items-center text-center">

        <p className="text-[10px] font-semibold tracking-[0.14em] uppercase text-text-muted opacity-70 mb-3">
          Savings estimator
        </p>
        <h2 className="text-[38px] sm:text-[44px] font-bold text-text-primary leading-tight mb-3">
          How much could you<br />save in a year?
        </h2>
        <p className="text-[16px] text-text-muted leading-relaxed mb-10">
          Tell us how you travel and we&apos;ll show you the numbers.
        </p>

        {/* Single card */}
        <div className="w-full max-w-[560px] bg-white rounded-2xl border border-[#E8E2D9] shadow-sm px-7 py-7">

          {/* Trip type */}
          <div className="flex rounded-xl border border-[#E8E2D9] overflow-hidden mb-7">
            <button
              onClick={() => setIsIntl(false)}
              className={`flex-1 py-3 text-[14px] font-medium transition-colors duration-200
                ${!isIntl ? "bg-[#1B2A4A] text-white" : "text-gray-400 hover:text-gray-600"}`}
            >
              Mostly Domestic
            </button>
            <button
              onClick={() => setIsIntl(true)}
              className={`flex-1 py-3 text-[14px] font-medium transition-colors duration-200
                ${isIntl ? "bg-[#1B2A4A] text-white" : "text-gray-400 hover:text-gray-600"}`}
            >
              Mostly International
            </button>
          </div>

          {/* Trips per year stepper */}
          <div className="flex items-center justify-between mb-7">
            <span className="text-[14px] text-text-muted">Trips per year</span>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setTrips((t) => Math.max(MIN_TRIPS, t - 1))}
                disabled={trips === MIN_TRIPS}
                className="w-9 h-9 rounded-lg border border-[#E8E2D9] text-[20px] text-gray-500
                  hover:border-[#1B2A4A] hover:text-[#1B2A4A] disabled:opacity-30
                  disabled:cursor-not-allowed transition-all flex items-center justify-center"
              >−</button>
              <span className="text-[22px] font-bold text-[#1B2A4A] w-6 text-center tabular-nums">{trips}</span>
              <button
                onClick={() => setTrips((t) => Math.min(MAX_TRIPS, t + 1))}
                disabled={trips === MAX_TRIPS}
                className="w-9 h-9 rounded-lg border border-[#E8E2D9] text-[20px] text-gray-500
                  hover:border-[#1B2A4A] hover:text-[#1B2A4A] disabled:opacity-30
                  disabled:cursor-not-allowed transition-all flex items-center justify-center"
              >+</button>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-[#F0EDE8] mb-6" />

          {/* Result — inline in same card */}
          <div className="flex items-baseline justify-between">
            <span className="text-[14px] text-text-muted">Estimated annual savings</span>
            <span className="text-[32px] font-extrabold text-[#1B2A4A] tabular-nums leading-none">
              ${animated.toLocaleString()}
            </span>
          </div>
          <p className="text-[12px] text-text-muted mt-2 text-right">
            Enough for an extra trip, or a business class upgrade.
          </p>

        </div>

        {/* CTA */}
        <a
          href="https://chromewebstore.google.com/detail/capital-one-shopping-save/nenlahapcbofgnanklpelkaejcehkggg?hl=en-US"
          target="_blank"
          rel="noopener noreferrer"
          className="btn mt-7 w-full max-w-[560px] h-[56px] bg-navy hover:bg-navy-hover text-white text-[16px] font-semibold rounded-xl transition-colors duration-150 flex items-center justify-center"
        >
          Add to Chrome, it&apos;s free
        </a>
        <div className="flex items-center gap-2 mt-3">
          <span className="text-amber-400 text-[14px] tracking-tight">★★★★★</span>
          <span className="text-[12px] text-text-muted opacity-70">11M+ users</span>
        </div>

      </div>
    </section>
  );
}
