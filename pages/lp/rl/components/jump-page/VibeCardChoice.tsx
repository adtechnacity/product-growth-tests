'use client';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface VibeOption {
  value: string;
  label: string;
  sublabel?: string;
  imageUrl: string;
  imageAlt: string;
}

interface VibeCardChoiceProps {
  options: VibeOption[];
  onSelect: (value: string) => void;
  priority?: boolean;
  groupLabel: string;
}

export function VibeCardChoice({
  options,
  onSelect,
  priority = false,
  groupLabel,
}: VibeCardChoiceProps) {
  return (
    <div
      role="radiogroup"
      aria-label={groupLabel}
      className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full"
    >
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onSelect(option.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSelect(option.value);
            }
          }}
          className={cn(
            'relative aspect-[4/5] sm:aspect-[3/4] rounded-2xl overflow-hidden',
            'group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-vibe-coral focus-visible:ring-offset-2 focus-visible:ring-offset-vibe-ink',
            'transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]'
          )}
        >
          {/* Background image */}
          <Image
            src={option.imageUrl}
            alt={option.imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={priority}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Hover highlight ring */}
          <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-vibe-coral transition-colors duration-200" />

          {/* Label */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <p className="font-display text-2xl font-bold text-white leading-tight">
              {option.label}
            </p>
            {option.sublabel && (
              <p className="text-white/70 text-sm mt-1">{option.sublabel}</p>
            )}
          </div>

          {/* Tap indicator */}
          <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span className="text-white text-xs font-bold">✓</span>
          </div>
        </button>
      ))}
    </div>
  );
}
