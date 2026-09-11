"use client";

import { useMemo, useRef, useState } from "react";
import useSceneTimeline, {
  type TimelineStep,
} from "../campaign/useSceneTimeline";
import {
  COMPARE_BIDS,
  KITCHEN,
  KITCHEN_SUMMARY,
  averageEstimate,
  dollars,
} from "./homeDemoData";
import { BidSkeleton, CompactBidRow, HeroCompareRow } from "./HoBidCard";
import {
  HO_HERO_STAGE,
  HO_HERO_STAGE_MOBILE,
  ScaledStage,
} from "./HomeStage";
import { fadeIn, riseIn } from "./heroMotion";
import HoHeroPhone, { type HoPhoneState } from "./HoHeroPhone";

// Slot 0 — the /homeowners hero. The homeowner builds the project on the phone
// at left; as it publishes, the listing beside it flips Draft → Live and the
// bids fill in underneath.
//
// This replaces the All Bids card the hero carried before: the bids are still
// the payoff, but the hero now shows how the listing they are priced against
// gets made, which is what this page is arguing.
//
// Above the fold, so it plays on mount; the shared timeline hook starts as soon
// as the stage is 50% visible, which here is immediately. It plays once and
// holds the final frame — unlike the home hero, there is no second side to
// come back for.

/** The three bids that land in the hero. The fourth belongs to step 02. */
const BIDS = COMPARE_BIDS.slice(0, 3);

/** The two the phone-width card has room for. Mountain Crest is the chosen
 * bid on this page, so it carries the selected outline. */
const MOBILE_BIDS = COMPARE_BIDS.slice(0, 2);

const DONE = "#1C7C3E";

type HoHeroState = HoPhoneState & {
  live: boolean;
  bids: number;
  stats: boolean;
};

/** Reduced-motion resting frame: the published listing with every bid in. */
const RESTING: HoHeroState = {
  step: 4,
  typePicked: true,
  shots: 4,
  genStep: 5,
  cta: true,
  live: true,
  bids: 3,
  stats: true,
};

/** The listing card: the homeowner's own project, as her dashboard shows it. */
function ListingCard({ v }: { v: HoHeroState }) {
  const summary = KITCHEN_SUMMARY.map((row) =>
    row.label === "Bids so far" ? { ...row, value: String(v.bids) } : row,
  );
  return (
    <div className="absolute inset-x-0 left-[252px] top-0 rounded-[12px] bg-white p-[13px_14px] text-ink shadow-brand-xl">
      <div className="text-[8.5px] font-bold tracking-[0.5px] text-muted">
        YOUR PROJECT
      </div>
      <div className="mt-[3px] text-[16px] font-bold tracking-[-0.01em]">
        {KITCHEN.title} remodel
      </div>
      <div className="mt-[5px] flex items-center gap-[7px]">
        <span className="flex-none text-[10.5px] text-muted">Denver, CO</span>
        {/* Draft and Live are stacked so the row can't shift as it publishes. */}
        <span className="relative h-[18px] min-w-0 flex-1">
          <span
            className="absolute left-0 top-0 inline-flex items-center rounded-full border border-dashed border-[#D1D5DB] px-2 py-[2px] text-[9.5px] font-semibold text-muted"
            style={fadeIn(!v.live, 300)}
          >
            Draft · not posted yet
          </span>
          <span
            className="absolute left-0 top-0 inline-flex items-center gap-[5px] rounded-full px-2 py-[2px] text-[9.5px] font-semibold"
            style={{
              background: "rgba(28,124,62,0.15)",
              color: DONE,
              ...fadeIn(v.live, 300),
            }}
          >
            <span
              className="block size-[6px] rounded-full"
              style={{ background: DONE }}
            />
            Live — accepting bids · published just now
          </span>
        </span>
      </div>
      <div className="mt-3 grid grid-cols-4 gap-[10px] border-t border-[#D1D5DB]/70 pt-[11px]">
        {summary.map((row) => (
          <div key={row.label}>
            <div className="text-[8.5px] font-bold uppercase tracking-[0.5px] text-muted">
              {row.label}
            </div>
            <div className="mt-[3px] text-[11px] font-semibold text-ink">
              {row.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** The compare column: a navy header strip, then the bids landing into it. */
function CompareColumn({ v }: { v: HoHeroState }) {
  const landed = BIDS.slice(0, v.bids);
  return (
    <div className="absolute inset-y-0 left-[252px] right-0 top-[190px] flex flex-col">
      <div className="flex flex-none items-center justify-between gap-[10px] rounded-[8px] bg-navy/92 p-[5px_10px]">
        <span className="flex-none text-[10px] font-bold tracking-[0.5px] text-white">
          COMPARE BIDS
        </span>
        <span className="relative h-[15px] min-w-0 flex-1">
          <span
            className="absolute right-0 top-0 whitespace-nowrap text-[10.5px] font-medium text-white"
            style={fadeIn(!v.stats, 300)}
          >
            We’ll notify you as each bid arrives
          </span>
          <span
            className="absolute right-0 top-0 whitespace-nowrap text-[10.5px] font-medium text-white"
            style={fadeIn(v.stats, 300)}
          >
            {landed.length} bids · avg. est. {dollars(averageEstimate(landed.length ? landed : BIDS))}
          </span>
        </span>
      </div>

      <div className="mt-[10px] flex flex-none flex-col gap-2">
        {BIDS.map((bid, i) => (
          <div key={bid.company} className="relative">
            <HeroCompareRow bid={bid} style={riseIn(v.bids > i, 10)} />
            <BidSkeleton style={fadeIn(v.bids <= i, 300)} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HoHeroListing() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState<HoPhoneState["step"]>(1);
  const [typePicked, setTypePicked] = useState(false);
  const [shots, setShots] = useState(0);
  const [genStep, setGenStep] = useState(0);
  const [cta, setCta] = useState(false);
  const [live, setLive] = useState(false);
  const [bids, setBids] = useState(0);
  const [stats, setStats] = useState(false);

  const steps = useMemo<TimelineStep[]>(
    () => [
      [700, () => setTypePicked(true)],
      [1900, () => setStep(2)],
      [2700, () => setShots(1)],
      [3250, () => setShots(2)],
      [3800, () => setShots(3)],
      [4350, () => setShots(4)],
      [
        5200,
        () => {
          setStep(3);
          setGenStep(1);
        },
      ],
      [5750, () => setGenStep(2)],
      [6300, () => setGenStep(3)],
      [6850, () => setGenStep(4)],
      [
        7400,
        () => {
          setStep(4);
          // Past the last row, so every generation step reads as done.
          setGenStep(5);
          setCta(true);
        },
      ],
      [8200, () => setLive(true)],
      [8900, () => setBids(1)],
      [9600, () => setBids(2)],
      [10300, () => setBids(3)],
      [10900, () => setStats(true)],
    ],
    [],
  );

  const { reducedMotion } = useSceneTimeline(rootRef, steps);
  const v: HoHeroState = reducedMotion
    ? RESTING
    : { step, typePicked, shots, genStep, cta, live, bids, stats };

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      // Shown at phone width and from `lg` up, hidden in between: between 640
      // and 1024 the hero photo has no room to give, and a stage in the copy
      // column would crop it to a sliver. `sm:hidden lg:flex` is the whole
      // rule — the inner compositions then pick which one renders.
      className="flex min-w-0 flex-[1_1_460px] select-none justify-center sm:hidden lg:flex"
    >
      {/* Desktop — the full stage. Hidden between 640 and 1024: there the hero
          photo has no room to spare, which is why the phone composition below
          is deliberately short. */}
      <div className="hidden lg:block">
        <ScaledStage {...HO_HERO_STAGE} minScale={0.42}>
          <div className="absolute left-0 top-[10px]">
            <HoHeroPhone v={v} />
          </div>
          <ListingCard v={v} />
          <CompareColumn v={v} />
        </ScaledStage>
      </div>

      {/* Phone width — separately authored: the payoff only, at a height that
          stacks under the copy without cropping the hero photo to a sliver. */}
      <div className="w-full sm:hidden">
        <ScaledStage {...HO_HERO_STAGE_MOBILE}>
          <div className="absolute inset-x-0 top-0 rounded-[14px] bg-white p-[14px] shadow-brand-2xl">
            <div className="flex items-baseline justify-between">
              <span className="text-[14px] font-bold text-ink">
                Your bids · {KITCHEN.bidCount}
              </span>
              <span className="text-[10.5px] font-semibold text-muted">
                Price low → high
              </span>
            </div>
            <div className="mt-3 flex flex-col gap-2">
              {MOBILE_BIDS.map((bid) => (
                <CompactBidRow
                  key={bid.company}
                  bid={bid}
                  selected={bid.visitRequested}
                />
              ))}
            </div>
          </div>
        </ScaledStage>
      </div>
    </div>
  );
}
