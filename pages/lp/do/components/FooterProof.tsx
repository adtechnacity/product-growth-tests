export default function FooterProof() {
  return (
    <footer className="pb-4">

      {/* Trust signals row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10 max-w-[900px] mx-auto">

        <div className="flex flex-col items-center text-center gap-1.5">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-1">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <p className="text-[13px] font-bold text-white">100% Free</p>
          <p className="text-[11px] text-white/50 leading-snug">No subscription. No hidden fees. Ever.</p>
        </div>

        <div className="flex flex-col items-center text-center gap-1.5">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-1">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
          </div>
          <p className="text-[13px] font-bold text-white">Installs in 30 sec</p>
          <p className="text-[11px] text-white/50 leading-snug">One click. Works immediately in Chrome.</p>
        </div>

        <div className="flex flex-col items-center text-center gap-1.5">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-1">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <p className="text-[13px] font-bold text-white">11M+ users</p>
          <p className="text-[11px] text-white/50 leading-snug">Trusted by millions of shoppers worldwide.</p>
        </div>

        <div className="flex flex-col items-center text-center gap-1.5">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-1">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
          <p className="text-[13px] font-bold text-white">4.7 ★ Rating</p>
          <p className="text-[11px] text-white/50 leading-snug">17,200+ reviews on the Chrome Web Store.</p>
        </div>

      </div>

      {/* Star + review quote */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-1 mb-2">
          {"★★★★★".split("").map((s, i) => (
            <span key={i} className="text-amber-400 text-[18px]">{s}</span>
          ))}
        </div>
        <p className="text-[13px] font-semibold text-white mb-1">
          &ldquo;I saved $1,200 on a business class flight without doing anything different.&rdquo;
        </p>
        <p className="text-[11px] text-white/40">Verified Chrome Web Store review</p>
      </div>

      {/* Press logos */}
      <div className="flex items-center justify-center gap-6 flex-wrap mb-8">
        {["Forbes", "CNN", "The Points Guy", "NerdWallet", "WSJ"].map((name) => (
          <span key={name} className="text-[12px] font-semibold text-white/25 tracking-wide uppercase">
            {name}
          </span>
        ))}
      </div>

      {/* Disclosure + copyright */}
      <div className="border-t border-white/10 pt-6 text-center">
        <p className="text-[11px] text-white/30 max-w-[580px] mx-auto leading-relaxed">
          <span className="font-semibold">Advertiser Disclosure:</span> This page contains affiliate links. We may earn a commission when you install Capital One Shopping through links on this page, at no additional cost to you.
        </p>
        <p className="text-[11px] text-white/25 mt-2">
          © 2026 SmartFares · All rights reserved
        </p>
      </div>

    </footer>
  );
}
