"use client";

import { useEffect, useRef, useState } from "react";
import { ORIGINS, getDestinationsForOrigin } from "@/data/routes";
import { getRouteResult, RouteResult, formatPrice } from "@/lib/getRouteResult";

const COS_URL =
  "https://chromewebstore.google.com/detail/capital-one-shopping-save/nenlahapcbofgnanklpelkaejcehkggg?hl=en-US";
const DISCOUNT = 0.18;
const COUPON_CODES: Record<string, string> = {
  CDG: "PARIS18", LHR: "LOND18",  FCO: "ROME18",  LIS: "LIS18",
  NRT: "TOKYO18", SYD: "SYD18",   AMS: "AMS18",   CUN: "CUN15",
  GRU: "GRU18",   BCN: "BCN18",   DUB: "DUB18",
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
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} animate-fade-in`}>
      <div
        className={`max-w-[80%] px-4 py-2.5 text-[14px] leading-snug ${
          isUser
            ? "bg-[#1B2A4A] text-white rounded-2xl rounded-tr-sm"
            : "bg-[#F3F2EF] text-gray-800 rounded-2xl rounded-tl-sm"
        }`}
      >
        {msg.text}
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex justify-start animate-fade-in">
      <div className="bg-[#F3F2EF] rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1.5 items-center">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse"
            style={{ animationDelay: `${i * 0.22}s` }}
          />
        ))}
      </div>
    </div>
  );
}

function ResultCard({ result }: { result: RouteResult }) {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 250);
    return () => clearTimeout(t);
  }, []);

  if (!result.found) {
    return (
      <div className="flex flex-col gap-3 animate-fade-in">
        <Bubble
          msg={{
            id: "no-result",
            role: "assistant",
            text: "We don't have data on this route yet — but deals do appear. Install free and Capital One Shopping will alert you when prices drop.",
          }}
        />
        <a
          href={COS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full h-[46px] bg-[#1B2A4A] hover:bg-[#243755] text-white text-[14px] font-semibold rounded-xl transition-colors flex items-center justify-center"
        >
          Install Free — Get Alerts →
        </a>
      </div>
    );
  }

  const { standardPriceRange, destination, destinationCity, originCity } = result;
  const current    = standardPriceRange!.low;
  const couponCode = COUPON_CODES[destination!] ?? "TRIP18";
  const savings    = Math.round(current * DISCOUNT);
  const finalPrice = current - savings;

  return (
    <div className="flex flex-col gap-3 animate-fade-in">
      <Bubble
        msg={{
          id: "result-msg",
          role: "assistant",
          text: `Good news. On ${originCity} → ${destinationCity}, Capital One Shopping found a code that brings the price down.`,
        }}
      />

      {/* Code card */}
      <div
        className={`transition-all duration-500 ${
          revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        <div className="bg-[#F0FBF4] border border-[#B6E6C9] rounded-xl px-4 py-3.5">
          <div className="flex items-center justify-between mb-2">
            <code className="text-[17px] font-bold tracking-[0.15em] text-gray-900">
              {couponCode}
            </code>
            <span className="text-[11px] font-semibold text-green-700 bg-green-100 border border-green-200 px-2 py-0.5 rounded-full">
              −{Math.round(DISCOUNT * 100)}% off
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-[12px] text-gray-400 line-through">{formatPrice(current)}</span>
            <span className="text-[20px] font-extrabold text-green-700">{formatPrice(finalPrice)}</span>
            <span className="text-[11px] text-green-600 font-medium">saves ~{formatPrice(savings)}</span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div
        className={`transition-all duration-500 delay-200 ${
          revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
        }`}
      >
        <a
          href={COS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full h-[46px] bg-[#1B2A4A] hover:bg-[#243755] text-white text-[14px] font-semibold rounded-xl transition-colors flex items-center justify-center"
        >
          Install Free — Use This Code →
        </a>
        <p className="text-[11px] text-gray-400 text-center mt-2">
          Free · No account needed · 30 seconds
        </p>
      </div>
    </div>
  );
}

export default function ConciergeSection() {
  const [phase, setPhase]           = useState<Phase>("from");
  const [origin, setOrigin]         = useState("");
  const [destination, setDestination] = useState("");
  const [messages, setMessages]     = useState<Msg[]>([
    { id: "init", role: "assistant", text: "Where are you flying from?" },
  ]);
  const [result, setResult]         = useState<RouteResult | null>(null);
  const bottomRef                   = useRef<HTMLDivElement>(null);

  function addMsg(msg: Omit<Msg, "id">) {
    setMessages((prev) => [
      ...prev,
      { ...msg, id: `${Date.now()}-${Math.random()}` },
    ]);
  }

  // Scroll to bottom on every message or phase change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, phase]);

  // loading → result
  useEffect(() => {
    if (phase !== "loading") return;
    const t = setTimeout(() => {
      setResult(getRouteResult(origin, destination));
      setPhase("result");
    }, 1600);
    return () => clearTimeout(t);
  }, [phase, origin, destination]);

  function handleOriginSelect(code: string) {
    const city = ORIGINS.find((o) => o.code === code)?.city ?? code;
    setOrigin(code);
    addMsg({ role: "user", text: city });
    setTimeout(() => {
      addMsg({ role: "assistant", text: "And where are you headed?" });
      setPhase("to");
    }, 480);
  }

  function handleDestinationSelect(code: string) {
    const dests = getDestinationsForOrigin(origin);
    const city  = dests.find((d) => d.code === code)?.city ?? code;
    setDestination(code);
    addMsg({ role: "user", text: city });
    setTimeout(() => setPhase("loading"), 480);
  }

  function reset() {
    setPhase("from");
    setOrigin("");
    setDestination("");
    setResult(null);
    setMessages([{ id: "init", role: "assistant", text: "Where are you flying from?" }]);
  }

  const destinations = origin ? getDestinationsForOrigin(origin) : [];
  const chipItems    = phase === "from" ? ORIGINS : destinations;

  return (
    <section className="w-full bg-cream py-20 border-t border-dashed border-[#D4CEC6]">
      <div className="max-w-[1200px] mx-auto px-5 flex flex-col items-center text-center">

        {/* Section header */}
        <p className="text-[10px] font-semibold tracking-[0.14em] uppercase text-text-muted opacity-70 mb-4">
          Try it now
        </p>
        <h2 className="text-[42px] sm:text-[52px] font-bold text-text-primary leading-tight mb-4">
          What would you pay<br />on your route?
        </h2>
        <p className="text-[17px] text-text-muted leading-relaxed max-w-[540px] mb-10">
          Pick your route and we&apos;ll show you the coupon codes
          Capital One Shopping has available right now.
        </p>

        {/* Chat card */}
        <div className="w-full max-w-[440px] bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.10)] border border-[#E8E2D9] overflow-hidden">

          {/* Header */}
          <div className="bg-[#1B2A4A]">
            <div className="h-[3px] bg-gradient-to-r from-amber-400 to-yellow-300" />
            <div className="px-4 py-3 flex items-center gap-2">
              <svg
                width="14" height="14" viewBox="0 0 24 24"
                fill="none" stroke="#FCD34D" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span className="text-white text-[13px] font-semibold tracking-wide">
                Find your price
              </span>
            </div>
          </div>

          {/* Message thread */}
          <div className="px-4 pt-4 pb-3 space-y-2.5 max-h-[320px] overflow-y-auto">
            {messages.map((msg) => (
              <Bubble key={msg.id} msg={msg} />
            ))}
            {phase === "loading" && <TypingDots />}
            {phase === "result" && result && <ResultCard result={result} />}
            <div ref={bottomRef} />
          </div>

          {/* Quick-reply chips */}
          {(phase === "from" || phase === "to") && (
            <div className="px-4 pb-4 pt-1">
              <div className="h-px bg-gray-100 mb-3" />
              <div className="flex flex-wrap gap-2">
                {chipItems.map((item) => (
                  <button
                    key={item.code}
                    onClick={() =>
                      phase === "from"
                        ? handleOriginSelect(item.code)
                        : handleDestinationSelect(item.code)
                    }
                    className="px-3.5 py-1.5 rounded-full border border-gray-200 bg-white text-[13px] text-gray-600 hover:border-[#1B2A4A] hover:text-[#1B2A4A] transition-colors"
                  >
                    {item.city}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Start over */}
          {phase === "result" && (
            <div className="px-4 pb-4 flex justify-center">
              <button
                onClick={reset}
                className="text-[12px] text-gray-400 hover:text-gray-600 transition-colors"
              >
                Check another route
              </button>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
