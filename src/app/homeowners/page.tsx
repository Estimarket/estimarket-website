import Image from "next/image";
import { ButtonLink } from "../components/Button";
import CTABand from "../components/CTABand";

export const metadata = {
  title: "For homeowners — Estimarket",
  description:
    "List your home project on Estimarket and get itemized bids from local contractors — no in-home sales visits.",
};

const HERO_PERKS = [
  "Free for homeowners",
  "No more f-you quotes",
  "Bids in 36 hours, avg.",
];

function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy lg:h-[740px]">
      <div className="absolute inset-0">
        <Image
          src="/images/ho-hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0e214b_0%,rgba(36,90,188,0)_56%)]" />
        <div className="absolute inset-0 bg-navy/35 lg:hidden" />
      </div>

      <div className="relative mx-auto flex h-full max-w-[1440px] items-center px-5 sm:px-6 lg:px-20">
        <div className="max-w-[560px] py-16 lg:py-0">
          <h1 className="text-[40px] font-bold leading-[1.05] text-white sm:text-[56px] lg:text-[64px]">
            The{" "}
            <span className="font-serif font-normal italic text-accent">best</span>{" "}
            way to get quotes for your home project.
          </h1>
          <p className="mt-6 max-w-[530px] text-lg leading-normal text-white">
            We’ll ask a few questions about your project, automatically build you
            a professional scope, and post it on a marketplace of contractors
            waiting to bid.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/waitlist/homeowner" className="w-full sm:w-[226px]">
              List your project →
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
            src="/images/ho-hero-card.png"
            alt="Side-by-side bids and walkthrough scheduling"
            width={1248}
            height={1324}
            priority
            className="absolute left-[53.8%] top-[78px] w-[43.3%] drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}

const PROBLEM_CARDS = [
  { big: "3-5 quotes", small: "doesn’t keep you from getting ripped off." },
  {
    big: "Hours wasted.",
    small: "on every free in-home estimate turned pressure sell.",
  },
  {
    big: "F-you quotes.",
    small:
      "The quote with the ridiculously high price tag from the contractor who didn’t really want the job.",
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
          Homeowners are getting{" "}
          <span className="text-accent">screwed</span> by the home quote process.
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {PROBLEM_CARDS.map((card) => (
            <div key={card.big} className="rounded-2xl bg-surface p-8">
              <p className="text-3xl font-bold text-accent">{card.big}</p>
              <p className="mt-3 text-sm leading-relaxed text-navy">
                {card.small}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const SOLUTION_POINTS = [
  "You simply answer a few questions about your project, and we automatically turn it into a professional quality scope.",
  "Your project scope gets posted to a marketplace of contractors ready to bid.",
  "As bids come in for your project, you can compare, ask questions, and sort them by the factors most important to you.",
  "Pick a contractor and bid for a final walkthrough, sign and get moving on your dream project.",
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
            List your home project on our marketplace and watch the bids roll in
            from your couch.
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
    <section className="bg-[#142e61] px-5 py-10 sm:px-6 lg:px-20">
      <div className="relative mx-auto flex max-w-[1280px] flex-col items-center gap-5 text-center lg:gap-3">
        <p className="text-[11px] font-bold uppercase tracking-[1.1px] text-white">
          From the blog:
        </p>
        <h2 className="font-serif text-3xl text-white sm:text-[36px]">
          “The Real Cost of Getting Quotes”
        </h2>
        <p className="max-w-[907px] text-[15px] italic leading-normal text-white/90">
          A look at the structural reasons the home improvement market is hard to
          shop, and how it makes renovation less affordable.
        </p>
        <ButtonLink
          href="/resources"
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
  bullets: string[];
  img: string;
  w: number;
  h: number;
  imageRight: boolean;
  shaded?: boolean;
};

const HOW_STEPS: HowStep[] = [
  {
    n: "01",
    kicker: "Describe your project",
    title: "You answer some questions, we work our magic.",
    body: "Photos, measurements, must-haves, budget range. Guided prompts walk you through it in about 10 minutes — the brief you’d normally repeat five times in person, written once.",
    bullets: [
      "Guided scope builder — step-by-step prompts so nothing important gets missed.",
      "No measuring tape needed. Just scan your project and snap photos.",
      "Not sure about something? Mark it TBD — contractors can still quote an allowance for the item.",
    ],
    img: "/images/ho-step1.png",
    w: 624,
    h: 448,
    imageRight: true,
  },
  {
    n: "02",
    kicker: "Contractors bid",
    title: "List your project on the marketplace and start receiving bids.",
    body: "Local pros review your full brief and submit itemized bids on the exact scope you posted. No surprise upcharges, no sales visits — just real prices from contractors who actually want the work.",
    bullets: [
      "Apples to apples — every contractor bids on the same scope, so totals are directly comparable.",
      "No site visits required — bids come from your project listing, not from an hour at your kitchen table.",
      "Side-by-side line items — drill into demo, materials, labor; see which bid is doing the work.",
    ],
    img: "/images/ho-step2.png",
    w: 624,
    h: 521,
    imageRight: false,
    shaded: true,
  },
  {
    n: "03",
    kicker: "Pick the best bid",
    title: "Pick a contractor and move forward with peace of mind on the price.",
    body: "Once you’ve decided on a bid, you’ll schedule a walkthrough with the pro you picked — all with the price conversation out of the way.",
    bullets: [
      "Messaging right in the app — ask contractors questions; no phone tag or inbox blowing up.",
      "Schedule one walkthrough — pick a slot with the pro you’ve chosen and confirm allowances.",
      "Sign and start — contract, deposit, and start date all from the project page.",
    ],
    img: "/images/ho-step3.png",
    w: 624,
    h: 594,
    imageRight: true,
  },
];

function StepText({ step }: { step: HowStep }) {
  return (
    <div className={step.imageRight ? "" : "lg:order-2"}>
      <div className="flex items-center gap-3">
        <span className="flex size-8 items-center justify-center rounded-full bg-navy text-xs font-bold text-white">
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
          <li key={b} className="flex gap-3 text-sm leading-relaxed text-slate">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-[112px] bg-white py-20">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-20">
        <p className="text-center text-[13px] font-bold uppercase tracking-[2px] text-marine">
          How it works
        </p>
        <h2 className="mx-auto mt-3 max-w-[900px] text-center text-3xl font-bold leading-tight text-navy sm:text-[40px]">
          Find the best deal for your{" "}
          <span className="font-serif font-normal italic text-marine">
            dream project
          </span>
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
        <ButtonLink href="/waitlist/homeowner" variant="secondary">
          Create your free account →
        </ButtonLink>
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
      <CTABand role="homeowner" />
    </>
  );
}
