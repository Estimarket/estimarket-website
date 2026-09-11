"use client";

import { useMemo, useRef, useState } from "react";
import useSceneTimeline, {
  type TimelineStep,
} from "../campaign/useSceneTimeline";
import { COMPARE_BIDS, KITCHEN, dollars } from "./homeDemoData";
import { FilterPill, HeroBidRow } from "./HoBidCard";
import { ScaledStage } from "./HomeStage";

// Slot 0 — the /homeowners hero card: the homeowner's All Bids screen,
// replacing the ho-hero-card.png that floated over the photo.
//
// Above the fold, so it reveals on mount; the shared timeline hook starts as
// soon as the stage is 50% visible, which here is immediately.

// Desktop only: the page hides this card below lg, and that matters — with
// the card stacked under the copy the hero grows tall enough to crop the photo
// to a sliver. The prototype's 342x212 mobile version is a review aid, not a
// shipping state, so it isn't built here.
const DESKTOP = { w: 624, h: 490 };

/** The hero shows the first three bids; the fourth lives in step 02. */
const HERO_BIDS = COMPARE_BIDS.slice(0, 3);

export default function HoHeroBids() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  const steps = useMemo<TimelineStep[]>(
    () => [
      [0, () => setShown(false)],
      [300, () => setShown(true)],
    ],
    [],
  );

  const { reducedMotion } = useSceneTimeline(rootRef, steps);
  const inView = reducedMotion || shown;

  const reveal = {
    opacity: inView ? 1 : 0,
    transform: inView ? "none" : "translateY(18px)",
    transition:
      "opacity 400ms var(--ease-enter), transform 460ms var(--ease-enter)",
  };

  return (
    <div ref={rootRef} aria-hidden="true" className="select-none">
      <ScaledStage {...DESKTOP}>
        <div
          className="absolute inset-x-0 top-0 rounded-[18px] bg-white p-5 shadow-brand-2xl"
          style={reveal}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-[17px] font-bold tracking-[-0.01em] text-ink">
                {KITCHEN.title} · all bids
              </div>
              <div className="mt-[3px] text-[12px] text-muted">
                {KITCHEN.bidCount} bids · {dollars(KITCHEN.budget)} budget ·
                compare the midpoint of each range
              </div>
            </div>
            <span className="whitespace-nowrap text-[12px] font-semibold text-muted">
              Sort · Price low to high ⇅
            </span>
          </div>

          <div className="mt-[14px] flex gap-[7px]">
            <FilterPill label="All" count={4} active />
            <FilterPill label="New" count={2} />
            <FilterPill label="No TBDs" count={2} />
          </div>

          <div className="mt-[14px] flex flex-col gap-[9px]">
            {HERO_BIDS.map((bid, i) => (
              <HeroBidRow key={bid.company} bid={bid} cta={i < 2} />
            ))}
          </div>
        </div>
      </ScaledStage>
    </div>
  );
}
