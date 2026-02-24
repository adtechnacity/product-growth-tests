import type { COSChromeStats } from "@/lib/cos-data";

function DollarIcon() {
  return (
    <svg
      className="w-8 h-8 text-cta-blue"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      className="w-8 h-8 text-cta-blue"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
      />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      className="w-8 h-8 text-cta-blue"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5a17.92 17.92 0 0 1-8.716-2.247m0 0A8.966 8.966 0 0 1 3 12c0-1.264.26-2.467.732-3.56"
      />
    </svg>
  );
}

interface ObjectionCardsProps {
  chromeStats: COSChromeStats;
}

export default function ObjectionCards({ chromeStats }: ObjectionCardsProps) {
  const OBJECTIONS = [
    {
      icon: DollarIcon,
      question: "Is it really free?",
      answer:
        "Yes, 100% free. No credit card needed, no sign-up fee. Capital One Shopping is a completely free service.",
    },
    {
      icon: ShieldIcon,
      question: "Is it safe?",
      answer: `Trusted by ${chromeStats.userCount}+ users with a ${chromeStats.ratingValue}\u2605 rating. Built by Capital One, a Fortune 500 bank.`,
    },
    {
      icon: GlobeIcon,
      question: "Does it work on my browser?",
      answer:
        "Works on Chrome, Firefox, Safari, and Edge. Install takes less than 30 seconds.",
    },
  ];
  return (
    <section className="bg-slate-50 rounded-xl py-10 px-6">
      <h2 className="text-headline text-xl md:text-2xl font-bold text-center mb-8">
        Common Questions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto">
        {OBJECTIONS.map(({ icon: Icon, question, answer }) => (
          <div key={question} className="flex flex-col items-center text-center">
            <div className="mb-3">
              <Icon />
            </div>
            <h3 className="font-bold text-lg text-headline mb-2">{question}</h3>
            <p className="text-base leading-relaxed text-gray-700">{answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
