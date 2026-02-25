"use client";

import React from "react";

const THERMAL: React.CSSProperties = {
  backgroundColor: "#FEFCF6",
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.045'/%3E%3C/svg%3E")`,
  fontFamily: "'Courier New', Courier, monospace",
  color: "#000000",
};

// Serrated/perforated edge using repeating radial gradient
const PERF_TOP: React.CSSProperties = {
  height: "10px",
  backgroundImage:
    "radial-gradient(circle at 50% 0%, #FEFCF6 5px, transparent 5px), radial-gradient(circle at 50% 0%, #E8E0D0 6px, transparent 6px)",
  backgroundSize: "14px 10px",
  backgroundPosition: "0 0",
  backgroundRepeat: "repeat-x",
};
const PERF_BOTTOM: React.CSSProperties = {
  height: "10px",
  backgroundImage:
    "radial-gradient(circle at 50% 100%, #FEFCF6 5px, transparent 5px), radial-gradient(circle at 50% 100%, #E8E0D0 6px, transparent 6px)",
  backgroundSize: "14px 10px",
  backgroundPosition: "0 100%",
  backgroundRepeat: "repeat-x",
};

function Dashes({ double }: { double?: boolean }) {
  const ch = double ? "=" : "-";
  return (
    <div className="text-[11px] text-[#C8BFB0] leading-none my-2 select-none overflow-hidden whitespace-nowrap">
      {ch.repeat(30)}
    </div>
  );
}

function Row({
  label,
  value,
  bold,
  green,
  strike,
}: {
  label: string;
  value: string;
  bold?: boolean;
  green?: boolean;
  strike?: boolean;
}) {
  const textColor = "text-black";
  return (
    <div
      className={`flex justify-between text-[12px] leading-relaxed ${bold ? "font-bold" : ""} ${textColor}`}
    >
      <span className={strike ? "line-through opacity-40" : ""}>{label}</span>
      <span className={strike ? "line-through opacity-40" : ""}>{value}</span>
    </div>
  );
}

interface ReceiptProps {
  name: string;
  seat: string;
  conf: string;
  fare: number;
  coupon?: string;
  discount?: number;
  rotate?: string;
}

function Receipt({ name, seat, conf, fare, coupon, discount, rotate }: ReceiptProps) {
  const hasSavings = !!(coupon && discount);
  const paid = hasSavings ? fare - discount! : fare;

  return (
    <div
      className="w-[300px] shrink-0 shadow-[0_6px_28px_rgba(0,0,0,0.16),0_1px_4px_rgba(0,0,0,0.08)]"
      style={{ ...THERMAL, transform: rotate, overflow: "visible" }}
    >
      {/* Perforated top */}
      <div style={PERF_TOP} />

      <div className="px-6 pt-1 pb-3" style={{ overflow: "visible" }}>

        {/* Header */}
        <div className="text-center py-3">
          <p className="text-[12px] font-bold tracking-[0.22em] text-black uppercase">
            DELTA AIR LINES
          </p>
          <p className="text-[10px] tracking-[0.14em] uppercase mt-0.5">
            BOOKING RECEIPT
          </p>
        </div>

        <Dashes double />

        {/* Passenger block */}
        <div className="space-y-[4px] py-1">
          <Row label="PASSENGER" value={name} />
          <Row label="DATE" value="MAR 15 2026" />
          <Row label="CONF #" value={conf} />
        </div>

        <Dashes />

        {/* Flight block */}
        <div className="py-1 space-y-[4px]">
          <div className="text-[12px] text-black text-center font-bold tracking-widest my-1">
            JFK ───────── CDG
          </div>
          <Row label="DEPARTS" value="08:45" />
          <Row label="ARRIVES" value="22:10" />
          <Row label="FLIGHT" value="GL401" />
          <Row label="CLASS" value="BUSINESS" />
          <Row label="SEAT" value={seat} />
        </div>

        <Dashes />

        {/* Pricing block */}
        <div className="py-1 space-y-[4px]">
          <Row
            label="FLIGHT FARE"
            value={`$${fare.toLocaleString()}`}
            strike={hasSavings}
          />
          {hasSavings && (
            <Row
              label={`COUPON: ${coupon}`}
              value={`-$${discount!.toLocaleString()}`}
              green
            />
          )}
        </div>

        <Dashes double />

        {/* Total */}
        <div className="py-1">
          <div className="relative">
            <div className="flex justify-between text-[15px] font-bold text-black leading-relaxed">
              <span>AMOUNT PAID</span>
              <span className="relative inline-block">
                ${paid.toLocaleString()}
                {hasSavings && (
                  <img
                    src="/red_pen.svg"
                    alt=""
                    aria-hidden="true"
                    className="absolute pointer-events-none select-none"
                    style={{
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "800px",
                      height: "52px",
                      zIndex: 10,
                    }}
                  />
                )}
              </span>
            </div>
            {/* Hand-drawn red marker underline */}
            {hasSavings && (
              <svg
                width="100%" height="6"
                viewBox="0 0 215 6"
                preserveAspectRatio="none"
                className="mt-0.5 overflow-visible"
                aria-hidden="true"
              >
                <path
                  d="M1,4 C18,1.5 40,5 70,3 C100,1 130,5.5 160,3.5 C185,2 200,4.5 214,3"
                  stroke="#D32F2F"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  opacity="0.85"
                />
              </svg>
            )}
          </div>
        </div>

        {/* Savings callout */}
        {hasSavings && (
          <>
            <Dashes double />
            <div className="text-center py-2">
              <p className="text-[11px] font-bold tracking-[0.1em]">
                *** YOU SAVED ${discount!.toLocaleString()} ***
              </p>
              <p className="text-[10px] tracking-[0.1em] mt-0.5 uppercase">
                Capital One Shopping
              </p>
            </div>
          </>
        )}

        <Dashes />

        {/* Footer */}
        <div className="text-center pb-2 pt-1">
          <p className="text-[10px] tracking-[0.1em] uppercase">
            Thank you for booking
          </p>
          <p className="text-[10px] tracking-[0.1em] uppercase">
            Have a great trip!
          </p>
        </div>

      </div>

      {/* Perforated bottom */}
      <div style={PERF_BOTTOM} />
    </div>
  );
}

export default function BoardingPassComparison() {
  return (
    <div className="flex gap-5 justify-center items-start w-full py-2" style={{ overflow: "visible" }}>
      <Receipt
        name="MARK WILSON"
        seat="3A"
        conf="GL-8821-A"
        fare={3200}
        rotate="rotate(-0.8deg)"
      />
      <Receipt
        name="LINDA HENDERSON"
        seat="3B"
        conf="GL-8822-B"
        fare={3200}
        coupon="PFYWX"
        discount={640}
        rotate="rotate(0.6deg)"
      />
    </div>
  );
}
