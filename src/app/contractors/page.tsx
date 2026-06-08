import Image from "next/image";
import { ButtonLink } from "../components/Button";
import CTABand from "../components/CTABand";
import PricingCards from "../components/PricingCards";

export const metadata = {
  title: "For contractors — Estimarket",
  description:
    "Bid on professional-quality project scopes from homeowners in your area. Never pay for leads.",
};

const HERO_PERKS = [
  "Never pay for leads",
  "Compete on price and quality",
  "No more free in-home estimates",
];

function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy lg:h-[640px]">
      <div className="absolute inset-0">
        <Image
          src="/images/co-hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0e214b_0%,rgba(36,90,188,0)_72%)]" />
        <div className="absolute inset-0 bg-navy/40 lg:hidden" />
      </div>

      <div className="relative mx-auto flex h-full max-w-[1440px] items-center px-5 sm:px-6 lg:px-20">
        <div className="max-w-[620px] py-16 lg:py-0">
          <h1 className="text-[40px] font-bold leading-[1.08] text-white sm:text-[56px] lg:text-[64px]">
            A more{" "}
            <span className="font-serif font-normal italic text-brand">
              affordable
            </span>{" "}
            way to grow your contracting business.
          </h1>
          <p className="mt-6 max-w-[605px] text-lg leading-relaxed text-[#bfd1e8]">
            Submit ballpark bids on professional quality project scopes from
            homeowners in your area. Only make site visits to finalize details
            and start the work.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink
              href="/waitlist/contractor"
              className="w-full sm:w-[220px]"
            >
              Sign-up today →
            </ButtonLink>
            <ButtonLink href="#how" variant="ghost" className="w-full sm:w-[186px]">
              See how it works
            </ButtonLink>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-white/90">
            {HERO_PERKS.map((perk) => (
              <li key={perk}>✓&nbsp;&nbsp;{perk}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-10 hidden lg:block">
        <div className="relative mx-auto h-full max-w-[1440px]">
          <Image
            src="/images/co-hero-card.png"
            alt="Project inbox with matching projects"
            width={1200}
            height={920}
            priority
            className="absolute left-[61.9%] top-[233px] w-[32.7%] drop-shadow-2xl"
          />
          <span className="absolute left-[84.3%] top-[177px] rounded-full bg-[#16a34a] px-5 py-3.5 text-base font-bold text-white shadow-lg">
            Bid won +$37,850
          </span>
          <span className="absolute left-[56.25%] top-[550px] rounded-full bg-accent px-5 py-3.5 text-base font-bold text-white shadow-lg">
            New matching project in your area
          </span>
        </div>
      </div>
    </section>
  );
}

const PROBLEM_CARDS = [
  {
    big: "~70%",
    bold: "of free in-home estimates go nowhere",
    desc: "Homeowners use contractors for free quotes, then ghost.",
  },
  {
    big: "90+ mins",
    bold: "wasted on every dead-end in-home estimate",
    desc: "Time you can’t bill — and can’t get back.",
  },
  {
    big: "$$$",
    bold: "to pay for directory websites for leads",
    desc: "Often the same lead is sent to 4 or more contractors, and you still get charged.",
  },
];

function Problem() {
  return (
    <section className="bg-white px-5 py-20 sm:px-6 lg:px-20">
      <div className="mx-auto max-w-[1280px]">
        <p className="text-center text-[13px] font-bold uppercase tracking-[2px] text-accent">
          The problem
        </p>
        <h2 className="mx-auto mt-3 max-w-[900px] text-center text-3xl font-bold leading-tight text-navy sm:text-[40px]">
          Dead-end leads waste your{" "}
          <span className="text-accent">time</span> and{" "}
          <span className="text-accent">money</span>.
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {PROBLEM_CARDS.map((card) => (
            <div key={card.big} className="rounded-2xl bg-surface p-8">
              <p className="text-center text-4xl font-bold text-accent">
                {card.big}
              </p>
              <p className="mt-4 text-sm font-bold text-navy">{card.bold}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const SOLUTION_POINTS = [
  "Cut out pay per lead services. Pay one low monthly fee for marketplace access.",
  "Review estimator-quality project overviews and submit bids from anywhere, instead of driving across town for a site visit.",
  "See customer budgets up front and get the hardest part — pricing — out of the way.",
  "Only make in-home visits once you and a customer have already agreed on cost and rough details.",
];

function Solution() {
  return (
    <section className="bg-white px-5 pb-20 sm:px-6 lg:px-20">
      <div className="mx-auto max-w-[1280px]">
        <p className="text-center text-[13px] font-bold uppercase tracking-[2px] text-marine">
          The solution
        </p>
        <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start lg:gap-20">
          <h2 className="text-3xl font-bold leading-tight text-navy sm:text-[40px]">
            Join Estimarket and bid directly on professional quality project
            scopes from homeowners in your area.
          </h2>
          <ul className="flex flex-col gap-6">
            {SOLUTION_POINTS.map((point, i) => (
              <li key={point} className="flex gap-4">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-marine text-xs font-bold text-white">
                  {i + 1}
                </span>
                <p className="text-sm leading-relaxed text-navy">{point}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Callout() {
  return (
    <section className="bg-accent px-5 py-10 sm:px-6 lg:px-20">
      <div className="relative mx-auto flex max-w-[1280px] flex-col items-center gap-4 text-center lg:gap-3">
        <p className="text-[11px] font-bold uppercase tracking-[1.1px] text-white">
          From the blog:
        </p>
        <h2 className="font-serif text-3xl text-white sm:text-[36px]">
          “The Lead Quality Trap”
        </h2>
        <p className="max-w-[907px] text-[15px] italic leading-normal text-white/90">
          Why lead services like Thumbtack and Angi cost more than they seem —
          and why scaling your sales team isn’t the answer.
        </p>
        <ButtonLink
          href="/resources"
          variant="marine"
          className="mt-2 lg:absolute lg:right-0 lg:top-1/2 lg:mt-0 lg:-translate-y-1/2"
        >
          Read the article →
        </ButtonLink>
      </div>
    </section>
  );
}

type HowStep = {
  n: string;
  kicker: string;
  title: string;
  body: string;
  bullets: { lead: string; desc: string }[];
  img: string;
  w: number;
  h: number;
  imageRight: boolean;
  shaded?: boolean;
};

const HOW_STEPS: HowStep[] = [
  {
    n: "01",
    kicker: "Browse the marketplace",
    title:
      "Browse professional quality project scopes from homeowners in your area",
    body: "Our marketplace lists home projects from homeowners in your area. Search and filter by trade, area, budget, and start date.",
    bullets: [
      {
        lead: "Line items for all the labor required",
        desc: "Project spec confirmed by Estimarket.",
      },
      {
        lead: "Photos and dimension estimates",
        desc: "Real site photos, not stock images.",
      },
      {
        lead: "Materials list for homeowner to buy",
        desc: "See the homeowner’s range before bidding.",
      },
      {
        lead: "TBD lines flagged",
        desc: "Know what’s undecided before you price it.",
      },
    ],
    img: "/images/co-step1.png",
    w: 644,
    h: 484,
    imageRight: true,
  },
  {
    n: "02",
    kicker: "Submit your bid",
    title: "Submit a ballpark bid for the project",
    body: "Fill in the line items you know, flag the ones that need a site visit as TBD allowances, and submit. Homeowners get a transparent bid — you get a sense of the work and the customer’s budget up front.",
    bullets: [
      {
        lead: "Line-itemized",
        desc: "Scope-matched rows, not a single lump sum.",
      },
      { lead: "TBD allowances", desc: "Flag uncertain items with a range." },
      { lead: "Budget meter", desc: "See if your bid fits before you submit." },
      {
        lead: "Direct contact on acceptance",
        desc: "No intermediary once they choose you.",
      },
    ],
    img: "/images/co-step2.png",
    w: 644,
    h: 484,
    imageRight: false,
    shaded: true,
  },
  {
    n: "03",
    kicker: "Match and close",
    title: "Match, confirm details, and close.",
    body: "When a homeowner picks your bid, they’ll schedule an in-home visit with you so you can confirm any TBD items in person, and finalize the project with your own standard process and agreements.",
    bullets: [
      {
        lead: "Built-in scheduler",
        desc: "Share your availability for a walkthrough slot in one click.",
      },
      {
        lead: "Lock the TBDs",
        desc: "Confirm allowances and finishes on-site.",
      },
      {
        lead: "Close your way",
        desc: "Keep your own contracts and payment process for starting the work.",
      },
    ],
    img: "/images/co-step3.png",
    w: 624,
    h: 440,
    imageRight: true,
  },
];

function StepText({ step }: { step: HowStep }) {
  return (
    <div className={step.imageRight ? "" : "lg:order-2"}>
      <div className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-xl bg-surface text-sm font-bold text-marine">
          {step.n}
        </span>
        <span className="text-[13px] font-semibold text-muted">
          {step.kicker}
        </span>
      </div>
      <h3 className="mt-4 text-2xl font-bold leading-snug text-navy sm:text-3xl">
        {step.title}
      </h3>
      <p className="mt-4 max-w-[600px] text-sm leading-relaxed text-muted">
        {step.body}
      </p>
      <ul className="mt-6 flex flex-col gap-3">
        {step.bullets.map((b) => (
          <li key={b.lead} className="flex gap-3 text-sm leading-relaxed">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
            <span className="text-slate">
              <span className="font-semibold text-navy">{b.lead}</span> — {b.desc}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-[120px] bg-white py-20">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-20">
        <p className="text-center text-[13px] font-bold uppercase tracking-[2px] text-marine">
          How it works
        </p>
        <h2 className="mx-auto mt-3 max-w-[900px] text-center text-3xl font-bold leading-tight text-navy sm:text-[40px]">
          A low cost way to grow your business
        </h2>
        <p className="mx-auto mt-4 max-w-[760px] text-center text-sm leading-relaxed text-muted">
          Every project on Estimarket is scoped, photographed, and budgeted
          before it reaches your inbox — so you can bid quickly and accurately,
          even on projects with one or two TBD line items.
        </p>
      </div>

      <div className="mt-12 flex flex-col">
        {HOW_STEPS.map((step) => (
          <div
            key={step.n}
            className={step.shaded ? "bg-[#f5f7fb] py-12" : "py-12"}
          >
            <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 px-5 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-20">
              <StepText step={step} />
              <div className={step.imageRight ? "" : "lg:order-1"}>
                <Image
                  src={step.img}
                  alt=""
                  width={step.w}
                  height={step.h}
                  className="h-auto w-full drop-shadow-xl"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <ButtonLink href="/waitlist/contractor" variant="secondary">
          Create your free account →
        </ButtonLink>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section className="bg-surface px-5 py-20 sm:px-6 lg:px-20">
      <div className="mx-auto max-w-[1280px]">
        <p className="text-center text-[13px] font-bold uppercase tracking-[2px] text-accent">
          Pricing
        </p>
        <h2 className="mx-auto mt-3 max-w-[820px] text-center text-3xl font-bold leading-tight text-navy sm:text-[44px]">
          One flat monthly fee.{" "}
          <span className="text-accent">
            Never pay per project. Never pay for leads.
          </span>
        </h2>

        <PricingCards />

        <div className="mx-auto mt-14 max-w-[1280px] border-t border-line pt-8">
          <p className="text-center text-sm text-slate">
            <span className="font-semibold text-navy">
              Refer a paying contractor
            </span>{" "}
            — earn one free month on your current plan.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <>
      <Hero />
      <Problem />
      <Solution />
      <Callout />
      <HowItWorks />
      <Pricing />
      <CTABand role="contractor" />
    </>
  );
}
