'use client';
import { useReducer, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useVibeLog } from '@/hooks/useVibeLog';
import { useClickId } from '@/hooks/useClickId';
import { TextChoice } from './TextChoice';
import { ScaleSelector } from './ScaleSelector';
import { SpendSlider } from './SpendSlider';
import { SavingsLoader } from './SavingsLoader';
import { buildSavingsPersona } from '@/lib/savings-compute';
import type { SavingsQuizStep, SavingsQuizAnswers } from '@/types';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600';

const SHOPPING_IMAGES = {
  fashion: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
  electronics: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800',
  home: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800',
  travel: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800',
} as const;

interface QuizState {
  step: SavingsQuizStep;
  answers: SavingsQuizAnswers;
}

type QuizAction =
  | { type: 'ANSWER_SHOPPING'; payload: SavingsQuizAnswers['shopping'] }
  | { type: 'ANSWER_DEAL_METHOD'; payload: SavingsQuizAnswers['dealMethod'] }
  | { type: 'ANSWER_REGRET'; payload: SavingsQuizAnswers['regret'] }
  | { type: 'ANSWER_SPEND'; payload: number }
  | { type: 'ANSWER_IMPORTANCE'; payload: number }
  | { type: 'ANSWER_DREAM'; payload: SavingsQuizAnswers['dream'] }
  | { type: 'SHOW_RESULT' };

const initialState: QuizState = {
  step: 'shopping',
  answers: {
    shopping: null,
    dealMethod: null,
    regret: null,
    monthlySpend: 200,
    importance: 3,
    dream: null,
  },
};

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'ANSWER_SHOPPING':
      return { step: 'deal_method', answers: { ...state.answers, shopping: action.payload } };
    case 'ANSWER_DEAL_METHOD':
      return { step: 'regret', answers: { ...state.answers, dealMethod: action.payload } };
    case 'ANSWER_REGRET':
      return { step: 'spend', answers: { ...state.answers, regret: action.payload } };
    case 'ANSWER_SPEND':
      return { step: 'importance', answers: { ...state.answers, monthlySpend: action.payload } };
    case 'ANSWER_IMPORTANCE':
      return { step: 'dream', answers: { ...state.answers, importance: action.payload } };
    case 'ANSWER_DREAM':
      return { step: 'loading', answers: { ...state.answers, dream: action.payload } };
    case 'SHOW_RESULT':
      return { ...state, step: 'result' };
    default:
      return state;
  }
}

const STEP_ORDER: SavingsQuizStep[] = ['shopping', 'deal_method', 'regret', 'spend', 'importance', 'dream'];
const TOTAL_STEPS = STEP_ORDER.length;

const stepVariants = {
  enter: { opacity: 0, y: 24 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
};

export function SavingsQuiz() {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const router = useRouter();
  const { logEvent } = useVibeLog('savings_quiz_v1');
  const { captureClickId } = useClickId();
  const skipClicked = useRef(false);

  useEffect(() => {
    captureClickId();
  }, [captureClickId]);

  useEffect(() => {
    const handleUnload = () => {
      if (state.step !== 'result' && !skipClicked.current) {
        logEvent('quiz_drop_off', { last_step: state.step });
      }
    };
    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, [state.step, logEvent]);

  const currentStepIndex = STEP_ORDER.indexOf(state.step as SavingsQuizStep);
  const currentStepNum = currentStepIndex >= 0 ? currentStepIndex + 1 : null;

  // Progress bar: start at 15%, accelerate near end (endowed progress effect)
  const progressPct = currentStepNum !== null
    ? 15 + ((currentStepNum / TOTAL_STEPS) * 85)
    : 0;

  const handleShopping = useCallback((value: string) => {
    logEvent('quiz_step_advance', { step: 'shopping', answer: value });
    dispatch({ type: 'ANSWER_SHOPPING', payload: value as SavingsQuizAnswers['shopping'] });
  }, [logEvent]);

  const handleDealMethod = useCallback((value: string) => {
    logEvent('quiz_step_advance', { step: 'deal_method', answer: value });
    dispatch({ type: 'ANSWER_DEAL_METHOD', payload: value as SavingsQuizAnswers['dealMethod'] });
  }, [logEvent]);

  const handleRegret = useCallback((value: string) => {
    logEvent('quiz_step_advance', { step: 'regret', answer: value });
    dispatch({ type: 'ANSWER_REGRET', payload: value as SavingsQuizAnswers['regret'] });
  }, [logEvent]);

  const handleSpend = useCallback((value: number) => {
    logEvent('quiz_step_advance', { step: 'spend', answer: value });
    dispatch({ type: 'ANSWER_SPEND', payload: value });
  }, [logEvent]);

  const handleImportance = useCallback((value: number) => {
    logEvent('quiz_step_advance', { step: 'importance', answer: value });
    dispatch({ type: 'ANSWER_IMPORTANCE', payload: value });
  }, [logEvent]);

  const handleDream = useCallback((value: string) => {
    logEvent('quiz_step_advance', { step: 'dream', answer: value });
    dispatch({ type: 'ANSWER_DREAM', payload: value as SavingsQuizAnswers['dream'] });
  }, [logEvent]);

  const handleLoaderComplete = useCallback(() => {
    const persona = buildSavingsPersona(state.answers);
    logEvent('quiz_complete', {
      persona: persona.slug,
      score: persona.score,
      monthly_spend: state.answers.monthlySpend,
      yearly_savings: persona.yearlySavings,
    });
    router.push(`/results-2?persona=${persona.slug}&score=${persona.score}&spend=${state.answers.monthlySpend}`);
  }, [state.answers, logEvent, router]);

  const handleSkipToResults = useCallback(() => {
    skipClicked.current = true;
    logEvent('quiz_skip_to_cta', {
      skipped_from_step: state.step,
      step_number: currentStepNum,
      answers_so_far: state.answers,
    });
    router.push('/results-2?persona=casual&score=50&spend=200&skipped=1');
  }, [state.step, currentStepNum, state.answers, logEvent, router]);

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Hero background */}
      <div className="absolute inset-0 z-0">
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-vibe-ink/60 via-vibe-ink/40 to-vibe-ink" />
      </div>

      <div className="relative z-10 flex flex-col items-center min-h-screen px-4 py-12">
        {/* Quiz header */}
        <div className="text-center mb-8">
          <p className="text-vibe-gold text-xs tracking-[0.3em] uppercase font-semibold mb-3">
            Capital One Shopping — 100% Free
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight">
            What&apos;s Your Savings Score?
          </h2>
          <p className="text-white/60 text-lg mt-3">
            60-second quiz. Find out how much you&apos;re leaving on the table.
          </p>
        </div>

        {/* Progress bar — endowed at 15% */}
        {currentStepNum !== null && (
          <div className="w-full max-w-md mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/50 text-xs">
                Question {currentStepNum} of {TOTAL_STEPS}
              </span>
              <span className="text-white/50 text-xs">
                {Math.round(progressPct)}%
              </span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-vibe-gold to-vibe-coral rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </div>
          </div>
        )}

        {/* Step container */}
        <div className="w-full max-w-2xl min-h-[520px] flex flex-col justify-center">
          <AnimatePresence mode="wait" initial={false}>
            {state.step === 'shopping' && (
              <motion.div key="shopping" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.22, ease: 'easeOut' }} className="flex flex-col gap-6">
                <div className="text-center">
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
                    What do you shop for most online?
                  </h3>
                  <p className="text-white/50 text-sm">Tap to choose — it&apos;s free, no sign-up needed</p>
                </div>
                <div role="radiogroup" aria-label="Shopping category" className="grid grid-cols-2 gap-4">
                  {([
                    { value: 'fashion', label: 'Fashion & Style', image: SHOPPING_IMAGES.fashion },
                    { value: 'electronics', label: 'Electronics & Tech', image: SHOPPING_IMAGES.electronics },
                    { value: 'home', label: 'Home & Living', image: SHOPPING_IMAGES.home },
                    { value: 'travel', label: 'Travel & Experiences', image: SHOPPING_IMAGES.travel },
                  ] as const).map((item) => (
                    <motion.button
                      key={item.value}
                      role="radio"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleShopping(item.value)}
                      className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-colors duration-200 aspect-[4/3] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-vibe-coral"
                    >
                      <Image src={item.image} alt={item.label} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover opacity-40" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <span className="absolute bottom-3 left-3 right-3 font-display font-bold text-white text-sm md:text-base text-left">
                        {item.label}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {state.step === 'deal_method' && (
              <motion.div key="deal_method" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.22, ease: 'easeOut' }} className="flex flex-col gap-6">
                <div className="text-center">
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
                    How do you usually find deals?
                  </h3>
                  <p className="text-white/50 text-sm">Be honest — no wrong answers</p>
                </div>
                <TextChoice
                  groupLabel="Deal finding method"
                  options={[
                    { value: 'search_codes', label: 'Search for coupon codes', sublabel: 'Google "promo code" before checkout' },
                    { value: 'wait_sales', label: 'Wait for sales', sublabel: 'Black Friday, clearance, seasonal deals' },
                    { value: 'listed_price', label: 'Just buy at listed price', sublabel: 'Life\'s too short to hunt for deals' },
                    { value: 'use_tool', label: 'Use a tool or extension', sublabel: 'Honey, Capital One Shopping, etc.' },
                  ]}
                  onSelect={handleDealMethod}
                />
              </motion.div>
            )}

            {state.step === 'regret' && (
              <motion.div key="regret" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.22, ease: 'easeOut' }} className="flex flex-col gap-6">
                <div className="text-center">
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
                    Ever found a better deal AFTER buying?
                  </h3>
                  <p className="text-white/50 text-sm">That sinking feeling when you spot a lower price...</p>
                </div>
                <TextChoice
                  groupLabel="Post-purchase regret frequency"
                  options={[
                    { value: 'all_the_time', label: 'All the time', sublabel: 'It happens more than I\'d like to admit' },
                    { value: 'once_or_twice', label: 'Once or twice', sublabel: 'Enough to remember the sting' },
                    { value: 'not_sure', label: 'Not sure', sublabel: 'I don\'t usually check after buying' },
                    { value: 'never', label: 'Never', sublabel: 'I always get the best price' },
                  ]}
                  onSelect={handleRegret}
                />
              </motion.div>
            )}

            {state.step === 'spend' && (
              <motion.div key="spend" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.22, ease: 'easeOut' }}>
                <div className="text-center mb-8">
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
                    How much do you spend online per month?
                  </h3>
                  <p className="text-white/50 text-sm">Rough estimate is fine — we&apos;ll calculate your savings</p>
                </div>
                <SpendSlider initialValue={200} onConfirm={handleSpend} />
              </motion.div>
            )}

            {state.step === 'importance' && (
              <motion.div key="importance" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.22, ease: 'easeOut' }}>
                <div className="text-center mb-8">
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
                    How important is it to never overpay?
                  </h3>
                  <p className="text-white/50 text-sm">Rate your deal-hunting commitment</p>
                </div>
                <ScaleSelector
                  label="Importance level"
                  lowLabel="Not at all"
                  highLabel="Extremely"
                  onSelect={handleImportance}
                />
              </motion.div>
            )}

            {state.step === 'dream' && (
              <motion.div key="dream" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.22, ease: 'easeOut' }} className="flex flex-col gap-6">
                <div className="text-center">
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
                    If you saved $50–200/month, what would you use it for?
                  </h3>
                  <p className="text-white/50 text-sm">Dream a little — you deserve it</p>
                </div>
                <TextChoice
                  groupLabel="Savings goal"
                  options={[
                    { value: 'travel', label: 'Travel & Adventures', sublabel: 'Flights, hotels, experiences' },
                    { value: 'food', label: 'Food & Dining', sublabel: 'Restaurants, delivery, groceries' },
                    { value: 'bills', label: 'Bills & Essentials', sublabel: 'Rent, utilities, subscriptions' },
                    { value: 'savings', label: 'Savings & Investing', sublabel: 'Emergency fund, investments' },
                  ]}
                  onSelect={handleDream}
                />
              </motion.div>
            )}

            {state.step === 'loading' && (
              <motion.div key="loading" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.22, ease: 'easeOut' }}>
                <SavingsLoader onComplete={handleLoaderComplete} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Skip link */}
          {currentStepNum !== null && (
            <a
              href="/results-2?persona=casual&score=50&spend=200&skipped=1"
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
