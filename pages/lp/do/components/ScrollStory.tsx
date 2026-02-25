"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const TOTAL_FRAMES = 5;

const FRAMES = [
  {
    tag: "The search",
    headline: "Linda found the same flight everyone else found.",
    body: "Business Class. JFK → CDG. $4,800. The price hadn't moved in weeks.",
  },
  {
    tag: "The fix",
    headline: "One click. Free. 30 seconds.",
    body: "A friend mentioned Capital One Shopping. Linda added it to Chrome without thinking much of it.",
  },
  {
    tag: "Running quietly",
    headline: "It works in the background while you browse.",
    body: "No new websites. No extra steps. Capital One Shopping scans automatically.",
  },
  {
    tag: "The moment",
    headline: "Linda's price just changed.",
    body: "Same seat. Same flight. Same cabin. Capital One Shopping surfaced it for $780.",
  },
  {
    tag: "Checkout",
    headline: "Same seat. Same cabin. $4,020 less.",
    body: "The coupon applied automatically at checkout. Linda didn't lift a finger.",
  },
];

// ── Capital One Shopping brand icon ─────────────────────────────
function COSIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="6" fill="#F5820A" />
      {/* Receipt lines */}
      <path d="M9 10h14M9 15h10M9 20h7" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      {/* Check badge */}
      <circle cx="23" cy="21" r="5" fill="white" />
      <path d="M20.5 21l1.7 1.7 2.8-3.2" stroke="#28A745" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Shared browser chrome wrapper ────────────────────────────────
function BrowserChrome({
  url,
  showExt = false,
  extActive = false,
  children,
}: {
  url: string;
  showExt?: boolean;
  extActive?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="w-full rounded-xl overflow-hidden shadow-[0_16px_60px_rgba(0,0,0,0.2)] border border-gray-200/80 bg-white">
      {/* Chrome toolbar */}
      <div className="bg-[#F1F3F4] px-3 py-2 flex items-center gap-2 border-b border-gray-200">
        {/* Traffic lights */}
        <div className="flex gap-1.5 shrink-0">
          <span className="block w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <span className="block w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="block w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        </div>
        {/* Address bar */}
        <div className="flex-1 bg-white rounded-full px-2.5 py-[3px] text-[10px] text-gray-400 border border-gray-200 flex items-center gap-1 min-w-0">
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="shrink-0 text-gray-300">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span className="truncate">{url}</span>
        </div>
        {/* Extension icons area */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Puzzle piece (extensions) */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#9AA0A6">
            <path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7 1.49 0 2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z" />
          </svg>
          {showExt && (
            <div
              className={`w-[22px] h-[22px] rounded flex items-center justify-center transition-all duration-700 ${
                extActive
                  ? "ring-2 ring-orange-400 ring-offset-1 shadow-[0_0_10px_rgba(245,130,10,0.55)]"
                  : "opacity-70"
              }`}
            >
              <COSIcon size={18} />
            </div>
          )}
        </div>
      </div>
      <div className="bg-white">{children}</div>
    </div>
  );
}

// ── Frame 0: Google Flights — $4,800 ────────────────────────────
function Frame0Visual() {
  return (
    <BrowserChrome url="flights.google.com" showExt={false}>
      <div className="p-4">
        {/* Google Flights mini-header */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[15px] font-bold" style={{ fontFamily: "sans-serif" }}>
            <span style={{ color: "#4285F4" }}>G</span>
            <span style={{ color: "#EA4335" }}>o</span>
            <span style={{ color: "#FBBC05" }}>o</span>
            <span style={{ color: "#4285F4" }}>g</span>
            <span style={{ color: "#34A853" }}>l</span>
            <span style={{ color: "#EA4335" }}>e</span>
          </span>
          <span className="text-[11px] text-gray-500 font-medium">Flights</span>
          <span className="text-gray-300 mx-0.5">·</span>
          <span className="text-[10px] text-gray-400">JFK → CDG · Mar 15 · Business</span>
        </div>

        {/* Result card */}
        <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div className="px-3 py-3 bg-white">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-[#E3234C] flex items-center justify-center shrink-0">
                  <span className="text-white text-[7px] font-extrabold">DL</span>
                </div>
                <span className="text-[11px] font-semibold text-gray-800">Delta Air Lines</span>
                <span className="text-[9px] text-gray-400">DL 401 · Nonstop</span>
              </div>
              <span className="text-[9px] text-gray-400">7h 25m</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-center">
                  <p className="text-[17px] font-bold text-gray-900 leading-none">08:45</p>
                  <p className="text-[8px] text-gray-400 mt-0.5">JFK · New York</p>
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <div className="w-14 border-t border-dashed border-gray-300" />
                  <span className="text-[9px] text-gray-400">→</span>
                </div>
                <div className="text-center">
                  <p className="text-[17px] font-bold text-gray-900 leading-none">22:10</p>
                  <p className="text-[8px] text-gray-400 mt-0.5">CDG · Paris</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[20px] font-bold text-gray-900 leading-none">$4,800</p>
                <p className="text-[8px] text-gray-400 mt-0.5 mb-1.5">Business · per person</p>
                <button className="bg-[#1A73E8] text-white text-[9px] px-3 py-1 rounded font-medium">
                  Select
                </button>
              </div>
            </div>
          </div>
          <div className="bg-[#F8F9FA] px-3 py-1.5 border-t border-gray-100 flex items-center gap-3">
            <span className="text-[8px] text-gray-400">✓ Flat-bed seat</span>
            <span className="text-[8px] text-gray-400">✓ Lounge access</span>
            <span className="text-[8px] text-gray-400">✓ Includes taxes</span>
          </div>
        </div>

        <p className="text-[8px] text-gray-400 mt-2 text-center">
          Prices may change · Sorted by price
        </p>
      </div>
    </BrowserChrome>
  );
}

// ── Frame 1: Chrome Web Store install ───────────────────────────
function Frame1Visual() {
  const [iconVisible, setIconVisible] = useState(false);
  const [notifVisible, setNotifVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setIconVisible(true), 600);
    const t2 = setTimeout(() => setNotifVisible(true), 1100);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="relative">
      <BrowserChrome url="chromewebstore.google.com" showExt={iconVisible} extActive={false}>
        <div className="p-4 bg-[#F8F9FA]">
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            {/* Extension listing header */}
            <div className="flex gap-3 mb-3">
              <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-gray-100 shadow-sm">
                <COSIcon size={56} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-semibold text-gray-900 leading-snug">
                  Capital One Shopping: Save Now
                </p>
                <p className="text-[9px] text-gray-500 mt-0.5">capitaloneshopping.com</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-yellow-400 text-[10px]">★★★★★</span>
                  <span className="text-[8px] text-gray-400">4.7 · 100K+ reviews</span>
                </div>
              </div>
            </div>

            <p className="text-[9px] text-gray-500 mb-3 leading-relaxed">
              Automatically finds you lower prices and applies coupon codes at checkout. Completely free.
            </p>

            <div className="flex gap-2 mb-3">
              {["Coupons", "Price Compare", "Free"].map((tag) => (
                <span key={tag} className="text-[7px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            <button className="w-full bg-[#1A73E8] text-white text-[11px] font-medium py-2 rounded-md">
              Add to Chrome
            </button>
            <p className="text-[8px] text-gray-400 text-center mt-1.5">No sign-up · No payment required</p>
          </div>
        </div>
      </BrowserChrome>

      {/* Chrome "extension added" toast */}
      <div
        className={`absolute top-[44px] right-1 bg-white rounded-lg shadow-[0_4px_24px_rgba(0,0,0,0.22)] border border-gray-200 p-3 w-[195px] transition-all duration-500 z-10 ${
          notifVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <p className="text-[10px] font-semibold text-gray-800 mb-1.5">
          &ldquo;Capital One Shopping&rdquo; added to Chrome
        </p>
        <div className="flex items-center gap-2">
          <COSIcon size={14} />
          <p className="text-[9px] text-gray-500">Click the icon to activate</p>
        </div>
      </div>
    </div>
  );
}

// ── Frame 2: Extension scanning in background ────────────────────
function Frame2Visual() {
  const sites = ["delta.com", "aa.com", "united.com", "expedia.com", "kayak.com"];
  const [scanIdx, setScanIdx] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => setScanIdx((i) => (i + 1) % sites.length), 650);
    return () => clearInterval(iv);
  }, []);

  return (
    <BrowserChrome url="flights.google.com" showExt extActive>
      <div className="p-4">
        {/* Dimmed background page */}
        <div className="opacity-35 mb-3">
          <div className="border border-gray-200 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[12px] font-bold text-gray-900">DL 401 · JFK → CDG</p>
                <p className="text-[9px] text-gray-500">Business Class · Mar 15</p>
              </div>
              <p className="text-[18px] font-bold text-gray-900">$4,800</p>
            </div>
          </div>
        </div>

        {/* COS scanning popup */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-[0_6px_28px_rgba(0,0,0,0.16)] overflow-hidden">
          {/* COS orange header */}
          <div className="bg-[#F5820A] px-3 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <COSIcon size={16} />
              <span className="text-white text-[11px] font-bold tracking-wide">Capital One Shopping</span>
            </div>
            <span className="text-white/60 text-[10px]">✕</span>
          </div>

          <div className="px-3 py-3">
            <p className="text-[12px] font-semibold text-gray-800 mb-2.5">
              Searching for savings…
            </p>

            <div className="space-y-2">
              {sites.map((site, i) => (
                <div key={site} className="flex items-center justify-between">
                  <span className="text-[9px] text-gray-500 font-mono">{site}</span>
                  {i < scanIdx && (
                    <span className="text-[8px] text-gray-400">—</span>
                  )}
                  {i === scanIdx && (
                    <span className="text-[9px] text-[#F5820A] font-medium animate-pulse">
                      Checking…
                    </span>
                  )}
                  {i > scanIdx && (
                    <span className="text-[8px] text-gray-200">—</span>
                  )}
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="mt-3 h-[3px] bg-orange-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#F5820A] rounded-full transition-all duration-500"
                style={{ width: `${((scanIdx + 1) / sites.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </BrowserChrome>
  );
}

// ── Frame 3: COS popup — savings found ──────────────────────────
function Frame3Visual() {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <BrowserChrome url="flights.google.com" showExt extActive>
      <div className="p-4">
        {/* Dimmed background */}
        <div className="opacity-30 mb-3">
          <div className="border border-gray-200 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <p className="text-[12px] font-bold text-gray-900">DL 401 · JFK → CDG · Business</p>
              <p className="text-[18px] font-bold text-gray-900">$4,800</p>
            </div>
          </div>
        </div>

        {/* COS savings found popup */}
        <div
          className={`bg-white rounded-xl border border-gray-200 shadow-[0_8px_36px_rgba(0,0,0,0.22)] overflow-hidden transition-all duration-500 ${
            revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          {/* Orange header */}
          <div className="bg-[#F5820A] px-4 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <COSIcon size={18} />
              <span className="text-white text-[12px] font-bold tracking-wide">Capital One Shopping</span>
            </div>
            <span className="text-white/60 text-[11px]">✕</span>
          </div>

          <div className="px-4 py-4">
            {/* Badge */}
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <p className="text-[14px] font-bold text-gray-900">We found a better price!</p>
            </div>

            {/* Comparison card */}
            <div className="bg-[#F8F9FA] rounded-lg p-3 mb-3 border border-gray-100">
              <p className="text-[9px] text-gray-500 mb-2">JFK → CDG · Business Class · DL 401 · Mar 15</p>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-gray-400">Standard price</span>
                <span className="text-[11px] text-gray-400 line-through">$4,800</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold text-gray-800">With Capital One Shopping</span>
                <span className="text-[18px] font-extrabold text-gray-900">$780</span>
              </div>
              <div className="mt-1.5 pt-1.5 border-t border-gray-200">
                <p className="text-[10px] font-semibold text-green-600">You save $4,020 · 84% off</p>
              </div>
            </div>

            <button className="w-full bg-[#F5820A] hover:bg-[#D97008] text-white text-[12px] font-semibold py-2.5 rounded-lg transition-colors">
              Apply Savings →
            </button>
            <p className="text-[8px] text-gray-400 text-center mt-1.5">Applied automatically at checkout · Free</p>
          </div>
        </div>
      </div>
    </BrowserChrome>
  );
}

// ── Frame 4: Delta checkout + coupon fires ───────────────────────
const COUPON_CODES = ["SUMMER20", "TRAVEL15", "BCLASS10", "DELTA30", "COSAVE"];
const CIRCLE_PATH_LENGTH = 162;

function Frame4Visual({ frameProgress }: { frameProgress: number }) {
  // Phase 0: idle (0–0.20)
  // Phase 1: trying codes (0.20–0.52)
  // Phase 2: coupon applied (0.52–0.72)
  // Phase 3: price updated + circle draws (0.72–1.0)
  const phase =
    frameProgress < 0.2 ? 0 :
    frameProgress < 0.52 ? 1 :
    frameProgress < 0.72 ? 2 : 3;

  const circleProgress =
    phase === 3
      ? Math.min(1, (frameProgress - 0.72) / 0.28)
      : 0;

  const dashOffset = CIRCLE_PATH_LENGTH * (1 - circleProgress);

  const [codeIdx, setCodeIdx] = useState(0);

  useEffect(() => {
    if (phase !== 1) { setCodeIdx(0); return; }
    const iv = setInterval(() =>
      setCodeIdx((i) => Math.min(i + 1, COUPON_CODES.length - 1)), 420
    );
    return () => clearInterval(iv);
  }, [phase]);

  return (
    <BrowserChrome url="delta.com/checkout" showExt extActive>
      <div>
        {/* COS scanning / success banner */}
        {phase >= 1 && (
          <div
            className={`border-b flex items-center gap-2 px-3 py-2 transition-colors duration-500 ${
              phase >= 2 ? "bg-[#F0FBF4] border-green-200" : "bg-[#FFF8F0] border-orange-200"
            }`}
          >
            <COSIcon size={14} />
            {phase === 1 && (
              <>
                <span className="text-[10px] text-gray-700 font-medium">
                  Trying coupon codes…
                </span>
                <span className="text-[10px] font-mono text-[#F5820A] bg-orange-50 px-1.5 py-0.5 rounded border border-orange-200 min-w-[60px] text-center transition-all duration-300">
                  {COUPON_CODES[codeIdx]}
                </span>
                <div className="ml-auto flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className={`block w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                        i === codeIdx % 3 ? "bg-[#F5820A]" : "bg-orange-200"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
            {phase >= 2 && (
              <>
                <span className="text-[10px] font-semibold text-green-700">✓ Coupon applied!</span>
                <span className="text-[10px] font-mono text-green-700 bg-green-100 px-1.5 py-0.5 rounded border border-green-200">
                  COSAVE
                </span>
                <span className="text-[10px] text-green-600 font-semibold ml-auto">
                  You saved $4,020
                </span>
              </>
            )}
          </div>
        )}

        {/* Checkout content */}
        <div className="px-4 py-4">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">
            Order Summary
          </p>

          {/* Flight info */}
          <div className="flex items-start justify-between mb-3 pb-3 border-b border-dashed border-gray-200">
            <div>
              <p className="text-[11px] font-semibold text-gray-800">Business Class · JFK → CDG</p>
              <p className="text-[9px] text-gray-400 mt-0.5">DL 401 · Mar 15, 2025</p>
              <p className="text-[9px] text-gray-400">1 Passenger: Linda Henderson</p>
            </div>
            <div className="w-5 h-5 rounded bg-[#E3234C] flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-white text-[7px] font-extrabold">DL</span>
            </div>
          </div>

          {/* Fare lines */}
          <div className="space-y-1.5 mb-3">
            <div className="flex justify-between">
              <span className="text-[9px] text-gray-500">Base Fare</span>
              <span className="text-[9px] text-gray-500">$4,200</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[9px] text-gray-500">Taxes & Fees</span>
              <span className="text-[9px] text-gray-500">$600</span>
            </div>
            {phase >= 2 && (
              <div className="flex justify-between animate-fade-in">
                <span className="text-[9px] text-green-600 font-medium">Coupon (COSAVE)</span>
                <span className="text-[9px] text-green-600 font-medium">−$4,020</span>
              </div>
            )}
          </div>

          {/* Total */}
          <div className="pt-2.5 border-t border-gray-300 flex justify-between items-baseline">
            <span className="text-[10px] font-bold text-gray-800 uppercase tracking-wide">
              Total Charged
            </span>
            <span className="flex items-baseline gap-2">
              {phase >= 2 && (
                <span className="text-[12px] text-gray-400 line-through">$4,800</span>
              )}
              <span className="relative inline-block">
                <span
                  className={`text-[18px] font-extrabold transition-colors duration-500 ${
                    phase >= 2 ? "text-gray-900" : "text-gray-900"
                  }`}
                >
                  {phase >= 2 ? "$780" : "$4,800"}
                </span>

                {/* Hand-drawn circle draws itself in phase 3 */}
                {phase >= 3 && (
                  <svg
                    className="absolute pointer-events-none overflow-visible"
                    style={{ top: "-8px", left: "-13px", width: "65px", height: "36px" }}
                    viewBox="0 0 65 36"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M 29,3 C 39,0 57,2 61,10 C 65,19 60,29 49,33 C 37,37 14,35 6,28 C -1,22 0,12 5,7 C 11,2 20,4 29,3"
                      fill="none"
                      stroke="#D32F2F"
                      strokeWidth="3.5"
                      strokeOpacity="0.9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray={CIRCLE_PATH_LENGTH}
                      strokeDashoffset={dashOffset}
                      style={{ transition: "stroke-dashoffset 0.7s cubic-bezier(0.4, 0, 0.2, 1)" }}
                    />
                  </svg>
                )}
              </span>
            </span>
          </div>

          <button className="mt-4 w-full bg-[#E3234C] text-white text-[11px] font-semibold py-2.5 rounded-lg">
            Continue to Payment →
          </button>
        </div>
      </div>
    </BrowserChrome>
  );
}

// ── Main scroll story section ────────────────────────────────────
export default function ScrollStory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [frame, setFrame] = useState(0);
  const [frameProgress, setFrameProgress] = useState(0);

  useEffect(() => {
    let rafId: number;
    function onScroll() {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const el = sectionRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const scrollable = el.offsetHeight - window.innerHeight;
        if (scrollable <= 0) return;
        const scrolled = Math.max(0, -rect.top);
        const total = Math.min(1, scrolled / scrollable);
        // Keep frameProgress in [0, 0.999] to avoid edge case at end
        const frameFloat = Math.min(total * TOTAL_FRAMES, TOTAL_FRAMES - 0.001);
        setFrame(Math.floor(frameFloat));
        setFrameProgress(frameFloat - Math.floor(frameFloat));
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section ref={sectionRef} style={{ height: `${TOTAL_FRAMES * 100}vh` }}>
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="max-w-[960px] mx-auto px-5 w-full">

          {/* Section eyebrow */}
          <p className="text-[10px] font-semibold tracking-[0.14em] uppercase text-navy opacity-60 mb-8">
            How Linda did it
          </p>

          <div className="flex flex-col md:flex-row items-center gap-10">

            {/* Left: text */}
            <div className="flex-1 md:pr-6">
              <div key={frame} className="animate-fade-in">
                <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-navy opacity-50 mb-2">
                  {FRAMES[frame].tag}
                </p>
                <h3 className="text-[22px] sm:text-[26px] font-bold text-text-primary leading-snug mb-3">
                  {FRAMES[frame].headline}
                </h3>
                <p className="text-[14px] text-text-muted leading-relaxed">
                  {FRAMES[frame].body}
                </p>
              </div>

              {/* Progress indicator */}
              <div className="flex gap-2 mt-8">
                {Array.from({ length: TOTAL_FRAMES }).map((_, i) => (
                  <span
                    key={i}
                    className={`block h-1.5 rounded-full transition-all duration-400 ${
                      i === frame ? "w-6 bg-navy" : "w-1.5 bg-[#D4CEC6]"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Right: visual */}
            <div className="w-full md:w-[420px] shrink-0">
              <div key={frame} className="animate-fade-in">
                {frame === 0 && <Frame0Visual />}
                {frame === 1 && <Frame1Visual />}
                {frame === 2 && <Frame2Visual />}
                {frame === 3 && <Frame3Visual />}
                {frame === 4 && <Frame4Visual frameProgress={frameProgress} />}
              </div>
            </div>

          </div>
        </div>

        {/* Scroll hint — only on first frame */}
        {frame === 0 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-fade-in">
            <p className="text-[10px] text-text-muted">Scroll to follow Linda&apos;s story</p>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-muted animate-bounce">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        )}
      </div>
    </section>
  );
}
