'use client';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TextOption {
  value: string;
  label: string;
  sublabel?: string;
}

interface TextChoiceProps {
  groupLabel: string;
  options: TextOption[];
  onSelect: (value: string) => void;
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.25, ease: 'easeOut' },
  }),
};

export function TextChoice({ groupLabel, options, onSelect }: TextChoiceProps) {
  return (
    <div
      role="radiogroup"
      aria-label={groupLabel}
      className="flex flex-col gap-3 w-full"
    >
      {options.map((option, i) => (
        <motion.button
          key={option.value}
          role="radio"
          aria-checked={false}
          custom={i}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onSelect(option.value)}
          className={cn(
            'group w-full text-left px-5 py-4 rounded-2xl',
            'bg-white/5 border border-white/10 backdrop-blur-sm',
            'hover:bg-white/10 hover:border-white/20',
            'transition-colors duration-200',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-vibe-coral',
            'focus-visible:ring-offset-2 focus-visible:ring-offset-vibe-ink',
            'cursor-pointer'
          )}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col gap-0.5">
              <span className="font-display text-lg font-semibold text-white leading-snug">
                {option.label}
              </span>
              {option.sublabel && (
                <span className="text-sm text-white/50">{option.sublabel}</span>
              )}
            </div>
            <div
              aria-hidden="true"
              className={cn(
                'flex-shrink-0 w-7 h-7 rounded-full border-2',
                'border-white/20 group-hover:border-vibe-coral',
                'flex items-center justify-center',
                'transition-colors duration-200'
              )}
            >
              <span className="text-vibe-coral text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                ✓
              </span>
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  );
}
