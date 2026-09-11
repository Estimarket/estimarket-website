"use client";

import { useMemo, useRef, useState } from "react";
import useSceneTimeline, {
  type TimelineStep,
} from "../campaign/useSceneTimeline";
import { ScaledStage } from "../home/HomeStage";
import { ACCESS_LINE, INBOX_PROJECTS, WON_AMOUNT, dollars } from "./coDemoData";
import { ProjectTile } from "./CoProjectCard";

// Slot 0 — the /contractors hero, replacing co-hero-card.png: the contractor's
// matching-projects inbox, plus the two pills that float over the photo.
//
// Renders two things, and is meant to sit as the last child of the hero's
// inner 1440px flex container: the card as a flex column beside the copy, and
// the two pills in an overlay covering that same container — their positions
// are percentages of it, which is why they cannot live inside the card column.
//
// Both are desktop-only, as the source card was: stacked under the copy the
// hero grows tall enough to crop the photo to a sliver. The prototype's
// 342x250 mobile inbox is a review aid, not a shipping state.

const STAGE = { w: 471, h: 361 };

const SPRING =
  "opacity 360ms var(--ease-enter), transform 460ms var(--ease-spring)";

export default function CoHeroInbox() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [card, setCard] = useState(false);
  const [won, setWon] = useState(false);
  const [match, setMatch] = useState(false);

  const steps = useMemo<TimelineStep[]>(
    () => [
      [
        0,
        () => {
          setCard(false);
          setWon(false);
          setMatch(false);
        },
      ],
      [250, () => setCard(true)],
      [900, () => setMatch(true)],
      [1400, () => setWon(true)],
    ],
    [],
  );

  const { reducedMotion } = useSceneTimeline(rootRef, steps);
  const v = reducedMotion
    ? { card: true, won: true, match: true }
    : { card, won, match };

  return (
    <>
      <div
        ref={rootRef}
        aria-hidden="true"
        className="hidden min-w-0 flex-[1_1_420px] select-none justify-center lg:flex"
      >
        <ScaledStage {...STAGE}>
          <div
            className="absolute inset-0 rounded-[16px] bg-white p-4 shadow-brand-2xl"
            style={{
              opacity: v.card ? 1 : 0,
              transform: v.card ? "none" : "translateY(18px)",
              transition:
                "opacity 400ms var(--ease-enter), transform 460ms var(--ease-enter)",
            }}
          >
            <div className="flex items-start justify-between gap-[10px]">
              <div>
                <div className="text-[15px] font-bold tracking-[-0.01em] text-ink">
                  Your matching projects
                </div>
                <div className="mt-[2px] text-[11px] text-muted">
                  Bathrooms · Denver metro · within 25 mi
                </div>
              </div>
              <span className="whitespace-nowrap text-[11px] text-muted">
                14 open
              </span>
            </div>

            <div className="mt-[13px] grid grid-cols-2 gap-[11px]">
              {INBOX_PROJECTS.map((p) => (
                <div
                  key={p.id}
                  className="rounded-[10px]"
                  style={
                    p.isNew
                      ? {
                          outline: "2px solid var(--color-brand)",
                          outlineOffset: 2,
                        }
                      : undefined
                  }
                >
                  <ProjectTile project={p} photoH={104} />
                </div>
              ))}
            </div>

            {/* Flat monthly access — never per lead, never per bid. */}
            <div className="mt-[13px] flex items-center justify-between gap-[10px] border-t border-line pt-3">
              <span className="text-[10.5px] text-muted">{ACCESS_LINE}</span>
              <span className="text-[10.5px] font-semibold text-marine">
                See all →
              </span>
            </div>
          </div>
        </ScaledStage>
      </div>

      {/* Pills overlay: covers the hero's inner container, which is what the
          24% / 74% offsets are measured against. */}
      <div className="pointer-events-none absolute inset-0 z-10 hidden lg:block">
        {/* The green pill drops in from above, the accent one rises. */}
        <span
          className="absolute left-[84.3%] top-[24%] whitespace-nowrap rounded-full bg-[#16a34a] px-5 py-3.5 text-base font-bold text-white shadow-brand-lg"
          style={{
            opacity: v.won ? 1 : 0,
            transform: v.won ? "none" : "translateY(-14px) scale(0.94)",
            transition: SPRING,
          }}
        >
          Bid won +{dollars(WON_AMOUNT)}
        </span>
        <span
          className="absolute left-[56.25%] top-[74%] whitespace-nowrap rounded-full bg-accent px-5 py-3.5 text-base font-bold text-white shadow-brand-lg"
          style={{
            opacity: v.match ? 1 : 0,
            transform: v.match ? "none" : "translateY(14px) scale(0.94)",
            transition: SPRING,
          }}
        >
          New matching project in your area
        </span>
      </div>
    </>
  );
}
