'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface PaceSliderProps {
  initialValue?: number;
  onConfirm: (value: number) => void;
}

export function PaceSlider({ initialValue = 50, onConfirm }: PaceSliderProps) {
  const [value, setValue] = useState(initialValue);
  const [isDragging, setIsDragging] = useState(false);

  const paceLabel = value < 25
    ? 'Ultra Lazy 😴'
    : value < 50
    ? 'Chilled Out 🌊'
    : value < 75
    ? 'On The Move 🏃'
    : 'Full Send 🚀';

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 flex flex-col gap-8">
      {/* Pace display */}
      <div className="text-center">
        <motion.p
          key={paceLabel}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="font-display text-2xl font-bold text-white"
        >
          {paceLabel}
        </motion.p>
      </div>

      {/* Slider track + thumb */}
      <div className="relative px-2">
        {/* Custom track fill */}
        <div className="relative h-2 bg-white/10 rounded-full">
          <div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-vibe-teal to-vibe-coral rounded-full transition-all duration-100"
            style={{ width: `${value}%` }}
          />
        </div>

        {/* Range input (invisible, handles interaction) */}
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          aria-label="Travel pace"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={value}
          onChange={(e) => setValue(Number(e.target.value))}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
          style={{ margin: 0 }}
        />

        {/* Animated thumb */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-lg shadow-black/30 pointer-events-none"
          style={{ left: `calc(${value}% - 12px)` }}
          animate={{ scale: isDragging ? 1.3 : 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        />
      </div>

      {/* Labels */}
      <div className="flex justify-between text-sm text-white/50 font-medium px-2">
        <span>Lazy 🌴</span>
        <span>Crazy ⚡</span>
      </div>

      {/* Confirm button */}
      <button
        onClick={() => onConfirm(value)}
        className="w-full bg-vibe-coral hover:bg-vibe-coral/90 text-white font-semibold py-4 rounded-xl text-lg transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-vibe-coral focus-visible:ring-offset-2 focus-visible:ring-offset-vibe-ink"
      >
        This is my pace →
      </button>
    </div>
  );
}
