import CtaBlock from "@/components/cta-block";
import StickyMobileCta from "@/components/sticky-mobile-cta";

export default function CtaDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-8">
      <div className="mx-auto max-w-[960px] px-6 py-8 md:px-12">
        <h1 className="text-3xl font-bold text-headline mb-2">
          CTA Component Demo
        </h1>
        <p className="text-gray-500 mb-12">
          All CTA variants with social proof reinforcement. Resize to mobile to
          see the sticky bar.
        </p>

        {/* Standard */}
        <section className="mb-8">
          <div className="bg-gray-200 rounded-lg h-32 flex items-center justify-center mb-4">
            <span className="text-gray-400 text-sm">
              [Section: Hero / Quiz Results]
            </span>
          </div>
          <p className="text-xs font-mono text-gray-400 mb-2 text-center">
            variant=&quot;standard&quot;
          </p>
          <CtaBlock variant="standard" />
        </section>

        {/* Personalized — with savings */}
        <section className="mb-8">
          <div className="bg-gray-200 rounded-lg h-32 flex items-center justify-center mb-4">
            <span className="text-gray-400 text-sm">
              [Section: After Quiz Results]
            </span>
          </div>
          <p className="text-xs font-mono text-gray-400 mb-2 text-center">
            variant=&quot;personalized&quot; savings=&#123;847&#125;
          </p>
          <CtaBlock variant="personalized" savings={847} />
        </section>

        {/* Personalized — fallback (no savings) */}
        <section className="mb-8">
          <div className="bg-gray-200 rounded-lg h-32 flex items-center justify-center mb-4">
            <span className="text-gray-400 text-sm">
              [Section: After Quiz Results — no savings data]
            </span>
          </div>
          <p className="text-xs font-mono text-gray-400 mb-2 text-center">
            variant=&quot;personalized&quot; (no savings prop — fallback)
          </p>
          <CtaBlock variant="personalized" />
        </section>

        {/* Action */}
        <section className="mb-8">
          <div className="bg-gray-200 rounded-lg h-32 flex items-center justify-center mb-4">
            <span className="text-gray-400 text-sm">
              [Section: How It Works]
            </span>
          </div>
          <p className="text-xs font-mono text-gray-400 mb-2 text-center">
            variant=&quot;action&quot;
          </p>
          <CtaBlock variant="action" />
        </section>

        {/* Specific — with merchant data */}
        <section className="mb-8">
          <div className="bg-gray-200 rounded-lg h-32 flex items-center justify-center mb-4">
            <span className="text-gray-400 text-sm">
              [Section: Merchant Gallery]
            </span>
          </div>
          <p className="text-xs font-mono text-gray-400 mb-2 text-center">
            variant=&quot;specific&quot; merchantName=&quot;Expedia&quot;
            dealCount=&#123;81&#125;
          </p>
          <CtaBlock variant="specific" merchantName="Expedia" dealCount={81} />
        </section>

        {/* Reassurance */}
        <section className="mb-8">
          <div className="bg-gray-200 rounded-lg h-32 flex items-center justify-center mb-4">
            <span className="text-gray-400 text-sm">
              [Section: Objection Handling]
            </span>
          </div>
          <p className="text-xs font-mono text-gray-400 mb-2 text-center">
            variant=&quot;reassurance&quot;
          </p>
          <CtaBlock variant="reassurance" />
        </section>
      </div>

      <StickyMobileCta />
    </div>
  );
}
