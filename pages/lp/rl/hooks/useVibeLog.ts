'use client';
import { useCallback } from 'react';
import type { VibeEvent } from '@/types';

export function useVibeLog(componentId: string) {
  const logEvent = useCallback(
    (eventName: string, metadata: Record<string, unknown> = {}) => {
      const payload: VibeEvent = {
        event_name: eventName,
        component_id: componentId,
        timestamp: new Date().toISOString(),
        url: window.location.pathname,
        metadata,
      };
      if (process.env.NODE_ENV === 'development') {
        console.log('[vibe-log]', payload);
      }
      // TODO Q5: navigator.sendBeacon('/api/log', JSON.stringify(payload));
    },
    [componentId]
  );
  return { logEvent };
}
