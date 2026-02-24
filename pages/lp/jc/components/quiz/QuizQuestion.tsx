import type { QuizQuestion as QuizQuestionType, QuizOption } from "./types";

interface QuizQuestionProps {
  question: QuizQuestionType;
  selectedKey: string | null;
  onSelect: (option: QuizOption) => void;
  onSkip: () => void;
  skipLabel?: string;
}

function CheckCircleIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="11" fill="#214CE5" />
      <path
        d="M6 11.5L9.5 15L16 8"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function QuizQuestion({
  question,
  selectedKey,
  onSelect,
  onSkip,
  skipLabel = "Skip to results \u2192",
}: QuizQuestionProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full px-4 py-10">
      <div className="w-full max-w-md">
        {/* Question text */}
        <h2
          className="text-center font-semibold mb-2"
          style={{ fontSize: "22px", fontWeight: 600 }}
        >
          {question.text}
        </h2>

        {/* Subtext */}
        <p
          className="text-center text-gray-500 mb-6"
          style={{ fontSize: "15px", fontWeight: 400 }}
        >
          {question.subtext}
        </p>

        {/* Answer cards */}
        <div className="flex flex-col w-full" style={{ gap: "12px" }}>
          {question.options.map((option) => {
            const isSelected = selectedKey === option.key;
            return (
              <button
                key={option.key}
                type="button"
                onClick={() => onSelect(option)}
                className={[
                  "w-full flex items-center justify-between cursor-pointer transition-all duration-150",
                  "hover:scale-[1.02] hover:shadow-md",
                  isSelected
                    ? "bg-blue-50 border-[2px] border-cta-blue"
                    : "bg-white border border-gray-300",
                ].join(" ")}
                style={{
                  minHeight: "56px",
                  borderRadius: "12px",
                  padding: "14px 16px",
                }}
              >
                <span
                  className="text-left"
                  style={{ fontSize: "18px", fontWeight: 500 }}
                >
                  {option.label}
                </span>
                {isSelected && (
                  <span className="ml-3 shrink-0">
                    <CheckCircleIcon />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Skip link */}
        <div className="flex justify-center" style={{ marginTop: "24px" }}>
          <button
            type="button"
            onClick={onSkip}
            className="cursor-pointer underline text-gray-400 py-3 px-4"
            style={{ fontSize: "14px" }}
          >
            {skipLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
