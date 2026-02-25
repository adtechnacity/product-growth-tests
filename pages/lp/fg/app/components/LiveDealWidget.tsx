"use client";

import { useState, useEffect, useCallback, useMemo } from "react";

/* ─── Types ─── */
interface Deal {
  id?: string;
  primaryText: string;
  merchantName: string;
  primaryImage: string;
  secondaryImage: string;
  oldPrice: string | null;
  newPrice: string | null;
  percentOff: string | null;
  cashback: string | null;
  cashbackAmount: string | null;
  priceAfterRewards: string | null;
  filterLabel: string;
  type: string;
}

interface LiveDealWidgetProps {
  initialDeals?: Deal[];
}

const CTA_URL = "https://cos-rd.com/81/15659";

/* ─── Stars ─── */
function Stars() {
  return (
    <span className="star-row">
      {[1, 2, 3, 4, 5].map((n) => (
        <img key={n} src="/star-icon.svg" alt="" width={16} height={16} />
      ))}
    </span>
  );
}

/* ─── Deal Card Component ─── */
function DealCard({ deal }: { deal: Deal }) {
  const isPriceDrop = deal.type === "price_drop" || (deal.newPrice && deal.oldPrice);

  return (
    <div className="deal-card">
      <div className="deal-card-img-wrap">
        <img
          className="deal-card-img"
          src={deal.primaryImage}
          alt={deal.primaryText}
          loading="lazy"
        />
      </div>
      <div className="deal-card-body">
        <div className="deal-card-store">
          {deal.secondaryImage && (
            <img
              className="deal-card-store-logo"
              src={deal.secondaryImage}
              alt=""
              loading="lazy"
            />
          )}
          <span className="deal-card-store-name">{deal.merchantName}</span>
        </div>
        <div className="deal-card-name">{deal.primaryText}</div>

        {isPriceDrop ? (
          <>
            <div className="deal-card-prices">
              {deal.oldPrice && (
                <span className="deal-old-price">{deal.oldPrice}</span>
              )}
              {deal.newPrice && (
                <span className="deal-new-price">{deal.newPrice}</span>
              )}
              {deal.percentOff && (
                <span className="deal-percent-badge">{deal.percentOff} off</span>
              )}
            </div>
            {deal.cashback && (
              <div className="deal-cashback">+ {deal.cashback} cash back</div>
            )}
            {deal.priceAfterRewards && (
              <div className="deal-final-price">
                After rewards: <strong>{deal.priceAfterRewards}</strong>
              </div>
            )}
          </>
        ) : (
          <div className="deal-cashback-big">{deal.cashback} cash back</div>
        )}

        <span className="deal-card-cta">See this deal →</span>
      </div>
    </div>
  );
}

/* ─── Static fallback deals (used when no props and no API) ─── */
const FALLBACK_DEALS: Deal[] = [
  {
    primaryText: "Keurig K-Classic Coffee Maker",
    merchantName: "Target",
    primaryImage: "",
    secondaryImage: "",
    oldPrice: "$149.99",
    newPrice: "$109.00",
    percentOff: "27%",
    cashback: "3%",
    cashbackAmount: "$3.27",
    priceAfterRewards: "$105.73",
    filterLabel: "Price Drops",
    type: "price_drop",
  },
  {
    primaryText: "Apple AirPods Pro (2nd Gen)",
    merchantName: "Walmart",
    primaryImage: "",
    secondaryImage: "",
    oldPrice: "$249.00",
    newPrice: "$189.99",
    percentOff: "24%",
    cashback: "2%",
    cashbackAmount: "$3.80",
    priceAfterRewards: "$186.19",
    filterLabel: "Price Drops",
    type: "price_drop",
  },
  {
    primaryText: "Dyson V8 Cordless Vacuum",
    merchantName: "Best Buy",
    primaryImage: "",
    secondaryImage: "",
    oldPrice: "$419.99",
    newPrice: "$349.99",
    percentOff: "17%",
    cashback: "4%",
    cashbackAmount: "$14.00",
    priceAfterRewards: "$335.99",
    filterLabel: "Price Drops",
    type: "price_drop",
  },
];

/* ─── Fallback Card (no image, text-focused) ─── */
function FallbackDealCard({ deal }: { deal: Deal }) {
  return (
    <div className="deal-card fallback-card">
      <div className="deal-card-body">
        <div className="deal-card-store">
          <span className="deal-card-store-name">{deal.merchantName}</span>
        </div>
        <div className="deal-card-name">{deal.primaryText}</div>
        <div className="deal-card-prices">
          {deal.oldPrice && (
            <span className="deal-old-price">{deal.oldPrice}</span>
          )}
          {deal.newPrice && (
            <span className="deal-new-price">{deal.newPrice}</span>
          )}
          {deal.percentOff && (
            <span className="deal-percent-badge">{deal.percentOff} off</span>
          )}
        </div>
        {deal.cashback && (
          <div className="deal-cashback">+ {deal.cashback} cash back</div>
        )}
        {deal.priceAfterRewards && (
          <div className="deal-final-price">
            After rewards: <strong>{deal.priceAfterRewards}</strong>
          </div>
        )}
        <span className="deal-card-cta">Get deals like this →</span>
      </div>
    </div>
  );
}

/* ─── Fisher-Yates shuffle ─── */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ─── Live Deal Widget Component ─── */
export default function LiveDealWidget({ initialDeals = [] }: LiveDealWidgetProps) {
  // Pool: all deals from server (passed as props)
  const dealPool = initialDeals.length > 0 ? initialDeals : FALLBACK_DEALS;
  const isLive = initialDeals.length > 0;

  // On mount, randomly pick 5-8 deals from the pool (client-side only)
  const [displayDeals, setDisplayDeals] = useState<Deal[]>([]);
  const [current, setCurrent] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Randomize: pick 5-8 deals from the pool
    const count = Math.min(
      dealPool.length,
      Math.floor(Math.random() * 4) + 5 // 5 to 8
    );
    const shuffled = shuffle(dealPool);
    // Prefer price drops first, then mix in cashback
    const priceDrops = shuffled.filter(
      (d) => d.type === "price_drop" || (d.newPrice && d.oldPrice)
    );
    const cashback = shuffled.filter(
      (d) => !(d.type === "price_drop" || (d.newPrice && d.oldPrice))
    );
    // Take mostly price drops, a few cashback
    const pdCount = Math.min(priceDrops.length, Math.ceil(count * 0.7));
    const cbCount = Math.min(cashback.length, count - pdCount);
    const selected = [...priceDrops.slice(0, pdCount), ...cashback.slice(0, cbCount)];

    // Shuffle the selection again so order varies
    setDisplayDeals(shuffle(selected.length > 0 ? selected : shuffled.slice(0, count)));
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  const activeDealList = mounted && displayDeals.length > 0
    ? displayDeals
    : FALLBACK_DEALS.slice(0, 3); // SSR fallback (will be replaced on mount)

  const advance = useCallback(() => {
    if (activeDealList.length > 0) {
      setCurrent((prev) => (prev + 1) % activeDealList.length);
    }
  }, [activeDealList.length]);

  useEffect(() => {
    if (activeDealList.length <= 1) return;
    const timer = setInterval(advance, 5000);
    return () => clearInterval(timer);
  }, [advance, activeDealList.length]);

  // SSR: render a static preview (no loading spinner!)
  // The server bakes in the first deal; client randomizes on mount.
  const showLive = mounted ? (isLive && displayDeals.length > 0) : isLive;
  const currentDeal = activeDealList[current % activeDealList.length];

  return (
    <div className="deal-widget">
      <div className="deal-widget-header">
        {showLive && <span className="live-dot" />}
        {showLive
          ? "Deals found by Capital One Shopping right now"
          : "Capital One Shopping finds deals like these every day"}
      </div>
      <div className="deal-widget-sub">
        {showLive
          ? "Updated throughout the day. Click to get this deal."
          : "Real savings on the brands you already shop. Click to try it free."}
      </div>

      {currentDeal ? (
        <>
          <a href={CTA_URL} className="deal-card-link btn">
            {showLive && currentDeal.primaryImage ? (
              <DealCard deal={currentDeal} />
            ) : (
              <FallbackDealCard deal={currentDeal} />
            )}
          </a>
          {activeDealList.length > 1 && (
            <div className="deal-nav">
              {activeDealList.map((_, i) => (
                <button
                  key={i}
                  className={`deal-dot ${i === (current % activeDealList.length) ? "active" : ""}`}
                  onClick={() => setCurrent(i)}
                  aria-label={`View deal ${i + 1}`}
                />
              ))}
            </div>
          )}
        </>
      ) : null}

      <div className="deal-widget-footer">
        {showLive
          ? "These deals update throughout the day. "
          : "Savings found automatically while you shop. "}
        <a href={CTA_URL}>Add Capital One Shopping</a>
        {showLive ? " to see them all." : " — it's free."}
      </div>

      {!showLive && (
        <div className="deal-widget-disclaimer">
          Example savings shown. Actual deals vary.
        </div>
      )}
    </div>
  );
}
