import Image from "next/image";
import { notFound } from "next/navigation";
import WaitlistForm from "../../components/WaitlistForm";
import { FOUNDING_REF } from "../../lib/founding";

const ROLES = ["homeowner", "contractor"] as const;
type Role = (typeof ROLES)[number];

export const dynamicParams = false;

export function generateStaticParams() {
  return ROLES.map((role) => ({ role }));
}

// One page, served at two URLs — `role` only seeds the form and the analytics
// source, so both bodies are identical. Rather than let search engines pick a
// winner between two duplicates, neither is indexed. `follow` keeps link equity
// flowing, and both URLs stay live for users and campaign links.
export const metadata = {
  title: "Join the waitlist — Estimarket",
  description:
    "We’re launching soon. Join the mailing list to find out when Estimarket goes live in your area.",
  robots: { index: false, follow: true },
};

// `?ref=denver-founding` (from the campaign landing page) flips this into the
// founding-contractor variant: same form, but the signup is tagged with the
// ref in `source` so the campaign meter can count it and outreach can be
// attributed. Only the known ref is honored — anything else is the plain page.
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ role: string }>;
  searchParams: Promise<{ ref?: string }>;
}) {
  const { role } = await params;
  if (!ROLES.includes(role as Role)) notFound();
  const { ref } = await searchParams;
  const founding = role === "contractor" && ref === FOUNDING_REF;

  return (
    <section className="relative isolate flex min-h-[760px] items-center overflow-hidden bg-navy px-5 py-16 sm:px-6">
      <Image
        src="/images/waitlist-bg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-marine/25" />
      <div className="absolute inset-0 bg-navy/55" />

      <div className="relative mx-auto w-full max-w-[760px] text-center">
        <p className="text-[13px] font-semibold uppercase tracking-[1.5px] text-gold">
          {founding
            ? "Founding contractors · Denver"
            : "Waitlist only · Coming soon"}
        </p>
        <h1 className="mx-auto mt-4 max-w-[680px] text-[34px] font-bold leading-tight text-white sm:text-[42px]">
          {founding
            ? "Reserve your founding spot. Sign-up opens before Oct. 1."
            : "We’re launching soon. Please join our mailing list for updates."}
        </h1>
        <p className="mx-auto mt-4 max-w-[620px] text-[17px] leading-normal text-white/90">
          {founding
            ? "Leave your email and zip and we’ll send you the founding-contractor sign-up link the moment it goes live — zero fees for a year and first access to Denver bathroom jobs."
            : "Drop your email to get the latest updates and find out when the marketplace and project builder are live in your area."}
        </p>

        <div className="mx-auto mt-8 w-full max-w-[500px] rounded-[22px] bg-white p-6 shadow-[0px_25px_50px_0px_rgba(14,33,75,0.25)]">
          <WaitlistForm
            variant="card"
            defaultRole={role as Role}
            role={founding ? "contractor" : undefined}
            source={founding ? FOUNDING_REF : `waitlist_${role}`}
          />
        </div>

        <p className="mx-auto mt-5 max-w-[500px] text-sm text-white/80">
          By submitting your email, you agree to our terms of service and privacy
          policy.
        </p>
      </div>
    </section>
  );
}
