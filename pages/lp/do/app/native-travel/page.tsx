"use client";

import SiteHeader from "@/components/SiteHeader";
import BoardingPassComparison from "@/components/BoardingPassComparison";
import HeroCTA from "@/components/HeroCTA";
import OptionCPreview from "@/components/OptionCPreview";
import Step2Preview from "@/components/Step2Preview";
import Step3Preview from "@/components/Step3Preview";
import FooterProof from "@/components/FooterProof";
import ConciergeWidget from "@/components/ConciergeWidget";
import SavingsCalculator from "@/components/SavingsCalculator";


export default function NativeTravelPage() {
  return (
    <div className="bg-cream">

      {/* ── HERO: full viewport, peek label anchored at bottom ── */}
      <div className="flex flex-col" style={{ height: "100vh" }}>

        <SiteHeader />

        {/* Hero content — text left, receipts right */}
        <div className="flex-1 flex items-center w-full max-w-[1200px] mx-auto px-5">
          <div className="flex items-center gap-12 w-full">

            <div className="flex-1 min-w-0">
              <HeroCTA />
            </div>

            <div className="shrink-0 hidden md:block">
              <BoardingPassComparison />
            </div>

          </div>
        </div>

        {/* Peek label — sits at very bottom of hero, above the navy section */}
        <div className="flex flex-col items-center gap-1.5 pb-5">
          <p
            style={{ fontFamily: "'Shadows Into Light', cursive" }}
            className="text-[32px] text-text-muted"
          >
            Here&apos;s the 3-step trick Linda used.
          </p>
          <button
            onClick={() => {
              const el = document.getElementById("step-1");
              if (!el) return;
              const offset = Math.max(0, (window.innerHeight - el.getBoundingClientRect().height) / 2);
              window.scrollTo({ top: window.scrollY + el.getBoundingClientRect().top - offset, behavior: "smooth" });
            }}
            aria-label="Scroll to steps"
            className="opacity-60 hover:opacity-100 transition-opacity duration-300 animate-scroll-cue"
          >
            <svg
              width="24" height="24" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round"
              className="text-text-muted"
            >
              <path d="M6 10l6 6 6-6" />
            </svg>
          </button>
        </div>

      </div>

      {/* ── NAVY SECTION: each step = 90vh, content centered, next step peeks ── */}
      <div className="w-full bg-navy">

        <section id="step-1" className="h-screen flex items-center w-full">
          <div className="max-w-[1200px] mx-auto px-5 w-full">
            <OptionCPreview />
          </div>
        </section>

        <section id="step-2" className="h-screen flex items-center w-full">
          <div className="max-w-[1200px] mx-auto px-5 w-full">
            <Step2Preview />
          </div>
        </section>

        <section id="step-3" className="h-screen flex items-center w-full">
          <div className="max-w-[1200px] mx-auto px-5 w-full">
            <Step3Preview />
          </div>
        </section>

      </div>

      {/* ── SAVINGS CALCULATOR ── */}
      <SavingsCalculator />

      {/* ── FOOTER ── */}
      <div className="w-full bg-navy">
        <main className="max-w-[1200px] mx-auto px-5 py-16">
          <FooterProof />
        </main>
      </div>

      {/* ── FLOATING CONCIERGE WIDGET ── */}
      <ConciergeWidget />

    </div>
  );
}
