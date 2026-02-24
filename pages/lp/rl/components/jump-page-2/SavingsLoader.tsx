'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LOADER_DURATION = 2500;
const MESSAGE_INTERVAL = LOADER_DURATION / 3;

const STEPS: Array<{ emoji: string; message: string }> = [
  { emoji: '🔍', message: 'Analyzing your shopping patterns...' },
  { emoji: '💰', message: 'Calculating potential savings...' },
  { emoji: '📊', message: 'Building your personal plan...' },
];

interface SavingsLoaderProps {
  onComplete: () => void;
}

export function SavingsLoader({ onComplete }: SavingsLoaderProps) {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const stepTimers = STEPS.slice(1).map((_, i) =>
      setTimeout(() => setStepIndex(i + 1), MESSAGE_INTERVAL * (i + 1))
    );
    const completeTimer = setTimeout(onComplete, LOADER_DURATION);

    return () => {
      stepTimers.forEach(clearTimeout);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  const currentStep = STEPS[stepIndex];

  return (
    <div className="flex flex-col items-center justify-center gap-8 py-16">
      {/* Animated emoji */}
      <AnimatePresence mode="wait">
        <motion.span
          key={currentStep.emoji}
          initial={{ opacity: 0, scale: 0.6, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 1.2, y: -10 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="text-5xl"
          aria-hidden="true"
        >
          {currentStep.emoji}
        </motion.span>
      </AnimatePresence>

      {/* Progress bar */}
      <div className="w-full max-w-sm">
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-vibe-coral to-vibe-gold rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: LOADER_DURATION / 1000, ease: 'linear' }}
          />
        </div>
      </div>

      {/* Cycling message */}
      <div className="text-center min-h-[4rem] flex flex-col items-center justify-center gap-2">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentStep.message}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="font-display text-xl font-bold text-white"
          >
            {currentStep.message}
          </motion.p>
        </AnimatePresence>
        <p className="text-white/50 text-sm">
          Finding the best deals for your profile
        </p>
      </div>
    </div>
  );
}
