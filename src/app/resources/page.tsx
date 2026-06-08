import Link from "next/link";
import CTABand from "../components/CTABand";
import { ARTICLES } from "./articles";

export const metadata = {
  title: "The Rebuild — Estimarket Blog & Resources",
  description:
    "Our takes and news on all things home projects — for homeowners looking to make dreams come true, and the contractors looking to win more work.",
};

const FAQ_GROUPS = [
  {
    id: "how-it-works",
    label: "How it works",
    title: "How Estimarket works",
    items: [
      {
        q: "What is Estimarket, exactly?",
        a: "Estimarket is a bidding marketplace that connects homeowners with verified local contractors. Homeowners post a scoped project brief — with photos, measurements, and a budget range — and contractors submit ballpark bids from their desk. No in-home visits required until a bid is accepted.",
      },
      {
        q: "How is this different from Angi, Thumbtack, or HomeAdvisor?",
        a: "Those platforms sell leads to contractors, and still require both homeowners and contractors to go through the traditional sales-visit process. Estimarket is an open marketplace for homeowners and contractors to connect and agree on a ballpark cost for a project.",
      },
      {
        q: "How long does it take to get quotes?",
        a: "The average amount of time it takes to receive your first bid depends on many factors including the type of project, where you’re located, and how many contractors are active on the marketplace in your area.",
      },
      {
        q: "Do I still need to meet contractors in person before starting my project?",
        a: "Yes, we always recommend you meet with your contractor to confirm project details in person at the project property. Most projects will require more exact measurements and context for a final quote to be confirmed.",
      },
    ],
  },
  {
    id: "for-homeowners",
    label: "For homeowners",
    title: "For homeowners",
    items: [
      {
        q: "What information do I need to provide to get a useful quote?",
        a: "A brief description of the project scope, at least 4–6 photos of the space or area, approximate dimensions or square footage, a realistic budget range, and a rough timeline. The more specific you are, the more accurate — and comparable — your bids will be.",
      },
      {
        q: "How do I know the contractors are legitimate?",
        a: "Every contractor on Estimarket is verified: we confirm their business license, insurance certificate, and identity before they can submit bids. You can also see their bid history and any reviews from previous Estimarket projects.",
      },
      {
        q: "What if the quotes still vary by a lot?",
        a: "Some variation is normal. Bids can differ based on subcontractor networks, material sourcing, and how contractors price labor in your area. We flag bids that fall significantly outside the range so you can ask the contractor to explain their approach before deciding.",
      },
    ],
  },
  {
    id: "for-contractors",
    label: "For contractors",
    title: "For contractors",
    items: [
      {
        q: "How is a project different from a lead?",
        a: "A lead is a contact — you get a name and phone number and hope the homeowner is still interested when you call. A project is a scoped brief with professional-quality detail: photos, measurements, written description, stated budget, and a 48-hour bid window. You decide whether to bid before you spend any time on it.",
      },
      {
        q: "How many other contractors see the same project?",
        a: "Projects are visible to all contractors in the relevant trade within the project's service area. However, each bid is submitted privately and the homeowner reviews all bids without seeing what the others said — so there's no race to the bottom on price.",
      },
      {
        q: "What kind of close rates should I expect?",
        a: "Early data from our Denver market shows 22–35% close rates on submitted bids, compared to 10–25% on shared lead platforms. Because you're only bidding on projects you've already reviewed, the quality of your pipeline is higher.",
      },
    ],
  },
  {
    id: "pricing",
    label: "Pricing & payments",
    title: "Pricing & payments",
    items: [
      {
        q: "What does Estimarket cost?",
        a: "Homeowners: always free. Contractors: your first 3 months are always free. After that, we offer two tiers: Pro ($25/month, 20 bids) or Elite ($50/month, unlimited bids). No per-bid fees, no per-lead charges, no 12-month contracts.",
      },
      {
        q: "How are payments handled once I hire a contractor?",
        a: "Estimarket is not a payment processor — payments are made directly between homeowner and contractor according to the terms in your work contract.",
      },
      {
        q: "Are change orders supported?",
        a: "Homeowners can update their scope of work at any time before they have selected a contractor, and any contractors with an open bid on the project will be notified of the change.",
      },
    ],
  },
  {
    id: "trust",
    label: "Trust & disputes",
    title: "Trust & disputes",
    items: [
      {
        q: "What happens if a project goes wrong?",
        a: "Any issues with a project should be resolved between homeowner and contractor according to the terms of their mutual work agreement. All contractors on the Estimarket platform are required to be licensed and insured.",
      },
      {
        q: "How are reviews verified?",
        a: "Reviews on Estimarket can only be submitted by homeowners who accepted a bid from that contractor on the platform. We don't allow unsolicited reviews or reviews from unverified accounts.",
      },
      {
        q: "Does Estimarket guarantee the work?",
        a: "No. Estimarket is a marketplace, not a general contractor. We verify contractor credentials and facilitate the match, but the contract and warranty terms are between you and the contractor you hire.",
      },
    ],
  },
  {
    id: "account",
    label: "Account",
    title: "Account",
    items: [
      {
        q: "Do I need an account to receive quotes?",
        a: "Yes. You'll need to create a free homeowner account to post a project and receive bids. This lets contractors see that your contact information has been verified before they spend time on a bid.",
      },
      {
        q: "Can I cancel or change my project after posting it?",
        a: "Yes. You can edit your project brief or close it at any time before accepting a bid. If you close a project, any contractors who submitted bids are notified automatically.",
      },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <>
      <section className="bg-white px-5 py-16 text-center sm:py-20">
        <p className="text-[16px] font-bold uppercase tracking-[1.6px] text-accent">
          The Estimarket Blog
        </p>
        <h1 className="mt-4 font-serif text-[44px] font-normal leading-tight text-ink sm:text-[64px]">
          The Rebuild
        </h1>
        <p className="mx-auto mt-5 max-w-[700px] text-lg text-muted sm:text-xl">
          Our takes and news on all things home projects — for homeowners
          looking to make dreams come true, and the contractors looking to win
          more work.
        </p>
      </section>

      <section className="bg-surface px-5 py-14 sm:px-10">
        <div className="mx-auto max-w-[1280px]">
          <h2 className="text-xl font-semibold text-ink">Articles</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ARTICLES.map((a) => (
              <Link
                key={a.slug}
                href={`/resources/${a.slug}`}
                className={`group flex flex-col rounded-[16px] p-8 shadow-[0px_4px_16px_0px_rgba(14,33,75,0.08)] transition-transform hover:-translate-y-1 ${
                  a.tone === "orange" ? "bg-accent" : "bg-navy"
                }`}
              >
                <p
                  className={`text-xs font-medium ${a.tone === "orange" ? "text-[#fddeca]" : "text-[#a8ceff]"}`}
                >
                  {a.kicker}
                </p>
                <h3 className="mt-4 font-serif text-[26px] font-normal leading-[34px] text-white">
                  {a.title}
                </h3>
                <p
                  className={`mt-4 text-sm leading-[22px] ${a.tone === "orange" ? "text-[#fddeca]" : "text-[#a8ceff]"}`}
                >
                  {a.excerpt}
                </p>
                <span className="mt-6 text-sm font-semibold text-white">
                  Read article →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-10">
        <div className="mx-auto max-w-[1280px]">
          <div className="text-center">
            <p className="text-[11px] font-bold uppercase tracking-[1.1px] text-accent">
              FAQ
            </p>
            <h2 className="mt-2 font-serif text-[40px] font-normal text-ink sm:text-5xl">
              FAQ
            </h2>
            <p className="mx-auto mt-3 max-w-[720px] text-muted">
              Everything you need to know about Estimarket — for contractors and
              homeowners alike.
            </p>
          </div>

          <div className="mt-12 flex flex-col gap-10 lg:flex-row lg:gap-12">
            <aside className="lg:w-[220px] lg:shrink-0">
              <nav className="sticky top-[96px] rounded-[12px] border border-line bg-surface p-4">
                <ul className="flex flex-col gap-1">
                  {FAQ_GROUPS.map((g) => (
                    <li key={g.id}>
                      <a
                        href={`#${g.id}`}
                        className="block rounded-md px-3 py-2 text-sm text-slate hover:bg-white hover:text-ink"
                      >
                        {g.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            <div className="flex-1">
              {FAQ_GROUPS.map((g) => (
                <div key={g.id} id={g.id} className="scroll-mt-[96px] pb-10">
                  <h3 className="text-2xl font-bold tracking-[0.5px] text-accent">
                    {g.title}
                  </h3>
                  <dl className="mt-4 divide-y divide-line border-t border-line">
                    {g.items.map((item) => (
                      <div key={item.q} className="py-5">
                        <dt className="text-base font-semibold text-ink">
                          {item.q}
                        </dt>
                        <dd className="mt-2 text-[15px] leading-6 text-slate">
                          {item.a}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTABand
        role="homeowner"
        headline="Ready to build something?"
        subhead="We’re almost ready to launch. Drop your email and your zip — we’ll let you know when the marketplace is live."
      />
    </>
  );
}
