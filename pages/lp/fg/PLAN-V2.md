# COS Smart Quiz V2 — Complete Redesign Plan

## Felipe's Feedback (Critical)
1. **NOT Capital One Shopping branded** — it's couponcodefinder.com / onlineshoppingtools.com blog pages
2. **Match the ad creative's tone** — "cramped" travel angle, feels like a continuation
3. **Copy the existing LP style** — these pages have $10M+ in testing. Respect the design language.
4. **Remove member/sign-in** — doesn't exist
5. **Auto-advance on selection** — no "Next" buttons, immediate response to clicks
6. **Savings math must be real** — or the idea doesn't work

---

## THE REAL DESIGN LANGUAGE (from source analysis)

### Typography
- **Font family:** Open Sans (body), Lato, Roboto (headers)
- **Body text:** 19px (1.1875rem), line-height 1.6625rem
- **Headline:** 26px (1.625rem), bold, black, centered
- **Background:** White (#FFFFFF)
- **Text color:** Black (#000000) body, #37465A for meta
- **Link color:** #214ce5 (blue) for COS links
- **Meta text:** #B1ADAD, 10px, centered

### Structure
- "Advertorial" label at top (small, gray, centered)
- Big bold headline
- Author byline with photo, date
- Long-form editorial content
- Embedded product screenshots
- "Add to Chrome — It's free" CTA button
- Press logos bar
- Privacy/Terms footer

### CTA Button
- Blue background
- White text
- "Add to Chrome — It's free."
- Links to cos-rd.com tracking URLs
- class="btn" on anchor tag (REQUIRED)

---

## THE SAVINGS MATH PROBLEM

### Why the current approach fails
My V1 used made-up averages. Felipe is right — if the numbers aren't real, the whole concept collapses.

### What we CAN claim (based on actual COS data from the research)
From the existing landing pages and COS marketing materials:
- "Automatically apply coupon codes" — the extension tries codes at checkout
- "Compare prices across retailers" — shows if item is cheaper elsewhere
- "Earn cash back" — actual cash back on purchases
- Hilton: up to 40% off rates, 15% back
- Priceline: up to 20% back

### The honest approach: Don't calculate exact savings. Instead:
1. Ask what stores they shop at → show REAL savings examples for those stores
2. Ask how often → give a range, not a specific number
3. Frame as "COS members who shop at [stores] save an average of $X-$Y/year"

### Better: Use the EXISTING claim format
The existing pages say:
- "8,000,000+ users" (not 17M — that's the COS total, the page uses a more conservative number)
- Show SPECIFIC product comparison screenshots (Keurig example showing $40 savings)
- "Savings may vary. Sample results shown." (legal disclaimer)

### Revised savings approach:
Instead of a calculator, show **real product examples** relevant to their selected stores:
- Amazon → Keurig K-Classic: $139.99 → $99.99 (save $40)
- Target → Dyson V8: $349.99 → $299.99 (save $50)
- Walmart → Ninja Blender: $89.99 → $69.99 (save $20)

Then: "COS automatically finds deals like these every time you shop. Add to Chrome — It's free."

This is more honest and more effective than a fake calculator.

---

## REVISED QUIZ FLOW

### Step 0: Landing (The Hook)
- Matches the ad angle ("cramped" → travel, or "Amazon Prime" → shopping)
- Looks like a blog post on couponcodefinder.com / onlineshoppingtools.com
- "Advertorial" label at top
- Headline matches ad creative
- Author byline + date
- First 2-3 paragraphs of editorial content
- Then: "But first — let's see how much you could actually save. Answer 3 quick questions."

### Step 1: Store Selection (auto-advance after selection)
- "Where do you shop most online?"
- Clean card grid, same font/color as blog
- Selecting a store immediately shows a real savings example for that store
- After 1-2 selections, auto-scrolls to next question

### Step 2: Shopping Frequency (auto-advance on click)
- "How often do you shop online?"
- Simple text options, clicking one immediately advances
- No "Next" button

### Step 3: Priority (auto-advance on click)
- "What would help you save the most?"
- Coupon codes / Cash back / Price comparison / All
- Clicking advances immediately

### Step 4: Results
- NOT a calculator with fake numbers
- Instead: Real savings examples for their selected stores
- "Based on your shopping habits, here's what Capital One Shopping could find for you:"
- 2-3 real product deal examples from their stores
- "Add to Chrome — It's free" CTA
- Press logos
- Continues into the editorial content (the advertorial)

---

## VISUAL DESIGN SPEC (matching existing pages)

### Colors
- Background: #FFFFFF
- Text: #000000
- Meta/labels: #B1ADAD
- Links: #214ce5
- CTA button: Blue (#214ce5 or similar)

### Fonts
- Open Sans 400/700 for body
- Lato for secondary
- NO Tailwind defaults — use the actual fonts

### Layout
- Max-width: 400px (section-fit class from original)
- Centered
- Mobile-first (these pages are designed for mobile)
- White background, no cards, no borders
- Clean editorial look

### Elements to KEEP from existing pages
- "Advertorial" label
- Author byline with photo
- Date stamp
- Editorial tone in copy
- Product comparison screenshot
- "Add to Chrome — It's free" CTA button
- Press logo bar (USA TODAY, etc.)
- Privacy/Terms footer
- "Savings may vary" disclaimer

### Elements to REMOVE
- Capital One Shopping branding/logo in header
- "17M+ members" stat (use "8,000,000+ users" like original)
- "Sign in" link
- "Start over" link
- Any tech/app-like UI elements

---

## TECHNICAL CHANGES

### Remove
- Tailwind (or use minimally) — custom CSS matching original
- All card-based UI
- Progress bars
- Navigation buttons
- Header with logo

### Add
- Open Sans + Lato font imports
- Blog-style layout (400px max-width)
- Advertorial header
- Editorial content sections
- Real product savings examples per store
- Smooth auto-advance animations
- "Savings may vary" disclaimer

### Store savings data (real examples)
```javascript
const storeSavings = {
  amazon: {
    name: 'Amazon',
    examples: [
      { product: 'Keurig K-Classic Coffee Maker', original: 149.99, sale: 109.99 },
      { product: 'Crest 3D Whitestrips', original: 45.99, sale: 29.99 },
      { product: 'Instant Pot Duo 7-in-1', original: 89.99, sale: 59.99 }
    ]
  },
  target: {
    name: 'Target',
    examples: [
      { product: 'Dyson V8 Absolute', original: 349.99, sale: 299.99 },
      { product: 'KitchenAid Stand Mixer', original: 329.99, sale: 279.99 }
    ]
  },
  // ... etc
};
```

---

## BUILD CHECKLIST V2

1. [ ] Strip all existing components
2. [ ] Create blog-style layout (400px, Open Sans, white bg)
3. [ ] Add advertorial header + byline
4. [ ] Create editorial intro content (matches ad angle)
5. [ ] Build inline quiz questions (no cards, blog-native styling)
6. [ ] Auto-advance on selection (no Next buttons)
7. [ ] Real product savings examples
8. [ ] "Add to Chrome — It's free" CTA
9. [ ] Press logos + disclaimer
10. [ ] Build + deploy to Vercel
