"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import type { QuizOption, QuizAnswers } from "./types";
import type { COSMerchantData } from "@/lib/cos-data";
import { QUESTIONS } from "./questions";
import QuizProgress from "./QuizProgress";
import QuizQuestion from "./QuizQuestion";
import QuizResult from "./QuizResult";

const ADVANCE_DELAY = 400;
const TRANSITION_MS = 300;

interface QuizProps {
  merchants: COSMerchantData[];
  mode?: "standalone" | "gateway";
  onComplete?: (answers: QuizAnswers) => void;
  onSkip?: () => void;
}

export default function Quiz({ merchants, mode = "standalone", onComplete, onSkip }: QuizProps) {
  const totalScreens = mode === "gateway" ? 2 : 3;
  const progressMap = mode === "gateway" ? [50, 100] : [33, 67, 100];

  const [currentScreen, setCurrentScreen] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = useCallback(() => {
    if (advanceTimer.current) {
      clearTimeout(advanceTimer.current);
      advanceTimer.current = null;
    }
  }, []);

  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  const goToScreen = useCallback((screen: number) => {
    setCurrentScreen(screen);
  }, []);

  const handleSelect = useCallback(
    (questionIndex: number, option: QuizOption) => {
      clearTimer();

      const questionId = QUESTIONS[questionIndex].id;
      const answer = { questionId, key: option.key, value: option.value };

      setAnswers((prev) => {
        const updated =
          questionId === "frequency"
            ? { ...prev, frequency: answer }
            : { ...prev, partySize: answer };

        advanceTimer.current = setTimeout(() => {
          const nextScreen = questionIndex + 1;

          if (mode === "gateway" && nextScreen >= totalScreens) {
            // Gateway mode: last question answered, fire onComplete
            onComplete?.(updated);
          } else if (mode === "standalone" && nextScreen === totalScreens - 1) {
            // Standalone mode: moving to result screen
            goToScreen(nextScreen);
            onComplete?.(updated);
          } else {
            goToScreen(nextScreen);
          }
        }, ADVANCE_DELAY);

        return updated;
      });
    },
    [clearTimer, goToScreen, onComplete, mode, totalScreens]
  );

  const handleQuizSkip = useCallback(
    (fromScreen: number) => {
      clearTimer();

      if (mode === "gateway") {
        // Gateway mode: skip goes to parent
        if (fromScreen === 0) {
          // Skip from Q1: no answers, use onSkip path
          onSkip?.();
        } else {
          // Skip from Q2: preserve Q1 answer, use onComplete path
          setAnswers((prev) => {
            const skipAnswers: QuizAnswers = {
              ...prev,
              partySize: { questionId: "partySize", key: "couple", value: 2400 },
            };
            onComplete?.(skipAnswers);
            return skipAnswers;
          });
        }
      } else {
        // Standalone mode: skip goes to result screen
        if (fromScreen === 0) {
          goToScreen(totalScreens - 1);
          onComplete?.({});
        } else {
          setAnswers((prev) => {
            const skipAnswers: QuizAnswers = {
              ...prev,
              partySize: { questionId: "partySize", key: "couple", value: 2400 },
            };
            onComplete?.(skipAnswers);
            return skipAnswers;
          });
          goToScreen(totalScreens - 1);
        }
      }
    },
    [clearTimer, goToScreen, onComplete, onSkip, mode, totalScreens]
  );

  const handleBack = useCallback(() => {
    clearTimer();
    if (currentScreen > 0) {
      goToScreen(currentScreen - 1);
    }
  }, [currentScreen, clearTimer, goToScreen]);

  return (
    <div className="relative w-full overflow-y-auto overflow-x-hidden flex flex-col bg-white">
      {/* Progress bar */}
      <QuizProgress progress={progressMap[currentScreen] ?? 0} />

      {/* Back arrow */}
      {currentScreen > 0 && (
        <button
          type="button"
          onClick={handleBack}
          className="absolute top-4 left-4 z-10 p-3 cursor-pointer text-gray-500 hover:text-gray-800 transition-colors"
          aria-label="Go back"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Sliding track */}
      <div
        className="flex"
        style={{
          width: `${totalScreens * 100}%`,
          transform: `translateX(-${(currentScreen * 100) / totalScreens}%)`,
          transition: `transform ${TRANSITION_MS}ms ease-out`,
        }}
      >
        {/* Q1 */}
        <div
          className="flex-shrink-0"
          style={{ width: `${100 / totalScreens}%` }}
        >
          <QuizQuestion
            question={QUESTIONS[0]}
            selectedKey={answers.frequency?.key ?? null}
            onSelect={(option) => handleSelect(0, option)}
            onSkip={() => handleQuizSkip(0)}
            skipLabel={mode === "gateway" ? "Skip to article \u2192" : undefined}
          />
        </div>

        {/* Q2 */}
        <div
          className="flex-shrink-0"
          style={{ width: `${100 / totalScreens}%` }}
        >
          <QuizQuestion
            question={QUESTIONS[1]}
            selectedKey={answers.partySize?.key ?? null}
            onSelect={(option) => handleSelect(1, option)}
            onSkip={() => handleQuizSkip(1)}
            skipLabel={mode === "gateway" ? "Skip to article \u2192" : undefined}
          />
        </div>

        {/* Result - standalone mode only */}
        {mode === "standalone" && (
          <div
            className="flex-shrink-0"
            style={{ width: `${100 / totalScreens}%` }}
          >
            <QuizResult answers={answers} merchants={merchants} isActive={currentScreen === totalScreens - 1} />
          </div>
        )}
      </div>
    </div>
  );
}
