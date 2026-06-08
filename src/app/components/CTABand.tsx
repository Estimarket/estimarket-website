import WaitlistForm from "./WaitlistForm";

type Role = "homeowner" | "contractor";

type CTABandProps = {
  role: Role;
  headline?: string;
  subhead?: string;
};

const DEFAULT_COPY: Record<
  Role,
  { headline: string; subhead: string; perk: string }
> = {
  homeowner: {
    headline: "Let’s get your dream project moving.",
    subhead:
      "We’re almost ready to launch. Drop your email and your zip — we’ll let you know when the marketplace is live.",
    perk: "Free for homeowners",
  },
  contractor: {
    headline: "Win more local projects.",
    subhead:
      "We’re almost ready to launch. Drop your email and your zip — we’ll let you know when the marketplace is live.",
    perk: "Free to get started",
  },
};

export default function CTABand({ role, headline, subhead }: CTABandProps) {
  const copy = DEFAULT_COPY[role];
  const resolvedHeadline = headline ?? copy.headline;
  const resolvedSubhead = subhead ?? copy.subhead;

  return (
    <section className="bg-navy px-5 py-12 sm:px-10 sm:py-[50px]">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-10 rounded-[28px] bg-navy-700 p-8 sm:p-16 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex max-w-[540px] flex-col gap-5">
          <p className="text-[11px] font-bold uppercase tracking-[1px] text-gold">
            Opening soon in Denver, CO
          </p>
          <h2 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
            {resolvedHeadline}
          </h2>
          <p className="text-lg leading-normal text-band-text">
            {resolvedSubhead}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-band-muted">
            <li>{`\u2713 ${copy.perk}`}</li>
            <li>{"\u2713 No spam, ever"}</li>
            <li>{"\u2713 Unsubscribe anytime"}</li>
          </ul>
        </div>

        <div className="w-full rounded-[20px] bg-navy-800 p-5 lg:w-[400px] lg:shrink-0">
          <WaitlistForm role={role} source={`cta_${role}`} variant="onDark" />
        </div>
      </div>
    </section>
  );
}
