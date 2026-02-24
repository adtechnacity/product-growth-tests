interface QuizProgressProps {
  progress: number;
}

export default function QuizProgress({ progress }: QuizProgressProps) {
  return (
    <div className="w-full h-1 bg-gray-200">
      <div
        className="h-full bg-cta-blue"
        style={{
          width: `${progress}%`,
          transition: "width 300ms ease-out",
        }}
      />
    </div>
  );
}
