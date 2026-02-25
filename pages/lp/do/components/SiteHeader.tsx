"use client";

export default function SiteHeader() {
  return (
    <header className="w-full bg-white border-b border-[#E8E2D9]">
      <div className="max-w-[1200px] mx-auto px-5 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[17px]">✈</span>
          <span className="text-[15px] font-bold text-navy tracking-tight">SmartFares</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-[11px] text-text-muted">Free · No credit card required</span>
          <div className="flex items-center gap-1 text-[11px] text-text-muted">
            <span className="text-amber-400 text-[12px]">★★★★★</span>
            <span>11M+ users</span>
          </div>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("openConcierge"))}
            className="btn hidden sm:inline-flex items-center px-4 h-8 bg-navy hover:bg-navy-hover text-white text-[12px] font-semibold rounded-lg transition-colors duration-150"
          >
            Find your coupon codes
          </button>
        </div>
      </div>
    </header>
  );
}
