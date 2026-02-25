"use client";

import { useEffect, useRef, useState } from "react";
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

const CODES = ["T07V", "3113", "PFYWX"];

// Phases:
// 0 — init: modal appears, progress=0, no codes
// 1 — trying code 0 (T07V), progress ~32%
// 2 — trying code 1 (3113), progress ~62%
// 3 — trying code 2 (PFYWX), progress ~85%
// 4 — success: progress=100%, PFYWX applied green
// loop

export default function Step2Preview() {
  const [phase, setPhase] = useState(0);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    function clearAll() {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    }

    function t(delay: number, fn: () => void) {
      const id = setTimeout(fn, delay);
      timersRef.current.push(id);
    }

    function runSequence() {
      clearAll();
      setPhase(0);
      t(500,  () => setPhase(1));
      t(1900, () => setPhase(2));
      t(3300, () => setPhase(3));
      t(4500, () => setPhase(4));
      t(7400, () => runSequence());
    }

    runSequence();
    return clearAll;
  }, []);

  const progressPct =
    phase === 0 ? 0 :
    phase === 1 ? 32 :
    phase === 2 ? 62 :
    phase === 3 ? 85 :
    100;

  const isDone = phase === 4;

  const tryingText =
    phase === 0 ? "Finding codes..." :
    phase < 4   ? `Trying ${phase} of ${CODES.length} Codes` :
    "Code applied!";

  return (
    <div className="w-full flex flex-col items-center text-center">

      <button
        onClick={() => {
          const el = document.getElementById("step-2");
          if (!el) return;
          const rect = el.getBoundingClientRect();
          const offset = Math.max(0, (window.innerHeight - rect.height) / 2);
          window.scrollTo({ top: window.scrollY + rect.top - offset, behavior: "smooth" });
        }}
        className="text-[10px] font-semibold tracking-[0.14em] uppercase text-amber-300 opacity-80 mb-4 cursor-pointer hover:opacity-100 transition-opacity"
      >
        Step 2 · Save
      </button>
      <h3 className="text-[42px] sm:text-[52px] font-bold text-white leading-tight mb-4">
        Linda didn&apos;t type a single<br /><span className="not-italic text-white/40">coupon code.</span>
      </h3>
      <p className="text-[17px] text-white/60 leading-relaxed max-w-[540px] mb-8">
        <a href={CWS_URL} target="_blank" rel="noopener noreferrer" className="relative inline-block text-white/80 hover:text-white transition-colors">
          Capital One Shopping
          <svg style={{position:"absolute",bottom:"-2px",left:0,width:"100%",overflow:"visible"}} height="4" viewBox="0 0 100 4" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0,3 C15,1 35,4 55,2 C75,0 90,3 100,2" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          </svg>
        </a>{" "}
        tried every code automatically. In seconds.
      </p>

      {/* COS modal card */}
      <div className="w-full max-w-[560px]">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="flex">

          {/* ── Left panel ── */}
          <div className="flex-1 px-6 pt-6 pb-7">
            <COSLogo />

            <h4
              className={`text-[17px] font-bold mt-3 mb-1 transition-colors duration-500 ${
                isDone ? "text-gray-900" : "text-gray-900"
              }`}
            >
              {isDone ? "Savings found!" : "Checking for savings..."}
            </h4>

            <p className="text-[11px] text-gray-400 mb-6 leading-relaxed max-w-[190px]">
              Capital One Shopping automatically tries codes to save you money.
            </p>

            {/* Progress bar */}
            <div className="h-[8px] bg-gray-100 rounded-full overflow-hidden mb-2.5">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{
                  width: `${progressPct}%`,
                  backgroundColor: isDone ? "#16A34A" : "#1A73E8",
                }}
              />
            </div>

            <p className="text-[11px] font-semibold text-gray-600">{tryingText}</p>

            {isDone && (
              <p className="text-[12px] font-bold text-green-600 mt-2.5 animate-fade-in">
                ✓ PFYWX saved you $640.00!
              </p>
            )}
          </div>

          {/* Vertical divider */}
          <div className="w-px bg-gray-100" />

          {/* ── Right panel — coupon codes ── */}
          <div className="w-[130px] shrink-0 flex flex-col items-center justify-center gap-3 py-8 px-3">
            {CODES.map((code, i) => {
              const isVisible = phase > i || isDone;
              const isActive  = !isDone && phase === i + 1;
              const isApplied = isDone && i === CODES.length - 1;
              const isPast    = isVisible && !isActive && !isApplied;

              return (
                <div
                  key={code}
                  className="transition-all duration-500"
                  style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(8px)" }}
                >
                  <span
                    className={`
                      inline-block font-mono font-bold tracking-[0.18em] text-[14px] px-3 py-1.5 rounded
                      transition-all duration-400
                      ${isApplied
                        ? "bg-green-50 text-green-700 border border-green-300"
                        : isActive
                        ? "bg-white border border-gray-300 shadow-sm text-gray-800"
                        : isPast
                        ? "text-gray-300"
                        : "text-gray-200"}
                    `}
                  >
                    {code}
                  </span>
                </div>
              );
            })}
          </div>

        </div>
      </div>
      </div>

      <ScrollCue targetId="step-3" />

    </div>
  );
}

