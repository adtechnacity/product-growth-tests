const CO_NAVY = "#004977";
const CO_GREEN = "#0E7C3A";
const CO_RED = "#B91C1C";
const BG_GRAY = "#F4F6F8";
const BORDER = "#E2E8F0";
const TEXT_PRIMARY = "#111827";
const TEXT_BODY = "#374151";
const TEXT_MUTED = "#6B7280";
const TEXT_FAINT = "#9CA3AF";

export default function TravelPage() {
  return (
    <div style={{ background: "#ffffff", color: TEXT_PRIMARY, fontFamily: "Inter, sans-serif" }}>
      <main style={{ maxWidth: "820px", margin: "0 auto", padding: "0 24px" }}>

        {/* ── SECTION 1: HERO ── */}
        <section style={{ padding: "96px 0 80px", textAlign: "center" }}>
          <p style={{
            fontSize: "12px", fontWeight: 700, letterSpacing: "2.5px",
            textTransform: "uppercase", color: CO_NAVY, marginBottom: "28px",
          }}>
            Travel · Capital One Shopping
          </p>
          <h1 style={{
            fontSize: "clamp(30px, 5vw, 42px)", fontWeight: 800, lineHeight: 1.2,
            color: TEXT_PRIMARY, margin: "0 auto 28px", maxWidth: "680px",
          }}>
            Airfare Isn't Always Final Until You Click Confirm.
          </h1>
          <p style={{
            fontSize: "20px", color: TEXT_BODY, lineHeight: 1.75,
            maxWidth: "580px", margin: "0 auto 20px",
          }}>
            Some travelers compare one more time before they book — especially when
            considering premium cabins.
          </p>
          <p style={{
            fontSize: "18px", color: TEXT_MUTED, lineHeight: 1.75,
            maxWidth: "580px", margin: "0 auto",
          }}>
            On certain bookings, partner incentives and targeted offers can slightly
            change the final outcome. Here's what that means — and when it may matter.
          </p>
        </section>

        <hr style={{ border: "none", borderTop: `1px solid ${BORDER}` }} />

        {/* ── SECTION 2: WHY BUSINESS CLASS FEELS FIXED ── */}
        <section style={{ padding: "80px 0" }}>
          <h2 style={{
            fontSize: "clamp(24px, 4vw, 32px)", fontWeight: 700, lineHeight: 1.3,
            color: TEXT_PRIMARY, marginBottom: "32px",
          }}>
            Why Business Class Often Feels Out of Reach
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              <p style={{ fontSize: "18px", color: TEXT_BODY, lineHeight: 1.75, marginBottom: "20px" }}>
                Business class pricing typically reflects several variables that airlines control:
              </p>
              <ul style={{
                fontSize: "18px", color: TEXT_BODY, lineHeight: 1.75,
                paddingLeft: "22px", marginBottom: "24px",
              }}>
                {["Cabin availability", "Route demand", "Fare class buckets", "Timing of booking"].map(item => (
                  <li key={item} style={{ marginBottom: "10px" }}>{item}</li>
                ))}
              </ul>
              <p style={{ fontSize: "18px", color: TEXT_BODY, lineHeight: 1.75, marginBottom: "16px" }}>
                For most travelers, the price gap between economy and business feels fixed.
              </p>
              <p style={{ fontSize: "18px", color: TEXT_BODY, lineHeight: 1.75 }}>
                But the base fare isn't always the only variable in the final equation.
              </p>
            </div>

            {/* Fare gap card */}
            <div style={{
              background: BG_GRAY, border: `1px solid ${BORDER}`,
              borderRadius: "12px", padding: "32px",
            }}>
              <p style={{
                fontSize: "11px", fontWeight: 700, letterSpacing: "2px",
                textTransform: "uppercase", color: CO_NAVY, marginBottom: "24px",
              }}>
                Typical fare gap · JFK → London
              </p>
              <div style={{ marginBottom: "20px" }}>
                <p style={{ fontSize: "12px", color: TEXT_MUTED, fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px" }}>Economy</p>
                <p style={{ fontSize: "38px", fontWeight: 800, color: TEXT_PRIMARY, lineHeight: 1 }}>$389</p>
                <p style={{ fontSize: "14px", color: TEXT_FAINT, marginTop: "4px" }}>Round trip · standard booking</p>
              </div>
              <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: "20px", marginBottom: "20px" }}>
                <p style={{ fontSize: "12px", color: TEXT_MUTED, fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px" }}>Business</p>
                <p style={{ fontSize: "38px", fontWeight: 800, color: TEXT_PRIMARY, lineHeight: 1 }}>$2,840</p>
                <p style={{ fontSize: "14px", color: TEXT_FAINT, marginTop: "4px" }}>Same route · same dates</p>
              </div>
              <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: "16px" }}>
                <p style={{ fontSize: "14px", color: TEXT_MUTED, fontStyle: "italic", lineHeight: 1.6 }}>
                  The fare gap is real. But it's not the whole story.
                </p>
              </div>
            </div>
          </div>
        </section>

        <hr style={{ border: "none", borderTop: `1px solid ${BORDER}` }} />

        {/* ── SECTION 3: THE FINAL CHECK ── */}
        <section style={{ padding: "80px 0" }}>
          <h2 style={{
            fontSize: "clamp(24px, 4vw, 32px)", fontWeight: 700, lineHeight: 1.3,
            color: TEXT_PRIMARY, marginBottom: "24px",
          }}>
            The "Final Check" Some Travelers Run
          </h2>
          <p style={{ fontSize: "18px", color: TEXT_BODY, lineHeight: 1.75, maxWidth: "640px", marginBottom: "16px" }}>
            Before confirming payment, some travelers run one final verification step — not
            to change the airline's price, but simply to check whether any partner
            incentives or available rewards apply to the booking platform they're using.
          </p>
          <p style={{
            fontSize: "18px", color: TEXT_MUTED, lineHeight: 1.75,
            maxWidth: "640px", marginBottom: "48px",
          }}>
            This does not alter airline pricing.
          </p>

          {/* Steps */}
          <div style={{ display: "flex", flexDirection: "column", gap: "28px", marginBottom: "48px" }}>
            {[
              {
                num: "01",
                title: "Search as usual",
                desc: "Use any airline site or booking platform to find your preferred flight and cabin class.",
              },
              {
                num: "02",
                title: "Review the checkout page",
                desc: "Before entering payment details, pause on the final review screen.",
              },
              {
                num: "03",
                title: "Verify whether an eligible incentive appears",
                desc: "Check if any partner reward or cashback offer is available for that booking.",
              },
            ].map(step => (
              <div key={step.num} style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
                <div style={{
                  width: "44px", height: "44px", borderRadius: "50%",
                  background: CO_NAVY, color: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 700, fontSize: "14px", flexShrink: 0,
                }}>
                  {step.num}
                </div>
                <div>
                  <p style={{ fontSize: "18px", fontWeight: 600, color: TEXT_PRIMARY, marginBottom: "6px" }}>
                    {step.title}
                  </p>
                  <p style={{ fontSize: "18px", color: TEXT_BODY, lineHeight: 1.7 }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Extension popup mock */}
          <div style={{
            background: "#fff", border: `1px solid ${BORDER}`,
            borderRadius: "12px", padding: "24px 28px", maxWidth: "380px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
          }}>
            <p style={{
              fontSize: "11px", fontWeight: 700, letterSpacing: "2px",
              textTransform: "uppercase", color: CO_NAVY, marginBottom: "14px",
            }}>
              Capital One Shopping
            </p>
            <p style={{ fontSize: "16px", color: TEXT_MUTED, marginBottom: "6px" }}>
              Reward found for this merchant
            </p>
            <p style={{ fontSize: "36px", fontWeight: 800, color: CO_NAVY, lineHeight: 1, marginBottom: "8px" }}>
              3% back
            </p>
            <p style={{ fontSize: "13px", color: TEXT_FAINT }}>
              On eligible purchases · Terms apply
            </p>
          </div>
        </section>

        <hr style={{ border: "none", borderTop: `1px solid ${BORDER}` }} />

        {/* ── SECTION 4: THE AHA MOMENT ── */}
        <section style={{ padding: "80px 0" }}>
          <h2 style={{
            fontSize: "clamp(24px, 4vw, 32px)", fontWeight: 700, lineHeight: 1.3,
            color: TEXT_PRIMARY, marginBottom: "24px",
          }}>
            The Base Fare May Be the Same.
            <br />The Final Outcome Isn't Always.
          </h2>
          <p style={{ fontSize: "18px", color: TEXT_BODY, lineHeight: 1.75, maxWidth: "640px", marginBottom: "16px" }}>
            Two booking platforms may list the same hotel price.
          </p>
          <p style={{ fontSize: "28px", fontWeight: 800, color: TEXT_PRIMARY, marginBottom: "16px" }}>
            $191 per night.
          </p>
          <p style={{ fontSize: "18px", color: TEXT_BODY, lineHeight: 1.75, maxWidth: "640px", marginBottom: "44px" }}>
            But the available reward or partner incentive may differ depending on the
            merchant, category, timing, or your targeted eligibility.
          </p>

          {/* Comparison cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5" style={{ marginBottom: "12px" }}>
            <div style={{
              background: BG_GRAY, border: `1px solid ${BORDER}`,
              borderRadius: "12px", padding: "28px",
            }}>
              <p style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", color: TEXT_MUTED, marginBottom: "16px" }}>
                Platform A
              </p>
              <p style={{ fontSize: "26px", fontWeight: 700, color: TEXT_PRIMARY, marginBottom: "16px" }}>
                $191 / night
              </p>
              <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: "16px" }}>
                <p style={{ fontSize: "13px", color: TEXT_MUTED, marginBottom: "6px" }}>Reward available</p>
                <p style={{ fontSize: "24px", fontWeight: 700, color: TEXT_MUTED }}>1% back</p>
                <p style={{ fontSize: "13px", color: TEXT_FAINT, marginTop: "4px" }}>≈ $1.91 on this booking</p>
              </div>
            </div>

            <div style={{
              background: "#fff", border: `2px solid ${CO_NAVY}`,
              borderRadius: "12px", padding: "28px",
            }}>
              <p style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", color: CO_NAVY, marginBottom: "16px" }}>
                Platform B
              </p>
              <p style={{ fontSize: "26px", fontWeight: 700, color: TEXT_PRIMARY, marginBottom: "16px" }}>
                $191 / night
              </p>
              <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: "16px" }}>
                <p style={{ fontSize: "13px", color: TEXT_MUTED, marginBottom: "6px" }}>Reward available</p>
                <p style={{ fontSize: "24px", fontWeight: 700, color: CO_GREEN }}>5% back</p>
                <p style={{ fontSize: "13px", color: TEXT_FAINT, marginTop: "4px" }}>≈ $9.55 on this booking</p>
              </div>
            </div>
          </div>
          <p style={{ fontSize: "13px", color: TEXT_FAINT, fontStyle: "italic" }}>
            Illustrative example. Reward rates vary by merchant, account, and timing.
          </p>
        </section>

        <hr style={{ border: "none", borderTop: `1px solid ${BORDER}` }} />

        {/* ── SECTION 5: TARGETED & EMAIL OFFERS ── */}
        <section style={{ padding: "80px 0" }}>
          <h2 style={{
            fontSize: "clamp(24px, 4vw, 32px)", fontWeight: 700, lineHeight: 1.3,
            color: TEXT_PRIMARY, marginBottom: "24px",
          }}>
            Occasionally, Targeted Offers Are Higher
          </h2>
          <p style={{ fontSize: "18px", color: TEXT_BODY, lineHeight: 1.75, maxWidth: "640px", marginBottom: "16px" }}>
            Most reward rates are modest.
          </p>
          <p style={{ fontSize: "18px", color: TEXT_BODY, lineHeight: 1.75, maxWidth: "640px", marginBottom: "32px" }}>
            However, Capital One Shopping sometimes sends targeted offers by email that
            provide higher bonus amounts for specific merchants or travel bookings.
          </p>

          <p style={{ fontSize: "16px", fontWeight: 600, color: TEXT_PRIMARY, marginBottom: "14px" }}>
            These email offers:
          </p>
          <ul style={{ fontSize: "18px", color: TEXT_BODY, lineHeight: 1.75, paddingLeft: "22px", marginBottom: "40px" }}>
            {[
              "Are account-specific",
              "Often include minimum spend requirements",
              "Have expiration windows",
              "Include payout caps",
            ].map(item => (
              <li key={item} style={{ marginBottom: "10px" }}>{item}</li>
            ))}
          </ul>

          {/* Email mock */}
          <div style={{
            background: BG_GRAY, border: `1px solid ${BORDER}`,
            borderRadius: "12px", padding: "28px 32px", maxWidth: "520px", marginBottom: "20px",
          }}>
            <p style={{ fontSize: "12px", color: TEXT_FAINT, marginBottom: "14px" }}>
              From: Capital One Shopping &lt;offers@capitaloneshopping.com&gt;
            </p>
            <p style={{ fontSize: "18px", fontWeight: 600, color: TEXT_PRIMARY, lineHeight: 1.4, marginBottom: "16px" }}>
              You have a limited-time offer: 8% back on eligible travel
            </p>
            <p style={{ fontSize: "15px", color: TEXT_BODY, lineHeight: 1.65, marginBottom: "14px" }}>
              This targeted offer is valid for bookings at select travel merchants through
              [expiry date]. Maximum reward: $75. Minimum purchase: $300.
            </p>
            <p style={{ fontSize: "13px", color: TEXT_FAINT, fontStyle: "italic" }}>
              Offer eligibility varies by account. Not all users receive the same offers.
            </p>
          </div>

          {/* Disclaimer callout */}
          <div style={{
            background: "#FFFBEB", border: "1px solid #FDE68A",
            borderRadius: "8px", padding: "18px 22px", maxWidth: "520px",
          }}>
            <p style={{ fontSize: "15px", color: "#78350F", lineHeight: 1.65, margin: 0 }}>
              <strong>Important note:</strong> These offers are not guaranteed and vary by
              account. Not every user will receive targeted offers, and rates shown in
              examples are illustrative only.
            </p>
          </div>
        </section>

        <hr style={{ border: "none", borderTop: `1px solid ${BORDER}` }} />

        {/* ── SECTION 6: WHY THIS MATTERS FOR LARGE BOOKINGS ── */}
        <section style={{ padding: "80px 0" }}>
          <h2 style={{
            fontSize: "clamp(24px, 4vw, 32px)", fontWeight: 700, lineHeight: 1.3,
            color: TEXT_PRIMARY, marginBottom: "24px",
          }}>
            Why This Matters for Larger Travel Purchases
          </h2>
          <p style={{ fontSize: "18px", color: TEXT_BODY, lineHeight: 1.75, maxWidth: "640px", marginBottom: "16px" }}>
            On smaller purchases the difference may be minimal.
          </p>
          <p style={{ fontSize: "18px", color: TEXT_BODY, lineHeight: 1.75, maxWidth: "640px", marginBottom: "44px" }}>
            On larger travel bookings — such as multi-night hotel stays, rental cars, or
            tour packages — the cumulative effect may be more noticeable.
          </p>

          {/* Math example box */}
          <div style={{
            background: BG_GRAY, border: `1px solid ${BORDER}`,
            borderRadius: "12px", padding: "32px", maxWidth: "500px",
          }}>
            <p style={{
              fontSize: "11px", fontWeight: 700, letterSpacing: "2px",
              textTransform: "uppercase", color: CO_NAVY, marginBottom: "24px",
            }}>
              Illustrative example
            </p>

            {[
              { label: "Hotel stay · 7 nights", value: "$1,400", color: TEXT_PRIMARY },
              { label: "Standard reward rate", value: "3%", color: CO_NAVY },
              { label: "Estimated reward", value: "$42", color: CO_GREEN },
              { label: "With targeted offer (8%)", value: "$112", color: CO_GREEN, bold: true },
            ].map((row, i) => (
              <div
                key={row.label}
                style={{
                  display: "flex", justifyContent: "space-between", alignItems: "baseline",
                  borderBottom: i < 3 ? `1px solid ${BORDER}` : "none",
                  paddingBottom: i < 3 ? "14px" : "0",
                  marginBottom: i < 3 ? "14px" : "0",
                }}
              >
                <p style={{ fontSize: "16px", color: TEXT_MUTED, margin: 0 }}>{row.label}</p>
                <p style={{ fontSize: "20px", fontWeight: row.bold ? 800 : 600, color: row.color, margin: 0 }}>
                  {row.value}
                </p>
              </div>
            ))}

            <p style={{ fontSize: "13px", color: TEXT_FAINT, fontStyle: "italic", marginTop: "20px" }}>
              Illustrative only. Actual rewards depend on eligibility, caps, and merchant terms.
            </p>
          </div>
        </section>

        <hr style={{ border: "none", borderTop: `1px solid ${BORDER}` }} />

        {/* ── SECTION 7: LONG TERM IMPACT ── */}
        <section style={{ padding: "80px 0" }}>
          <h2 style={{
            fontSize: "clamp(24px, 4vw, 32px)", fontWeight: 700, lineHeight: 1.3,
            color: TEXT_PRIMARY, marginBottom: "24px",
          }}>
            Over Time, Incentives Can Add Up
          </h2>
          <p style={{ fontSize: "18px", color: TEXT_BODY, lineHeight: 1.75, maxWidth: "640px", marginBottom: "16px" }}>
            Across multiple bookings, small rewards and occasional targeted offers can
            accumulate.
          </p>
          <p style={{ fontSize: "18px", color: TEXT_MUTED, lineHeight: 1.75, maxWidth: "640px", marginBottom: "44px" }}>
            Individual results vary.
          </p>

          {/* Lifetime dashboard mock */}
          <div style={{
            background: BG_GRAY, border: `1px solid ${BORDER}`,
            borderRadius: "12px", padding: "32px", maxWidth: "500px",
          }}>
            <p style={{
              fontSize: "11px", fontWeight: 700, letterSpacing: "2px",
              textTransform: "uppercase", color: CO_NAVY, marginBottom: "20px",
            }}>
              Capital One Shopping · Lifetime Rewards
            </p>
            <p style={{ fontSize: "13px", color: TEXT_MUTED, marginBottom: "8px" }}>Total rewards earned</p>
            <p style={{ fontSize: "52px", fontWeight: 800, color: TEXT_PRIMARY, lineHeight: 1, marginBottom: "4px" }}>
              $318.42
            </p>
            <p style={{ fontSize: "14px", color: TEXT_FAINT, marginBottom: "28px" }}>
              Across 24 bookings · 18 months
            </p>

            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
              gap: "16px", borderTop: `1px solid ${BORDER}`, paddingTop: "24px",
            }}>
              {[
                { label: "Hotels", value: "$184" },
                { label: "Flights", value: "$89" },
                { label: "Rental cars", value: "$45" },
              ].map(item => (
                <div key={item.label} style={{ textAlign: "center" }}>
                  <p style={{ fontSize: "22px", fontWeight: 700, color: CO_NAVY, marginBottom: "4px" }}>
                    {item.value}
                  </p>
                  <p style={{ fontSize: "13px", color: TEXT_MUTED }}>{item.label}</p>
                </div>
              ))}
            </div>

            <p style={{ fontSize: "13px", color: TEXT_FAINT, fontStyle: "italic", marginTop: "20px" }}>
              Illustrative example. Individual results vary.
            </p>
          </div>
        </section>

        <hr style={{ border: "none", borderTop: `1px solid ${BORDER}` }} />

        {/* ── SECTION 8: TRANSPARENCY ── */}
        <section style={{ padding: "80px 0" }}>
          <h2 style={{
            fontSize: "clamp(24px, 4vw, 32px)", fontWeight: 700, lineHeight: 1.3,
            color: TEXT_PRIMARY, marginBottom: "16px",
          }}>
            What This Does — And What It Doesn't
          </h2>
          <p style={{ fontSize: "18px", color: TEXT_MUTED, lineHeight: 1.75, marginBottom: "44px", maxWidth: "580px" }}>
            Capital One Shopping is a browser extension. Here is a straightforward
            summary of what it actually does.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div style={{
              background: BG_GRAY, border: `1px solid ${BORDER}`,
              borderRadius: "12px", padding: "28px 32px",
            }}>
              <p style={{
                fontSize: "12px", fontWeight: 700, textTransform: "uppercase",
                letterSpacing: "1.5px", color: CO_GREEN, marginBottom: "20px",
              }}>
                This does
              </p>
              <ul style={{ fontSize: "18px", color: TEXT_BODY, lineHeight: 1.75, paddingLeft: "20px" }}>
                {[
                  "Check for partner incentives",
                  "Surface reward rates",
                  "Highlight category breakdowns",
                ].map(item => (
                  <li key={item} style={{ marginBottom: "12px" }}>{item}</li>
                ))}
              </ul>
            </div>

            <div style={{
              background: BG_GRAY, border: `1px solid ${BORDER}`,
              borderRadius: "12px", padding: "28px 32px",
            }}>
              <p style={{
                fontSize: "12px", fontWeight: 700, textTransform: "uppercase",
                letterSpacing: "1.5px", color: CO_RED, marginBottom: "20px",
              }}>
                This does not
              </p>
              <ul style={{ fontSize: "18px", color: TEXT_BODY, lineHeight: 1.75, paddingLeft: "20px" }}>
                {[
                  "Change airline pricing",
                  "Guarantee rewards",
                  "Apply to all merchants",
                ].map(item => (
                  <li key={item} style={{ marginBottom: "12px" }}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <hr style={{ border: "none", borderTop: `1px solid ${BORDER}` }} />

        {/* ── SECTION 9: FINAL CTA ── */}
        <section style={{ padding: "100px 0 120px", textAlign: "center" }}>
          <p style={{
            fontSize: "20px", color: TEXT_BODY, lineHeight: 1.75,
            maxWidth: "520px", margin: "0 auto 44px",
          }}>
            Before confirming your next travel booking, you may want to run one final check.
          </p>
          <a
            className="btn"
            href="https://cos-rd.com/81/15704"
            style={{
              display: "inline-block",
              background: CO_NAVY,
              color: "#ffffff",
              fontSize: "18px",
              fontWeight: 700,
              padding: "18px 52px",
              borderRadius: "8px",
              textDecoration: "none",
              letterSpacing: "0.2px",
            }}
          >
            Add to Chrome — It's Free
          </a>
          <p style={{ fontSize: "15px", color: TEXT_FAINT, marginTop: "16px" }}>
            No cost to install. Offers vary by account and merchant.
          </p>
        </section>

      </main>

      {/* ── FOOTER ── */}
      <footer style={{
        background: BG_GRAY, borderTop: `1px solid ${BORDER}`,
        padding: "32px 24px",
      }}>
        <div style={{ maxWidth: "820px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: "13px", color: TEXT_FAINT, lineHeight: 1.7, marginBottom: "12px" }}>
            <strong style={{ color: TEXT_MUTED }}>Advertising Disclosure:</strong>{" "}
            This page is advertising-supported. OnlineShoppingTools.com may receive
            compensation when you click links on this page. Reward rates, examples,
            and figures shown are illustrative and not guaranteed. Capital One Shopping
            is a free browser extension. Individual results vary.
          </p>
          <p style={{ fontSize: "12px", color: TEXT_FAINT }}>
            <a href="#" style={{ color: TEXT_FAINT, textDecoration: "none" }}>Privacy Policy</a>
            {" · "}
            <a href="#" style={{ color: TEXT_FAINT, textDecoration: "none" }}>Terms &amp; Conditions</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
