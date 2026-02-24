'use client';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

const TRAVEL_EMOJIS = ['✈️', '🌍', '🗺️', '🌴', '🏝️', '🎒', '🧬', '⭐'];
const LOADER_DURATION = 2.5; // seconds

interface ResultsLoaderProps {
  onComplete: () => void;
}

export function ResultsLoader({ onComplete }: ResultsLoaderProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, LOADER_DURATION * 1000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center gap-8 py-16">
      {/* Emoji row */}
      <div className="flex gap-3 flex-wrap justify-center">
        {TRAVEL_EMOJIS.map((emoji, i) => (
          <motion.span
            key={emoji}
            className="text-3xl"
            animate={{
              y: [0, -10, 0],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.15,
              ease: 'easeInOut',
            }}
          >
            {emoji}
          </motion.span>
        ))}
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-sm">
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-vibe-coral to-vibe-gold rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{
              duration: LOADER_DURATION,
              ease: 'linear',
            }}
          />
        </div>
      </div>

      {/* Text */}
      <div className="text-center">
        <p className="font-display text-2xl font-bold text-white mb-2">
          Calculating your Travel DNA
          <AnimatedEllipsis />
        </p>
        <p className="text-white/50 text-sm">
          Matching your vibe to the best deals
        </p>
      </div>
    </div>
  );
}

function AnimatedEllipsis() {
  return (
    <span aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.3,
            ease: 'easeInOut',
          }}
        >
          .
        </motion.span>
      ))}
    </span>
  );
}
