'use client';
import { useCallback } from 'react';
import { useSearchParams } from 'next/navigation';

const CLICKID_PARAM = 'atnid';
const REFERRER_PARAM = 'ref';

const CLICKID_KEY = 'vibe_clickid';
const REFERRER_KEY = 'vibe_referrer';

const REFERRER_PATTERN = /^[a-zA-Z0-9-]{1,64}$/;

function isValidReferrer(value: string): boolean {
  return REFERRER_PATTERN.test(value);
}

function readFromSession(key: string): string | null {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem(key);
}

function writeToSession(key: string, value: string): void {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(key, value);
}

export function useClickId() {
  const searchParams = useSearchParams();

  const captureClickId = useCallback(() => {
    const clickId = searchParams.get(CLICKID_PARAM);
    if (clickId) {
      writeToSession(CLICKID_KEY, clickId);
    }

    const ref = searchParams.get(REFERRER_PARAM);
    if (ref && isValidReferrer(ref)) {
      writeToSession(REFERRER_KEY, ref);
    }
  }, [searchParams]);

  const getClickId = useCallback((): string | null => {
    return readFromSession(CLICKID_KEY);
  }, []);

  const getReferrerClickId = useCallback((): string | null => {
    return readFromSession(REFERRER_KEY);
  }, []);

  return { captureClickId, getClickId, getReferrerClickId };
}
