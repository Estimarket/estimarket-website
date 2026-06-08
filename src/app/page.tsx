import Image from "next/image";
import { ButtonLink } from "./components/Button";
import CTABand from "./components/CTABand";

const HERO_PERKS = [
  "Free for homeowners",
  "No site visit required",
  "Bids in 36 hours, avg.",
];

function BidsCard({ className }: { className?: string }) {
  // The source mockup is tall (bids + schedule); we clip to show only the
  // top "side-by-side bids" portion, matching the Figma hero crop.
  return (
    <div
      className={`overflow-hidden rounded-xl bg-white shadow-2xl ${className ?? ""}`}
      style={{ aspectRatio: "984 / 445" }}
    >
      <Image
        src="/images/hero-mockup.png"
        alt="Side-by-side contractor bids"
        width={984}
        height={830}
        priority
        className="h-auto w-full"
      />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy lg:h-[740px]">
      <div className="absolute inset-0">
        <Image
          src="/images/hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Navy gradient: solid on the left, fading to transparent ~70% across */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0e214b_0%,#0e214b_22%,rgba(14,33,75,0.6)_46%,rgba(14,33,75,0)_72%)]" />
        {/* Slight base scrim for mobile readability */}
        <div className="absolute inset-0 bg-navy/35 lg:hidden" />
      </div>

      <div className="relative mx-auto flex h-full max-w-[1440px] items-center px-5 sm:px-6 lg:px-20">
        <div className="max-w-[640px] py-16 lg:py-0">
          <h1 className="text-[40px] font-bold leading-[1.05] text-white sm:text-[56px] lg:text-[64px]">
            The first{" "}
            <span className="underline decoration-2 underline-offset-4">real</span>{" "}
            <span className="font-serif font-normal italic text-accent">
              marketplace
            </span>{" "}
            for home project quotes.
          </h1>
          <p className="mt-6 max-w-[530px] text-lg leading-normal text-[#f3f4f6]">
            Our AI quote builder walks you through your project in 10 minutes.
            Contractors compete. You pick the best bid.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/waitlist/homeowner" className="w-full sm:w-[197px]">
              Start a project →
            </ButtonLink>
            <ButtonLink
              href="/waitlist/contractor"
              variant="ghost"
              className="w-full sm:w-[197px]"
            >
              Find work →
            </ButtonLink>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-white">
            {HERO_PERKS.map((perk) => (
              <li key={perk}>✓&nbsp;&nbsp;{perk}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Floating product cards (desktop) */}
      <div className="pointer-events-none absolute inset-0 z-10 hidden lg:block">
        <div className="relative mx-auto h-full max-w-[1440px]">
          <Image
            src="/images/hero-card-brief.png"
            alt="Project brief preview"
            width={454}
            height={288}
            priority
            className="absolute left-[68.5%] top-[207px] w-[31.5%] drop-shadow-2xl"
          />
          <BidsCard className="absolute left-[46.4%] top-[489px] w-[33.2%]" />
        </div>
      </div>

    </section>
  );
}

type Stat = { value: string; label: string };

function StatRow({ stats }: { stats: Stat[] }) {
  return (
    <div className="mt-6 flex gap-10">
      {stats.map((s) => (
        <div key={s.label}>
          <p className="text-[28px] font-bold leading-none text-navy">{s.value}</p>
          <p className="mt-2 max-w-[120px] text-xs leading-snug text-muted">
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
}

function Badge({ tone, children }: { tone: "homeowner" | "contractor"; children: string }) {
  return (
    <span
      className={`inline-block rounded-md px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white ${
        tone === "homeowner" ? "bg-accent" : "bg-navy"
      }`}
    >
      {children}
    </span>
  );
}

function WhyEstimarket() {
  return (
    <section className="bg-white px-5 py-20 sm:px-6 lg:px-20">
      <div className="mx-auto max-w-[1280px]">
        <p className="text-center text-[13px] font-bold uppercase tracking-[2px] text-accent">
          Why Estimarket?
        </p>

        {/* Problem */}
        <h2 className="mx-auto mt-4 max-w-[900px] text-center text-3xl font-bold leading-tight text-navy sm:text-[42px]">
          The home project quote process is{" "}
          <span className="font-serif font-normal italic text-accent">broken</span>{" "}
          on both sides.
        </h2>

        <div className="relative mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-line bg-surface p-8">
            <Badge tone="homeowner">Homeowners</Badge>
            <h3 className="mt-4 text-xl font-bold text-navy">
              Sitting through 3-5 in-home quotes, and still overpaying by
              thousands.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Three quotes, three evenings getting pressure sold in your home.
              And did those quotes really represent the market?
            </p>
            <StatRow
              stats={[
                { value: "3–5", label: "weeks of gathering quotes" },
                { value: "78%", label: "over budget on renovation" },
              ]}
            />
          </div>

          <div className="rounded-2xl border border-line bg-surface p-8">
            <Badge tone="contractor">Contractors</Badge>
            <h3 className="mt-4 text-xl font-bold text-navy">
              Overpaying for leads and providing in-home estimates that go
              nowhere.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Lead platforms benefit from you competing for low-quality leads,
              while your cost of doing business goes up.
            </p>
            <StatRow
              stats={[
                { value: "$300–$2.5k", label: "per month on lead platforms" },
                { value: "10–25%", label: "typical close rate" },
              ]}
            />
          </div>
        </div>

        {/* Solution */}
        <h2 className="mx-auto mt-20 max-w-[900px] text-center text-3xl font-bold leading-tight text-navy sm:text-[42px]">
          Our marketplace is designed to{" "}
          <span className="font-serif font-normal italic text-accent">fix it</span>{" "}
          for everyone.
        </h2>

        <div className="relative mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl bg-[#fff5ef] p-8">
            <Badge tone="homeowner">Homeowners</Badge>
            <h3 className="mt-4 text-xl font-bold text-navy">
              Share your project details once and ensure you get a good deal.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate">
              Sharing the same project details to contractors in an open market
              saves time and ensures you get a fair deal.
            </p>
            <StatRow
              stats={[
                { value: "3–5", label: "weeks to get comparable quotes" },
                { value: "78%", label: "over budget on renovation" },
              ]}
            />
          </div>

          <div className="rounded-2xl bg-[#eaf2fb] p-8">
            <Badge tone="contractor">Contractors</Badge>
            <h3 className="mt-4 text-xl font-bold text-navy">
              Bid from <span className="text-accent">anywhere</span>, and{" "}
              <span className="text-accent">never</span> pay for leads.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate">
              Cutting out lead platforms and completing simple estimates from
              your office lowers the cost of winning new work.
            </p>
            <StatRow
              stats={[
                { value: "$300–$2.5k", label: "per month on lead platforms" },
                { value: "10–25%", label: "typical close rate" },
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

type Step = {
  n: string;
  tone: "homeowner" | "contractor";
  kicker: string;
  title: string;
  body: string;
  chip: string;
  img: string;
  w: number;
  h: number;
};

const STEPS: Step[] = [
  {
    n: "1",
    tone: "homeowner",
    kicker: "Build your scope",
    title: "Homeowners describe their project, and we scope it out.",
    body: "Answer a few guided questions and snap some photos. Estimarket turns it into an estimator-quality brief — itemized labor, measurements, and materials list — the same scope a pro would write after a site visit.",
    chip: "Homeowners save hours of extra visits",
    img: "/images/hiw-step1.png",
    w: 900,
    h: 1024,
  },
  {
    n: "2",
    tone: "contractor",
    kicker: "The marketplace",
    title: "Projects are posted to an open marketplace for contractors in the area.",
    body: "Your structured scope goes live for qualified contractors who match your trade and service area. Homeowner personal information is protected as you go.",
    chip: "Live: accepting bids",
    img: "/images/hiw-step2.png",
    w: 1024,
    h: 985,
  },
  {
    n: "3",
    tone: "homeowner",
    kicker: "Contractors bid",
    title: "Contractors review and bid – without a home visit.",
    body: "Pros review the entire scope and submit a labor-only bid that includes questions or callouts for TBD items. Bid on all labor items or just share a daily labor rate. Bids are always a range, never a commitment to an exact price.",
    chip: "Contractors don’t pay to bid, and save a site visit",
    img: "/images/hiw-step3.png",
    w: 1024,
    h: 804,
  },
  {
    n: "4",
    tone: "contractor",
    kicker: "Compare and choose",
    title: "Homeowners compare bids side by side and choose their favorite.",
    body: "Every bid lands in one place, itemized and normalized. Compare across price, rating, or start date at a glance — then pick the one that fits best with your needs.",
    chip: "Homeowners see what their project should cost",
    img: "/images/hiw-step4.png",
    w: 1024,
    h: 986,
  },
  {
    n: "5",
    tone: "homeowner",
    kicker: "Final walkthrough",
    title: "Meet for a walkthrough to finalize the project and get to work.",
    body: "Schedule one walkthrough — now the homeowner and contractor review the bid details in person, lock the scope and start date, and move forward with the work. One visit, real numbers, done.",
    chip: "Both: on-site, in person",
    img: "/images/hiw-step5.png",
    w: 891,
    h: 1024,
  },
];

function HowItWorks() {
  return (
    <section className="bg-white px-5 py-20 sm:px-6 lg:px-20">
      <div className="mx-auto max-w-[1280px]">
        <p className="text-center text-[13px] font-bold uppercase tracking-[2px] text-accent">
          How it works
        </p>
        <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-[840px] text-3xl font-bold leading-tight text-navy sm:text-[42px]">
            Estimarket puts homeowners and contractors on the{" "}
            <span className="font-serif font-normal italic text-marine">
              same page.
            </span>
          </h2>
          <p className="max-w-[360px] text-sm leading-relaxed text-muted">
            Five steps from a homeowner’s idea to ready-to-start work — no site
            visits, no “I-you” quotes.
          </p>
        </div>

        <div className="mt-16 flex flex-col gap-16">
          {STEPS.map((step) => (
            <div
              key={step.n}
              className="grid grid-cols-1 items-center gap-8 border-t border-line pt-12 lg:grid-cols-2 lg:gap-16"
            >
              <div className={step.tone === "contractor" ? "lg:order-2" : ""}>
                <span
                  className={`text-5xl font-bold ${
                    step.tone === "homeowner" ? "text-accent" : "text-navy"
                  }`}
                >
                  {step.n}
                </span>
                <p className="mt-2 text-[11px] font-bold uppercase tracking-[2px] text-muted">
                  {step.kicker}
                </p>
                <h3 className="mt-3 text-2xl font-bold leading-snug text-navy">
                  {step.title}
                </h3>
                <p className="mt-4 max-w-[480px] text-sm leading-relaxed text-muted">
                  {step.body}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2 text-xs font-medium text-slate">
                  <span className="size-1.5 rounded-full bg-accent" />
                  {step.chip}
                </span>
              </div>

              <div
                className={`flex justify-center ${
                  step.tone === "contractor" ? "lg:order-1" : ""
                }`}
              >
                <Image
                  src={step.img}
                  alt=""
                  width={step.w}
                  height={step.h}
                  className="h-auto w-full max-w-[560px]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <WhyEstimarket />
      <HowItWorks />
      <CTABand role="homeowner" />
    </>
  );
}
