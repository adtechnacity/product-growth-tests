export interface QuizOption {
  label: string;
  key: string;
  value: number;
}

export interface QuizQuestion {
  id: string;
  text: string;
  subtext: string;
  options: QuizOption[];
}

export interface QuizAnswer {
  questionId: string;
  key: string;
  value: number;
}

export interface QuizAnswers {
  frequency?: QuizAnswer;
  partySize?: QuizAnswer;
}

export type QuizScreen = "q1" | "q2" | "result";
