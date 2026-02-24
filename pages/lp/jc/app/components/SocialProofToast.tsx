"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ToastItem } from "@/app/lib/toast-messages";

const VISIBLE_COUNT = 5;
const ADD_INTERVAL = 2500; // ms between new toasts appearing
const INITIAL_DELAY = 3000;

interface SocialProofToastProps {
  items: ToastItem[];
  enabled?: boolean;
}

interface VisibleToast {
  item: ToastItem;
  id: number;
  entering: boolean;
}

function GreenCheck() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0"
    >
      <circle cx="9" cy="9" r="9" fill="#22C55E" />
      <path
        d="M5 9.5L7.5 12L13 6.5"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SocialProofToast({
  items,
  enabled = true,
}: SocialProofToastProps) {
  const [shuffled] = useState(() => {
    const arr = [...items];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  });

  const [visibleToasts, setVisibleToasts] = useState<VisibleToast[]>([]);
  const [dismissed, setDismissed] = useState(false);
  const nextIndexRef = useRef(0);
  const idCounter = useRef(0);
  const delayRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);
  const enterTimers = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());
  const cancelledRef = useRef(false);

  // Add a new toast to the stack
  const addToast = useCallback(() => {
    if (cancelledRef.current || shuffled.length === 0) return;

    const item = shuffled[nextIndexRef.current % shuffled.length];
    nextIndexRef.current++;
    const id = idCounter.current++;

    setVisibleToasts((prev) => {
      const trimmed = prev.length >= VISIBLE_COUNT ? prev.slice(1) : prev;
      return [...trimmed, { item, id, entering: true }];
    });

    // Clear entering state after animation (tracked for cleanup)
    const t = setTimeout(() => {
      enterTimers.current.delete(t);
      setVisibleToasts((prev) =>
        prev.map((toast) => (toast.id === id ? { ...toast, entering: false } : toast))
      );
    }, 400);
    enterTimers.current.add(t);
  }, [shuffled]);

  // Main feed effect
  useEffect(() => {
    if (!enabled || dismissed || shuffled.length === 0) return;

    cancelledRef.current = false;

    delayRef.current = setTimeout(() => {
      if (cancelledRef.current) return;
      addToast();

      intervalRef.current = setInterval(() => {
        if (cancelledRef.current) return;
        addToast();
      }, ADD_INTERVAL);
    }, INITIAL_DELAY);

    return () => {
      cancelledRef.current = true;
      clearTimeout(delayRef.current);
      clearInterval(intervalRef.current);
      enterTimers.current.forEach(clearTimeout);
      enterTimers.current.clear();
    };
  }, [enabled, dismissed, shuffled.length, addToast]);

  // Dismiss
  const handleDismiss = useCallback(() => {
    cancelledRef.current = true;
    clearTimeout(delayRef.current);
    clearInterval(intervalRef.current);
    enterTimers.current.forEach(clearTimeout);
    enterTimers.current.clear();
    setVisibleToasts([]);
    setDismissed(true);
  }, []);

  // Reappear after dismiss
  useEffect(() => {
    if (!dismissed || !enabled) return;

    const scrollStart = window.scrollY;
    let cleaned = false;

    function reappear() {
      if (cleaned) return;
      cleaned = true;
      clearTimeout(reappearTimer);
      window.removeEventListener("scroll", handleScroll);
      setDismissed(false);
    }

    const reappearTimer = setTimeout(reappear, 60_000);

    function handleScroll() {
      if (Math.abs(window.scrollY - scrollStart) > 800) {
        reappear();
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      cleaned = true;
      clearTimeout(reappearTimer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dismissed, enabled]);

  if (shuffled.length === 0 || dismissed) return null;
  if (visibleToasts.length === 0) return null;

  return (
    <div className="fixed bottom-3 left-3 sm:bottom-4 sm:left-4 z-[var(--z-toast)]">
      {/* Close button — circle above top-right corner */}
      <button
        onClick={handleDismiss}
        className="absolute -top-3 -right-3 w-7 h-7 bg-white rounded-full shadow-md border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-50 cursor-pointer z-10 transition-colors"
        aria-label="Dismiss notifications"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M2 2l8 8M10 2l-8 8" />
        </svg>
      </button>

      {/* Toast stack — newest at bottom */}
      <div className="flex flex-col gap-1.5 max-w-[300px] sm:max-w-[340px]">
        {visibleToasts.map((toast, index) => {
          // Opacity: newest (last) = 1, fades out going up
          const distFromBottom = visibleToasts.length - 1 - index;
          const opacity = Math.max(0.15, 1 - distFromBottom * 0.2);
          const logoUrl = `https://images.capitaloneshopping.com/api/v1/logos?domain=${toast.item.domain}&width=300`;

          return (
            <div
              key={toast.id}
              className="transition-all duration-400 ease-out"
              style={{
                opacity,
                transform: toast.entering ? "translateY(20px)" : "translateY(0)",
              }}
            >
              <div className="flex items-center gap-2.5 bg-white rounded-lg shadow-md border border-gray-100 px-3 py-2.5">
                <GreenCheck />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logoUrl}
                  alt=""
                  width={40}
                  height={20}
                  className="h-5 w-10 shrink-0 object-contain"
                />
                <p className="text-[13px] text-gray-700 leading-snug">
                  <span className="font-semibold">{toast.item.dealCount}</span>{" "}
                  active deals
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
