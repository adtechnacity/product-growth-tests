import Image from "next/image";

const STEPS = [
  {
    number: 1,
    title: "Add to Browser",
    subtitle: "Free, one click",
    image: "/demo/step-1-install.png",
    alt: "Chrome Web Store page for Capital One Shopping extension with Add to Chrome button",
  },
  {
    number: 2,
    title: "Shop Normally",
    subtitle: "Get notified of savings",
    image: "/demo/step-2-notification.png",
    alt: "Capital One Shopping extension popup showing Found 4 codes at a travel checkout",
  },
  {
    number: 3,
    title: "Save",
    subtitle: "Codes applied automatically",
    image: "/demo/step-3-savings.png",
    alt: "Capital One Shopping extension results showing codes tried and rewards earned",
  },
];

/* ───────── Inline SVG icons ───────── */

function PuzzleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5a2.5 2.5 0 0 0-5 0V5H4c-1.1 0-2 .9-2 2v3.8h1.5a2.5 2.5 0 0 1 0 5H2V20c0 1.1.9 2 2 2h3.8v-1.5a2.5 2.5 0 0 1 5 0V22H17c1.1 0 2-.9 2-2v-4h1.5a2.5 2.5 0 0 0 0-5Z" />
    </svg>
  );
}

/* ───────── Browser chrome wrapper ───────── */

function BrowserFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 border-b border-gray-200">
        {/* Traffic lights */}
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <span className="w-3 h-3 rounded-full bg-[#28C840]" />
        </div>

        {/* URL bar */}
        <div className="flex-1 mx-3 flex items-center gap-2 bg-white rounded-md px-3 py-1 text-[11px] text-gray-400 border border-gray-200">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          travelbooking.com
        </div>

        {/* Extension icon */}
        <PuzzleIcon className="text-cta-blue" />
      </div>

      {/* Content area */}
      <div className="bg-white">{children}</div>
    </div>
  );
}

/* ───────── Main component ───────── */

function ProductDemo() {
  return (
    <section className="py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-center text-headline font-semibold text-2xl mb-10">
          See It In Action
        </h2>

        {/* Desktop: browser frame with 3 screenshot panels */}
        <div className="hidden md:block">
          <BrowserFrame>
            <div className="grid grid-cols-3 divide-x divide-gray-100">
              {STEPS.map((step) => (
                <div key={step.number} className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={step.image}
                    alt={step.alt}
                    fill
                    className="object-cover object-top"
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                </div>
              ))}
            </div>
          </BrowserFrame>

          {/* Step labels — desktop */}
          <div className="grid grid-cols-3 mt-6">
            {STEPS.map((step) => (
              <div
                key={step.number}
                className="flex flex-col items-center text-center"
              >
                <div className="w-7 h-7 rounded-full bg-cta-blue text-white flex items-center justify-center text-xs font-semibold leading-none mb-2">
                  {step.number}
                </div>
                <h3 className="text-headline font-semibold text-sm">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-xs mt-0.5">{step.subtitle}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical card stack with screenshot thumbnails */}
        <div className="md:hidden">
          <div className="flex flex-col gap-6">
            {STEPS.map((step, index) => (
              <div key={step.number} className="relative">
                <div className="flex items-start gap-4">
                  {/* Number + connector */}
                  <div className="flex flex-col items-center">
                    <div className="w-7 h-7 rounded-full bg-cta-blue text-white flex items-center justify-center text-xs font-semibold leading-none flex-shrink-0">
                      {step.number}
                    </div>
                    {index < STEPS.length - 1 && (
                      <div
                        className="w-0 border-l-2 border-dashed border-divider flex-1 mt-2 min-h-[24px]"
                        aria-hidden="true"
                      />
                    )}
                  </div>

                  {/* Thumbnail + text */}
                  <div className="flex items-start gap-3 flex-1 pb-2">
                    <div className="relative w-20 h-16 flex-shrink-0 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                      <Image
                        src={step.image}
                        alt={step.alt}
                        fill
                        className="object-cover object-top"
                        sizes="80px"
                      />
                    </div>
                    <div>
                      <h3 className="text-headline font-semibold text-base">
                        {step.title}
                      </h3>
                      <p className="text-gray-500 text-sm mt-0.5">
                        {step.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export { ProductDemo };
export default ProductDemo;
