"use client";

import { useState } from "react";
import { ButtonLink } from "./Button";

type Plan = {
  name: string;
  badge: string;
  badgeClass: string;
  monthly: number;
  annual: number;
  blurb: string;
  features: string[];
  cta: string;
  dark: boolean;
};

const PLANS: Plan[] = [
  {
    name: "Pro",
    badge: "Most popular",
    badgeClass: "bg-marine text-white",
    monthly: 29,
    annual: 25,
    blurb:
      "Everything a small contractor needs to grow their business with Estimarket:",
    features: [
      "20 bid submissions/month",
      "Contractor profile",
      "Customer budgets visible before bid",
      "Performance dashboard",
      "Cancel anytime",
    ],
    cta: "Start with Pro →",
    dark: false,
  },
  {
    name: "Elite",
    badge: "Best value",
    badgeClass: "bg-accent text-white",
    monthly: 59,
    annual: 50,
    blurb: "For contractors operating at scale. Includes all Pro features, plus:",
    features: [
      "Unlimited bid submissions",
      "Accept direct bidding to your website",
      "Elite badge + advanced analytics on your bids",
    ],
    cta: "Choose Elite →",
    dark: true,
  },
];

type Billing = "monthly" | "annual";

export default function PricingCards() {
  const [billing, setBilling] = useState<Billing>("annual");

  return (
    <div className="mt-8 flex flex-col items-center">
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
        <div
          role="tablist"
          aria-label="Billing period"
          className="inline-flex rounded-full border border-line bg-white p-1"
        >
          {(["monthly", "annual"] as const).map((option) => {
            const active = billing === option;
            return (
              <button
                key={option}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setBilling(option)}
                className={`rounded-full px-6 py-1.5 text-sm font-semibold capitalize transition-colors ${
                  active ? "bg-accent text-white" : "text-slate"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
        <span className="text-sm font-medium text-accent">
          Save ~15% with annual billing
        </span>
      </div>

      <p className="mt-6 max-w-[992px] text-center text-sm text-muted">
        <span className="font-semibold text-navy">
          Your first 3 months are always free.
        </span>{" "}
        No long term contracts or “pay to win” add-ons. Change or cancel anytime.
      </p>

      <div className="mt-10 grid w-full max-w-[840px] grid-cols-1 gap-8 md:grid-cols-2">
        {PLANS.map((plan) => {
          const price = billing === "annual" ? plan.annual : plan.monthly;
          return (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-[20px] p-8 ${
                plan.dark
                  ? "bg-navy text-white"
                  : "border border-line bg-white text-navy"
              }`}
            >
              <span
                className={`absolute right-6 top-6 rounded-full px-3 py-1 text-[11px] font-semibold ${plan.badgeClass}`}
              >
                {plan.badge}
              </span>

              <h3 className="text-3xl font-bold">{plan.name}</h3>
              <p
                className={`mt-4 text-sm ${plan.dark ? "text-white/80" : "text-marine"}`}
              >
                Free for your first 3 months, then:
              </p>
              <div className="mt-3 flex items-end gap-1">
                <span className="text-5xl font-bold">${price}</span>
                <span
                  className={`mb-1.5 text-sm ${plan.dark ? "text-white/70" : "text-muted"}`}
                >
                  /month
                </span>
              </div>
              {billing === "annual" ? (
                <p
                  className={`mt-1 text-xs ${plan.dark ? "text-white/60" : "text-muted"}`}
                >
                  billed annually
                </p>
              ) : null}

              <div
                className={`my-6 h-px w-full ${plan.dark ? "bg-white/15" : "bg-line"}`}
              />

              <p
                className={`text-sm ${plan.dark ? "text-white/80" : "text-marine"}`}
              >
                {plan.blurb}
              </p>

              <ul className="mt-6 flex flex-1 flex-col gap-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-3 text-sm">
                    <span className={plan.dark ? "text-white" : "text-marine"}>
                      ✓
                    </span>
                    <span className={plan.dark ? "text-white/90" : "text-slate"}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <ButtonLink
                href="/waitlist/contractor"
                variant={plan.dark ? "primary" : "marine"}
                className="mt-8 w-full"
              >
                {plan.cta}
              </ButtonLink>
            </div>
          );
        })}
      </div>
    </div>
  );
}
