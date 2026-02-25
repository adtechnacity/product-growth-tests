"use client";

import { useEffect, useState } from "react";
import ScrollCue from "./ScrollCue";

const CWS_URL = "https://chromewebstore.google.com/detail/capital-one-shopping-save/nenlahapcbofgnanklpelkaejcehkggg?hl=en-US";

function COSLogo({ size = 40 }: { size?: number }) {
  return (
    <img
      src="/cos_logo.png"
      alt="Capital One Shopping"
      width={size}
      height={size}
      style={{ width: size, height: size, borderRadius: "50%", objectFit: "cover", display: "block" }}
    />
  );
}

// Hand pointer / finger cursor SVG
function PointerCursor({ pressing }: { pressing: boolean }) {
  return (
    <svg
      width="20"
      height="24"
      viewBox="0 0 20 24"
      fill="none"
      style={{
        transform: pressing ? "translateY(2px) scale(0.95)" : "translateY(0px) scale(1)",
        transition: "transform 0.1s ease-in",
        filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.35))",
      }}
    >
      {/* Palm */}
      <path
        d="M6 9V4.5a1.5 1.5 0 0 1 3 0V9m0 0V3.5a1.5 1.5 0 0 1 3 0V9m0 0V5a1.5 1.5 0 0 1 3 0v7c0 3.866-3.134 7-7 7H7a5 5 0 0 1-5-5v-3a1.5 1.5 0 0 1 3 0"
        fill="white"
        stroke="#222"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Phases:
// 0 — cursor visible on button, button in hover state
// 1 — pressing (button darkens + scales, cursor dips)
// 2 — "Added ✓" shown, cursor fades out
// 3 — brief hold, then reset → replay

export default function OptionCPreview() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    let timers: ReturnType<typeof setTimeout>[] = [];

    function runSequence() {
      timers = [
        setTimeout(() => setPhase(1), 1200),  // press
        setTimeout(() => setPhase(2), 1550),  // release → Added ✓
        setTimeout(() => setPhase(3), 3400),  // hold then reset
        setTimeout(() => { setPhase(0); runSequence(); }, 4000), // replay
      ];
    }

    runSequence();
    return () => timers.forEach(clearTimeout);
  }, []);

  const isHover   = phase === 0;
  const isPressing = phase === 1;
  const isAdded   = phase >= 2;
  const showCursor = phase <= 1;

  return (
    <div className="w-full flex flex-col items-center text-center">

      <button
        onClick={() => document.getElementById("step-1")?.scrollIntoView({ behavior: "smooth", block: "start" })}
        className="text-[10px] font-semibold tracking-[0.14em] uppercase text-amber-300 opacity-80 mb-4 cursor-pointer hover:opacity-100 transition-opacity"
      >
        Step 1 · Install
      </button>
      <h3 className="text-[42px] sm:text-[52px] font-bold text-white leading-tight mb-4">
        Linda added it to Chrome<br />in 30 seconds. <span className="not-italic text-white/40">For free.</span>
      </h3>
      <p className="text-[17px] text-white/60 leading-relaxed max-w-[540px] mb-8">
        A friend mentioned it. Linda found it{" "}
        <a href={CWS_URL} target="_blank" rel="noopener noreferrer" className="relative inline-block text-white/80 hover:text-white transition-colors">
          on the Chrome Web Store
          <svg style={{position:"absolute",bottom:"-2px",left:0,width:"100%",overflow:"visible"}} height="4" viewBox="0 0 100 4" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0,3 C15,1 35,4 55,2 C75,0 90,3 100,2" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          </svg>
        </a>
        , clicked one button, and never thought about it again.
      </p>

      {/* CWS listing card */}
      <div className="w-full max-w-[560px]">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-5 py-5">

        {/* Top row */}
        <div className="flex items-center gap-3 mb-4">
          <COSLogo size={44} />
          <div className="flex-1 min-w-0">
            <h3 className="text-[15px] font-bold text-gray-900 leading-tight">
              Capital One Shopping: Save Now
            </h3>
          </div>

          {/* Button + cursor */}
          <div className="relative shrink-0">
            <button
              disabled={isAdded}
              onClick={() => !isAdded && window.open(CWS_URL, "_blank")}
              className={`px-4 py-2 rounded-full text-[12px] font-medium min-w-[124px] text-center
                transition-all duration-200 select-none
                ${isAdded    ? "bg-[#E8F0FE] text-[#1A73E8] cursor-default" :
                  isPressing ? "bg-[#1255CC] text-white scale-95 shadow-inner" :
                  isHover    ? "bg-[#1669E8] text-white shadow-md"
                             : "bg-[#1A73E8] text-white shadow-sm"}`}
            >
              <span className={`transition-all duration-300 ${isAdded ? "opacity-0" : "opacity-100"}`}>
                Add to Chrome
              </span>
              {isAdded && (
                <span className="absolute inset-0 flex items-center justify-center animate-fade-in">
                  Added ✓
                </span>
              )}
            </button>

            {/* Pointer cursor — already on the button, no travel */}
            <div
              className={`absolute pointer-events-none transition-opacity duration-300
                ${showCursor ? "opacity-100" : "opacity-0"}`}
              style={{ bottom: "-12px", right: "8px" }}
            >
              <PointerCursor pressing={isPressing} />
            </div>
          </div>
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1A73E8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span className="text-[11px] text-[#1A73E8]">capitaloneshopping.com</span>
          </div>
          <div className="flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span className="text-[11px] text-[#16A34A] font-medium">Featured</span>
          </div>
          <span className="text-[11px] text-gray-700">
            4.7 <span className="text-gray-900">★</span>{" "}
            <span className="text-gray-400">(17.2K ratings)</span>
          </span>
        </div>
      </div>
      </div>

      <ScrollCue targetId="step-2" />

    </div>
  );
}

