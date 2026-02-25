"use client";

import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import ScrollCue from "./ScrollCue";

const CWS_URL = "https://chromewebstore.google.com/detail/capital-one-shopping-save/nenlahapcbofgnanklpelkaejcehkggg?hl=en-US";

export default function Step3Preview() {
  const cardRef = useRef<HTMLDivElement>(null);

  function fireConfetti() {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const originX = (rect.left + rect.width / 2) / window.innerWidth;
    const originY = (rect.top + rect.height * 0.4) / window.innerHeight;

    confetti({
      particleCount: 80,
      angle: 60,
      spread: 60,
      origin: { x: originX - 0.15, y: originY },
      colors: ["#16A34A", "#F5820A", "#1A73E8", "#EAB308", "#C8102E"],
    });
    confetti({
      particleCount: 80,
      angle: 120,
      spread: 60,
      origin: { x: originX + 0.15, y: originY },
      colors: ["#16A34A", "#F5820A", "#1A73E8", "#EAB308", "#8B5CF6"],
    });
  }

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(fireConfetti, 400);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(card);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full flex flex-col items-center text-center">

      <button
        onClick={() => {
          const el = document.getElementById("step-3");
          if (!el) return;
          const rect = el.getBoundingClientRect();
          const offset = Math.max(0, (window.innerHeight - rect.height) / 2);
          window.scrollTo({ top: window.scrollY + rect.top - offset, behavior: "smooth" });
        }}
        className="text-[10px] font-semibold tracking-[0.14em] uppercase text-amber-300 opacity-80 mb-4 cursor-pointer hover:opacity-100 transition-opacity"
      >
        Step 3 · Checkout
      </button>
      <h3 className="text-[42px] sm:text-[52px] font-bold text-white leading-tight mb-4">
        Linda paid $2,560.<br /><span className="not-italic text-white/60">Not $3,200.</span>
      </h3>
      <p className="text-[17px] text-white/60 leading-relaxed max-w-[540px] mb-3">
        The best code was already waiting. All she did was click Pay.
      </p>
      <p className="text-[17px] text-white/60 mb-8">
        Yours could look exactly like this.{" "}
        <a href={CWS_URL} target="_blank" rel="noopener noreferrer" className="relative inline-block text-white/70 hover:text-white transition-colors">
          Try it free →
          <svg style={{position:"absolute",bottom:"-2px",left:0,width:"100%",overflow:"visible"}} height="4" viewBox="0 0 100 4" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0,3 C15,1 35,4 55,2 C75,0 90,3 100,2" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          </svg>
        </a>
      </p>

      {/* Checkout card */}
      <div className="w-full max-w-[560px]">
      <div ref={cardRef} className="bg-white rounded-2xl shadow-2xl border border-gray-100">
        <div className="px-6 py-6">

          {/* Flight header */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl bg-[#E3234C] flex items-center justify-center shrink-0">
              <span className="text-white text-[10px] font-extrabold">DL</span>
            </div>
            <div>
              <p className="text-[14px] font-bold text-gray-900 leading-tight">JFK → CDG · Business Class</p>
              <p className="text-[11px] text-gray-400 mt-0.5">Delta DL401 · Nonstop · Mar 15 · 7h 25m</p>
            </div>
            <div className="ml-auto flex flex-col items-center gap-0.5 shrink-0">
              <div className="flex gap-0.5">
                {[0,1,2,3,4].map(i => <span key={i} className="text-amber-400 text-[10px]">★</span>)}
              </div>
              <span className="text-[9px] text-gray-400">Flat-bed · Lounge</span>
            </div>
          </div>

          <div className="border-t border-gray-100 mb-4" />

          {/* Price rows */}
          <div className="space-y-2 mb-4">
            <div className="flex justify-between items-center py-1">
              <span className="text-[12px] text-gray-400">Original fare</span>
              <span className="text-[13px] text-gray-300 line-through font-medium">$3,200.00</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-[12px] text-gray-700 font-medium flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Capital One Shopping · PFYWX
              </span>
              <span className="text-[13px] font-bold text-gray-900">−$640.00</span>
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center pt-3 border-t border-gray-200">
            <span className="text-[15px] font-bold text-gray-900">Total</span>
            <div className="text-right">
              <p className="text-[13px] font-bold text-green-600">
                $2,560.00
              </p>
              <p className="text-[11px] font-semibold text-green-500 mt-0.5">Saved $640 automatically</p>
            </div>
          </div>

          {/* Pay button */}
          <div className="mt-5">
            <a
              href={CWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn w-full h-[60px] bg-navy hover:bg-navy-hover text-white text-[18px] font-semibold rounded-lg transition-colors duration-150 flex items-center justify-center gap-2"
            >
              Add to Chrome, it&apos;s free
            </a>
            <p className="text-center text-[10px] text-gray-400 mt-2">Secure checkout · No booking fees</p>
          </div>

        </div>
      </div>
      </div>

      <ScrollCue targetId="concierge-section" />

    </div>
  );
}
