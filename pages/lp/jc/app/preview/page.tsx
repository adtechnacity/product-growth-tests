import type { Metadata } from "next";
import { TrustBar } from "@/components/TrustBar";
import { HowItWorks } from "@/components/HowItWorks";
import { getChromeStats } from "@/lib/cos-data";

export const metadata: Metadata = {
  title: "Component Preview — ATN VCP2",
};

export default function PreviewPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 py-4 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-lg font-semibold text-headline">
            Component Preview
          </h1>
          <p className="text-sm text-gray-500">
            Issue 0008 — Trust Bar + How It Works
          </p>
        </div>
      </header>

      {/* Trust Bar */}
      <section className="bg-white mt-8">
        <TrustBar stats={getChromeStats()} />
      </section>

      {/* How It Works */}
      <section className="bg-white mt-8">
        <HowItWorks />
      </section>
    </div>
  );
}
