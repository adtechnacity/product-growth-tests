'use client';

import { useState, useCallback } from 'react';
import { Twitter, Facebook, MessageCircle, Copy, Check } from 'lucide-react';
import { useVibeLog } from '@/hooks/useVibeLog';
import { useClickId } from '@/hooks/useClickId';

interface ShareButtonsProps {
  vibeSlug: string;
  vibeHeadline: string;
}

type SharePlatform = 'x' | 'facebook' | 'whatsapp' | 'copy_link';

const COPIED_RESET_MS = 2000;

export function ShareButtons({ vibeSlug, vibeHeadline }: ShareButtonsProps) {
  const { logEvent } = useVibeLog('jump_page_results_v1');
  const { getClickId } = useClickId();
  const [copied, setCopied] = useState(false);

  const buildShareUrl = useCallback((): string => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const clickid = getClickId();
    const base = `${origin}/results?vibe=${vibeSlug}`;
    return clickid ? `${base}&ref=${clickid}` : base;
  }, [vibeSlug, getClickId]);

  const fireShareClick = useCallback(
    (platform: SharePlatform) => {
      const clickid = getClickId();
      logEvent('share_click', {
        platform,
        vibe: vibeSlug,
        has_clickid: clickid !== null,
      });
    },
    [logEvent, vibeSlug, getClickId]
  );

  const handleCopyLink = useCallback(async () => {
    const url = buildShareUrl();
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      fireShareClick('copy_link');
      logEvent('share_link_copied', {
        vibe: vibeSlug,
        shared_url: url,
      });
      setTimeout(() => setCopied(false), COPIED_RESET_MS);
    } catch {
      // Clipboard write failed silently
    }
  }, [buildShareUrl, fireShareClick, logEvent, vibeSlug]);

  const shareText = `I'm a ${vibeHeadline} — Take the free Travel DNA quiz and find yours →`;

  return (
    <div className="flex flex-row items-center justify-center gap-4 mt-10">
      {/* X (Twitter) */}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(buildShareUrl())}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Share your ${vibeHeadline} result on X`}
        className="text-white/60 hover:text-white/90 transition-colors duration-200"
        onClick={() => fireShareClick('x')}
      >
        <Twitter size={20} aria-hidden="true" />
      </a>

      {/* Facebook */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(buildShareUrl())}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Share your ${vibeHeadline} result on Facebook`}
        className="text-white/60 hover:text-white/90 transition-colors duration-200"
        onClick={() => fireShareClick('facebook')}
      >
        <Facebook size={20} aria-hidden="true" />
      </a>

      {/* WhatsApp */}
      <a
        href={`https://wa.me/?text=${encodeURIComponent(shareText)}%20${encodeURIComponent(buildShareUrl())}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Share your ${vibeHeadline} result on WhatsApp`}
        className="text-white/60 hover:text-white/90 transition-colors duration-200"
        onClick={() => fireShareClick('whatsapp')}
      >
        <MessageCircle size={20} aria-hidden="true" />
      </a>

      {/* Copy Link */}
      <button
        type="button"
        aria-label={copied ? 'Link copied!' : `Copy link to your ${vibeHeadline} result`}
        className="text-white/60 hover:text-white/90 transition-colors duration-200"
        onClick={handleCopyLink}
      >
        {copied ? (
          <Check size={20} aria-hidden="true" />
        ) : (
          <Copy size={20} aria-hidden="true" />
        )}
      </button>

      {/* Accessible live region */}
      <span aria-live="polite" className="sr-only">
        {copied ? 'Link copied to clipboard!' : ''}
      </span>
    </div>
  );
}
