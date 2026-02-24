import Link from "next/link";

const PAGES = [
  { href: "/baseline", label: "Social Travel Baseline", tag: "control" },
  { href: "/travel", label: "Travel LP", tag: "test" },
];

const COMPONENTS = [
  { href: "/quiz", label: "Quiz" },
  { href: "/product-demo", label: "Product Demo" },
  { href: "/merchant-gallery", label: "Merchant Gallery" },
  { href: "/cta-demo", label: "CTA Variants" },
  { href: "/preview", label: "Trust Bar + How It Works" },
];

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="text-center space-y-8 py-12">
        <h1 className="text-2xl font-bold">ATN VCP2 Landing Pages</h1>

        <section className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400">
            Pages
          </h2>
          <div className="flex flex-col gap-2">
            {PAGES.map(({ href, label, tag }) => (
              <Link key={href} href={href} className="text-blue-600 underline">
                {label}{" "}
                <span className="text-xs text-gray-400 no-underline">
                  ({tag})
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400">
            Components
          </h2>
          <div className="flex flex-col gap-2">
            {COMPONENTS.map(({ href, label }) => (
              <Link key={href} href={href} className="text-blue-600 underline">
                {label}{" "}
                <span className="text-xs text-gray-400 no-underline">
                  {href}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
