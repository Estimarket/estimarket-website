"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import useSceneTimeline, {
  useCountUp,
  type TimelineStep,
} from "../campaign/useSceneTimeline";
import {
  COMPARE_BIDS,
  HERO_CONTRACTOR,
  HERO_THREAD,
  KITCHEN,
  KITCHEN_LABOR_ROWS,
  KITCHEN_LABOR_TOTAL,
  dollars,
} from "./homeDemoData";
import {
  HERO_STAGE,
  HERO_STAGE_MOBILE,
  ScaledStage,
} from "./HomeStage";
import { Initials } from "./HeroChrome";
import { fadeIn, riseIn, type HeroState } from "./heroMotion";
import HeroFlipHomeowner from "./HeroFlipHomeowner";
import HeroFlipContractor from "./HeroFlipContractor";

// Slot 0 — the home hero: one kitchen told from both ends. The stage
// alternates between the homeowner's app and the contractor's web console on
// an 18s loop, three beats a side, with a segmented pill marking which side is
// showing.
//
// This is above the fold, so it plays on mount rather than waiting for scroll;
// the shared timeline hook starts as soon as the stage is 50% visible, which
// for the hero is immediately.
//
// Beat 3 on the homeowner side is a message thread. On mobile that screen is
// still a `TabPlaceholder` in the product — shipping it here is a deliberate
// call, confirmed with Cam: the thread exists on the contractor's side today
// and the homeowner's is the next screen to land.

/** The last beat fires at 16500, so the gap that closes the 18s cycle is 1500. */
const LOOP_GAP_MS = 1500;

const BIDS = COMPARE_BIDS.slice(0, 3);

/**
 * Reduced-motion resting frame: the homeowner's bid list, fully populated,
 * with the contractor side resolved behind it. No timers run at all.
 */
const RESTING: HeroState = {
  side: "homeowner",
  hoScreen: 2,
  hoChecks: 4,
  hoCta: true,
  hoBids: 3,
  hoMsg: 3,
  coScreen: 1,
  coNew: true,
  coItems: KITCHEN_LABOR_ROWS.length,
  coTotal: KITCHEN_LABOR_TOTAL,
  coSubmit: true,
  coMsg: 3,
};

/** The segmented control at the top of the stage. It is a label, not a
 * control — the stage turns itself over. */
function SidePill({
  side,
  width,
}: {
  side: HeroState["side"];
  width: number;
}) {
  const half = (width - 6) / 2;
  const contractor = side === "contractor";
  return (
    <div
      className="absolute left-0 top-0 h-[34px] rounded-full border border-white/18 bg-white/10 p-[3px]"
      style={{ width }}
    >
      <span
        className="absolute left-[3px] top-[3px] h-[26px] rounded-full bg-white"
        style={{
          width: half,
          transform: `translateX(${contractor ? half : 0}px)`,
          transition: "transform 460ms var(--ease-spring)",
        }}
      />
      <div className="relative flex h-[26px]">
        {(["For homeowners", "For contractors"] as const).map((label, i) => (
          <span
            key={label}
            className="grid place-items-center text-[12px] font-bold"
            style={{
              width: half,
              color:
                contractor === (i === 1) ? "var(--color-navy)" : "rgba(255,255,255,0.82)",
              transition: "color 260ms var(--ease-enter)",
            }}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * Phone-width composition — separately authored, not the desktop stage scaled
 * down. No device frames: the same six beats become two stacked cards a side,
 * each `flex-none` so nothing is squeezed into its own overflow.
 */
function MobileFlip({ v }: { v: HeroState }) {
  const priced = KITCHEN_LABOR_ROWS.filter((r) => !r.tbd);
  return (
    <>
      <SidePill side={v.side} width={342} />

      <div
        className="absolute inset-x-0 top-[46px] flex flex-col gap-3"
        style={{
          opacity: v.side === "homeowner" ? 1 : 0,
          transform: v.side === "homeowner" ? "none" : "translateX(-20px)",
          transition:
            "opacity 420ms var(--ease-enter), transform 460ms var(--ease-enter)",
        }}
      >
        <div className="flex-none rounded-[14px] bg-white p-[13px] text-ink shadow-brand-lg">
          <div className="flex items-baseline justify-between">
            <span className="text-[13px] font-bold">{KITCHEN.title}</span>
            <span className="text-[10px] font-semibold text-muted">
              {v.hoBids === 1 ? "1 bid" : `${v.hoBids} bids`}
            </span>
          </div>
          <div className="mt-[3px] text-[10px] text-muted">
            Denver · Kitchen — full gut remodel
          </div>
          <div className="mt-[10px]">
            {BIDS.map((bid, i) => (
              <div
                key={bid.company}
                className="flex items-center gap-[6px] border-b border-[#F3F4F6] py-[7px]"
                style={riseIn(v.hoBids > i, 6)}
              >
                <Initials size={22}>{bid.initials}</Initials>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[10px] font-bold leading-[1.2]">
                    {bid.company}
                  </div>
                  <div className="mt-[2px] text-[8px] text-muted">
                    <span className="text-gold">★</span> {bid.rating} · {bid.jobs} jobs
                  </div>
                </div>
                <span className="flex-none whitespace-nowrap text-[8.5px] font-bold tabular-nums">
                  {dollars(bid.min)} – {dollars(bid.max)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div
          className="flex-none rounded-[14px] bg-white p-[12px_13px] text-ink shadow-brand-lg"
          style={riseIn(v.hoMsg >= 1, 8)}
        >
          <div className="flex items-center gap-2">
            <Initials size={26}>{HERO_CONTRACTOR.initials}</Initials>
            <span className="text-[11px] font-bold">{HERO_CONTRACTOR.name}</span>
            <span className="ml-auto text-[9.5px] text-muted">now</span>
          </div>
          <div className="mt-2 rounded-[12px] bg-[#F3F4F6] p-[8px_10px] text-[10.5px] leading-[1.45]">
            {HERO_THREAD[0].body}
          </div>
        </div>
      </div>

      <div
        className="absolute inset-x-0 top-[46px] flex flex-col gap-3"
        style={{
          opacity: v.side === "contractor" ? 1 : 0,
          transform: v.side === "contractor" ? "none" : "translateX(20px)",
          transition:
            "opacity 420ms var(--ease-enter), transform 460ms var(--ease-enter)",
        }}
      >
        <div className="flex-none overflow-hidden rounded-[14px] bg-white text-ink shadow-brand-lg">
          <div className="relative h-[116px] bg-[#efe6d6]">
            <Image
              src={KITCHEN.photo}
              alt=""
              fill
              sizes="342px"
              className="object-cover"
              style={{ objectPosition: "50% 45%" }}
            />
            <span className="absolute left-[10px] top-[10px] rounded-[6px] bg-navy px-[9px] py-[3px] text-[10px] font-bold text-white">
              Kitchen remodel
            </span>
            <span className="absolute right-[10px] top-[10px] rounded-[6px] bg-brand px-[9px] py-[3px] text-[10px] font-bold text-white">
              NEW
            </span>
          </div>
          <div className="p-[11px_13px_13px]">
            <div className="text-[13px] font-bold">{KITCHEN.title}</div>
            <div className="mt-[3px] text-[10px] text-muted">
              Denver · just now · {KITCHEN.photoCount} photos
            </div>
            <div className="mt-[10px] flex items-end justify-between">
              <div>
                <div className="text-[9px] font-semibold uppercase tracking-[0.05em] text-muted">
                  Budget
                </div>
                <div className="text-[14px] font-bold tabular-nums">
                  {dollars(KITCHEN.budget)}
                </div>
              </div>
              <span className="inline-flex h-7 items-center rounded-[8px] bg-accent px-[13px] text-[11px] font-bold text-white">
                Review + bid
              </span>
            </div>
          </div>
        </div>

        <div className="flex-none rounded-[14px] bg-white p-[12px_13px] text-ink shadow-brand-lg">
          <div className="flex items-baseline justify-between">
            <span className="text-[11.5px] font-bold">Labor items</span>
            <span className="text-[9.5px] text-muted">Running total</span>
          </div>
          {priced.slice(1).map((row, i) => (
            <div
              key={row.name}
              className={`mt-2 flex items-center justify-between gap-[10px] ${
                i === 0 ? "border-t border-[#F3F4F6] pt-2" : ""
              }`}
            >
              <span className="text-[10px] text-ink">{row.short ?? row.name}</span>
              <span
                className="text-[11px] font-bold tabular-nums"
                style={fadeIn(v.coItems > (i === 0 ? 1 : 3))}
              >
                {dollars(row.amount ?? 0)}
              </span>
            </div>
          ))}
          <div className="mt-[10px] flex items-center justify-between gap-[10px] border-t border-[#F3F4F6] pt-[9px]">
            <span className="text-[9.5px] font-semibold uppercase tracking-[0.04em] text-muted">
              Total, excl. TBD
            </span>
            <span className="text-[15px] font-bold tabular-nums">
              {dollars(v.coTotal)}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default function HeroFlip() {
  const rootRef = useRef<HTMLDivElement>(null);
  const countUp = useCountUp();
  const [side, setSide] = useState<HeroState["side"]>("homeowner");
  const [hoScreen, setHoScreen] = useState<HeroState["hoScreen"]>(1);
  const [hoChecks, setHoChecks] = useState(0);
  const [hoCta, setHoCta] = useState(false);
  const [hoBids, setHoBids] = useState(0);
  const [hoMsg, setHoMsg] = useState(0);
  const [coScreen, setCoScreen] = useState<HeroState["coScreen"]>(1);
  const [coNew, setCoNew] = useState(false);
  const [coItems, setCoItems] = useState(0);
  const [coTotal, setCoTotal] = useState(0);
  const [coSubmit, setCoSubmit] = useState(false);
  const [coMsg, setCoMsg] = useState(0);

  const steps = useMemo<TimelineStep[]>(
    () => [
      // Homeowner side — build the project, watch bids land, answer a question.
      [
        0,
        () => {
          setSide("homeowner");
          setHoScreen(1);
          setHoChecks(0);
          setHoCta(false);
          setHoBids(0);
          setHoMsg(0);
        },
      ],
      [563, () => setHoChecks(1)],
      [1000, () => setHoChecks(2)],
      [1438, () => setHoChecks(3)],
      [1875, () => setHoChecks(4)],
      [2438, () => setHoCta(true)],
      [3250, () => setHoScreen(2)],
      [3813, () => setHoBids(1)],
      [4375, () => setHoBids(2)],
      [4938, () => setHoBids(3)],
      [6000, () => setHoScreen(3)],
      [6500, () => setHoMsg(1)],
      [7250, () => setHoMsg(2)],
      [8000, () => setHoMsg(3)],
      // Flip — the same job, from the contractor's desk.
      [
        9000,
        () => {
          setSide("contractor");
          setCoScreen(1);
          setCoNew(false);
          setCoItems(0);
          setCoTotal(0);
          setCoSubmit(false);
          setCoMsg(0);
        },
      ],
      [9875, () => setCoNew(true)],
      [11125, () => setCoScreen(2)],
      [
        11625,
        () => {
          setCoItems(1);
          countUp(KITCHEN_LABOR_TOTAL, 1500, setCoTotal);
        },
      ],
      [12063, () => setCoItems(2)],
      [12500, () => setCoItems(3)],
      [12938, () => setCoItems(4)],
      [13625, () => setCoSubmit(true)],
      [14500, () => setCoScreen(3)],
      [15000, () => setCoMsg(1)],
      [15750, () => setCoMsg(2)],
      [16500, () => setCoMsg(3)],
    ],
    [countUp],
  );

  const { reducedMotion } = useSceneTimeline(rootRef, steps, {
    loop: true,
    loopGapMs: LOOP_GAP_MS,
  });

  const v: HeroState = reducedMotion
    ? RESTING
    : {
        side,
        hoScreen,
        hoChecks,
        hoCta,
        hoBids,
        hoMsg,
        coScreen,
        coNew,
        coItems,
        coTotal,
        coSubmit,
        coMsg,
      };

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      // basis-560 (not flex-1) so the stage wraps below the copy once the two
      // columns no longer fit side by side; a 0 basis would let it shrink to a
      // thumbnail instead of wrapping.
      className="flex min-w-0 flex-[1_1_560px] select-none justify-center"
    >
      <div className="hidden sm:block">
        <ScaledStage {...HERO_STAGE} minScale={0.42}>
          <SidePill side={v.side} width={306} />
          <HeroFlipHomeowner v={v} />
          <HeroFlipContractor v={v} />
        </ScaledStage>
      </div>

      <div className="w-full sm:hidden">
        <ScaledStage {...HERO_STAGE_MOBILE}>
          <MobileFlip v={v} />
        </ScaledStage>
      </div>
    </div>
  );
}
