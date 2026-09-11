"use client";

import { useMemo, useRef, useState } from "react";
import useSceneTimeline, { type TimelineStep } from "../campaign/useSceneTimeline";
import { BareSlot } from "../home/HomeStage";
import {
  FILTER_CHIPS,
  LISTING_FACTS,
  MARKETPLACE_PROJECTS,
  PROJECT_COUNT,
} from "./coDemoData";
import { ProjectRow, ProjectTile } from "./CoProjectCard";

// Slot 1 — Step 01, Browse the marketplace (animated). The contractor
// marketplace grid from (contractor)/marketplace/page.tsx.
//
// The filter flip at 1500ms is the point of the scene: the feed narrows to
// *your* trade, and what's left is real projects with real budgets — not
// leads. The count drops 26 → 14 with it.

// 644 wide, shared with step 02: the scale a stage renders at is
// columnWidth / stageWidth, so matching widths is what makes the two scenes
// read as one product surface. Their heights are free to differ.
const DESKTOP = { w: 644, h: 484 };
const MOBILE = { w: 342, h: 380 };
const EASE = "var(--ease-enter)";

const RESTING = { rows: 4, filtered: true };

/** Rows 1-3 are the project cards; row 4 is the listing-facts strip. */
const STRIP_ROW = 4;

function fadeUp(on: boolean, dy: number) {
  return {
    opacity: on ? 1 : 0,
    transform: on ? "none" : `translateY(${dy}px)`,
    transition: `opacity 300ms ${EASE}, transform 340ms ${EASE}`,
  };
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="absolute left-[9px] top-1/2 size-3 -translate-y-1/2 text-muted"
    >
      <circle cx="7" cy="7" r="4.5" />
      <path d="m10.5 10.5 3 3" strokeLinecap="round" />
    </svg>
  );
}

function FilterChip({ label, active }: { label: string; active: boolean }) {
  return (
    <span
      className={`inline-flex h-6 items-center whitespace-nowrap rounded-full px-[11px] text-[10px] ${
        active
          ? "border border-accent bg-[#fee9df] font-bold text-ink"
          : "border border-line bg-white font-medium text-muted"
      }`}
    >
      {label}
    </span>
  );
}

function FactTile({ fact }: { fact: (typeof LISTING_FACTS)[number] }) {
  return (
    <div
      className={`rounded-[8px] p-[8px_10px] ${
        fact.tbd ? "border border-tbd-border bg-tbd-bg" : "bg-surface"
      }`}
    >
      <div
        className={`text-[8.5px] font-semibold uppercase tracking-[0.05em] ${
          fact.tbd ? "text-tbd" : "text-muted"
        }`}
      >
        {fact.label}
      </div>
      <div className="text-[13px] font-bold tabular-nums text-ink">
        {fact.value}
      </div>
    </div>
  );
}

export default function MarketplaceScene() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [rows, setRows] = useState(0);
  const [filtered, setFiltered] = useState(false);

  const steps = useMemo<TimelineStep[]>(() => {
    const s: TimelineStep[] = [
      [
        0,
        () => {
          setRows(0);
          setFiltered(false);
        },
      ],
      [1500, () => setFiltered(true)],
    ];
    for (let i = 0; i < 4; i++) s.push([250 + i * 260, () => setRows(i + 1)]);
    return s;
  }, []);

  const { reducedMotion } = useSceneTimeline(rootRef, steps);
  const v = reducedMotion ? RESTING : { rows, filtered };
  const count = v.filtered ? PROJECT_COUNT.filtered : PROJECT_COUNT.all;
  const activeChip = v.filtered ? "Bathrooms" : "All";

  const desktop = (
    <div className="absolute inset-0 flex flex-col rounded-[18px] border border-line bg-white p-[18px] shadow-brand-xl">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[15px] font-bold tracking-[-0.01em] text-ink">
            Marketplace
          </div>
          <div className="mt-[2px] text-[10.5px] text-muted">
            Browse open projects in your service area.
          </div>
        </div>
        <span className="whitespace-nowrap text-[10.5px] text-muted">
          {count} projects
        </span>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <div className="relative flex h-7 w-[196px] flex-none items-center overflow-hidden whitespace-nowrap rounded-[8px] border border-line pl-[26px] text-[10px] text-[#9ca3af]">
          <SearchIcon />
          Search projects by type or location
        </div>
        {FILTER_CHIPS.map((c) => (
          <FilterChip key={c} label={c} active={c === activeChip} />
        ))}
      </div>

      <div className="mt-[14px] grid grid-cols-3 gap-3">
        {MARKETPLACE_PROJECTS.map((p, i) => (
          <div key={p.id} style={fadeUp(v.rows > i, 12)}>
            <ProjectTile project={p} photoH={132} showBadge={false} />
          </div>
        ))}
      </div>

      <div
        className="mt-auto border-t border-line pt-[14px]"
        style={fadeUp(v.rows >= STRIP_ROW, 10)}
      >
        <div className="mb-2 text-[9px] font-bold uppercase tracking-[0.07em] text-muted">
          What’s in every listing
        </div>
        <div className="grid grid-cols-4 gap-2">
          {LISTING_FACTS.map((f) => (
            <FactTile key={f.label} fact={f} />
          ))}
        </div>
      </div>
    </div>
  );

  const mobile = (
    <div className="absolute inset-0 flex flex-col rounded-[16px] border border-line bg-white p-[14px] shadow-brand-xl">
      <div className="flex items-baseline justify-between">
        <span className="text-[14px] font-bold text-ink">Marketplace</span>
        <span className="text-[10.5px] text-muted">{count} projects</span>
      </div>

      <div className="mt-[10px] flex gap-[6px]">
        {FILTER_CHIPS.slice(0, 3).map((c) => (
          <FilterChip key={c} label={c} active={c === activeChip} />
        ))}
      </div>

      <div className="mt-3 flex flex-col gap-[9px]">
        {MARKETPLACE_PROJECTS.map((p, i) => (
          <ProjectRow key={p.id} project={p} thumb={56} style={fadeUp(v.rows > i, 12)} />
        ))}
      </div>

      <div
        className="mt-auto grid grid-cols-2 gap-[7px]"
        style={fadeUp(v.rows >= STRIP_ROW, 10)}
      >
        <FactTile fact={{ label: "Line items", value: "14 · scoped" }} />
        <FactTile fact={{ label: "Flagged", value: "1 TBD", tbd: true }} />
      </div>
    </div>
  );

  return (
    <BareSlot
      rootRef={rootRef}
      desktop={{ ...DESKTOP, content: desktop }}
      mobile={{ ...MOBILE, content: mobile }}
    />
  );
}
