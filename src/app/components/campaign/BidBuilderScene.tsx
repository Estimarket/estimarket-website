"use client";

import { useMemo, useRef, useState } from "react";
import useSceneTimeline, { useCountUp, type TimelineStep } from "./useSceneTimeline";
import {
  BID_RANGE,
  dollars,
  LINE_ITEMS,
  PRICED_TOTAL,
  PROJECT,
  RANGE_SCALE_MAX,
  TBD_ITEM,
} from "./campaignDemoData";
import "./campaign.css";

// How It Works step 3 — the bid builder (reference scene C, ~9.5s, play once
// and hold). Two panes (labor items → set bid range) that cross-fade while
// the step rail advances; one component, not two. The mobile variant is a
// separately authored composition, not the desktop scene scaled down.

const RAIL_STEPS = [
  "Project overview",
  "Labor items",
  "Materials",
  "Set bid range",
  "Notes",
  "Review bid",
];

const ROW_COUNT = LINE_ITEMS.length + 1; // five priced rows + the TBD row
const RUNNING_SUMS = LINE_ITEMS.map((_, i) =>
  LINE_ITEMS.slice(0, i + 1).reduce((sum, li) => sum + li.amount, 0),
);

const MIN_PCT = (BID_RANGE.min / RANGE_SCALE_MAX) * 100;
const MAX_PCT = (BID_RANGE.max / RANGE_SCALE_MAX) * 100;
const BUDGET_PCT = (PROJECT.budget / RANGE_SCALE_MAX) * 100;

// Reduced-motion resting frame: all rows in, the TBD row flagged and the
// explainer banner shown, on the labor-items pane.
const RESTING = {
  rowsIn: ROW_COUNT,
  total: PRICED_TOTAL,
  tbdFlipped: true,
  bannerIn: true,
  pane: "items" as const,
  rangeDrawn: false,
};

function DesktopScene() {
  const stageRef = useRef<HTMLDivElement>(null);
  const countUp = useCountUp();
  const [rowsIn, setRowsIn] = useState(0);
  const [total, setTotal] = useState(0);
  const [tbdFlipped, setTbdFlipped] = useState(false);
  const [bannerIn, setBannerIn] = useState(false);
  const [pane, setPane] = useState<"items" | "range">("items");
  const [rangeDrawn, setRangeDrawn] = useState(false);

  const steps = useMemo<TimelineStep[]>(() => {
    const s: TimelineStep[] = [
      [
        0,
        () => {
          setRowsIn(0);
          setTotal(0);
          setTbdFlipped(false);
          setBannerIn(false);
          setPane("items");
          setRangeDrawn(false);
        },
      ],
    ];
    for (let i = 0; i < ROW_COUNT; i++) {
      s.push([
        450 + i * 430,
        () => {
          setRowsIn(i + 1);
          if (i < LINE_ITEMS.length) countUp(RUNNING_SUMS[i], 380, setTotal);
        },
      ]);
    }
    s.push([3400, () => setTbdFlipped(true)]);
    s.push([3900, () => setBannerIn(true)]);
    s.push([6200, () => setPane("range")]);
    s.push([6900, () => setRangeDrawn(true)]);
    return s;
  }, [countUp]);

  const { reducedMotion } = useSceneTimeline(stageRef, steps);
  const v = reducedMotion
    ? RESTING
    : { rowsIn, total, tbdFlipped, bannerIn, pane, rangeDrawn };

  return (
    <div className="dfc slot step-slot" aria-hidden="true">
      <div
        ref={stageRef}
        className={`stage sC${v.tbdFlipped ? " tbd-on" : ""}${v.bannerIn ? " banner-in" : ""}`}
      >
        <div className="rail">
          <div className="rk">Bid flow</div>
          {RAIL_STEPS.map((label, i) => {
            const done = v.pane === "items" ? i === 0 : i < 3;
            const now = v.pane === "items" ? i === 1 : i === 3;
            return (
              <div
                key={label}
                className={`rstep${done ? " done" : ""}${now ? " now" : ""}`}
              >
                <span className="dot">{done ? "✓" : i + 1}</span>
                {label}
              </div>
            );
          })}
        </div>

        <div className={`pane${v.pane === "items" ? " on" : ""}`}>
          <div className="ph-t">Labor items</div>
          <div className="ph-s">
            Labor + installation only — homeowner is supplying materials. Flag
            anything that needs a site visit as TBD.
          </div>
          <div className="rt2">
            <div>
              <div className="k">Running total (excluding TBD)</div>
              <div>
                <span className="v">{dollars(v.total)}</span>
              </div>
            </div>
            <span className="chip tbd">1 TBD</span>
          </div>
          {LINE_ITEMS.map((li, i) => (
            <div key={li.name} className={`lrowC${v.rowsIn > i ? " in" : ""}`}>
              <span className="n">
                {li.name}
                <i>{li.detail}</i>
              </span>
              <span className="p">{li.amount.toLocaleString("en-US")}</span>
              <span className="tg">TBD</span>
            </div>
          ))}
          <div
            className={`lrowC${v.rowsIn > LINE_ITEMS.length ? " in" : ""}${v.tbdFlipped ? " is-tbd" : ""}`}
          >
            <span className="n">
              {TBD_ITEM.name}
              <i>{TBD_ITEM.bidDetail}</i>
            </span>
            <span className="p">
              {v.tbdFlipped ? "—" : TBD_ITEM.preTbdAmount.toLocaleString("en-US")}
            </span>
            <span className="tg">TBD</span>
          </div>
          <div className="banner">
            <span>ⓘ</span>
            <span>
              <b>
                {"Use TBD for anything you can't price without seeing the project."}
              </b>{" "}
              {"TBD items aren't included in your bid total — you'll confirm them after a site visit."}
            </span>
          </div>
        </div>

        <div className={`pane${v.pane === "range" ? " on" : ""}`}>
          <div className="ph-t">Set your bid range</div>
          <div className="ph-s">
            We calculated a starting point from your line items. Adjust your min
            and max — homeowners compare the midpoint.
          </div>
          <div className="rangecard">
            <div className="k">Your bid range</div>
            <div className="v">
              {dollars(BID_RANGE.min)} – {dollars(BID_RANGE.max)}
            </div>
            <div className="calc">
              Calculated from {LINE_ITEMS.length} line items:{" "}
              {dollars(PRICED_TOTAL)}
            </div>
            <div className="track">
              <div className="hb" style={{ left: `${BUDGET_PCT}%` }} />
              <div
                className="own"
                style={{
                  left: `${MIN_PCT}%`,
                  width: v.rangeDrawn ? `${MAX_PCT - MIN_PCT}%` : 0,
                }}
              />
              <div className="knob" style={{ left: `${MIN_PCT}%` }} />
              <div className="knob" style={{ left: `${MAX_PCT}%` }} />
            </div>
            <div className="legend">
              <span>$0</span>
              <span>
                <b style={{ color: "var(--green)" }}>▲</b>{" "}
                {"Homeowner's budget"} {dollars(PROJECT.budget)}{" "}
                <b style={{ color: "var(--color-brand)" }}>▬</b> Your range
              </span>
              <span>{dollars(RANGE_SCALE_MAX)}</span>
            </div>
            <div className="minmax">
              <div>
                <div className="lb">Your minimum</div>
                <div className="fld">{BID_RANGE.min.toLocaleString("en-US")}</div>
              </div>
              <div>
                <div className="lb">Your maximum</div>
                <div className="fld focus">
                  {BID_RANGE.max.toLocaleString("en-US")}
                </div>
              </div>
            </div>
          </div>
          <div className="tbdnote">
            <span style={{ color: "var(--tbd-fg)" }}>⚠</span>
            <div>
              <div className="k">TBD — excluded from total</div>
              <div className="b">{TBD_ITEM.name} — confirm after site visit</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const MOBILE_ROWS = LINE_ITEMS.slice(0, 3);
const MOBILE_SUMS = MOBILE_ROWS.map((_, i) =>
  MOBILE_ROWS.slice(0, i + 1).reduce((sum, li) => sum + li.amount, 0),
);
const MOBILE_TOTAL = MOBILE_SUMS[MOBILE_SUMS.length - 1];

function MobileScene() {
  const stageRef = useRef<HTMLDivElement>(null);
  const countUp = useCountUp();
  const [rowsIn, setRowsIn] = useState(0);
  const [total, setTotal] = useState(0);

  const steps = useMemo<TimelineStep[]>(() => {
    const s: TimelineStep[] = [
      [
        0,
        () => {
          setRowsIn(0);
          setTotal(0);
        },
      ],
    ];
    for (let i = 0; i < MOBILE_ROWS.length + 1; i++) {
      s.push([
        500 + i * 620,
        () => {
          setRowsIn(i + 1);
          if (i < MOBILE_ROWS.length) countUp(MOBILE_SUMS[i], 400, setTotal);
        },
      ]);
    }
    return s;
  }, [countUp]);

  const { reducedMotion } = useSceneTimeline(stageRef, steps);
  const v = reducedMotion
    ? { rowsIn: MOBILE_ROWS.length + 1, total: MOBILE_TOTAL }
    : { rowsIn, total };

  return (
    <div className="dfc slot m-slot" aria-hidden="true">
      <div ref={stageRef} className="stage mC2">
        <div className="h">Labor items · {PROJECT.neighborhood}</div>
        <div className="body">
          {MOBILE_ROWS.map((li, i) => (
            <div key={li.name} className={`r${v.rowsIn > i ? " in" : ""}`}>
              <span className="n">{li.shortName ?? li.name}</span>
              <span className="a">{dollars(li.amount)}</span>
            </div>
          ))}
          <div
            className={`r is-tbd${v.rowsIn > MOBILE_ROWS.length ? " in" : ""}`}
          >
            <span className="n">{TBD_ITEM.shortName}</span>
            <span className="a">TBD</span>
          </div>
        </div>
        <div className="f">
          <div>
            <div className="k">Running total</div>
            <div className="v">{dollars(v.total)}</div>
          </div>
          <button type="button" className="orange-btn" tabIndex={-1}>
            Set range
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BidBuilderScene() {
  return (
    <>
      <div className="hidden md:block">
        <DesktopScene />
      </div>
      <div className="flex justify-center md:hidden">
        <MobileScene />
      </div>
    </>
  );
}
