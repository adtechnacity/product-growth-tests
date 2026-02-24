export const CTA_URL = "https://cos-rd.com/go";

export interface CtaBlockProps {
  variant: "standard" | "personalized" | "action" | "specific" | "reassurance";
  savings?: number;
  merchantName?: string;
  dealCount?: number;
}

function formatSavings(n: number): string {
  return n.toLocaleString("en-US");
}

function getCtaCopy(props: CtaBlockProps): string {
  const { variant, savings, merchantName, dealCount } = props;

  switch (variant) {
    case "personalized":
      return savings != null
        ? `Start Saving $${formatSavings(savings)}/Year`
        : "Get Started — It's Free";

    case "action":
      return "Add to Browser in 10 Seconds";

    case "specific":
      return merchantName && dealCount != null
        ? `Unlock ${dealCount} ${merchantName} Deals`
        : "Get Started — It's Free";

    case "reassurance":
      return "Get Started — 100% Free, No Sign-Up";

    case "standard":
    default:
      return "Get Started — It's Free";
  }
}

export default function CtaBlock(props: CtaBlockProps) {
  const copy = getCtaCopy(props);

  return (
    <div className="flex flex-col items-center gap-3">
      <a className="btn" href={CTA_URL}>
        {copy}
      </a>
      <p className="text-sm text-gray-500">
        Joined by 11M+ users · 4.7★ from 17K+ reviews
      </p>
    </div>
  );
}
