import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Seniors Could Now Fly Business Class For The Price Of Economy Using This Hack",
  description:
    "One couple shares their heartfelt advice — their top tip for fellow seniors yearning to travel in comfort without overspending.",
};

const CTA_URL = "https://cos-rd.com/go";

export default function BaselinePage() {
  return (
    <div className="min-h-screen bg-white">
      <article className="mx-auto max-w-[960px] px-6 py-8 md:px-12">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-black text-[1.8125rem] md:text-[2.75rem] font-bold leading-[1.8125rem] md:leading-[3.3rem] text-center mb-4">
            Seniors Could Now Fly Business Class For The Price Of Economy Using
            This Hack
          </h1>
          <div className="border-y border-divider py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://v.fastcdn.co/u/d4b07245/64158297-0-AI-Headhsot-3.jpg"
                  alt="Olivia James - Thrifty World Traveler"
                  className="w-[2.75rem] h-[2.75rem] md:w-[2.375rem] md:h-[2.375rem] rounded-full object-cover"
                  style={{ objectPosition: "40% 45%" }}
                />
                <p className="text-[0.875rem] text-black leading-[1.375rem]">
                  By:<span className="font-bold"> Olivia James </span>- Thrifty
                  World Traveler
                </p>
              </div>
              <p className="text-[0.625rem] text-[#B1ADAD] leading-[1rem]">
                Last Updated: February 19, 2025
              </p>
            </div>
          </div>
        </header>

        {/* Hero Image */}
        <div className="my-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://v.fastcdn.co/u/d4b07245/65534250-0--c2m437wpk1spy50tbur.png"
            alt="Couple enjoying business class flight"
            className="w-full"
          />
        </div>

        {/* Intro */}
        <p className="text-[1.1875rem] md:text-[1.25rem] leading-[1.6625rem] md:leading-[2rem] italic text-black mb-7 md:mb-8">
          One couple shares their heartfelt advice — their top tip for fellow
          seniors yearning to travel in comfort without overspending.
        </p>

        {/* Body Content */}
        <div className="space-y-7 md:space-y-8 text-[1.1875rem] md:text-[1.25rem] leading-[1.6625rem] md:leading-[2rem]">
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
            <strong>
              <a
                href={CTA_URL}
                className="text-cta-blue underline"
              >
                Capital One Shopping
              </a>
            </strong>{" "}
            works to find deals at checkout—the kind companies don&apos;t always
            advertise—
            <strong><u>allowing you to save big on travel.</u></strong>
          </p>

          {/* Product screenshot */}
          <figure>
            <a href={CTA_URL}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://v.fastcdn.co/t/d4b07245/74c14398/1762263564-65431860-840x472x841x473x1x1-COS-Deals-DeltaSearc.png"
                alt="Capital One Shopping extension showing travel deals and price comparisons"
                className="w-full"
              />
            </a>
            <figcaption className="text-right text-[0.75rem] leading-[1.05rem] md:leading-[1.1875rem] text-[#444444] mt-2 italic">
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

          <p>
            If you&apos;ve always dreamed of traveling in style during your
            retirement, add{" "}
            <strong>
              <a
                href={CTA_URL}
                className="text-cta-blue underline"
              >
                Capital One Shopping
              </a>
            </strong>{" "}
            to your browser today. You&apos;ve earned this—it&apos;s time to
            enjoy it.
          </p>

          <div className="flex justify-center">
            <a className="btn btn-baseline" href={CTA_URL}>
              Add to Browser — It&apos;s free.
            </a>
          </div>
        </div>

        {/* Social Proof Section */}
        <section className="mt-8 py-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-[2.625rem] h-[2.625rem] text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-[1rem] leading-[1.625rem] font-normal text-[#4E5A60]">
              8,000,000+ users, Web Store
            </p>
          </div>

          {/* As Reviewed By */}
          <div className="mt-8 text-center">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1 border-b border-divider"></div>
              <p className="text-[1rem] leading-[1.625rem] font-bold text-[#5C7780] whitespace-nowrap">
                AS REVIEWED BY
              </p>
              <div className="flex-1 border-b border-divider"></div>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://v.fastcdn.co/t/d4b07245/74c14398/1762263344-64351220-728x47-COS-Logo-Color-8fadb.png"
              alt="As reviewed by USA Today, Mashable, Fortune, Forbes, BuzzFeed"
              className="h-[1.4375rem] md:h-[2.9375rem] w-auto mx-auto"
            />
          </div>
        </section>

        {/* Footer Disclaimer */}
        <footer className="mt-8 pt-4">
          <div className="text-[0.8125rem] leading-[1.1375rem] md:leading-[1.3rem] text-[#1D1E1F] text-center space-y-4">
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
