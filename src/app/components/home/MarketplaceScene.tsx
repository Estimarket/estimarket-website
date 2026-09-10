"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import useSceneTimeline, {
  type TimelineStep,
} from "../campaign/useSceneTimeline";
import {
  KITCHEN,
  MARKETPLACE_CARDS,
  MARKETPLACE_COUNT,
  dollars,
  type MarketplaceCard as Card,
} from "./homeDemoData";
import MarketplaceCard, { BellIcon } from "./MarketplaceCard";
import { StepSlot, springIn } from "./HomeStage";

// Slot 2 — The marketplace (animated). The contractor marketplace from
// apps/web (app)/marketplace/page.tsx, with the Wash Park kitchen arriving:
// a toast drops in, the new card lands with a brand-orange ring, the project
// count ticks up, and the toast leaves. Plays once and holds.

const WELL = "#efe6d6";
const TYPE_CHIPS = ["All", "Bathrooms", "Kitchens", "Windows"];

/** Reduced-motion resting frame: the new card in, count settled, toast gone. */
const RESTING = { toast: false, fresh: true, count: MARKETPLACE_COUNT.to };

/** Desktop grid order, and the three rows the mobile list shows. */
const MOBILE_ROWS = [
  MARKETPLACE_CARDS[2],
  MARKETPLACE_CARDS[0],
  MARKETPLACE_CARDS[3],
];

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="absolute left-2 top-1/2 size-[11px] -translate-y-1/2 text-muted"
    >
      <circle cx="7" cy="7" r="4.5" />
      <path d="m10.5 10.5 3 3" strokeLinecap="round" />
    </svg>
  );
}

function MobileRow({ card, fresh }: { card: Card; fresh?: boolean }) {
  return (
    <div className="flex items-center gap-[10px] rounded-[10px] border border-line p-2">
      <div
        className="relative size-[66px] flex-none overflow-hidden rounded-[8px]"
        style={{ background: WELL }}
      >
        <Image
          src={card.photo}
          alt=""
          fill
          sizes="66px"
          className="object-cover"
          style={{ objectPosition: card.focal ?? "50% 50%" }}
        />
      </div>
      <div className="min-w-0 flex-1">
        {fresh ? (
          <div className="flex items-center gap-[6px]">
            <span className="rounded-[4px] bg-brand px-[6px] py-px text-[9.5px] font-bold text-white">
              NEW
            </span>
            <span className="text-[10px] text-muted">{card.chip}</span>
          </div>
        ) : (
          <div className="text-[10px] text-muted">
            {card.chip} · {card.bids}
          </div>
        )}
        <div className="mt-[3px] text-[13px] font-bold text-ink">
          {card.title}
        </div>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-[13px] font-bold tabular-nums text-ink">
            {dollars(card.budget)}
          </span>
          <span className="inline-flex h-[26px] items-center rounded-[6px] bg-accent px-[10px] text-[11px] font-bold text-white">
            Review + bid
          </span>
        </div>
      </div>
    </div>
  );
}

export default function MarketplaceScene() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [toast, setToast] = useState(false);
  const [fresh, setFresh] = useState(false);
  const [count, setCount] = useState(MARKETPLACE_COUNT.from);

  const steps = useMemo<TimelineStep[]>(
    () => [
      [
        0,
        () => {
          setToast(false);
          setFresh(false);
          setCount(MARKETPLACE_COUNT.from);
        },
      ],
      [250, () => setToast(true)],
      [
        750,
        () => {
          setFresh(true);
          setCount(MARKETPLACE_COUNT.to);
        },
      ],
      [3200, () => setToast(false)],
    ],
    [],
  );

  const { reducedMotion } = useSceneTimeline(rootRef, steps);
  const v = reducedMotion ? RESTING : { toast, fresh, count };

  const toastStyle = {
    opacity: v.toast ? 1 : 0,
    transform: v.toast ? "translateY(0)" : "translateY(-60px)",
    transition: springIn(),
  };

  /** The arriving card's shared arrival: drop, settle, ring on.
   *
   * The ring rides the wrapper's own opacity rather than transitioning
   * `outline-color` separately — opacity applies to the outline too, so it
   * reads the same, and it keeps the whole arrival on compositor-driven
   * properties instead of a main-thread colour transition. */
  const freshStyle = {
    outline: "2px solid var(--color-brand)",
    outlineOffset: 2,
    opacity: v.fresh ? 1 : 0,
    transform: v.fresh ? "none" : "translateY(-12px) scale(.97)",
    transition:
      "opacity 400ms var(--ease-enter), transform 460ms var(--ease-spring)",
  };

  const desktop = (
    <>
      {/* Laid out in flow rather than pinned to the design's 84px offset: the
          header's real line box is taller than the prototype's, and an
          absolute grid would ride up over the search and filter row. */}
      <div className="flex h-full flex-col">
        <div className="border-b border-line p-[14px_18px_10px]">
          <div className="text-[14px] font-bold tracking-[-0.01em] text-ink">
            Marketplace
          </div>
          <div className="mt-px text-[10px] text-muted">
            Browse open projects in your service area.
          </div>
        </div>

        <div className="flex items-center gap-2 p-[10px_18px_0]">
          <div className="relative flex h-[26px] w-[168px] flex-none items-center overflow-hidden whitespace-nowrap rounded-[8px] border border-line pl-6 text-[9.5px] text-[#9ca3af]">
            <SearchIcon />
            Search projects by type or location
          </div>
          {TYPE_CHIPS.map((chip, i) => (
            <span
              key={chip}
              className={`inline-flex h-5 items-center rounded-full px-[9px] text-[9px] ${
                i === 0
                  ? "border border-accent bg-[#fee9df] font-bold text-ink"
                  : "border border-line font-medium text-muted"
              }`}
            >
              {chip}
            </span>
          ))}
          <span className="ml-auto whitespace-nowrap text-[9px] text-muted">
            {v.count} projects
          </span>
        </div>

        <div className="mt-[10px] grid flex-1 grid-cols-3 content-start gap-3 px-[18px] pb-[14px]">
          {MARKETPLACE_CARDS.map((card) =>
            card.arriving ? (
              <div key={card.id} className="rounded-[8px]" style={freshStyle}>
                <MarketplaceCard card={card} size="grid" />
              </div>
            ) : (
              <MarketplaceCard key={card.id} card={card} size="grid" />
            ),
          )}
        </div>
      </div>

      <div
        className="absolute left-1/2 top-[14px] z-10 -ml-[165px] flex w-[330px] items-start gap-[9px] rounded-[14px] border border-line bg-white/97 p-[10px_12px] shadow-brand-xl"
        style={toastStyle}
      >
        <BellIcon size={26} />
        <div>
          <div className="text-[11px] font-bold text-ink">
            New matching project in your area
          </div>
          <div className="mt-px text-[10.5px] text-slate">
            {KITCHEN.title} · {dollars(KITCHEN.budget)} budget
          </div>
        </div>
        <div className="ml-auto flex-none text-[9px] text-muted">now</div>
      </div>
    </>
  );

  const mobile = (
    <>
      <div className="border-b border-line p-[12px_14px_10px]">
        <div className="text-[14px] font-bold tracking-[-0.01em] text-ink">
          Marketplace
        </div>
        <div className="mt-px text-[11px] text-muted">
          {v.count} open projects in your area
        </div>
      </div>

      <div className="flex flex-col gap-[10px] p-[12px_14px]">
        {MOBILE_ROWS.map((card) =>
          card.arriving ? (
            <div key={card.id} className="rounded-[10px]" style={freshStyle}>
              <MobileRow card={card} fresh />
            </div>
          ) : (
            <MobileRow key={card.id} card={card} />
          ),
        )}
      </div>

      {/* Sits at 56px so it lands over the feed, not the header. */}
      <div
        className="absolute inset-x-[12px] top-[56px] flex items-start gap-[10px] rounded-[12px] border border-line bg-white/97 p-[10px_12px] shadow-brand-xl"
        style={toastStyle}
      >
        <BellIcon size={28} />
        <div>
          <div className="text-[12px] font-bold text-ink">
            New matching project
          </div>
          <div className="mt-px text-[11px] text-slate">
            {KITCHEN.title} · {dollars(KITCHEN.budget)}
          </div>
        </div>
      </div>
    </>
  );

  return (
    <StepSlot
      tone="white"
      rootRef={rootRef}
      desktop={desktop}
      mobile={mobile}
    />
  );
}
