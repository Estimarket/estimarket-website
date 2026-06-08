import Image from "next/image";
import CTABand from "../components/CTABand";
import NominateCity from "../components/NominateCity";

export const metadata = {
  title: "About — Estimarket",
  description:
    "Our mission: fix the cracked foundation of the home improvement industry with a real marketplace where both sides win.",
};

const STORY = [
  "The idea for Estimarket started when my wife and I purchased a century-old fixer-upper home in the West Highlands neighborhood of Denver, CO. We chipped away at renovations for years, dreading the hiring process more each time.",
  "We dealt with many salespeople who only asked a few basic questions about our project, took some measurements and photos, and then spent the rest of their time on a high-pressure sales pitch.",
  "We got sick of the long evenings of salespeople bad-mouthing competitors, the pressure of sign-today deals, and the theatrics of high-tech props like mini-windows and blowtorches.",
  "We were baffled by quotes ranging from $15,000 to a very “f-you” $52,000 to renovate our small bathroom — including one from an estimator who proudly informed me they “don’t do tile work,” despite the tile shower specified in the quote request.",
  "Worse than the quote process itself was when a subcontractor doing the actual work on our bathroom mentioned that if they had been hired directly, they would have charged much less. We loved the final product, but I suspected we might have been ripped off.",
  "I started to imagine ways technology could help homeowners actually get a good deal on their project. I wondered why it was so hard to get a sense of the real cost of a project — and who was benefitting from that.",
  "As I dug deeper, I found that many contractors were just as fed up as I was. They were sick of competing for low-quality leads on contractor aggregator sites, and the burden of providing free estimates for those leads. It became obvious those sites want to keep the quote process inefficient so they can keep charging contractors for ever-expanding ad placements.",
  "It dawned on me that nobody was benefitting from this disconnect between homeowners and contractors except the aggregator sites — a process where both sides lose while a middleman wins.",
  "I decided then to build what I think the home improvement industry really needs: a real marketplace that gives homeowners and contractors a fair, easy way to find each other and match on a ballpark estimate of project cost. And so Estimarket was born.",
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-white px-5 pt-16 text-center sm:px-10 sm:pt-20">
        <p className="text-xs font-semibold uppercase tracking-[1px] text-accent">
          Our mission
        </p>
        <h1 className="mx-auto mt-5 max-w-[1000px] text-[40px] font-bold leading-[1.1] text-navy sm:text-[52px]">
          Fix the cracked foundation of the home improvement industry.
        </h1>
      </section>

      <section className="bg-white px-5 py-16 sm:px-10">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-8 lg:flex-row lg:gap-16">
          <div className="lg:w-[280px] lg:shrink-0">
            <h2 className="text-[40px] font-bold leading-tight text-navy lg:sticky lg:top-[110px]">
              How we <span className="text-accent">got here</span>
            </h2>
          </div>
          <div className="max-w-[980px] flex-1 space-y-5">
            {STORY.map((p, i) => (
              <p key={i} className="text-[17px] leading-[1.7] text-slate">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy px-5 py-16 sm:px-10 sm:py-20">
        <div className="mx-auto max-w-[1280px]">
          <p className="text-xs font-semibold uppercase tracking-[1px] text-accent">
            What we believe
          </p>
          <h2 className="mt-6 max-w-[1100px] text-[32px] font-bold leading-tight text-white sm:text-[44px]">
            The home improvement industry can be more fair and affordable for
            both homeowners <span className="font-serif italic text-accent">and</span>{" "}
            working contractors.
          </h2>

          <div className="mt-12 grid gap-12 md:grid-cols-2">
            <div>
              <div className="h-px w-10 bg-accent" />
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.5px] text-accent">
                For homeowners
              </p>
              <h3 className="mt-4 text-[26px] font-semibold text-white sm:text-[30px]">
                Fair pricing, fewer sales pitches.
              </h3>
              <p className="mt-3 max-w-[600px] text-[17px] leading-[1.65] text-[#e0e5f2]">
                See real, itemized estimates from vetted pros — not a
                salesperson&apos;s number. The average Estimarket project comes
                in 22% under the highest competing quote.
              </p>
            </div>
            <div>
              <div className="h-px w-10 bg-accent" />
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.5px] text-accent">
                For pros
              </p>
              <h3 className="mt-4 text-[26px] font-semibold text-white sm:text-[30px]">
                Lower costs of doing business.
              </h3>
              <p className="mt-3 max-w-[600px] text-[17px] leading-[1.65] text-[#e0e5f2]">
                Predictable subscription pricing instead of percentage
                commissions. Pros on Estimarket keep more of every dollar the
                homeowner pays — the highest in the industry.
              </p>
            </div>
          </div>

          <p className="mt-16 text-center font-serif text-[28px] italic text-white sm:text-[36px]">
            “Both sides win, or it doesn&apos;t work.”
          </p>
        </div>
      </section>

      <section className="bg-[#fafafc] px-5 py-16 sm:px-10 sm:py-20">
        <div className="mx-auto max-w-[1280px]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <h2 className="text-[36px] font-bold text-navy sm:text-[44px]">
              Where <span className="font-serif italic text-accent">we work</span>
            </h2>
            <p className="max-w-[380px] text-[15px] leading-[1.55] text-muted">
              We&apos;re opening one city at a time — deep before wide, so every
              homeowner and every pro on the platform gets a real network.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_524px]">
            <div className="relative isolate flex min-h-[368px] flex-col justify-between overflow-hidden rounded-[20px] p-10">
              <Image
                src="/images/about-denver.png"
                alt="Denver, Colorado skyline"
                fill
                sizes="(max-width: 1024px) 100vw, 760px"
                className="-z-10 object-cover object-center"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy/90 via-navy/60 to-transparent" />

              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white">
                  <span className="text-[#16a34a]">●</span> Live Oct 2026
                </span>
                <h3 className="mt-6 text-[44px] font-bold text-white sm:text-[52px]">
                  Denver,{" "}
                  <span className="font-serif italic text-accent">Colorado</span>
                </h3>
              </div>

              <div>
                <p className="max-w-[560px] text-[15px] leading-[1.55] text-white">
                  Our home market — from Highlands bungalows to Stapleton new
                  builds. A vetted pro within ten miles.
                </p>
                <dl className="mt-6 flex gap-12">
                  {[
                    ["—", "Projects est."],
                    ["—", "Vetted pros"],
                    ["—", "Avg. savings"],
                  ].map(([value, label]) => (
                    <div key={label}>
                      <dt className="text-[28px] font-bold text-white">
                        {value}
                      </dt>
                      <dd className="text-[10px] font-semibold uppercase tracking-wide text-[#b2c7d9]">
                        {label}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <div className="rounded-[20px] bg-white p-10 shadow-[0px_4px_16px_0px_rgba(14,33,75,0.07)]">
              <p className="text-xs font-semibold uppercase tracking-[0.5px] text-accent">
                Not in Denver?
              </p>
              <h3 className="mt-4 text-[32px] font-bold text-navy">
                Nominate{" "}
                <span className="font-serif italic text-accent">your city.</span>
              </h3>
              <p className="mt-4 max-w-[444px] text-[15px] leading-[1.55] text-slate">
                We&apos;re opening in new cities in waves. Cities with the most
                nominations move to the front of the launch queue.
              </p>
              <div className="mt-6 max-w-[340px]">
                <NominateCity />
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABand role="homeowner" headline="Ready to build something?" />
    </>
  );
}
