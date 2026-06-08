import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "../components/Button";
import CTABand from "../components/CTABand";

export const metadata = {
  title: "Project directory — Estimarket",
  description:
    "Pick your project type and we’ll turn your answers into a contractor-ready brief that pros compete to bid on.",
};

const HERO_TRUST = [
  "No in-home sales visits",
  "Free for homeowners",
  "Itemized bids, side by side",
];

function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy lg:h-[560px]">
      <div className="absolute inset-0">
        <Image
          src="/images/pr-hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0e214b_0%,rgba(36,90,188,0)_58%)]" />
        <div className="absolute inset-0 bg-navy/40 lg:hidden" />
      </div>

      <div className="relative mx-auto flex h-full max-w-[1440px] items-center px-5 sm:px-6 lg:px-[120px]">
        <div className="max-w-[640px] py-16 lg:py-0">
          <p className="text-xs font-bold uppercase tracking-[1.5px] text-[#a8ceff]">
            The Estimarket project directory
          </p>
          <h1 className="mt-3 text-[40px] font-bold leading-[1.04] tracking-[-1px] text-white sm:text-[52px] lg:text-[60px]">
            Whatever you’re building, start with a clear scope.
          </h1>
          <p className="mt-5 max-w-[640px] text-lg leading-relaxed text-white/90">
            Pick your project type. We’ll guide you through a few questions, turn
            your answers into a contractor-ready brief, and put it in front of
            pros who compete for the work.
          </p>
          <div className="mt-8">
            <ButtonLink href="/waitlist/homeowner" className="h-[56px] px-7 text-base">
              Start your project →
            </ButtonLink>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/90">
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

type Category = {
  slug: string;
  label: string;
  blurb: string;
  tags: string[];
  img: string;
};

const CATEGORIES: Category[] = [
  {
    slug: "bathrooms",
    label: "Bathrooms",
    blurb:
      "From a cosmetic refresh to a full gut — showers, vanities, tile, and the plumbing behind it all.",
    tags: ["Shower & tub", "Tile & floors", "Vanity", "Layout"],
    img: "/images/pr-bathrooms.png",
  },
  {
    slug: "kitchens",
    label: "Kitchens",
    blurb:
      "Reface and refresh, or rebuild from the studs — cabinets, counters, backsplash, and layout.",
    tags: ["Cabinets", "Countertops", "Backsplash", "Island"],
    img: "/images/pr-kitchens.png",
  },
  {
    slug: "floors",
    label: "Floors",
    blurb:
      "New floors in one room or the whole house — hardwood, LVP, tile, or carpet.",
    tags: ["Material", "Rooms", "Stairs", "Baseboards"],
    img: "/images/pr-floors.png",
  },
  {
    slug: "windows",
    label: "Windows",
    blurb:
      "Replace drafty, failing windows — full units or glass only — with the right frames and trim.",
    tags: ["Count & style", "Glass", "Frames", "Trim"],
    img: "/images/pr-windows.png",
  },
  {
    slug: "painting",
    label: "Painting",
    blurb:
      "Interior, exterior, or both — walls, ceilings, trim, and cabinets, prepped and finished right.",
    tags: ["Rooms & surfaces", "Finish", "Colors", "Prep"],
    img: "/images/pr-painting.png",
  },
];

function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/projects/${category.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-line transition-shadow hover:shadow-lg"
    >
      <div className="relative h-[200px] w-full">
        <Image
          src={category.img}
          alt={category.label}
          fill
          sizes="(max-width: 768px) 100vw, 360px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent" />
        <h3 className="absolute bottom-3 left-4 text-[22px] font-bold text-white">
          {category.label}
        </h3>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[15px] leading-normal text-slate">{category.blurb}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {category.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[#e8f2ff] px-2.5 py-1 text-xs font-semibold text-marine"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="mt-auto pt-5 text-sm font-bold text-[#245abc]">
          Explore {category.label.toLowerCase()} projects →
        </p>
      </div>
    </Link>
  );
}

function Directory() {
  return (
    <section className="bg-surface px-5 py-20 sm:px-6 lg:px-[120px]">
      <div className="mx-auto max-w-[1280px]">
        <p className="text-xs font-bold uppercase tracking-[1.5px] text-[#245abc]">
          Project types
        </p>
        <h2 className="mt-3 text-3xl font-bold text-ink sm:text-[36px]">
          Five project types, one guided path.
        </h2>
        <p className="mt-4 max-w-[680px] text-lg leading-normal text-slate">
          Each project type asks the questions that matter for that work — so the
          bids you get back are real, comparable, and built on the same scope.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}

          <Link
            href="/contact"
            className="flex flex-col justify-center rounded-xl border border-dashed border-[#a8ceff] bg-[#e8f2ff] p-8 text-center transition-colors hover:bg-[#dcebff]"
          >
            <p className="text-xs font-bold uppercase tracking-[1.5px] text-[#245abc]">
              More coming soon!
            </p>
            <p className="mt-4 text-[15px] leading-normal text-marine">
              If it can be built, we can scope it (probably). More project types
              added every week.
            </p>
            <p className="mt-6 text-sm font-bold text-marine">
              Tell us what you’re planning →
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}

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

function HowItWorks() {
  return (
    <section className="bg-white px-5 py-20 sm:px-6 lg:px-[120px]">
      <div className="mx-auto max-w-[1280px]">
        <p className="text-xs font-bold uppercase tracking-[1.5px] text-[#245abc]">
          How every project works
        </p>
        <h2 className="mt-3 text-3xl font-bold text-ink sm:text-[36px]">
          Describe your dream project. We’ll do the hard part.
        </h2>
        <p className="mt-4 max-w-[680px] text-lg leading-normal text-slate">
          No measuring tape, no fuss, we’ll guide you all the way from idea to a
          fully scoped project.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {HOW_STEPS.map((step) => (
            <div key={step.n} className="rounded-xl border border-line p-7">
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

export default function Page() {
  return (
    <>
      <Hero />
      <Directory />
      <HowItWorks />
      <CTABand role="homeowner" />
    </>
  );
}
