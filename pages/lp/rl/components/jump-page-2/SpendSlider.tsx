'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

const MIN = 0;
const MAX = 1000;
const STEP = 50;

interface SpendSliderProps {
  initialValue?: number;
  onConfirm: (value: number) => void;
}

function formatCurrency(value: number): string {
  if (value >= MAX) return '$1,000+';
  return `$${value.toLocaleString()}`;
}

export function SpendSlider({ initialValue = 200, onConfirm }: SpendSliderProps) {
  const [value, setValue] = useState(initialValue);
  const [isDragging, setIsDragging] = useState(false);

  const pct = ((value - MIN) / (MAX - MIN)) * 100;

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 flex flex-col gap-8">
      {/* Spend display */}
      <div className="text-center">
        <motion.p
          key={value}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18 }}
          className="font-display text-4xl font-bold text-white tabular-nums"
        >
          {formatCurrency(value)}
        </motion.p>
        <p className="text-white/50 text-sm mt-1">per month</p>
      </div>

      {/* Slider */}
      <div className="relative px-2">
        <div className="relative h-2 bg-white/10 rounded-full">
          <div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-vibe-coral to-vibe-gold rounded-full transition-all duration-100"
            style={{ width: `${pct}%` }}
          />
        </div>
        <input
          type="range"
          min={MIN}
          max={MAX}
          step={STEP}
          value={value}
          aria-label="Monthly online spending"
          aria-valuetext={formatCurrency(value)}
          onChange={(e) => setValue(Number(e.target.value))}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
          style={{ margin: 0 }}
        />
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-lg shadow-black/30 pointer-events-none"
          style={{ left: `calc(${pct}% - 12px)` }}
          animate={{ scale: isDragging ? 1.3 : 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        />
      </div>

      {/* Range labels */}
      <div className="flex justify-between text-sm text-white/50 font-medium px-2">
        <span>$0</span>
        <span>$1,000+</span>
      </div>

      {/* Confirm */}
      <button
        onClick={() => onConfirm(value)}
        className="w-full bg-vibe-coral hover:bg-vibe-coral/90 text-white font-semibold py-4 rounded-xl text-lg transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-vibe-coral focus-visible:ring-offset-2 focus-visible:ring-offset-vibe-ink"
      >
        That&apos;s my budget &rarr;
      </button>
    </div>
  );
}
