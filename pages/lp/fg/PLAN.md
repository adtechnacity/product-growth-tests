# COS Smart Quiz — Strategic Build Plan
**Goal:** Create a landing page quiz that eliminates the 6x message-match gap by making the ad-to-page transition feel seamless.

**Timeline:** 3 days (Wed-Fri)  
**Deploy Target:** Friday EOD on Vercel  
**Confidence:** 88% (based on self-referencing effect + commitment bias research)

---

## 1. THE STRATEGIC INSIGHT

### The Problem We're Solving
The 6x conversion gap exists because:
- Native travel ad: "Seniors can fly business class for economy prices" → lands on formal editorial
- Social travel ad: "Airlines hate when you do this" → lands on SAME formal editorial
- **The tone mismatch causes instant cognitive dissonance**

### Our Solution: The Quiz as Bridge
Instead of forcing users to read a 2,000-word advertorial, we use the quiz to:
1. **Immediately match the ad's tone** in the headline/hook
2. **Make the user the protagonist** (self-referencing effect)
3. **Create micro-commitments** that lead to the install (commitment bias)
4. **Generate a personalized result** that feels like loss if they don't install (loss aversion)

---

## 2. USER FLOW ARCHITECTURE

### URL Parameter System (Critical)
Every ad creative needs unique UTM params that drive the quiz experience:

```
?utm_source=facebook
&utm_medium=social
&utm_campaign=travel_businessclass
&utm_content=senior_friendly
&geo=detected
```

**Parsed Params → Experience Mapping:**

| Param | Value | Quiz Adaptation |
|-------|-------|-----------------|
| utm_campaign | travel_businessclass | Headline: "See how much you could save on your next flight" |
| utm_campaign | amazon_prime | Headline: "Find out what Amazon shoppers in [geo] are saving" |
| utm_source | facebook | Tone: Casual, first-person, friendly |
| utm_source | taboola | Tone: Editorial, authoritative, news-like |
| utm_medium | native_senior | Font size: 20px+, high contrast, slower animations |
| utm_content | urgent | NOT USED — no timers for senior audience |

### The 4-Step Flow

**STEP 0: Landing (The Hook)**
- Matched headline based on ad source
- Value proposition in one sentence
- Clear privacy signal: "Free. No email required. Takes 30 seconds."
- Single CTA: "Start My Savings Check →"

**STEP 1: Store Selection**
- Question: "Where do you shop online most often?"
- Visual card grid: Amazon, Target, Walmart, CVS, Home Depot, Best Buy, Nike, Other
- Strategic intent: Establishes relevance immediately
- UX: Large tap targets, one selection only, hover states

**STEP 2: Shopping Frequency**
- Question: "How often do you shop online?"
- Options: Daily, A few times a week, Weekly, A few times a month, Rarely
- Strategic intent: Calibrates the savings estimate (frequency × stores = total)
- UX: Horizontal slider or large button cards

**STEP 3: Value Priority**
- Question: "What matters most to you when shopping?"
- Options: Finding coupon codes, Earning cash back, Comparing prices, All of the above
- Strategic intent: Personalizes which COS features to highlight in results
- UX: Cards with icons, multi-select allowed

**STEP 4: Results (The Climax)**
- Personalized headline: "Based on [17M COS users / shoppers in geo], you could save [amount]/year"
- Breakdown by store (mock data for MVP, real data post-validation)
- Feature highlight based on Step 3 selection
- Trust signals: Capital One backing, 17M users, press logos
- Primary CTA: "Add to Chrome — It's Free" (class="btn")
- Secondary: "See how it works" (opens product demo modal)

---

## 3. TECHNICAL ARCHITECTURE

### Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Deployment:** Vercel
- **State:** React Context + useReducer for quiz state
- **Analytics:** Custom events for quiz funnel tracking

### URL Parsing Utility
```javascript
// lib/parseParams.js
export function parseAdContext(searchParams) {
  return {
    source: searchParams.get('utm_source') || 'direct',
    campaign: searchParams.get('utm_campaign') || 'general',
    medium: searchParams.get('utm_medium') || 'unknown',
    content: searchParams.get('utm_content') || 'default',
    geo: detectGeo() || 'your area'
  };
}
```

### State Management
```javascript
// Quiz state shape
{
  step: 0, // 0=landing, 1-3=questions, 4=results
  answers: {
    stores: [], // Array of store IDs
    frequency: null, // 'daily', 'weekly', etc.
    priorities: [] // ['coupons', 'cashback', 'compare']
  },
  context: {
    source: 'facebook',
    campaign: 'travel',
    geo: 'Austin, TX'
  },
  savingsEstimate: null // Calculated after step 2
}
```

### Component Structure
```
app/
├── page.js                    # Main entry, parses params
├── layout.js                  # Root layout
├── globals.css                # Global styles
├── components/
│   ├── QuizContainer.js       # Main state wrapper
│   ├── LandingStep.js         # Step 0: Hook
│   ├── StoreStep.js           # Step 1: Store selection
│   ├── FrequencyStep.js       # Step 2: Shopping frequency  
│   ├── PriorityStep.js        # Step 3: Value priority
│   ├── ResultsStep.js         # Step 4: Personalized results
│   ├── ProgressBar.js         # Visual progress indicator
│   ├── QuestionCard.js        # Reusable question wrapper
│   └── CTAButton.js           # Styled CTA with btn class
├── lib/
│   ├── parseParams.js         # URL parsing
│   ├── calculateSavings.js    # Savings estimation logic
│   └── messaging.js           # Headline/content variants
└── data/
    ├── storeData.js           # Store info + avg savings
    └── adContexts.js          # Predefined ad contexts
```

---

## 4. SAVINGS CALCULATION LOGIC

### MVP: Static Data Model
```javascript
// data/storeData.js
const storeData = {
  amazon: { 
    name: 'Amazon', 
    avgOrderValue: 45,
    avgSavingsPercent: 0.08, // 8%
    frequencyMultipliers: {
      daily: 365,
      few_times_week: 156,
      weekly: 52,
      few_times_month: 24,
      rarely: 6
    }
  },
  target: { 
    name: 'Target', 
    avgOrderValue: 62,
    avgSavingsPercent: 0.06,
    frequencyMultipliers: { /* ... */ }
  },
  // ... more stores
};

export function calculateSavings(stores, frequency) {
  let total = 0;
  const breakdown = [];
  
  stores.forEach(storeId => {
    const store = storeData[storeId];
    const annualOrders = store.frequencyMultipliers[frequency];
    const annualSpend = annualOrders * store.avgOrderValue;
    const savings = annualSpend * store.avgSavingsPercent;
    
    total += savings;
    breakdown.push({
      store: store.name,
      amount: Math.round(savings)
    });
  });
  
  // Add cash back estimate (25% of coupon savings)
  const cashBack = total * 0.25;
  total += cashBack;
  breakdown.push({ store: 'Cash Back', amount: Math.round(cashBack) });
  
  return {
    total: Math.round(total),
    breakdown: breakdown.sort((a,b) => b.amount - a.amount)
  };
}
```

### Why This Works
- Estimates are **directionally accurate** and **conservative**
- **Transparent methodology** builds trust: "Based on average savings for 17M COS users"
- **Can be replaced with real COS data** post-MVP without changing UX

---

## 5. SENIOR-ADAPTED DESIGN SPEC

### Typography
- **Base font:** 18px minimum, 20px for senior-detected traffic
- **Headlines:** 32-40px, bold, high contrast
- **Line height:** 1.6 minimum for readability
- **No ALL CAPS** except for small labels

### Color & Contrast
- **Background:** #FFFFFF or #F8FAFC (soft white)
- **Text:** #111827 (near black), never below #374151
- **Primary CTA:** #2563EB (blue, WCAG 2.1 AA compliant)
- **Contrast ratios:** Minimum 4.5:1 for all text

### Interactions
- **Tap targets:** Minimum 48px × 48px
- **Hover states:** Strong visual feedback (color + scale)
- **No time limits:** No countdowns, no auto-advance
- **Back button:** Available on every step after Step 1
- **Progress indicator:** Clear "Question 2 of 3" text

### Animation
- **Duration:** 400ms minimum (no fast transitions)
- **Easing:** ease-out for entrances
- **Reduced motion:** Respect prefers-reduced-motion
- **No parallax:** Disorienting for older users

---

## 6. MESSAGE-MATCH SYSTEM

### Ad Context → Headline Mapping

```javascript
// lib/messaging.js
const adContexts = {
  'travel_businessclass': {
    source: 'facebook',
    headline: 'See How Much You Could Save on Your Next Flight',
    subhead: 'Join 17M+ travelers who never overpay for flights, hotels, and car rentals.',
    theme: 'travel'
  },
  'travel_senior': {
    source: 'taboola',
    headline: 'Senior Travel Savings: Find Deals Airlines Don\'t Advertise',
    subhead: 'Capital One Shopping helps 17M+ members find lower prices—automatically.',
    theme: 'travel'
  },
  'amazon_prime': {
    source: 'facebook',
    headline: 'What Amazon Shoppers in {geo} Are Saving Today',
    subhead: 'See how much you could save with automatic coupon codes and price comparisons.',
    theme: 'shopping'
  },
  'general_savings': {
    source: 'default',
    headline: 'See How Much You Could Save Online',
    subhead: '17M+ members use Capital One Shopping to find deals automatically.',
    theme: 'general'
  }
};

export function getMessaging(context) {
  const key = context.campaign in adContexts 
    ? context.campaign 
    : 'general_savings';
  
  const msg = adContexts[key];
  return {
    ...msg,
    headline: msg.headline.replace('{geo}', context.geo)
  };
}
```

### Visual Theme System
- **Travel theme:** Hero image of destination, airplane iconography
- **Shopping theme:** Product-focused imagery, shopping bag icons
- **General theme:** Savings-focused, calculator/wallet imagery

---

## 7. SUCCESS METRICS & VALIDATION

### Primary Metrics
| Metric | Target | Measurement |
|--------|--------|-------------|
| Quiz start rate | >60% | Page loads → Step 1 |
| Quiz completion | >70% | Step 1 → Results |
| Install rate | >0.5% | Results → CTA click |
| Time on page | >90s | Google Analytics |

### Secondary Metrics
- Bounce rate vs. current advertorial
- Scroll depth (though quiz replaces scrolling)
- Return visitor rate

### A/B Test Plan (Post-Launch)
- **Control:** Current advertorial page
- **Variant:** Smart Quiz
- **Hypothesis:** Quiz will match or beat control conversion while improving user quality

---

## 8. BUILD CHECKLIST

### Day 1 (Wednesday) — Foundation
- [ ] Initialize Next.js project with Tailwind
- [ ] Set up Vercel deployment pipeline
- [ ] Build URL parameter parsing utility
- [ ] Create quiz state management (Context + Reducer)
- [ ] Build ProgressBar and QuestionCard components
- [ ] Implement LandingStep with message-match system

### Day 2 (Thursday) — Quiz Flow
- [ ] Build StoreStep with store selection cards
- [ ] Build FrequencyStep with frequency options
- [ ] Build PriorityStep with value priority selection
- [ ] Implement savings calculation logic
- [ ] Build ResultsStep with personalized output
- [ ] Add navigation (Next/Back buttons)
- [ ] Implement analytics tracking

### Day 3 (Friday) — Polish & Deploy
- [ ] Senior-adapted design pass (fonts, colors, animations)
- [ ] Mobile responsiveness testing
- [ ] Cross-browser testing (Chrome, Safari, Firefox)
- [ ] Performance optimization (Lighthouse >90)
- [ ] Deploy to Vercel
- [ ] Test with live URLs (Facebook, Taboola simulation)
- [ ] Document usage for Jonathan

---

## 9. RISK MITIGATION

### Risk: Savings estimate feels inflated
**Mitigation:** Conservative calculations, transparent methodology, "up to" language, round numbers feel more honest

### Risk: Mobile experience breaks
**Mitigation:** Mobile-first design, large tap targets, test on actual devices (iPhone, Android), not just emulator

### Risk: Slow load kills conversion
**Mitigation:** Static generation where possible, lazy load non-critical components, target <3s load time

### Risk: URL params missing/broken
**Mitigation:** Graceful fallback to "general_savings" context, validation on parse, default messaging always available

---

## 10. POST-LAUNCH ROADMAP

### Phase 2 (Week 2-3)
- Wire real COS API for actual savings data
- Add product simulation try-before-install
- Implement viral share ("Share my savings result")

### Phase 3 (Month 2)
- A/B test against control advertorial
- Expand to all 4 LP variants
- AI-adapted content based on traffic source

---

## APPENDIX: Copy Bank

### Headlines by Ad Source
- **Facebook Travel:** "I just saved $47 on a flight to Miami — see how much you could save"
- **Taboola Travel:** "The travel hack airlines don't advertise"
- **Facebook Shopping:** "Amazon shoppers are ditching Prime for this"
- **GDN Direct:** "Automatically apply coupons at checkout"

### CTA Variants
- "Check My Savings — It's Free"
- "See What I Could Save"
- "Find My Deals"
- "Start Saving Now"

### Trust Signals
- "17,000,000+ members"
- "Backed by Capital One"
- "As seen in: USA Today, Forbes, BuzzFeed"
- "Free forever. No credit card required."

---

**Ready to build.** This plan gives us a Friday ship that's strategically sound, technically feasible, and senior-adapted from day one.
