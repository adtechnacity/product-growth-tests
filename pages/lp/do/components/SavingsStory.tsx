const steps = [
  {
    icon: "🎫",
    label: "3 weeks before departure",
    title: "Linda is shopping for Business Class",
    body: "JFK → CDG, March 15th. She'd been watching the same DL 401 flight for weeks. Every airline site quoted the same thing: $4,800 for Business Class.",
  },
  {
    icon: "💡",
    label: "That evening",
    title: "A friend mentions a free trick",
    body: "\"I flew Business to Paris last month for under $800,\" said her friend. Same airline. Same cabin. Linda didn't believe it.",
  },
  {
    icon: "⚡",
    label: "30 seconds later",
    title: "She checks her route",
    body: "A free browser extension scanned her JFK→CDG route instantly. Business Class. DL 401. March 15th. It found the same seat — at a fraction of the price.",
  },
  {
    icon: "💺",
    label: "Boarding day",
    title: "Seat 3B. $780 total.",
    body: "Linda settles into her flat-bed seat. In 3A: Margaret Wilson, who booked directly. Her receipt: $4,800. Same flight. Same cabin. Same row.",
    highlight: true,
  },
];

export default function SavingsStory() {
  return (
    <section className="max-w-[520px] mx-auto py-12 px-5">

      {/* Section heading */}
      <div className="mb-10">
        <p className="text-[10px] font-semibold tracking-[0.14em] uppercase text-navy opacity-60 mb-2">
          A real story
        </p>
        <h2 className="text-[22px] font-bold text-text-primary leading-snug">
          How Linda flew Business Class<br />
          <span className="text-navy">for $780 instead of $4,800</span>
        </h2>
      </div>

      {/* Timeline */}
      <div className="relative">

        {/* Vertical dotted line */}
        <div className="absolute left-[17px] top-2 bottom-6 border-l-2 border-dashed border-[#D4CEC6]" />

        <div className="space-y-8">
          {steps.map((step, i) => (
            <div key={i} className="relative flex gap-5 pl-1">

              {/* Node */}
              <div className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-[15px] z-10
                ${step.highlight
                  ? "bg-navy shadow-[0_2px_10px_rgba(27,42,74,0.35)]"
                  : "bg-white border-2 border-[#D4CEC6]"
                }`}
              >
                {step.icon}
              </div>

              {/* Content */}
              <div className="pt-0.5 pb-2">
                <p className="text-[9px] font-semibold tracking-[0.1em] uppercase text-text-muted mb-1">
                  {step.label}
                </p>
                <p className={`text-[14px] font-bold mb-1 leading-snug
                  ${step.highlight ? "text-navy" : "text-text-primary"}`}
                >
                  {step.title}
                </p>
                <p className="text-[12px] text-text-muted leading-relaxed">
                  {step.body}
                </p>

                {/* Savings callout on last step */}
                {step.highlight && (
                  <div className="mt-3 inline-flex items-center gap-2 bg-[#F0FBF4] border border-[#B6E6C9] rounded-lg px-3 py-2">
                    <span className="text-price-green text-[13px]">✓</span>
                    <span className="text-[12px] font-semibold text-price-green">
                      Linda saved $4,020 on the same flight
                    </span>
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
