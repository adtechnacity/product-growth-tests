import type { QuizQuestion } from "./types";

export const QUESTIONS: QuizQuestion[] = [
  {
    id: "frequency",
    text: "How often do you travel?",
    subtext: "Include weekend trips, vacations, and work travel",
    options: [
      { label: "1-2 trips a year", key: "low", value: 1.5 },
      { label: "3-5 trips a year", key: "mid", value: 4 },
      { label: "6+ trips a year", key: "high", value: 7 },
    ],
  },
  {
    id: "partySize",
    text: "Who do you usually travel with?",
    subtext: "Pick the closest match",
    options: [
      { label: "Just me (1)", key: "solo", value: 1200 },
      { label: "Me + one (2)", key: "couple", value: 2400 },
      { label: "Family (3-5)", key: "family", value: 4800 },
      { label: "Group (6+)", key: "group", value: 7200 },
    ],
  },
];
