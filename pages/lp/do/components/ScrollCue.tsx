"use client";

interface ScrollCueProps {
  targetId: string;
}

export default function ScrollCue({ targetId }: ScrollCueProps) {
  function handleClick() {
    const el = document.getElementById(targetId);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const offset = Math.max(0, (window.innerHeight - rect.height) / 2);
    window.scrollTo({ top: window.scrollY + rect.top - offset, behavior: "smooth" });
  }

  return (
    <button
      onClick={handleClick}
      aria-label="Scroll to next section"
      className="mt-10 flex justify-center w-full opacity-60 hover:opacity-100 transition-opacity duration-300 animate-scroll-cue"
    >
      <svg
        width="24" height="24" viewBox="0 0 24 24"
        fill="none" stroke="white" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round"
      >
        <path d="M6 10l6 6 6-6" />
      </svg>
    </button>
  );
}
