import type { Metadata } from "next";
import Quiz from "@/components/quiz/Quiz";
import { getTravelMerchants } from "@/lib/cos-data";

export const metadata: Metadata = {
  title: "Travel Savings Quiz | Capital One Shopping",
  description:
    "Answer 2 quick questions to see how much you could save on travel with Capital One Shopping.",
};

export default function QuizPage() {
  const merchants = getTravelMerchants();
  return <Quiz merchants={merchants} />;
}
