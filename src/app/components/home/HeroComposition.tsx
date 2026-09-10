"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import useSceneTimeline, { type TimelineStep } from "../campaign/useSceneTimeline";
import {
  HERO_BIDS,
  KITCHEN,
  MARKETPLACE_CARDS,
  dollars,
  midpoint,
} from "./homeDemoData";
import MarketplaceCard, { BellIcon } from "./MarketplaceCard";
import {
  HERO_STAGE,
  HERO_STAGE_MOBILE,
  ScaledStage,
  enter,
  springIn,
} from "./HomeStage";

// Slot 0 — the hero composition: a kitchen arriving into a contractor's feed.
// Three layers over the navy ground — the marketplace panel, a push
// notification that drops in and leaves, and the homeowner's bid comparison.
//
// This is above the fold, so it plays on mount rather than waiting for scroll;
// the shared timeline hook starts as soon as the stage is 50% visible, which
// for the hero is immediately.

const BATH_CARD = MARKETPLACE_CARDS[0];
const KITCHEN_CARD = MARKETPLACE_CARDS[2];

/** Reduced-motion resting frame: fully assembled, notification already gone. */
const RESTING = { notifIn: false, cardIn: true, bidsIn: true };

const GREEN = "#16a34a";

function BidRow({ bid, lead }: { bid: (typeof HERO_BIDS)[number]; lead?: boolean }) {
  return (
    <div
      className={`flex items-center gap-[10px] rounded-[12px] border border-line p-[9px] ${
        lead ? "shadow-brand-sm" : "mt-[6px]"
      }`}
    >
      <span className="grid size-[34px] flex-none place-items-center rounded-full bg-navy text-[11px] font-bold text-white">
        {bid.initials}
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-[12px] font-bold tracking-[-0.01em]">
          {bid.company}
        </div>
        <div className="mt-px text-[10px] text-muted">
          <span className="text-gold">★</span> {bid.rating} · {bid.jobs} jobs ·{" "}
          {bid.city}
        </div>
      </div>
      <div className="flex-none text-right">
        <div
          className="text-[12.5px] font-bold tabular-nums"
          style={{ color: GREEN }}
        >
          {dollars(bid.min)} – {dollars(bid.max)}
        </div>
        <div className="text-[9.5px] text-muted">
          est. {dollars(midpoint(bid))}
        </div>
      </div>
    </div>
  );
}

function FooterChip({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone: "good" | "tbd" | "neutral";
}) {
  const styles = {
    good: { borderColor: "rgba(22,163,74,0.4)", background: "rgba(22,163,74,0.1)", color: GREEN },
    tbd: { borderColor: "#c9c9f0", background: "#eeeefb", color: "#4f46e5" },
    neutral: { borderColor: "#e5e7eb", background: "#f9fafb", color: "#6b7280" },
  }[tone];
  return (
    <span
      className="rounded-[4px] border px-[6px] py-[2px] text-[10px] font-semibold"
      style={styles}
    >
      {children}
    </span>
  );
}

export default function HeroComposition() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [notifIn, setNotifIn] = useState(false);
  const [cardIn, setCardIn] = useState(false);
  const [bidsIn, setBidsIn] = useState(false);

  const steps = useMemo<TimelineStep[]>(
    () => [
      [
        0,
        () => {
          setNotifIn(false);
          setCardIn(false);
          setBidsIn(false);
        },
      ],
      [350, () => setNotifIn(true)],
      [1150, () => setCardIn(true)],
      [1550, () => setBidsIn(true)],
      [2900, () => setNotifIn(false)],
    ],
    [],
  );

  const { reducedMotion } = useSceneTimeline(rootRef, steps);
  const v = reducedMotion ? RESTING : { notifIn, cardIn, bidsIn };

  const notifStyle = {
    opacity: v.notifIn ? 1 : 0,
    transform: v.notifIn ? "translateY(0)" : "translateY(-72px)",
    transition: springIn(),
  };

  const notifBody = (compact?: boolean) => (
    <>
      <BellIcon size={compact ? 30 : 28} />
      <div>
        <div
          className={compact ? "text-[12.5px] font-bold" : "mb-px text-[11.5px] font-bold"}
        >
          New project in your service area
        </div>
        <div
          className={
            compact ? "mt-px text-[12px] text-slate" : "text-[11.5px] text-slate"
          }
        >
          {compact ? "Matches your trades" : `${KITCHEN.title} · matches your trades`}
        </div>
      </div>
      <div
        className={`ml-auto flex-none text-muted ${compact ? "text-[11px]" : "text-[9.5px]"}`}
      >
        now
      </div>
    </>
  );

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      // basis-480 (not flex-1) so the stage wraps below the copy once the two
      // columns no longer fit side by side; a 0 basis would let it shrink to
      // a thumbnail instead of wrapping.
      className="flex min-w-0 flex-[1_1_480px] select-none justify-center"
    >
      {/* Desktop — the full three-layer composition */}
      <div className="hidden sm:block">
        <ScaledStage {...HERO_STAGE}>
          {/* 1 — marketplace panel */}
          <div className="absolute left-0 top-4 w-[392px] rounded-[16px] border-2 border-white/16 bg-white/5 p-[13px]">
            <div className="mb-[11px] flex items-baseline justify-between">
              <span className="text-[13px] font-bold text-white/92">
                Marketplace
              </span>
              <span className="text-[10.5px] text-white/50">Denver · 14 open</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <MarketplaceCard card={BATH_CARD} size="hero" />
              <div
                className="rounded-[12px]"
                style={{
                  outline: "2px solid var(--color-brand)",
                  outlineOffset: 2,
                  opacity: v.cardIn ? 1 : 0,
                  transform: v.cardIn ? "translateY(0)" : "translateY(-10px)",
                  transition: enter(),
                }}
              >
                <MarketplaceCard card={KITCHEN_CARD} size="hero" />
              </div>
            </div>
          </div>

          {/* 2 — push notification */}
          <div
            className="absolute left-[132px] top-0 flex w-[376px] items-start gap-[10px] rounded-[16px] bg-white/97 p-[11px_13px] text-ink shadow-brand-xl"
            style={notifStyle}
          >
            {notifBody()}
          </div>

          {/* 3 — bid comparison */}
          <div
            className="absolute bottom-0 right-0 w-[336px] rounded-[16px] bg-white p-[14px] text-ink shadow-brand-xl"
            style={{
              opacity: v.bidsIn ? 1 : 0,
              transform: v.bidsIn ? "translateY(0)" : "translateY(16px)",
              transition: enter(),
            }}
          >
            <div className="mb-[10px] flex items-baseline justify-between">
              <span className="text-[12.5px] font-bold">
                Bids received · {KITCHEN.bidCount}
              </span>
              <span className="text-[9px] font-semibold uppercase tracking-[0.05em] text-muted">
                Sort · price
              </span>
            </div>
            {HERO_BIDS.map((bid, i) => (
              <BidRow key={bid.initials} bid={bid} lead={i === 0} />
            ))}
            <div className="mt-[10px] flex gap-[6px]">
              <FooterChip tone="good">Within budget</FooterChip>
              <FooterChip tone="tbd">1 TBD</FooterChip>
              <FooterChip tone="neutral">6 line items</FooterChip>
            </div>
          </div>
        </ScaledStage>
      </div>

      {/* Mobile — separately authored: the arriving card and the alert only */}
      <div className="w-full sm:hidden">
        <ScaledStage {...HERO_STAGE_MOBILE}>
          <div className="absolute inset-x-0 top-[74px] overflow-hidden rounded-[14px] bg-white text-ink shadow-brand-xl">
            <div className="relative h-[140px] bg-[#efe6d6]">
              <Image
                src={KITCHEN.photo}
                alt=""
                fill
                sizes="342px"
                className="object-cover"
                style={{ objectPosition: "50% 45%" }}
              />
              <span className="absolute left-[10px] top-[10px] rounded-[6px] bg-navy px-[9px] py-[3px] text-[11px] font-bold text-white">
                Kitchen remodel
              </span>
              <span className="absolute right-[10px] top-[10px] rounded-[6px] bg-brand px-[9px] py-[3px] text-[11px] font-bold text-white">
                NEW
              </span>
            </div>
            <div className="p-[12px_14px_14px]">
              <div className="text-[15px] font-bold tracking-[-0.01em]">
                {KITCHEN.title}
              </div>
              <div className="mt-1 text-[11px] text-muted">
                Denver · 4m ago · {KITCHEN.photoCount} photos
              </div>
              <div className="mt-3 flex items-end justify-between">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.05em] text-muted">
                    Budget
                  </div>
                  <div className="text-[15px] font-bold tabular-nums">
                    {dollars(KITCHEN.budget)}
                  </div>
                </div>
                <span className="inline-flex h-[30px] items-center rounded-[8px] bg-accent px-[14px] text-[12px] font-bold text-white">
                  Review + bid
                </span>
              </div>
            </div>
          </div>

          <div
            className="absolute inset-x-0 top-0 flex items-start gap-[10px] rounded-[14px] bg-white/97 p-[12px_13px] text-ink shadow-brand-xl"
            style={notifStyle}
          >
            {notifBody(true)}
          </div>
        </ScaledStage>
      </div>
    </div>
  );
}
