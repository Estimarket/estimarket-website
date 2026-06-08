import ContactForm from "../components/ContactForm";

export const metadata = {
  title: "Contact — Estimarket",
  description:
    "Get in touch with a real person. Questions about an estimate, press inquiries, partnerships, or product requests — the right team is one message away.",
};

const HELP_CARDS = [
  {
    tone: "blue" as const,
    title: "Browse FAQ",
    body: "Detailed guides on estimates, pricing protection, refunds, pro vetting, and dispute resolution.",
    action: "Open help center →",
    href: "/resources#how-it-works",
  },
  {
    tone: "orange" as const,
    title: "Press & media",
    body: "Interview requests, fact-checks, press kit and founder availability.",
    action: "press@estimarket.com →",
    href: "mailto:press@estimarket.com",
  },
  {
    tone: "blue" as const,
    title: "Partnerships & business",
    body: "Co-marketing, supplier deals, lender integrations, market expansion proposals.",
    action: "partnerships@estimarket.com →",
    href: "mailto:partnerships@estimarket.com",
  },
  {
    tone: "orange" as const,
    title: "Product request",
    body: "Find a bug? Want us to build a new feature? Let us know.",
    action: "product@estimarket.com →",
    href: "mailto:product@estimarket.com",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="bg-white px-5 pb-10 pt-16 sm:px-10 sm:pt-24">
        <div className="mx-auto max-w-[1280px]">
          <p className="text-xs font-semibold uppercase tracking-[1px] text-accent">
            Contact
          </p>
          <h1 className="mt-4 text-[44px] font-bold leading-[1.05] text-navy sm:text-[72px]">
            Get in touch with a{" "}
            <span className="font-serif italic text-accent">real</span> person
          </h1>
          <p className="mt-5 max-w-[640px] text-lg leading-[1.55] text-slate sm:text-xl">
            Whether you&apos;ve got a question about an estimate, a press
            inquiry, or a pitch for a partnership — the right team is one message
            away.
          </p>
        </div>
      </section>

      <section className="bg-white px-5 pb-24 pt-6 sm:px-10">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-12 lg:flex-row lg:items-start">
          <div className="w-full rounded-[20px] border border-line bg-white p-8 shadow-[0px_4px_16px_0px_rgba(14,33,75,0.07)] sm:p-12 lg:max-w-[760px]">
            <ContactForm />
          </div>

          <div className="flex w-full flex-col gap-4 lg:max-w-[472px]">
            {HELP_CARDS.map((c) => (
              <a
                key={c.title}
                href={c.href}
                className="flex gap-[18px] rounded-[16px] border border-line bg-white p-6 transition-colors hover:border-marine"
              >
                <span
                  className={`flex size-12 shrink-0 items-center justify-center rounded-[12px] text-base ${
                    c.tone === "blue"
                      ? "bg-[#eff6ff] text-marine"
                      : "bg-[#fee9df] text-accent"
                  }`}
                >
                  ◆
                </span>
                <div>
                  <h3 className="text-base font-semibold text-ink">
                    {c.title}
                  </h3>
                  <p className="mt-1 text-[13px] leading-[1.55] text-muted">
                    {c.body}
                  </p>
                  <p className="mt-2 text-[13px] font-semibold text-marine">
                    {c.action}
                  </p>
                </div>
              </a>
            ))}

            <div className="rounded-[16px] bg-navy p-6 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.5px]">
                Business hours
              </p>
              <dl className="mt-4 flex flex-col gap-2 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="text-band-text">Mon – Fri</dt>
                  <dd className="font-medium">7:00a – 8:00p MT</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-band-text">Sat + Sun</dt>
                  <dd className="font-medium">Closed</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
