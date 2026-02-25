"use client";

const SEASONS = ["Spring", "Summer", "Fall", "Winter", "Not sure yet"];

interface TimingStepProps {
  selected: string;
  onSelect: (v: string) => void;
  originCity: string;
  destinationCity: string;
}

export default function TimingStep({
  selected,
  onSelect,
  originCity,
  destinationCity,
}: TimingStepProps) {
  return (
    <div className="animate-fade-in">
      {/* Prior message (read-only) */}
      <div className="bg-chip-bg rounded-[12px_12px_12px_4px] px-4 py-3 text-[15px] text-text-primary max-w-[88%] mb-3 opacity-60">
        Where are you hoping to fly? I&apos;ll check what business class seats
        are actually going for on that route.
      </div>

      {/* User reply */}
      <div className="flex justify-end mb-4">
        <div className="bg-navy text-white rounded-[12px_12px_4px_12px] px-4 py-2 text-[14px] max-w-[80%]">
          {originCity} → {destinationCity}
        </div>
      </div>

      {/* Concierge follow-up */}
      <div className="bg-chip-bg rounded-[12px_12px_12px_4px] px-4 py-3 text-[15px] text-text-primary max-w-[88%] mb-5">
        Great choice. When are you thinking of going?
      </div>

      {/* Season chips */}
      <div className="flex flex-wrap gap-2 mb-2">
        {SEASONS.map((season) => (
          <button
            key={season}
            onClick={() => onSelect(season)}
            className={`h-[48px] px-5 rounded-full text-[14px] font-medium border transition-colors duration-100 ${
              selected === season
                ? "bg-navy text-white border-navy"
                : "bg-white text-text-primary border-border hover:border-navy"
            }`}
          >
            {season}
          </button>
        ))}
      </div>
    </div>
  );
}
