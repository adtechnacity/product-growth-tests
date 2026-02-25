"use client";

export default function LoadingStep() {
  return (
    <div className="animate-fade-in">
      <div className="bg-chip-bg rounded-[12px_12px_12px_4px] px-4 py-3 text-[15px] text-text-primary max-w-[88%]">
        <p className="mb-3">
          Checking what Capital One Shopping has been finding on this route...
        </p>
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-2 h-2 bg-text-muted rounded-full inline-block animate-pulse"
              style={{ animationDelay: `${i * 0.25}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
