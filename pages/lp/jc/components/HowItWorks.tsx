const steps = [
  {
    number: 1,
    title: "Add to your browser",
    subtitle: "Free, takes 10 seconds",
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {/* Browser window */}
        <rect x="4" y="8" width="40" height="32" rx="3" />
        {/* Browser top bar */}
        <line x1="4" y1="16" x2="44" y2="16" />
        {/* Download arrow */}
        <line x1="24" y1="22" x2="24" y2="34" />
        <polyline points="18,29 24,35 30,29" />
      </svg>
    ),
  },
  {
    number: 2,
    title: "Shop like normal",
    subtitle: "Works on your favorite travel sites",
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {/* Cart body */}
        <path d="M6 8h4l5 20h18l4-14H14" />
        {/* Cart wheels */}
        <circle cx="20" cy="34" r="2" />
        <circle cx="32" cy="34" r="2" />
      </svg>
    ),
  },
  {
    number: 3,
    title: "Save automatically",
    subtitle: "Codes and cashback applied at checkout",
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {/* Piggy bank body */}
        <ellipse cx="22" cy="28" rx="14" ry="12" />
        {/* Snout */}
        <ellipse cx="36" cy="30" rx="4" ry="3" />
        {/* Coin slot */}
        <line x1="20" y1="16" x2="24" y2="16" />
        {/* Ear */}
        <path d="M16 18 Q14 12 20 14" />
        {/* Leg */}
        <line x1="14" y1="38" x2="14" y2="43" />
        <line x1="20" y1="39" x2="20" y2="44" />
        <line x1="26" y1="39" x2="26" y2="44" />
        {/* Coin falling */}
        <path d="M24 6 L24 12" strokeDasharray="2 2" />
        <ellipse cx="24" cy="5" rx="4" ry="2" />
      </svg>
    ),
  },
];

function HowItWorks() {
  return (
    <section className="py-12 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Section heading */}
        <h2 className="text-center text-headline font-semibold text-2xl mb-10">
          How It Works
        </h2>

        {/* Desktop: horizontal row | Mobile: vertical stack */}
        <div className="flex flex-col md:flex-row md:items-start md:gap-4">
          {steps.map((step, index) => (
            <div key={step.number} className="flex md:flex-col md:flex-1 md:items-center gap-4 md:gap-3 mb-8 md:mb-0 relative">
              {/* Mobile: icon + text row */}
              {/* Desktop: stacked column */}

              {/* Step number circle */}
              <div className="flex-shrink-0 md:self-center">
                <div className="w-7 h-7 rounded-full bg-cta-blue text-white flex items-center justify-center text-xs font-semibold leading-none">
                  {step.number}
                </div>
              </div>

              {/* Icon — desktop only, centered above text */}
              <div className="hidden md:flex flex-col items-center w-full">
                <div className="text-cta-blue mb-3">
                  {step.icon}
                </div>
                <h3 className="text-headline font-semibold text-lg text-center mb-1">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-sm text-center">
                  {step.subtitle}
                </p>
              </div>

              {/* Icon + text — mobile only */}
              <div className="flex items-start gap-4 md:hidden flex-1">
                <div className="text-cta-blue flex-shrink-0">
                  {step.icon}
                </div>
                <div>
                  <h3 className="text-headline font-semibold text-lg mb-1">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {step.subtitle}
                  </p>
                </div>
              </div>

              {/* Connector line between steps (desktop only, not after last step).
                 Relies on parent overflow:visible (default) — negative right extends
                 past the flex column boundary to reach the next step's center. */}
              {index < steps.length - 1 && (
                <div
                  className="hidden md:block absolute top-3.5 left-[calc(50%+20px)] right-[calc(-50%+20px)] border-t-2 border-dashed border-divider"
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { HowItWorks };
export default HowItWorks;
