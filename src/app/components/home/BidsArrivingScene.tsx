"use client";

import { useMemo, useRef, useState } from "react";
import useSceneTimeline, { type TimelineStep } from "../campaign/useSceneTimeline";
import { COMPARE_BIDS, KITCHEN, dollars } from "./homeDemoData";
import { CompactBidRow, FeedBidRow, FilterPill } from "./HoBidCard";
import { BareSlot, springIn } from "./HomeStage";
import { BellIcon } from "./MarketplaceCard";

// Slot 2 — Step 02, Contractors bid (animated). The homeowner's live listing
// filling with bids: four rows stagger in, the bids-in figure and the All
// count track the arrivals, and a toast announces the third.

const DESKTOP = { w: 624, h: 600 };
const MOBILE = { w: 342, h: 400 };
const EASE = "var(--ease-enter)";

const RESTING = { rows: COMPARE_BIDS.length, count: COMPARE_BIDS.length, toast: false };

/** The toast announces Alpine Reno, the third bid in. */
const TOAST_BID = COMPARE_BIDS[2];

function rowIn(on: boolean) {
  return {
    opacity: on ? 1 : 0,
    transform: on ? "none" : "translateY(14px)",
    transition: `opacity 300ms ${EASE}, transform 340ms ${EASE}`,
  };
}

function LiveDot() {
  return <span className="size-2 rounded-full bg-promo-dot" />;
}

export default function BidsArrivingScene() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [rows, setRows] = useState(0);
  const [count, setCount] = useState(0);
  const [toast, setToast] = useState(false);

  const steps = useMemo<TimelineStep[]>(() => {
    const s: TimelineStep[] = [
      [
        0,
        () => {
          setRows(0);
          setCount(0);
          setToast(false);
        },
      ],
      [1500, () => setToast(true)],
      [4000, () => setToast(false)],
    ];
    for (let i = 0; i < COMPARE_BIDS.length; i++) {
      s.push([
        300 + i * 440,
        () => {
          setRows(i + 1);
          setCount(i + 1);
        },
      ]);
    }
    return s;
  }, []);

  const { reducedMotion } = useSceneTimeline(rootRef, steps);
  const v = reducedMotion ? RESTING : { rows, count, toast };

  const toastStyle = {
    opacity: v.toast ? 1 : 0,
    transform: v.toast ? "translateY(0)" : "translateY(-56px)",
    transition: springIn(),
  };

  const desktop = (
    <>
      <div className="absolute inset-x-0 top-0 rounded-[18px] border border-line bg-white p-5 shadow-brand-2xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <LiveDot />
              <span className="text-[10px] font-bold uppercase tracking-[0.06em] text-muted">
                Live · accepting bids
              </span>
            </div>
            <div className="mt-2 text-[17px] font-bold tracking-[-0.01em] text-ink">
              {KITCHEN.title}
            </div>
            <div className="mt-[3px] text-[12px] text-muted">
              {KITCHEN.listingMeta}
            </div>
          </div>
          <div className="flex-none text-right">
            <div className="text-[26px] font-bold leading-none tabular-nums tracking-[-0.02em] text-navy">
              {v.count}
            </div>
            <div className="mt-[3px] text-[10px] font-semibold uppercase tracking-[0.06em] text-muted">
              Bids in
            </div>
          </div>
        </div>

        <div className="mt-[14px] flex items-center justify-between gap-[10px] border-t border-line pt-[14px]">
          <div className="flex gap-[7px]">
            <FilterPill label="All" count={v.count} active />
            <FilterPill label="New" count={Math.min(2, v.count)} />
            <FilterPill label="Detailed line items" count={3} />
          </div>
          <span className="whitespace-nowrap text-[11.5px] font-semibold text-muted">
            Sort · Price low to high ⇅
          </span>
        </div>

        <div className="mt-[14px] flex flex-col gap-[9px]">
          {COMPARE_BIDS.map((bid, i) => (
            <FeedBidRow key={bid.company} bid={bid} style={rowIn(v.rows > i)} />
          ))}
        </div>
      </div>

      {/* At top:116 the toast lands over the chips row, not the title. */}
      <div
        className="absolute right-5 top-[116px] z-10 flex w-[320px] items-start gap-[10px] rounded-[14px] border border-line bg-white/97 p-[11px_13px] shadow-brand-2xl"
        style={toastStyle}
      >
        <BellIcon size={28} />
        <div>
          <div className="text-[11.5px] font-bold text-ink">
            New bid on your project
          </div>
          <div className="mt-px text-[11px] text-slate">
            {TOAST_BID.company} · {dollars(TOAST_BID.min)} – {dollars(TOAST_BID.max)}
          </div>
        </div>
        <div className="ml-auto flex-none text-[9.5px] text-muted">now</div>
      </div>
    </>
  );

  const mobile = (
    <div className="absolute inset-x-0 top-0 rounded-[16px] border border-line bg-white p-[14px] shadow-brand-xl">
      <div className="flex items-center gap-2">
        <LiveDot />
        <span className="text-[10.5px] font-semibold uppercase tracking-[0.05em] text-muted">
          Live · accepting bids
        </span>
      </div>
      <div className="mt-2 text-[14px] font-bold text-ink">{KITCHEN.title}</div>
      <div className="mt-[2px] text-[11px] text-muted">
        {v.count === 1 ? "1 bid" : `${v.count} bids`} · {dollars(KITCHEN.budget)}{" "}
        budget
      </div>
      <div className="mt-3 flex flex-col gap-2">
        {COMPARE_BIDS.map((bid, i) => (
          <CompactBidRow key={bid.company} bid={bid} style={rowIn(v.rows > i)} />
        ))}
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
