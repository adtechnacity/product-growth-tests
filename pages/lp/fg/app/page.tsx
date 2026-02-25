// ISR: Revalidate every 120 seconds (Vercel CDN caches globally)
export const revalidate = 120;

import LiveDealWidget from "./components/LiveDealWidget";
import { fetchDealsForISR, type Deal } from "./lib/fetchDeals";

const CTA_URL = "https://cos-rd.com/81/15659";

/* ─── Stars ─── */
function Stars() {
  return (
    <span className="star-row">
      {[1, 2, 3, 4, 5].map((n) => (
        <img key={n} src="/star-icon.svg" alt="" width={28} height={28} />
      ))}
    </span>
  );
}

/* ─── Main Page (Server Component — fetches deals at ISR time) ─── */
export default async function Home() {
  // Fetch deals server-side — cached by ISR
  const dealsData = await fetchDealsForISR();

  const today = new Date();
  const dateStr = today.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const mm = today.getMonth() + 1;
  const dd = today.getDate();
  const yyyy = today.getFullYear();
  const shortDate = `${mm}/${dd}/${yyyy}`;

  return (
    <div style={{ background: "#ffffff", minHeight: "100vh" }}>
      <div className="advertorial-label">Advertorial</div>

      <div className="section-fit">
        {/* ── Headline ── */}
        <h1 className="blog-headline">
          Amazon&apos;s Worst Nightmare: People Canceling Prime For This
          Clever Hack
        </h1>

        {/* ── Author (left-aligned, date right) ── */}
        <div className="author-section">
          <img
            className="author-photo"
            src="/author-headshot.jpg"
            alt=""
            width={44}
            height={44}
          />
          <div className="author-info">
            <div className="author-byline">
              By: <strong>Olivia James</strong> - Bargain Shopper
              Extraordinaire
            </div>
            <div className="author-date">Last Updated: {dateStr}</div>
          </div>
        </div>

        {/* ── Hero Image (right after author, like original) ── */}
        <img
          className="hero-image"
          src="/hero-warehouse.png"
          alt="Warehouse showing scale of online shopping"
          width={958}
          height={535}
        />

        {/* ── Body Copy ── */}
        <div className="blog-body">
          <p>
            How long have you been overpaying without even realizing it? While
            inflation soared, retailers sat back and cashed in on your
            struggles. But enough is enough. A revolutionary shopping helper is
            sweeping the nation, turning the tables and helping shoppers unlock
            discounts retailers hoped they&apos;d never find. Now Amazon&apos;s
            the ones panicking — and you could save big.
          </p>
          <p>
            Look, we love Amazon Prime{" "}
            <strong>
              (that recently got increased to a whopping $179/year).
            </strong>{" "}
            Free 2-day shipping is great and, like everyone else, we enjoyed
            not knowing how much it actually cost. Well, guess what? It
            isn&apos;t free to move items from one location to another, and
            that cost gets baked into the price you pay.
          </p>
          <p>
            While Amazon is crowd favorite, at the end of the day they are a
            company looking out for their bottom line{" "}
            <strong>(aka how much money they can squeeze out of you).</strong>{" "}
            As this hack spreads across the US, big retailers like Amazon are
            left trembling, seeing the huge discounts they&apos;re suddenly
            forced to match.
          </p>
          <p>
            The only thing you have to do is to add{" "}
            <a href={CTA_URL}>Capital One Shopping</a> to your browser!
            It&apos;s 100% free for everyone (no Capital One account required!)
            and works to find amazing deals, coupons, and price drops out
            there. And with &apos;out there&apos; we mean searching far and
            wide across the web. The algorithm behind it is so strong that
            customers already refer to it as the &quot;insane deals&quot;
            browser extension.
          </p>
          <p>
            The best thing is:{" "}
            <strong>
              Everyone can use this trick to finally get real deals again!
            </strong>
          </p>
          <p>Here&apos;s how it works:</p>
        </div>

        {/* ── Product Comparison Screenshot ── */}
        <img
          className="comparison-image"
          src="/product-comparison.jpg"
          alt="Capital One Shopping price comparison — Keurig example"
          width={640}
          height={400}
        />
        <div className="comparison-caption">
          Example savings from {shortDate}. Savings may vary.
        </div>

        {/* ── More Body Copy ── */}
        <div className="blog-body">
          <p>
            The only thing you have to do is to add{" "}
            <a href={CTA_URL}>Capital One Shopping</a> to your browser!
            It&apos;s a free tool that works fast to find amazing hidden
            savings. If there&apos;s a hidden deal, there&apos;s a good chance
            this tool will find it, and find it quick. And with &apos;out
            there&apos; we mean searching far and wide across the web. The
            algorithm behind it is so strong that customers already refer to it
            as the &quot;insane deals&quot; browser extension.
          </p>
          <p>
            If a better offer is found for the product you&apos;re about to
            shop, a notification will appear instantly.{" "}
            <strong>Same product, just cheaper.</strong> It shows you discounts
            you likely wouldn&apos;t have found without it, and even advises
            you to buy the product from another retailer where it&apos;s priced
            lower! It&apos;s like having a loyal team of personal shoppers at
            your disposal at any time!
          </p>
          <p>
            Last year{" "}
            <a href={CTA_URL}>Capital One Shopping</a> saved its customers
            over $800 million, and you can install and set it up in seconds
            (and easily uninstall if you don&apos;t like it) so there&apos;s no
            reason not to give it a try right now.
          </p>
          <p>
            The best part? It&apos;s <strong>100% free.</strong> Get Capital
            One Shopping{" "}
            <a href={CTA_URL}>
              <strong>HERE</strong>
            </a>
            .
          </p>
        </div>

        {/* ── LIVE DEAL WIDGET — server-rendered deals passed as props ── */}
        <LiveDealWidget initialDeals={(dealsData.deals as Deal[]).filter(
          (d) => d.primaryImage && d.primaryImage.startsWith("http")
        )} />

        {/* ── CTA Section ── */}
        <div className="cta-section">
          <a className="btn cta-btn" href={CTA_URL}>
            Add to Chrome — It&apos;s free.
          </a>
          <div className="users-block">
            <span className="users-count">8,000,000+ users, Web Store</span>
            <Stars />
          </div>
        </div>
      </div>

      {/* ── Press ── */}
      <div className="press-section">
        <div className="section-fit">
          <div className="press-label">AS REVIEWED BY</div>
          <div className="press-logos">
            <img className="press-logo" src="/press-logos/usa-today.svg" alt="USA TODAY" />
            <img className="press-logo" src="/press-logos/mashable.svg" alt="Mashable" />
            <img className="press-logo" src="/press-logos/fortune.svg" alt="FORTUNE" />
            <img className="press-logo" src="/press-logos/forbes.svg" alt="Forbes" />
            <img className="press-logo" src="/press-logos/buzzfeed.svg" alt="BuzzFeed" />
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="blog-footer">
        <div className="section-fit">
          Please see our{" "}
          <a href="https://www.iubenda.com/privacy-policy/21054084">
            Privacy Policy
          </a>{" "}
          &amp;{" "}
          <a href="https://www.iubenda.com/terms-and-conditions/21054084">
            Terms and Conditions
          </a>
          . The third parties named are not affiliated with any brands we
          promote and are solely responsible for their product and services.
          All trademarks are the property of their respective owners. Savings
          may vary. Sample results shown.
        </div>
      </div>
    </div>
  );
}
