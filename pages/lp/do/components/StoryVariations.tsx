"use client";

// ─────────────────────────────────────────────────────────────────
// VARIATION A — Horizontal storyboard panels (comic strip style)
// 4 sequential moments, each a small illustrated card
// ─────────────────────────────────────────────────────────────────
export function VariationA() {
  const panels = [
    {
      time: "3 weeks before",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1B2A4A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        </svg>
      ),
      headline: "Same price. Every site.",
      body: "JFK → CDG. Business Class. $4,800. Gary checked everywhere.",
      accent: "#F8F7F4",
      border: "#E8E2D9",
    },
    {
      time: "That evening",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1B2A4A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 16v-4M12 8h.01"/>
        </svg>
      ),
      headline: "A coworker's tip.",
      body: "\"I flew Business to Paris for under $800.\" Same airline. Same cabin.",
      accent: "#F8F7F4",
      border: "#E8E2D9",
    },
    {
      time: "30 seconds later",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1B2A4A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
      ),
      headline: "Extension installed.",
      body: "Capital One Shopping scanned his route instantly. Found the same seat.",
      accent: "#F8F7F4",
      border: "#E8E2D9",
    },
    {
      time: "Boarding day",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6L9 17l-5-5"/>
        </svg>
      ),
      headline: "Seat 3B. $780.",
      body: "Next to Margaret Wilson in 3A. Her ticket: $4,800. Same row.",
      accent: "#F0FBF4",
      border: "#B6E6C9",
    },
  ];

  return (
    <div>
      <p className="text-[10px] font-semibold tracking-[0.14em] uppercase text-navy opacity-60 mb-3">Variation A — Storyboard</p>
      <h3 className="text-[22px] font-bold text-text-primary mb-6 leading-snug">
        How Gary flew Business Class<br />
        <span className="text-navy">for $780 instead of $4,800</span>
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {panels.map((p, i) => (
          <div
            key={i}
            className="rounded-xl border p-4 flex flex-col gap-3"
            style={{ backgroundColor: p.accent, borderColor: p.border }}
          >
            {/* Step number + time */}
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold tracking-[0.1em] uppercase text-text-muted">{p.time}</span>
              <span className="text-[10px] font-bold text-navy opacity-40">0{i + 1}</span>
            </div>

            {/* Icon */}
            <div className="w-10 h-10 rounded-full bg-white border border-[#E8E2D9] flex items-center justify-center shadow-sm">
              {p.icon}
            </div>

            {/* Text */}
            <div>
              <p className="text-[12px] font-bold text-text-primary leading-snug mb-1">{p.headline}</p>
              <p className="text-[10px] text-text-muted leading-relaxed">{p.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


// ─────────────────────────────────────────────────────────────────
// VARIATION B — Before / After contrast split
// Margaret (everyone else) vs Gary (used extension)
// ─────────────────────────────────────────────────────────────────
export function VariationB() {
  return (
    <div>
      <p className="text-[10px] font-semibold tracking-[0.14em] uppercase text-navy opacity-60 mb-3">Variation B — Before / After</p>
      <h3 className="text-[22px] font-bold text-text-primary mb-6 leading-snug">
        Same flight. Same cabin.<br />
        <span className="text-navy">Very different prices.</span>
      </h3>

      <div className="grid grid-cols-2 gap-4">

        {/* Left — Everyone else */}
        <div className="rounded-2xl border border-[#E8E2D9] bg-[#F8F7F4] p-5">
          <p className="text-[9px] font-bold tracking-[0.12em] uppercase text-text-muted mb-4">Everyone else</p>

          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-[#E8E2D9] flex items-center justify-center mb-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9AA0A6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
          </div>

          <p className="text-[13px] font-semibold text-text-primary mb-0.5">Margaret Wilson</p>
          <p className="text-[10px] text-text-muted mb-4">Booked directly on delta.com</p>

          <div className="space-y-2 mb-4">
            {[
              { label: "Flight", value: "DL 401 · JFK→CDG" },
              { label: "Cabin", value: "Business Class" },
              { label: "Seat", value: "3A" },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between">
                <span className="text-[10px] text-text-muted">{label}</span>
                <span className="text-[10px] font-medium text-text-primary">{value}</span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-[#E8E2D9]">
            <p className="text-[10px] text-text-muted mb-0.5">Total paid</p>
            <p className="text-[28px] font-extrabold text-text-primary leading-none">$4,800</p>
          </div>
        </div>

        {/* Right — Gary */}
        <div className="rounded-2xl border border-[#B6E6C9] bg-[#F0FBF4] p-5">
          <p className="text-[9px] font-bold tracking-[0.12em] uppercase text-price-green mb-4">Used the extension</p>

          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-[#B6E6C9] flex items-center justify-center mb-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
          </div>

          <p className="text-[13px] font-semibold text-text-primary mb-0.5">Gary Henderson</p>
          <p className="text-[10px] text-text-muted mb-4">Used Capital One Shopping</p>

          <div className="space-y-2 mb-4">
            {[
              { label: "Flight", value: "DL 401 · JFK→CDG" },
              { label: "Cabin", value: "Business Class" },
              { label: "Seat", value: "3B" },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between">
                <span className="text-[10px] text-text-muted">{label}</span>
                <span className="text-[10px] font-medium text-text-primary">{value}</span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-[#B6E6C9]">
            <p className="text-[10px] text-text-muted mb-0.5">Total paid</p>
            <div className="flex items-baseline gap-2">
              <p className="text-[28px] font-extrabold text-price-green leading-none">$780</p>
              <p className="text-[11px] text-text-muted line-through">$4,800</p>
            </div>
            <p className="text-[10px] font-semibold text-price-green mt-1">✓ Saved $4,020</p>
          </div>
        </div>

      </div>

      {/* Bottom callout */}
      <div className="mt-4 text-center">
        <p className="text-[12px] text-text-muted">
          Seat 3A and 3B. Same row. Same flight. <span className="font-semibold text-text-primary">$4,020 difference.</span>
        </p>
      </div>
    </div>
  );
}


// ─────────────────────────────────────────────────────────────────
// VARIATION C — Stacked notification cards
// Gary's story told through overlapping cards like a notification feed
// ─────────────────────────────────────────────────────────────────
export function VariationC() {
  const cards = [
    {
      app: "Google Flights",
      time: "3 weeks ago",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4285F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
      ),
      iconBg: "#EBF2FF",
      message: "Best price found for JFK → CDG Business Class",
      detail: "$4,800 per person · DL 401 · Mar 15",
      tag: null,
    },
    {
      app: "Sarah (coworker)",
      time: "That evening",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      ),
      iconBg: "#F3EEFF",
      message: "\"I flew Business to Paris last month for under $800\"",
      detail: "Same airline. Same cabin. Gary didn't believe it.",
      tag: null,
    },
    {
      app: "Capital One Shopping",
      time: "30 seconds later",
      icon: (
        <div className="w-4 h-4 rounded bg-[#F5820A] flex items-center justify-center">
          <span className="text-white text-[9px] font-bold">S</span>
        </div>
      ),
      iconBg: "#FFF3E8",
      message: "Savings found on your route",
      detail: "JFK → CDG Business · DL 401 · $780",
      tag: "Saved $4,020",
    },
  ];

  return (
    <div>
      <p className="text-[10px] font-semibold tracking-[0.14em] uppercase text-navy opacity-60 mb-3">Variation C — Notification story</p>
      <h3 className="text-[22px] font-bold text-text-primary mb-6 leading-snug">
        Three moments that changed<br />
        <span className="text-navy">Gary's price.</span>
      </h3>

      <div className="relative">
        {/* Vertical connecting line */}
        <div className="absolute left-[19px] top-6 bottom-6 w-[1px] bg-[#E8E2D9]" />

        <div className="space-y-3">
          {cards.map((card, i) => (
            <div key={i} className="flex gap-3">
              {/* Node on line */}
              <div
                className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center z-10 border-2 border-white shadow-sm"
                style={{ backgroundColor: card.iconBg }}
              >
                {card.icon}
              </div>

              {/* Card */}
              <div className={`flex-1 bg-white rounded-xl border border-[#E8E2D9] px-4 py-3 shadow-sm ${
                i === 2 ? "border-[#B6E6C9] bg-[#F0FBF4]" : ""
              }`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-semibold text-text-primary">{card.app}</span>
                  <span className="text-[9px] text-text-muted">{card.time}</span>
                </div>
                <p className={`text-[12px] font-medium leading-snug mb-0.5 ${i === 2 ? "text-price-green" : "text-text-primary"}`}>
                  {card.message}
                </p>
                <p className="text-[10px] text-text-muted">{card.detail}</p>
                {card.tag && (
                  <span className="inline-block mt-2 text-[9px] font-semibold text-price-green bg-[#D1FAE5] px-2 py-0.5 rounded-full">
                    ✓ {card.tag}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
