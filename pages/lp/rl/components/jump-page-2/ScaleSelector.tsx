'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const SCALE_VALUES = [1, 2, 3, 4, 5] as const;

interface ScaleSelectorProps {
  label: string;
  lowLabel: string;
  highLabel: string;
  onSelect: (value: number) => void;
}

export function ScaleSelector({ label, lowLabel, highLabel, onSelect }: ScaleSelectorProps) {
  const [selected, setSelected] = useState<number | null>(null);

  function handleSelect(value: number) {
    setSelected(value);
    onSelect(value);
  }

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 flex flex-col gap-6">
      <p className="text-center text-white/70 text-sm font-medium tracking-wide uppercase">
        {label}
      </p>

      <div role="radiogroup" aria-label={label} className="flex items-center justify-center gap-3">
        {SCALE_VALUES.map((value) => {
          const isSelected = selected === value;
          return (
            <motion.button
              key={value}
              role="radio"
              aria-checked={isSelected}
              aria-label={`${value} out of 5`}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => handleSelect(value)}
              className={cn(
                'w-12 h-12 rounded-full font-display font-bold text-lg',
                'flex items-center justify-center',
                'border-2 transition-colors duration-200',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-vibe-coral',
                'focus-visible:ring-offset-2 focus-visible:ring-offset-vibe-ink',
                'cursor-pointer',
                isSelected
                  ? 'bg-vibe-coral border-vibe-coral text-white shadow-lg shadow-vibe-coral/30'
                  : 'bg-white/5 border-white/20 text-white/80 hover:border-white/40 hover:bg-white/10'
              )}
            >
              {value}
            </motion.button>
          );
        })}
      </div>

      <div className="flex justify-between px-1 text-xs text-white/40 font-medium">
        <span>{lowLabel}</span>
        <span>{highLabel}</span>
      </div>
    </div>
  );
}
