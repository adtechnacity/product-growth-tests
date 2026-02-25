# COS Smart Quiz — Capital One Shopping Landing Page

A high-converting advertorial landing page for Capital One Shopping, built with Next.js.

## Live Demo
🔗 [cos-smart-quiz.vercel.app](https://cos-smart-quiz.vercel.app)

## Overview
Single-page advertorial designed to drive Chrome extension installs for Capital One Shopping. Features:

- **Persuasive editorial copy** — styled as a news article ("Amazon's Worst Nightmare")
- **Live deal widget** — real-time savings comparison fetched via API
- **Product comparison visual** — side-by-side Amazon vs Capital One pricing
- **Social proof** — 8M+ users, press logos (USA Today, Forbes, etc.)
- **Clear CTA** — "Add to Chrome — It's free" button

## Tech Stack
- **Framework:** Next.js 16 (App Router, Turbopack)
- **Styling:** CSS (globals.css)
- **Deployment:** Vercel
- **API:** `/api/deals` route for live deal data

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure
```
app/
├── page.tsx              # Main advertorial page
├── layout.tsx            # Root layout
├── globals.css           # All styles
├── api/deals/route.ts    # Deal data API
├── components/           # Quiz step components
│   ├── LandingStep.tsx
│   ├── FrequencyStep.tsx
│   ├── PriorityStep.tsx
│   ├── StoreStep.tsx
│   └── ResultsStep.tsx
├── context/
│   └── QuizContext.tsx
├── data/
│   └── quizData.ts
└── lib/
    ├── calculateSavings.ts
    └── messaging.ts
```

## Deployment
Auto-deploys to Vercel on push. Manual deploy:

```bash
npx vercel --prod
```
