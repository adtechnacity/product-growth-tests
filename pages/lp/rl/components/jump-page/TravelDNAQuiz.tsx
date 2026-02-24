'use client';
import { useReducer, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useVibeLog } from '@/hooks/useVibeLog';
import { useClickId } from '@/hooks/useClickId';
import { VibeCardChoice } from './VibeCardChoice';
import { PaceSlider } from './PaceSlider';
import { ResultsLoader } from './ResultsLoader';
import type { QuizStep, QuizAnswers, VibeSlug } from '@/types';

// Unsplash placeholders — replace with approved assets before production
const IMAGES = {
  beach: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
  nightmarket: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
  solo: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=800',
  couple: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
  squad: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800',
  hero: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600',
} as const;

// --- State machine ---
interface QuizState {
  step: QuizStep;
  answers: QuizAnswers;
}

type QuizAction =
  | { type: 'ANSWER_VIBE'; payload: QuizAnswers['vibe'] }
  | { type: 'ANSWER_PACE'; payload: number }
  | { type: 'ANSWER_CREW'; payload: QuizAnswers['crew'] }
  | { type: 'SHOW_RESULT' };

const initialState: QuizState = {
  step: 'vibe',
  answers: { vibe: null, pace: 50, crew: null },
};

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'ANSWER_VIBE':
      return { step: 'pace', answers: { ...state.answers, vibe: action.payload } };
    case 'ANSWER_PACE':
      return { step: 'crew', answers: { ...state.answers, pace: action.payload } };
    case 'ANSWER_CREW':
      return { step: 'loading', answers: { ...state.answers, crew: action.payload } };
    case 'SHOW_RESULT':
      return { ...state, step: 'result' };
    default:
      return state;
  }
}

function computeVibe(answers: QuizAnswers): VibeSlug {
  const { vibe, pace } = answers;
  if (vibe === 'beach') return pace < 50 ? 'relax' : 'adventure';
  return pace < 50 ? 'culture' : 'party';
}

const STEP_LABELS: Record<Exclude<QuizStep, 'loading' | 'result'>, number> = {
  vibe: 1,
  pace: 2,
  crew: 3,
};

// Framer Motion variants for step transitions
const stepVariants = {
  enter: { opacity: 0, y: 24 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
};

export function TravelDNAQuiz() {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const router = useRouter();
  const { logEvent } = useVibeLog('jump_page_quiz_v1');
  const { captureClickId } = useClickId();
  const skipClicked = useRef(false);

  // Drop-off tracking — suppressed when user clicks skip link
  useEffect(() => {
    const handleUnload = () => {
      if (state.step !== 'result' && !skipClicked.current) {
        logEvent('quiz_drop_off', { last_step: state.step });
      }
    };
    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, [state.step, logEvent]);

  // Capture click ID and referrer from URL params on mount
  useEffect(() => {
    captureClickId();
    // Fire referral_quiz_start if user arrived via referral link
    const referrer = sessionStorage.getItem('vibe_referrer');
    if (referrer) {
      logEvent('referral_quiz_start', { referrer_clickid: referrer });
    }
  }, [captureClickId, logEvent]);

  const handleVibeSelect = useCallback(
    (value: string) => {
      if (value !== 'beach' && value !== 'nightmarket') return;
      logEvent('quiz_step_advance', { step: 'vibe', answer: value });
      dispatch({ type: 'ANSWER_VIBE', payload: value });
    },
    [logEvent]
  );

  const handlePaceConfirm = useCallback(
    (pace: number) => {
      logEvent('quiz_step_advance', { step: 'pace', answer: pace });
      dispatch({ type: 'ANSWER_PACE', payload: pace });
    },
    [logEvent]
  );

  const handleCrewSelect = useCallback(
    (value: string) => {
      if (value !== 'solo' && value !== 'couple' && value !== 'squad') return;
      logEvent('quiz_step_advance', { step: 'crew', answer: value });
      dispatch({ type: 'ANSWER_CREW', payload: value });
    },
    [logEvent]
  );

  const handleLoaderComplete = useCallback(() => {
    const vibe = computeVibe(state.answers);
    logEvent('quiz_complete', {
      vibe,
      pace: state.answers.pace,
      crew: state.answers.crew,
    });
    router.push(`/results?vibe=${vibe}`);
  }, [state.answers, logEvent, router]);

  const handleSkipToResults = useCallback(() => {
    const stepNum = state.step in STEP_LABELS
      ? STEP_LABELS[state.step as keyof typeof STEP_LABELS]
      : 1;
    skipClicked.current = true;
    logEvent('quiz_skip_to_cta', {
      skipped_from_step: state.step,
      step_number: stepNum,
      answers_so_far: state.answers,
    });
    router.push(`/results?vibe=skip&skipped_from=${stepNum}`);
  }, [state.step, state.answers, logEvent, router]);

  const currentStepNum =
    state.step in STEP_LABELS
      ? STEP_LABELS[state.step as keyof typeof STEP_LABELS]
      : null;

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Hero background */}
      <div className="absolute inset-0 z-0">
        <Image
          src={IMAGES.hero}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-vibe-ink/60 via-vibe-ink/40 to-vibe-ink" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center min-h-screen px-4 py-12">
        {/* Quiz header */}
        <div className="text-center mb-10">
          <p className="text-vibe-coral text-xs tracking-[0.3em] uppercase font-semibold mb-3">
            Capital One Shopping — 100% Free
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight">
            What&apos;s Your Travel DNA?
          </h2>
          <p className="text-white/60 text-lg mt-3">
            3 quick questions. Unlock free travel deals.
          </p>
        </div>

        {/* Progress indicator */}
        {currentStepNum !== null && (
          <div className="flex items-center gap-2 mb-8">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  n < currentStepNum
                    ? 'w-8 bg-vibe-coral'
                    : n === currentStepNum
                    ? 'w-8 bg-white'
                    : 'w-4 bg-white/20'
                }`}
              />
            ))}
            <span className="text-white/50 text-xs ml-2">
              Step {currentStepNum} of 3
            </span>
          </div>
        )}

        {/* Step container — fixed min-height prevents CLS */}
        <div className="w-full max-w-2xl min-h-[520px] flex flex-col justify-center">
          <AnimatePresence mode="wait" initial={false}>
            {state.step === 'vibe' && (
              <motion.div
                key="vibe"
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="flex flex-col gap-6"
              >
                <div className="text-center">
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
                    Pick your vibe
                  </h3>
                  <p className="text-white/50 text-sm">Tap to choose — it&apos;s free, no sign-up needed</p>
                </div>
                <VibeCardChoice
                  groupLabel="Travel vibe"
                  priority
                  options={[
                    {
                      value: 'beach',
                      label: 'Beach & Sun',
                      sublabel: 'Waves, sand, total switch-off',
                      imageUrl: IMAGES.beach,
                      imageAlt: 'Tropical beach with turquoise water',
                    },
                    {
                      value: 'nightmarket',
                      label: 'Night Market',
                      sublabel: 'Street food, neon, electric energy',
                      imageUrl: IMAGES.nightmarket,
                      imageAlt: 'Vibrant night market with food stalls',
                    },
                  ]}
                  onSelect={handleVibeSelect}
                />
              </motion.div>
            )}

            {state.step === 'pace' && (
              <motion.div
                key="pace"
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.22, ease: 'easeOut' }}
              >
                <div className="text-center mb-8">
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
                    What&apos;s your pace?
                  </h3>
                  <p className="text-white/50 text-sm">
                    Drag to set your pace — free personalized results
                  </p>
                </div>
                <PaceSlider
                  initialValue={state.answers.pace}
                  onConfirm={handlePaceConfirm}
                />
              </motion.div>
            )}

            {state.step === 'crew' && (
              <motion.div
                key="crew"
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="flex flex-col gap-6"
              >
                <div className="text-center">
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
                    Who&apos;s coming?
                  </h3>
                  <p className="text-white/50 text-sm">Tap to choose — free deals unlock next</p>
                </div>
                <VibeCardChoice
                  groupLabel="Travel crew"
                  options={[
                    {
                      value: 'solo',
                      label: 'Solo',
                      sublabel: 'Just me, myself & I',
                      imageUrl: IMAGES.solo,
                      imageAlt: 'Solo traveler with backpack',
                    },
                    {
                      value: 'couple',
                      label: 'Couple',
                      sublabel: 'Two of us, one adventure',
                      imageUrl: IMAGES.couple,
                      imageAlt: 'Couple on a mountain viewpoint',
                    },
                    {
                      value: 'squad',
                      label: 'Squad',
                      sublabel: 'More the merrier',
                      imageUrl: IMAGES.squad,
                      imageAlt: 'Group of friends laughing outdoors',
                    },
                  ]}
                  onSelect={handleCrewSelect}
                />
              </motion.div>
            )}

            {state.step === 'loading' && (
              <motion.div
                key="loading"
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.22, ease: 'easeOut' }}
              >
                <ResultsLoader onComplete={handleLoaderComplete} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Skip link — single instance, visible on quiz steps only */}
          {currentStepNum !== null && (
            <a
              href={`/results?vibe=skip&skipped_from=${currentStepNum}`}
              onClick={(e) => { e.preventDefault(); handleSkipToResults(); }}
              className="btn text-white/40 hover:text-white/60 text-sm underline underline-offset-4 py-3 transition-colors duration-200 text-center mt-4"
              aria-label="Skip the quiz and get the free Capital One Shopping extension now"
            >
              Skip quiz — get the free extension now
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
