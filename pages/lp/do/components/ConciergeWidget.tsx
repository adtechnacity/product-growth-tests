"use client";

import { useEffect, useRef, useState } from "react";
import { ORIGINS, getDestinationsForOrigin } from "@/data/routes";
import { getRouteResult, RouteResult, formatPrice } from "@/lib/getRouteResult";

const COS_URL =
  "https://chromewebstore.google.com/detail/capital-one-shopping-save/nenlahapcbofgnanklpelkaejcehkggg?hl=en-US";
const DISCOUNT = 0.18;
const COUPON_CODES: Record<string, string> = {
  CDG: "PARIS18", LHR: "LOND18", FCO: "ROME18", LIS: "LIS18",
  NRT: "TOKYO18", SYD: "SYD18",  AMS: "AMS18",  CUN: "CUN15",
  GRU: "GRU18",  BCN: "BCN18",  DUB: "DUB18",
};

type Phase = "from" | "to" | "loading" | "result";

interface Msg {
  id: string;
  role: "assistant" | "user";
  text: string;
}

function Bubble({ msg }: { msg: Msg }) {
  const isUser = msg.role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[85%] px-3 py-2 text-[13px] leading-snug rounded-xl ${
        isUser
          ? "bg-[#1B2A4A] text-white rounded-tr-sm"
          : "bg-[#F3F2EF] text-gray-800 rounded-tl-sm"
      }`}>
        {msg.text}
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex justify-start">
      <div className="bg-[#F3F2EF] rounded-xl rounded-tl-sm px-3 py-2.5 flex gap-1 items-center">
        {[0, 1, 2].map((i) => (
          <span key={i} className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse"
            style={{ animationDelay: `${i * 0.22}s` }} />
        ))}
      </div>
    </div>
  );
}

function ResultCard({ result, onReset }: { result: RouteResult; onReset: () => void }) {
  if (!result.found) {
    return (
      <div className="flex flex-col gap-2">
        <Bubble msg={{ id: "no", role: "assistant", text: "No data on this route yet. Install free and we'll let you know when prices drop." }} />
        <a href={COS_URL} target="_blank" rel="noopener noreferrer"
          className="block w-full h-9 bg-[#1B2A4A] hover:bg-[#243755] text-white text-[13px] font-semibold rounded-lg transition-colors flex items-center justify-center">
          Install Free →
        </a>
        <button onClick={onReset} className="text-[11px] text-gray-400 hover:text-gray-600 text-center">Check another route</button>
      </div>
    );
  }

  const { standardPriceRange, destination, destinationCity, originCity } = result;
  const current     = standardPriceRange!.low;
  const couponCode  = COUPON_CODES[destination!] ?? "TRIP18";
  const savings     = Math.round(current * DISCOUNT);
  const finalPrice  = current - savings;

  return (
    <div className="flex flex-col gap-2">
      <Bubble msg={{ id: "r", role: "assistant",
        text: `Good news. On ${originCity} → ${destinationCity}, Capital One Shopping has a code.` }} />

      <div className="bg-[#F0FBF4] border border-[#B6E6C9] rounded-xl px-3 py-2.5">
        <div className="flex items-center justify-between mb-1">
          <code className="text-[15px] font-bold tracking-[0.12em] text-gray-900">{couponCode}</code>
          <span className="text-[10px] font-semibold text-green-700 bg-green-100 border border-green-200 px-1.5 py-0.5 rounded-full">
            −{Math.round(DISCOUNT * 100)}% off
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-[11px] text-gray-400 line-through">{formatPrice(current)}</span>
          <span className="text-[17px] font-extrabold text-green-700">{formatPrice(finalPrice)}</span>
          <span className="text-[10px] text-green-600">saves ~{formatPrice(savings)}</span>
        </div>
      </div>

      <a href={COS_URL} target="_blank" rel="noopener noreferrer"
        className="block w-full h-9 bg-[#1B2A4A] hover:bg-[#243755] text-white text-[13px] font-semibold rounded-lg transition-colors flex items-center justify-center">
        Add to Chrome, it&apos;s free
      </a>
      <button onClick={onReset} className="text-[11px] text-gray-400 hover:text-gray-600 text-center">Check another route</button>
    </div>
  );
}

export default function ConciergeWidget() {
  const [isOpen, setIsOpen]         = useState(false);
  const [showNudge, setShowNudge]   = useState(false);
  const [nudgeDone, setNudgeDone]   = useState(false);
  const [phase, setPhase]           = useState<Phase>("from");
  const [origin, setOrigin]         = useState("");
  const [destination, setDestination] = useState("");
  const [messages, setMessages]     = useState<Msg[]>([
    { id: "init", role: "assistant", text: "Where are you flying from?" },
  ]);
  const [result, setResult]         = useState<RouteResult | null>(null);
  const bottomRef                   = useRef<HTMLDivElement>(null);

  // Listen for open event from header
  useEffect(() => {
    const handler = () => { setIsOpen(true); setShowNudge(false); setNudgeDone(true); };
    window.addEventListener("openConcierge", handler);
    return () => window.removeEventListener("openConcierge", handler);
  }, []);

  // Show nudge bubble after 2.5s, auto-hide after 9s
  useEffect(() => {
    if (nudgeDone || isOpen) return;
    const show = setTimeout(() => setShowNudge(true),  2500);
    const hide = setTimeout(() => { setShowNudge(false); setNudgeDone(true); }, 9000);
    return () => { clearTimeout(show); clearTimeout(hide); };
  }, [nudgeDone, isOpen]);

  // Hide nudge when chat opens
  useEffect(() => {
    if (isOpen) { setShowNudge(false); setNudgeDone(true); }
  }, [isOpen]);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, phase]);

  // loading → result
  useEffect(() => {
    if (phase !== "loading") return;
    const t = setTimeout(() => {
      setResult(getRouteResult(origin, destination));
      setPhase("result");
    }, 1400);
    return () => clearTimeout(t);
  }, [phase, origin, destination]);

  function addMsg(msg: Omit<Msg, "id">) {
    setMessages((prev) => [...prev, { ...msg, id: `${Date.now()}-${Math.random()}` }]);
  }

  function handleOriginSelect(code: string) {
    const city = ORIGINS.find((o) => o.code === code)?.city ?? code;
    setOrigin(code);
    addMsg({ role: "user", text: city });
    setTimeout(() => {
      addMsg({ role: "assistant", text: "And where are you headed?" });
      setPhase("to");
    }, 420);
  }

  function handleDestinationSelect(code: string) {
    const dests = getDestinationsForOrigin(origin);
    const city  = dests.find((d) => d.code === code)?.city ?? code;
    setDestination(code);
    addMsg({ role: "user", text: city });
    setTimeout(() => setPhase("loading"), 420);
  }

  function reset() {
    setPhase("from");
    setOrigin("");
    setDestination("");
    setResult(null);
    setMessages([{ id: "init", role: "assistant", text: "Where are you flying from?" }]);
  }

  const chipItems = phase === "from" ? ORIGINS : getDestinationsForOrigin(origin);

  return (
    <>
      {/* ── FLOATING CHAT PANEL ── */}
      <div
        className={`fixed bottom-20 right-4 z-50 w-[300px] sm:w-[320px]
          bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.18)] border border-[#E8E2D9]
          flex flex-col overflow-hidden
          transition-all duration-300 origin-bottom-right
          ${isOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}`}
      >
        {/* Header */}
        <div className="bg-[#1B2A4A] shrink-0">
          <div className="h-[3px] bg-gradient-to-r from-amber-400 to-yellow-300" />
          <div className="px-3.5 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#FCD34D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <span className="text-white text-[13px] font-semibold">Find your coupon codes</span>
            </div>
            <button onClick={() => setIsOpen(false)}
              className="text-white/50 hover:text-white w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/10 text-[13px]">
              ✕
            </button>
          </div>
        </div>

        {/* Message thread */}
        <div className="flex-1 px-3 pt-3 pb-2 space-y-2 overflow-y-auto max-h-[260px]">
          {messages.map((msg) => <Bubble key={msg.id} msg={msg} />)}
          {phase === "loading" && <TypingDots />}
          {phase === "result" && result && <ResultCard result={result} onReset={reset} />}
          <div ref={bottomRef} />
        </div>

        {/* Quick-reply chips */}
        {(phase === "from" || phase === "to") && (
          <div className="px-3 pb-3 pt-1 shrink-0">
            <div className="h-px bg-gray-100 mb-2" />
            <div className="flex flex-wrap gap-1.5">
              {chipItems.map((item) => (
                <button key={item.code}
                  onClick={() => phase === "from" ? handleOriginSelect(item.code) : handleDestinationSelect(item.code)}
                  className="px-2.5 py-1 rounded-full border border-gray-200 bg-white text-[11px] text-gray-600 hover:border-[#1B2A4A] hover:text-[#1B2A4A] transition-colors">
                  {item.city}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── NUDGE BUBBLE ── */}
      <div className={`fixed bottom-[4.5rem] right-4 z-50 transition-all duration-300
        ${showNudge ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-2 pointer-events-none"}`}>
        <div className="relative bg-white rounded-2xl rounded-br-sm shadow-[0_4px_20px_rgba(0,0,0,0.14)] border border-[#E8E2D9] px-4 py-3 pr-8 max-w-[200px]">
          {/* Dismiss */}
          <button
            onClick={() => { setShowNudge(false); setNudgeDone(true); }}
            className="absolute top-2 right-2 text-gray-300 hover:text-gray-500 text-[11px] leading-none"
            aria-label="Dismiss"
          >✕</button>
          <p className="text-[12px] font-semibold text-[#1B2A4A] leading-snug mt-1">
            Find coupon codes for your flight ✈
          </p>
          <p className="text-[10px] text-gray-400 mt-0.5">Tap to check your route →</p>
        </div>
      </div>

      {/* ── FLOATING BUTTON ── */}
      <div className="fixed bottom-4 right-4 z-50">
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-[#1B2A4A]/20 animate-ping-soft" />
        )}
        <button
          onClick={() => setIsOpen((o) => !o)}
          className="relative w-12 h-12 bg-[#1B2A4A] hover:bg-[#253A5E] rounded-full
            shadow-[0_4px_18px_rgba(0,0,0,0.28)] flex items-center justify-center
            transition-all duration-200 hover:scale-105 active:scale-95"
          aria-label="Open travel concierge"
        >
          {isOpen ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
          )}
          {/* Red alert badge */}
          {!isOpen && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-[8px] font-bold leading-none">1</span>
            </span>
          )}
        </button>
      </div>
    </>
  );
}
