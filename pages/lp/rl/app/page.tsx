import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'COS LP Hub — Internal',
  description: 'Stakeholder preview — LP prototypes for COS.',
  robots: 'noindex, nofollow',
};

interface LP {
  name: string;
  route: string;
  desc: string;
  status: 'Live';
  emoji: string;
  accent: string;
  glow: string;
  badgeColor: string;
  btnColor: string;
}

const lps: LP[] = [
  {
    name: 'Travel DNA Quiz',
    route: '/jump-page',
    desc: 'GDN jump page — 3-step visual quiz → personalized travel deal results',
    status: 'Live',
    emoji: '🧬',
    accent: 'border-vibe-coral',
    glow: 'from-vibe-coral/10',
    badgeColor: 'text-vibe-coral bg-vibe-coral/10',
    btnColor: 'bg-vibe-coral hover:bg-vibe-coral/90',
  },
  {
    name: 'Savings Score Quiz',
    route: '/jump-page-2',
    desc: 'Deal-seeker quiz — 6-question savings funnel → personalized Savings Score + CTA',
    status: 'Live',
    emoji: '💰',
    accent: 'border-vibe-gold',
    glow: 'from-vibe-gold/10',
    badgeColor: 'text-vibe-gold bg-vibe-gold/10',
    btnColor: 'bg-vibe-gold hover:bg-vibe-gold/90',
  },
];

export default function HubPage() {
  return (
    <main className="min-h-screen px-6 py-16 max-w-6xl mx-auto">
      {/* Header */}
      <header className="mb-16 border-b border-white/10 pb-10">
        <p className="text-vibe-coral text-xs tracking-[0.3em] uppercase font-semibold mb-3">
          Internal Preview
        </p>
        <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-none tracking-tight mb-4">
          COS Quiz
          <br />
          <span className="text-white/30">Funnels</span>
        </h1>
        <p className="text-white/50 text-lg max-w-xl">
          Two quiz funnels for cold-traffic acquisition. Select a prototype to
          preview.
        </p>
      </header>

      {/* Featured cards */}
      <section>
        <p className="text-white/40 text-xs tracking-[0.2em] uppercase mb-4">
          Production-Ready
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {lps.map((lp) => (
            <div
              key={lp.route}
              className={`relative border-2 ${lp.accent} bg-white/[0.03] rounded-2xl p-8 md:p-10 overflow-hidden group hover:bg-white/[0.06] transition-colors duration-300`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${lp.glow} via-transparent to-transparent pointer-events-none`}
              />
              <div className="relative flex flex-col gap-8 h-full">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl">{lp.emoji}</span>
                    <span
                      className={`text-xs font-semibold tracking-widest uppercase ${lp.badgeColor} px-3 py-1 rounded-full`}
                    >
                      {lp.status}
                    </span>
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
                    {lp.name}
                  </h2>
                  <p className="text-white/60 text-lg leading-relaxed">
                    {lp.desc}
                  </p>
                </div>
                <div>
                  <Link
                    href={lp.route}
                    className={`btn inline-flex items-center gap-2 ${lp.btnColor} text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors duration-200`}
                  >
                    Open LP
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-24 pt-8 border-t border-white/10 text-white/20 text-xs flex justify-between">
        <span>COS · Vibe LP Lab</span>
        <span>noindex · internal only</span>
      </footer>
    </main>
  );
}
