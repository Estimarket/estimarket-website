import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "../../components/Button";
import CTABand from "../../components/CTABand";

type CategoryContent = {
  name: string;
  heroPhoto: string;
  heroH1: string;
  heroSub: string;
  heroCta: string;
  overviewH2: string;
  overviewBody: string;
  overviewMedia: string;
  ticks: string[];
  howH2: string;
};

const CATEGORY_DATA: Record<string, CategoryContent> = {
  bathrooms: {
    name: "Bathrooms",
    heroPhoto: "/images/cat-bathrooms-hero.png",
    heroH1: "Your bathroom remodel, scoped right the first time.",
    heroSub:
      "Tell us about your shower, vanity, tile, and the work behind the walls. We’ll turn it into a contractor-ready brief — and the bids come to you.",
    heroCta: "Start your bathroom project →",
    overviewH2: "From a leaky tub surround to a finished, comparable bid.",
    overviewBody:
      "Estimarket asks what you’re keeping and what you’re changing, writes an itemized scope and a materials list you can edit — then contractors bid on that exact scope.",
    overviewMedia: "/images/cat-bathrooms-media.png",
    ticks: [
      "Separate a cosmetic refresh from a full gut so scope matches your budget.",
      "Guided prompts cover the things that drive cost — waterproofing, plumbing moves, and tile.",
      "Review the generated brief, adjust anything, then publish to local pros.",
      "Bids arrive itemized and side by side — no sales pitches in your living room.",
    ],
    howH2: "Describe your bathroom project once. We’ll take care of the rest.",
  },
  kitchens: {
    name: "Kitchens",
    heroPhoto: "/images/cat-kitchens-hero.png",
    heroH1: "Your kitchen remodel, priced on a real scope.",
    heroSub:
      "Cabinets, countertops, backsplash, layout — tell us once. We build the brief and contractors bid on the same plan, itemized and comparable.",
    heroCta: "Start your kitchen project →",
    overviewH2: "The kitchen has the most moving parts. We keep them straight.",
    overviewBody:
      "A kitchen project touches cabinets, counters, surfaces, appliances, and sometimes the layout. Estimarket walks you through each piece, assembles an itemized scope so every contractor bids on the same kitchen.",
    overviewMedia: "/images/cat-kitchens-media.png",
    ticks: [
      "Separate a reface-and-refresh from a full gut with layout changes.",
      "Guided prompts capture cabinet, counter, and backsplash choices in material-level detail.",
      "Layout, plumbing, and electrical moves are scoped up front for accurate permitting.",
      "Compare itemized bids side by side and choose the one that fits.",
    ],
    howH2: "Describe your kitchen project once. We’ll take care of the rest.",
  },
  floors: {
    name: "Floors",
    heroPhoto: "/images/cat-floors-hero.png",
    heroH1: "New floors, measured and scoped before the first bid.",
    heroSub:
      "One room or the whole house — hardwood, LVP, tile, or carpet. Tell us the rooms and the material, and contractors bid on the same square footage.",
    heroCta: "Start your floor project →",
    overviewH2: "Floors are mostly about material, area, and prep.",
    overviewBody:
      "A floor project comes down to which rooms, which material, and what’s underneath. Estimarket captures your material choice and accounts for demo, subfloor, baseboards, and transitions.",
    overviewMedia: "/images/cat-floors-media.png",
    ticks: [
      "Separate a full replacement from a repair or refinish.",
      "Material-specific prompts cover plank width, finish, and installation method.",
      "Stairs, baseboards, and room-to-room transitions are scoped, not assumed.",
      "Contractors bid on the same rooms and square footage — easy to compare.",
    ],
    howH2: "Describe your floors project once. We’ll take care of the rest.",
  },
  windows: {
    name: "Windows",
    heroPhoto: "/images/cat-windows-hero.png",
    heroH1: "Replace drafty windows with the right units and glass.",
    heroSub:
      "Full units or glass only. Tell us how many, what style, and how efficient — contractors bid on the same window package, itemized per unit.",
    heroCta: "Start your window project →",
    overviewH2: "Windows price per unit — count, style, glass, and frame.",
    overviewBody:
      "A window project is about how many windows, what type, and how they’re built. Estimarket captures your count and styles, the glass and frame spec, and any trim or egress work.",
    overviewMedia: "/images/cat-windows-media.png",
    ticks: [
      "Separate full unit replacement from glass-only work.",
      "Guided prompts cover style, glass efficiency, frame material, and grids.",
      "Interior finishing, exterior trim, and egress compliance are scoped explicitly.",
      "Bids come back priced per unit and side by side — easy to compare.",
    ],
    howH2: "Describe your windows project once. We’ll take care of the rest.",
  },
  painting: {
    name: "Painting",
    heroPhoto: "/images/cat-painting-hero.png",
    heroH1: "Interior, exterior, or both — painted on a clear scope.",
    heroSub:
      "Tell us the rooms or surfaces, the prep, and the finish. We build the brief, and painters bid on the same square footage and condition.",
    heroCta: "Start your painting project →",
    overviewH2: "Most of a paint bid is prep, surfaces, and area.",
    overviewBody:
      "A painting project depends on what gets painted, how much prep the surfaces need, and the finish you choose. Estimarket captures rooms or exterior surfaces, condition, and prep work so painters bid on the real job.",
    overviewMedia: "/images/cat-painting-media.png",
    ticks: [
      "Sort interior, exterior, or both and ask the right follow-ups.",
      "Guided prompts cover surfaces, ceiling height, sheen, and color count.",
      "Prep and condition — patching, wallpaper, popcorn, lead concerns — are scoped up front.",
      "Painters bid on the same scope and condition — easy to compare.",
    ],
    howH2: "Describe your painting project once. We’ll take care of the rest.",
  },
};

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(CATEGORY_DATA).map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const data = CATEGORY_DATA[category];
  if (!data) return {};
  return {
    title: `${data.name} projects — Estimarket`,
    description: data.heroSub,
  };
}

const HERO_TRUST = [
  "About 10 minutes to build",
  "No in-home sales visits",
  "Free & no obligation",
];

const HOW_STEPS = [
  {
    n: "1",
    title: "Answer a few questions",
    body: "Describe your project, take some photos or video, and watch us work our magic, all in just a few minutes.",
  },
  {
    n: "2",
    title: "We build your brief",
    body: "Your answers become an itemized scope of work and materials list. Review and edit it before anything goes live.",
  },
  {
    n: "3",
    title: "List it on the marketplace",
    body: "Local pros bid on the same brief — no site visits required. You compare itemized bids side by side and choose.",
  },
];

function Hero({ data }: { data: CategoryContent }) {
  return (
    <section className="relative overflow-hidden bg-navy lg:h-[500px]">
      <div className="absolute inset-0">
        <Image
          src={data.heroPhoto}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0e214b_0%,rgba(36,90,188,0)_62%)]" />
        <div className="absolute inset-0 bg-navy/40 lg:hidden" />
      </div>

      <div className="relative mx-auto flex h-full max-w-[1440px] items-center px-5 sm:px-6 lg:px-[120px]">
        <div className="max-w-[640px] py-16 lg:py-0">
          <p className="text-xs font-semibold text-white/85">
            <Link href="/projects" className="hover:underline">
              Projects
            </Link>{" "}
            / {data.name}
          </p>
          <h1 className="mt-4 text-[36px] font-bold leading-[1.08] text-white sm:text-[48px] lg:text-[56px]">
            {data.heroH1}
          </h1>
          <p className="mt-5 max-w-[620px] text-lg leading-relaxed text-white/90">
            {data.heroSub}
          </p>
          <div className="mt-7">
            <ButtonLink
              href="/waitlist/homeowner"
              className="h-[56px] px-7 text-base"
            >
              {data.heroCta}
            </ButtonLink>
          </div>
          <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/90">
            {HERO_TRUST.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="size-[7px] rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Overview({ data }: { data: CategoryContent }) {
  return (
    <section className="bg-white px-5 py-20 sm:px-6 lg:px-[120px]">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
        <div>
          <p className="text-xs font-bold uppercase tracking-[1.5px] text-[#245abc]">
            What to expect
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-ink sm:text-[34px]">
            {data.overviewH2}
          </h2>
          <p className="mt-5 text-lg leading-normal text-slate">
            {data.overviewBody}
          </p>
          <ul className="mt-8 flex flex-col gap-4">
            {data.ticks.map((tick) => (
              <li key={tick} className="flex gap-3">
                <span className="flex size-[22px] shrink-0 items-center justify-center rounded-[7px] bg-[#dcfce7] text-xs font-bold text-[#166534]">
                  ✓
                </span>
                <span className="text-[15px] leading-normal text-slate">
                  {tick}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative aspect-[480/380] w-full overflow-hidden rounded-2xl">
          <Image
            src={data.overviewMedia}
            alt={`${data.name} project`}
            fill
            sizes="(max-width: 1024px) 100vw, 480px"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}

function HowItWorks({ data }: { data: CategoryContent }) {
  return (
    <section className="bg-surface px-5 py-20 sm:px-6 lg:px-[120px]">
      <div className="mx-auto max-w-[1280px]">
        <p className="text-xs font-bold uppercase tracking-[1.5px] text-[#245abc]">
          How every project works
        </p>
        <h2 className="mt-3 max-w-[1000px] text-3xl font-bold text-ink sm:text-[36px]">
          {data.howH2}
        </h2>
        <p className="mt-4 max-w-[680px] text-lg leading-normal text-slate">
          No measuring tape, no fuss, we’ll guide you all the way from idea to a
          fully scoped project.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {HOW_STEPS.map((step) => (
            <div
              key={step.n}
              className="rounded-2xl border border-line bg-white p-7"
            >
              <span className="flex size-10 items-center justify-center rounded-full bg-[#e8f2ff] text-sm font-bold text-marine">
                {step.n}
              </span>
              <h3 className="mt-4 text-xl font-bold text-ink">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const data = CATEGORY_DATA[category];
  if (!data) notFound();

  return (
    <>
      <Hero data={data} />
      <Overview data={data} />
      <HowItWorks data={data} />
      <CTABand role="homeowner" />
    </>
  );
}
