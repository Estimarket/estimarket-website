import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import BidBuilderScene from "../components/campaign/BidBuilderScene";
import HeroLoopScene from "../components/campaign/HeroLoopScene";
import ScopeReviewScene from "../components/campaign/ScopeReviewScene";

export const metadata: Metadata = {
  title: "Denver Founding Contractors — Estimarket",
  description:
    "We're launching in Denver with bathroom renovation jobs on Oct. 1st — with exclusive access for 10 founding contractors.",
  // Campaign page reached via campaign links only; flip to indexable when the
  // founding-contractor signup flow is live.
  robots: { index: false, follow: false },
};

// TODO(signup): every "Claim your spot" CTA points at the existing contractor
// waitlist until the founding-contractor signup flow is wired up — swap this
// href (and the hardcoded spots-open copy below) when that ships.
const CLAIM_HREF = "/waitlist/contractor";

const SPOTS = { open: 9, total: 10, claimed: 1 };

// `size` replaces the default sizing classes wholesale (Tailwind can't
// reliably override h-14 with a later h-[54px]).
function ClaimButton({ size = "h-14 px-8 text-lg" }: { size?: string }) {
  return (
    <Link
      href={CLAIM_HREF}
      className={`inline-flex items-center justify-center rounded-lg bg-brand font-semibold tracking-[0.01em] text-white transition-colors hover:bg-[#cf4f1e] ${size}`}
    >
      Claim your spot
    </Link>
  );
}

const BENEFIT_ICON_PATHS: Record<string, ReactNode> = {
  "badge-percent": (
    <>
      <path d="M5.13333 11.4933C4.93871 10.6167 4.9686 9.70509 5.2202 8.84309C5.47181 7.98108 5.93699 7.19656 6.57262 6.56226C7.20825 5.92796 7.99374 5.46443 8.85627 5.21463C9.7188 4.96483 10.6304 4.93685 11.5067 5.1333C11.9889 4.37904 12.6533 3.75831 13.4386 3.32835C14.2239 2.89838 15.1047 2.67301 16 2.67301C16.8953 2.67301 17.7761 2.89838 18.5614 3.32835C19.3467 3.75831 20.011 4.37904 20.4933 5.1333C21.3709 4.936 22.2841 4.96385 23.148 5.21425C24.0119 5.46466 24.7984 5.92949 25.4345 6.56551C26.0705 7.20152 26.5353 7.98806 26.7857 8.85197C27.0361 9.71587 27.064 10.6291 26.8667 11.5066C27.6209 11.9889 28.2416 12.6533 28.6716 13.4386C29.1016 14.2238 29.3269 15.1047 29.3269 16C29.3269 16.8952 29.1016 17.7761 28.6716 18.5614C28.2416 19.3466 27.6209 20.011 26.8667 20.4933C27.0631 21.3695 27.0351 22.2812 26.7853 23.1437C26.5355 24.0062 26.072 24.7917 25.4377 25.4273C24.8034 26.063 24.0189 26.5282 23.1569 26.7798C22.2949 27.0314 21.3833 27.0612 20.5067 26.8666C20.025 27.6238 19.3601 28.2472 18.5735 28.6791C17.7869 29.1109 16.904 29.3374 16.0067 29.3374C15.1093 29.3374 14.2264 29.1109 13.4398 28.6791C12.6532 28.2472 11.9883 27.6238 11.5067 26.8666C10.6304 27.0631 9.7188 27.0351 8.85627 26.7853C7.99374 26.5355 7.20825 26.072 6.57262 25.4377C5.93699 24.8034 5.47181 24.0189 5.2202 23.1568C4.9686 22.2948 4.93871 21.3833 5.13333 20.5066C4.37327 20.0256 3.74721 19.3602 3.31339 18.5723C2.87957 17.7843 2.65208 16.8994 2.65208 16C2.65208 15.1005 2.87957 14.2156 3.31339 13.4277C3.74721 12.6397 4.37327 11.9743 5.13333 11.4933Z" />
      <path d="M20 12L12 20" />
      <path d="M12 12H12.0133" />
      <path d="M20 20H20.0133" />
    </>
  ),
  eye: (
    <>
      <path d="M2.74932 15.536C2.63819 15.8353 2.63819 16.1646 2.74932 16.464C3.83158 19.0882 5.66867 21.3319 8.02768 22.9108C10.3867 24.4897 13.1614 25.3325 16 25.3325C18.8386 25.3325 21.6133 24.4897 23.9723 22.9108C26.3313 21.3319 28.1684 19.0882 29.2506 16.464C29.3618 16.1646 29.3618 15.8353 29.2506 15.536C28.1684 12.9118 26.3313 10.668 23.9723 9.08919C21.6133 7.51034 18.8386 6.66748 16 6.66748C13.1614 6.66748 10.3867 7.51034 8.02768 9.08919C5.66867 10.668 3.83158 12.9118 2.74932 15.536Z" />
      <path d="M16 20C18.2091 20 20 18.2091 20 16C20 13.7909 18.2091 12 16 12C13.7909 12 12 13.7909 12 16C12 18.2091 13.7909 20 16 20Z" />
    </>
  ),
  "credit-card": (
    <>
      <path d="M26.6667 6.66667H5.33333C3.86057 6.66667 2.66667 7.86057 2.66667 9.33333V22.6667C2.66667 24.1394 3.86057 25.3333 5.33333 25.3333H26.6667C28.1394 25.3333 29.3333 24.1394 29.3333 22.6667V9.33333C29.3333 7.86057 28.1394 6.66667 26.6667 6.66667Z" />
      <path d="M2.66667 13.3333H29.3333" />
    </>
  ),
  "message-square": (
    <path d="M29.3333 22.6667C29.3333 23.3739 29.0524 24.0522 28.5523 24.5523C28.0522 25.0524 27.3739 25.3333 26.6667 25.3333H9.104C8.39681 25.3335 7.71865 25.6145 7.21867 26.1147L4.28267 29.0507C4.15027 29.183 3.9816 29.2732 3.79799 29.3097C3.61437 29.3462 3.42404 29.3275 3.25108 29.2558C3.07811 29.1842 2.93027 29.0629 2.82625 28.9072C2.72222 28.7516 2.66669 28.5685 2.66667 28.3813V6.66667C2.66667 5.95942 2.94762 5.28115 3.44772 4.78105C3.94781 4.28095 4.62609 4 5.33333 4H26.6667C27.3739 4 28.0522 4.28095 28.5523 4.78105C29.0524 5.28115 29.3333 5.95942 29.3333 6.66667V22.6667Z" />
  ),
};

function BenefitIcon({ icon, className }: { icon: string; className: string }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {BENEFIT_ICON_PATHS[icon]}
    </svg>
  );
}

const BENEFITS = [
  {
    icon: "badge-percent",
    title: "Zero platform fees for twelve months",
    body: "Every job you win in the founding year is yours in full. No commission, no per-lead charge, no subscription.",
    dark: true,
  },
  {
    icon: "eye",
    title: "First look at every bathroom lead",
    body: "Only our 10 founding partners will have access to any bathroom projects posted to the marketplace for 3 months.",
    dark: false,
  },
  {
    icon: "credit-card",
    title: "Nothing to cancel, nothing to lose",
    body: "No card to sign up, no contract, no minimum bids. Quote the jobs that fit and ignore the ones that don't.",
    dark: false,
  },
  {
    icon: "message-square",
    title: "A hand in building it",
    body: "Founding contractors have a direct line to our CEO. What you tell us shapes what Estimarket will look like in Denver.",
    dark: false,
  },
];

type Step = {
  kicker: string;
  title: string;
  body: string;
  visual: ReactNode;
  /** Imagery on the left at desktop widths (steps 2 and 4). */
  reverse: boolean;
};

function StaticStep({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="mx-auto w-full max-w-[592px] overflow-hidden rounded-[24px] border border-line bg-white shadow-[0_10px_15px_rgba(14,33,75,0.10),0_4px_6px_rgba(14,33,75,0.05)]">
      <Image
        src={src}
        alt={alt}
        width={1184}
        height={888}
        sizes="(min-width: 640px) 592px, 100vw"
        className="h-auto w-full"
      />
    </div>
  );
}

const STEPS: Step[] = [
  {
    kicker: "You get the alert",
    title: "Get notified when a homeowner posts their bathroom project",
    body: "Based on your trade and service area, Estimarket pings you the moment we finish scoping a bathroom project for a homeowner nearby — we include itemized labor, measurements, materials, and photos in each scope.",
    visual: (
      <StaticStep
        src="/images/dfc-step1.png"
        alt="New project alert in the contractor feed"
      />
    ),
    reverse: false,
  },
  {
    kicker: "No drive-out",
    title: "Review scopes from anywhere",
    body: "Read the full scope, zoom the photos, check the notes on condition and items that need confirmation. Decide if it's a project worth your time before any visits or windshield time.",
    visual: <ScopeReviewScene />,
    reverse: true,
  },
  {
    kicker: "You bid",
    title: "Send your ballpark bid",
    body: "Price the labor line by line, and decide if you or the homeowner is providing materials. Flag TBD items with a callout, or add questions for the homeowner to reply to in-app. Send in a ballpark bid with an allowance for unknowns. Bids are always a range — never a commitment to an exact price.",
    visual: <BidBuilderScene />,
    reverse: false,
  },
  {
    kicker: "They choose",
    title: "Homeowners compare and choose the best bid",
    body: "Homeowners review the bids they've received on their project, with the ability to message contractors directly. When they select a bid, they will schedule a final walkthrough with the winning contractor to confirm final details and get to work.",
    visual: (
      <StaticStep
        src="/images/dfc-step4.png"
        alt="Homeowner choosing among side-by-side bids"
      />
    ),
    reverse: true,
  },
  {
    kicker: "You start",
    title: "One walkthrough, then the work",
    body: "Meet on site once to walk the bid with the homeowner, lock the scope and the start date, and get going. We get out of your way at this point so you can use your preferred contract, vendors, and financing options for homeowners.",
    visual: (
      <StaticStep
        src="/images/dfc-step5.png"
        alt="Walkthrough scheduled confirmation"
      />
    ),
    reverse: false,
  },
];

export default function DenverFoundingContractorsPage() {
  return (
    <>
      {/* Hero — skyline backdrop per Figma "Hero — Variant A": one photo,
          per-breakpoint crop; mobile fades down to solid navy, desktop gets a
          global knockdown plus a side scrim over the copy column. */}
      <section className="relative isolate overflow-hidden bg-navy px-5 pb-16 pt-14 text-white sm:px-10 lg:px-12 lg:pb-24 lg:pt-[88px]">
        <Image
          src="/images/dfc-denver-skyline.jpg"
          alt=""
          fill
          preload
          sizes="100vw"
          className="-z-10 object-cover [object-position:37%_50%] lg:[object-position:50%_27%]"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(14,33,75,0.26),rgba(14,33,75,0.88)_42%,#0e214b_70%)] lg:hidden"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 hidden bg-navy/[0.24] lg:block"
        />
        <div
          aria-hidden
          className="absolute inset-y-0 left-0 -z-10 hidden w-[80.5%] bg-[linear-gradient(to_right,rgba(14,33,75,0.97),rgba(14,33,75,0.6)_58%,rgba(14,33,75,0)_100%)] lg:block"
        />
        <div className="mx-auto grid max-w-[1240px] items-center gap-12 lg:grid-cols-[588px_1fr] lg:gap-16">
          {/* min-w-0: the spot-dot row's fixed content must shrink, not widen the column */}
          <div className="flex min-w-0 flex-col items-start gap-7">
            <span className="rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold tracking-[0.1em]">
              FOUNDING CONTRACTORS · DENVER
            </span>
            <h1 className="text-[38px] font-bold leading-[1.06] tracking-[-0.025em] sm:text-[52px] lg:text-[60px]">
              {"Claim your spot on Denver's founding team"}
            </h1>
            <p className="max-w-[520px] text-[17px] leading-[1.6] text-white/[0.78] lg:text-[19px]">
              {"We're launching in Denver with bathroom renovation jobs on Oct. 1st — with exclusive access for 10 founding contractors."}
            </p>
            <div className="w-full max-w-[460px] rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-[18px] lg:px-[22px] lg:py-5">
              <div className="flex items-center justify-between gap-4">
                <p className="text-[15px] font-semibold">
                  {SPOTS.open} of {SPOTS.total} founding spots open
                </p>
                <p className="text-xs tracking-[0.08em] text-white/55">
                  {SPOTS.claimed} CLAIMED
                </p>
              </div>
              <div className="mt-3 flex gap-1.5 lg:gap-2">
                {Array.from({ length: SPOTS.total }, (_, i) => (
                  <span
                    key={i}
                    className={`h-2 w-6 rounded-full lg:w-[26px] ${i < SPOTS.claimed ? "bg-white/[0.22]" : "bg-brand"}`}
                  />
                ))}
              </div>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <ClaimButton size="h-[54px] w-full px-4 text-[17px] sm:h-14 sm:w-auto sm:px-8 sm:text-lg" />
              <Link
                href="#how-it-works"
                className="inline-flex h-[54px] w-full items-center justify-center rounded-lg border-2 border-white/[0.22] px-6 text-base font-semibold text-white transition-colors hover:bg-white/10 sm:h-14 sm:w-auto"
              >
                See how bidding works
              </Link>
            </div>
            <p className="text-[13px] text-white/50">
              Licensed and insured · Denver metro · No card required
            </p>
          </div>
          <HeroLoopScene />
        </div>
      </section>

      {/* Why founding */}
      <section className="bg-white px-5 py-14 sm:px-10 lg:px-[100px] lg:py-[88px]">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:gap-12">
            <div className="flex flex-1 flex-col items-start gap-5">
              <span className="rounded-full bg-[#fee9df] px-3 py-[5px] text-[11px] font-bold tracking-[0.1em] text-[#c04e18]">
                NEW IN DENVER
              </span>
              <h2 className="text-[32px] font-bold leading-[1.12] tracking-[-0.02em] text-ink lg:text-[44px]">
                Try the new way to win work, risk free
              </h2>
            </div>
            <div className="flex-1">
              <p className="max-w-[520px] text-[17px] leading-[1.65] text-slate">
                Estimarket is new, and the founding class is how it starts. Ten
                Denver bathroom pros get every advantage the platform has for a
                full year — and it costs nothing to find out whether it works
                for your shop.
              </p>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((b) => (
              <div
                key={b.title}
                className={`flex flex-col gap-3 rounded-[24px] p-7 ${
                  b.dark ? "bg-navy" : "border border-line bg-surface"
                }`}
              >
                <BenefitIcon
                  icon={b.icon}
                  className={b.dark ? "text-brand" : "text-[#245ABC]"}
                />
                <h3
                  className={`text-[19px] font-bold leading-[1.25] ${b.dark ? "text-white" : "text-ink"}`}
                >
                  {b.title}
                </h3>
                <p
                  className={`text-[15px] leading-[1.6] ${b.dark ? "text-white/75" : "text-slate"}`}
                >
                  {b.body}
                </p>
              </div>
            ))}
          </div>
          <div>
            <ClaimButton />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="scroll-mt-28 bg-surface px-5 py-14 sm:px-10 lg:px-[100px] lg:py-[88px]"
      >
        <div className="mx-auto flex max-w-[1240px] flex-col gap-16 lg:gap-[88px]">
          <div className="flex max-w-[720px] flex-col gap-4">
            <p className="text-xs font-bold tracking-[0.1em] text-brand">
              HOW IT WORKS
            </p>
            <h2 className="text-[32px] font-bold leading-[1.12] tracking-[-0.02em] text-ink lg:text-[44px]">
              Skip the sales visit and bid directly on detailed scopes instead.
            </h2>
            <p className="text-[17px] leading-[1.65] text-slate">
              {"A Denver bathroom goes from a homeowner's idea to ready-to-start work without a single free estimate. Here's where you come in."}
            </p>
          </div>

          {STEPS.map((step, i) => (
            <div
              key={step.kicker}
              className={`flex flex-col gap-10 lg:items-center lg:gap-14 ${
                step.reverse ? "lg:flex-row-reverse" : "lg:flex-row"
              }`}
            >
              <div className="flex flex-1 flex-col items-start gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex size-[38px] items-center justify-center rounded-full bg-navy text-[17px] font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-[0.1em] text-muted">
                    {step.kicker}
                  </span>
                </div>
                <h3 className="max-w-[520px] text-[24px] font-bold leading-[1.18] tracking-[-0.01em] text-ink lg:text-[30px]">
                  {step.title}
                </h3>
                <p className="max-w-[520px] text-[17px] leading-[1.65] text-slate">
                  {step.body}
                </p>
              </div>
              <div className="flex flex-1 justify-center">{step.visual}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-navy px-5 py-14 text-white sm:px-10 lg:px-[100px] lg:py-[88px]">
        <div className="mx-auto flex max-w-[720px] flex-col items-center gap-6 text-center">
          <span className="rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold tracking-[0.1em]">
            {SPOTS.open} OF {SPOTS.total} FOUNDING SPOTS OPEN
          </span>
          <h2 className="text-[32px] font-bold leading-[1.12] tracking-[-0.02em] lg:text-[44px]">
            Join the team building Denver today.
          </h2>
          <p className="text-lg leading-[1.6] text-white/[0.78]">
            {"Sign-up takes about five minutes, and you'll lock in zero fees for a year + exclusive access to the market for 3 months."}
          </p>
          <ClaimButton />
          <p className="text-[13px] text-white/50">
            Bathroom renovations to start · more trades as Denver grows
          </p>
        </div>
      </section>
    </>
  );
}
