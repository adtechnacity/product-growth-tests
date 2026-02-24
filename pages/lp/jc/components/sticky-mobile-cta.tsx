import { CTA_URL } from "@/components/cta-block";

export default function StickyMobileCta() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-sm border-t border-gray-200 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
      <a
        className="btn btn-sticky"
        href={CTA_URL}
      >
        Get Started — It&apos;s Free
      </a>
      <p className="text-xs text-center text-gray-500 mt-1">
        11M+ users · 4.7★
      </p>
    </div>
  );
}
