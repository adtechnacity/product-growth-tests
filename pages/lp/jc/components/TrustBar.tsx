import Image from "next/image";
import type { COSChromeStats } from "@/lib/cos-data";

const pressLogos = [
  { src: "/logos/forbes.svg", alt: "Forbes", width: 80, height: 22 },
  { src: "/logos/fortune.svg", alt: "Fortune", width: 80, height: 22 },
  { src: "/logos/usa-today.svg", alt: "USA Today", width: 96, height: 28 },
];

function StarIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
      className="text-yellow-400 flex-shrink-0"
    >
      <path d="M8 1.2l1.8 3.6 4 .6-2.9 2.8.7 4L8 10.2l-3.6 1.9.7-4L2.2 5.4l4-.6z" />
    </svg>
  );
}

interface TrustBarProps {
  stats: COSChromeStats;
}

function TrustBar({ stats }: TrustBarProps) {
  const userDisplay = `${stats.userCount}+ users`;

  return (
    <div className="border-b border-divider">
      <div className="max-w-4xl mx-auto py-4 px-6">
        {/* Desktop layout: single horizontal row */}
        <div className="hidden md:flex items-center gap-6">
          {/* COS Logo */}
          <div className="flex-shrink-0">
            <Image
              src="/logos/capital-one-shopping.svg"
              alt="Capital One Shopping"
              width={140}
              height={28}
              priority
            />
          </div>

          {/* Divider */}
          <div className="h-8 w-px bg-divider flex-shrink-0" aria-hidden="true" />

          {/* Star rating + stats */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <StarIcon />
            <span className="text-sm font-semibold text-headline">
              {stats.ratingValue}
            </span>
            <span className="text-sm text-gray-500">·</span>
            <span className="text-sm text-gray-500">{userDisplay}</span>
          </div>

          {/* Divider */}
          <div className="h-8 w-px bg-divider flex-shrink-0" aria-hidden="true" />

          {/* Press logos */}
          <div className="flex items-center gap-5">
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-400 flex-shrink-0">
              As Seen In
            </span>
            {pressLogos.map((logo) => (
              <Image
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                sizes={`${logo.width}px`}
                className="grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-200"
              />
            ))}
          </div>
        </div>

        {/* Mobile layout: stacked rows */}
        <div className="flex flex-col items-center gap-3 md:hidden">
          {/* Row 1: COS logo */}
          <Image
            src="/logos/capital-one-shopping.svg"
            alt="Capital One Shopping"
            width={140}
            height={28}
            priority
          />

          {/* Row 2: Star rating + stats */}
          <div className="flex items-center gap-2">
            <StarIcon />
            <span className="text-sm font-semibold text-headline">
              {stats.ratingValue}
            </span>
            <span className="text-sm text-gray-500">·</span>
            <span className="text-sm text-gray-500">{userDisplay}</span>
          </div>

          {/* Row 3: Press logos */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              As Seen In
            </span>
            <div className="flex items-center gap-3 flex-wrap justify-center">
              {pressLogos.map((logo) => (
                <Image
                  key={logo.alt}
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  sizes={`${logo.width}px`}
                  className="grayscale opacity-50 max-w-full h-auto"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { TrustBar };
export default TrustBar;
