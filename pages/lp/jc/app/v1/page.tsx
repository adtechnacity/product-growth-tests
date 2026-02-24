import type { Metadata } from "next";
import cosData from "@/data/cos-data.defaults.json";

const { chromeStoreStats } = cosData;

export const metadata: Metadata = {
  title:
    "Seniors Could Now Fly Business Class For The Price Of Economy Using This Hack",
  description:
    "One couple shares their heartfelt advice — their top tip for fellow seniors yearning to travel in comfort without overspending.",
};

const CTA_URL = "https://cos-rd.com/go";
const CTA_TEXT = "Add to Browser — It's free.";

function CtaButton() {
  return (
    <div className="flex justify-center my-8">
      <a className="btn" href={CTA_URL}>
        {CTA_TEXT}
      </a>
    </div>
  );
}

function StarRating() {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className="w-5 h-5 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function DollarIcon() {
  return (
    <svg
      className="w-8 h-8 text-cta-blue"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      className="w-8 h-8 text-cta-blue"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
      />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      className="w-8 h-8 text-cta-blue"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5a17.92 17.92 0 0 1-8.716-2.247m0 0A8.966 8.966 0 0 1 3 12c0-1.264.26-2.467.732-3.56"
      />
    </svg>
  );
}

const OBJECTIONS = [
  {
    icon: DollarIcon,
    question: "Is it really free?",
    answer:
      "Yes, 100% free. No credit card needed, no sign-up fee. Capital One Shopping is a completely free service.",
  },
  {
    icon: ShieldIcon,
    question: "Is it safe?",
    answer: `Trusted by ${chromeStoreStats.userCount}+ users with a ${chromeStoreStats.ratingValue}★ rating. Built by Capital One, a Fortune 500 bank.`,
  },
  {
    icon: GlobeIcon,
    question: "Does it work on my browser?",
    answer:
      "Works on Chrome, Firefox, Safari, and Edge. Install takes less than 30 seconds.",
  },
];

function ObjectionCards() {
  return (
    <section className="bg-slate-50 rounded-xl py-10 px-6 my-10">
      <h2 className="text-headline text-xl md:text-2xl font-bold text-center mb-8">
        Common Questions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
        {OBJECTIONS.map(({ icon: Icon, question, answer }) => (
          <div key={question} className="flex flex-col items-center text-center">
            <div className="mb-3">
              <Icon />
            </div>
            <h3 className="font-bold text-lg text-headline mb-2">{question}</h3>
            <p className="text-base leading-relaxed text-gray-700">{answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function V1Page() {
  return (
    <div className="min-h-screen bg-white">
      <article className="mx-auto max-w-[960px] px-6 py-8 md:px-12">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-headline text-[1.8125rem] md:text-[2.75rem] font-bold leading-tight mb-4">
            Seniors Could Now Fly Business Class For The Price Of Economy Using
            This Hack
          </h1>
          <div className="border-b border-divider pb-4">
            <p className="text-sm text-gray-500 mb-1">
              Last Updated: January 10, 2025
            </p>
            <p className="text-sm text-gray-600">
              By: <span className="font-bold">Olivia James</span> - Thrifty
              World Traveler
            </p>
          </div>
        </header>

        {/* Author photo + intro */}
        <div className="flex flex-col sm:flex-row gap-4 items-start mb-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://v.fastcdn.co/u/d4b07245/64158297-0-AI-Headhsot-3.jpg"
            alt="Olivia James - Thrifty World Traveler"
            className="w-24 h-24 rounded-full object-cover shrink-0"
          />
          <p className="text-[1.1875rem] leading-relaxed italic text-gray-700">
            One couple shares their heartfelt advice — their top tip for fellow
            seniors yearning to travel in comfort without overspending.
          </p>
        </div>

        {/* Body Content */}
        <div className="space-y-5 text-[1.1875rem] leading-relaxed">
          <p>
            After years of hard work and raising a family, my husband and I
            looked forward to exploring the world together during our retirement.
            We dreamed of visiting our grandchildren abroad, revisiting places
            from our youth, and discovering new destinations that filled our
            hearts with joy. But like many seniors, we were mindful of our
            budget.
          </p>

          <p>
            For years, we&apos;d resigned ourselves to economy seats—cramped and
            uncomfortable—and figured that business-class travel was reserved for
            the wealthy or frequent flyers. But one conversation with a fellow
            traveler <strong>changed everything.</strong>
          </p>

          <p>
            One evening, at a small gathering of friends, we met another retired
            couple who seemed to always be jetting off to exotic locales. When I
            asked how they afforded it, they shared something that felt like a
            well-kept secret.
          </p>

          <p>
            At first, we were skeptical. Could a simple browser tool really help
            us afford <strong>business-class travel</strong> on a budget? We
            decided to try it out, and it turned out to be one of the best
            decisions we ever made.{" "}
            <a
              href={CTA_URL}
              className="text-cta-blue font-bold hover:underline"
            >
              Capital One Shopping
            </a>{" "}
            works to find deals at checkout—the kind companies don&apos;t always
            advertise—
            <strong>allowing you to save big on travel.</strong>
          </p>

          {/* CTA 1 */}
          <CtaButton />

          {/* Savings screenshot */}
          <figure className="my-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://v.fastcdn.co/u/d4b07245/65534250-0--c2m437wpk1spy50tbur.png"
              alt="Example savings screenshot from Capital One Shopping"
              className="w-full max-w-lg mx-auto rounded-lg"
            />
            <figcaption className="text-center text-xs text-gray-500 mt-2 italic">
              Example savings from 8/29/2024. Savings may vary.
            </figcaption>
          </figure>

          <p>
            Our first experience was a trip to Paris, a city we had always
            dreamed of visiting. Imagine our joy of booking travel{" "}
            <strong>at a fraction of the usual cost.</strong> For the first time,
            we experienced what it is like to travel in true comfort—spacious
            seats, gourmet meals, and impeccable service. It&apos;s everything
            you&apos;ve imagined!
          </p>

          {/* CTA 2 */}
          <CtaButton />

          <p>
            Once you know how to book smart, there&apos;s no need to stress over
            prices. With sites like Hilton offering up to 40% off rates (with
            15% back) and Priceline offering up to 20% back,{" "}
            <strong>there are real savings to be had.</strong> And those savings
            can really add up, opening space in your budget for whatever strikes
            your fancy…hello business class tickets.
          </p>

          <p>
            And the best part?{" "}
            <strong>Capital One Shopping is 100% free.</strong> No subscriptions,
            no hidden fees—just pure savings. Now, you can plan all of your trips
            using this incredible tool.
          </p>

          {/* CTA 3 */}
          <CtaButton />

          {/* Objection Handling Section */}
          <ObjectionCards />

          <p>
            If you&apos;ve always dreamed of traveling in style during your
            retirement,{" "}
            <a
              href={CTA_URL}
              className="text-cta-blue font-bold hover:underline"
            >
              add Capital One Shopping to your browser today.
            </a>{" "}
            You&apos;ve earned this—it&apos;s time to enjoy it.
          </p>

          {/* CTA 4 */}
          <CtaButton />
        </div>

        {/* Social Proof Section */}
        <section className="mt-12 py-8 border-t border-divider">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex items-center gap-2">
              <StarRating />
            </div>
            <p className="text-lg font-bold text-headline">
              8,000,000+ users, Web Store
            </p>
          </div>

          {/* As Reviewed By */}
          <div className="mt-8 text-center">
            <p className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-4">
              As Reviewed By
            </p>
            <div className="flex justify-center items-center gap-8 opacity-60 grayscale">
              <span className="text-lg font-bold text-gray-400">Forbes</span>
              <span className="text-lg font-bold text-gray-400">
                Business Insider
              </span>
              <span className="text-lg font-bold text-gray-400">USA Today</span>
              <span className="text-lg font-bold text-gray-400">
                The Verge
              </span>
            </div>
          </div>
        </section>

        {/* Footer Disclaimer */}
        <footer className="mt-8 pt-8 border-t border-divider">
          <div className="text-xs text-disclaimer leading-relaxed space-y-4">
            <p>
              Please see our{" "}
              <a
                href="https://couponcodefinder.com/pages/privacy-policy"
                className="underline hover:text-cta-blue"
              >
                Privacy Policy
              </a>{" "}
              &amp;{" "}
              <a
                href="https://couponcodefinder.com/pages/terms-conditions"
                className="underline hover:text-cta-blue"
              >
                Terms and Conditions
              </a>
              . The third parties named are not affiliated with any brands we
              promote and are solely responsible for their product and services.
              All trademarks are the property of their respective owners.
              Savings may vary. Sample results shown.
            </p>

            <p>
              CouponCodeFinder is an independent, advertising-supported service
              that offers consumer shopping advice. The offers or products that
              appear on CouponCodeFinder are from third party advertisers or
              partners from which CouponCodeFinder receives compensation. This
              compensation may impact how and where products appear on this
              site, including, for example, the order in which they are shown.
              Other factors, such as our proprietary website&apos;s rules and
              the likelihood of applicants&apos; approval, impact how and where
              products appear on our site.
            </p>

            <p>
              The compensation from our advertising partners allows
              CouponCodeFinder to offer you free access to comparison tools and
              information. The offers listed on CouponCodeFinder do not
              encompass the entire universe of products available from various
              merchants. Because offers change frequently, please visit merchant
              sites for current information.
            </p>

            <p>
              Editorial Note: Our editorial team&apos;s content is not provided
              or commissioned by any financial institution or partner. The
              opinions, reviews, or recommendations expressed in any article
              mentioned are solely those of our editorial team.
            </p>
          </div>
        </footer>
      </article>
    </div>
  );
}
