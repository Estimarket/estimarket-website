"use client";

import { useMemo, useRef, useState } from "react";
import useSceneTimeline, {
  useCountUp,
  type TimelineStep,
} from "../campaign/useSceneTimeline";
import { BareSlot } from "../home/HomeStage";
import {
  BID_RANGE,
  LINE_ITEMS,
  PRICED_TOTAL,
  RANGE_SCALE_MAX,
  TBD_ITEM,
  WEST_HIGHLANDS,
  dollars,
} from "./coDemoData";

// Slot 2 — Step 02, Submit your bid (animated). The contractor's bid builder
// from (contractor)/bids/[jobId]/BidForm.tsx.
//
// The count-up and the row stagger are deliberately out of phase: the total is
// still climbing as the last rows land, which is what makes the budget meter's
// arrival at 2700ms read as a conclusion.
//
// The sixth row starts as an ordinary priced row and *becomes* the TBD row.
// TBD items are excluded from the total — never an allowance amount.

// 644 wide, shared with step 01 so both render at the same scale. The handoff
// specifies 484 tall as well, but this card's own content needs ~584 — at 484
// even the prototype clips its budget meter, which is the scene's closing
// beat. Height does not affect the scale, so only this stage grows.
const DESKTOP = { w: 644, h: 584 };
const MOBILE = { w: 342, h: 390 };
const EASE = "var(--ease-enter)";
const HAIRLINE = "#f3f4f6";
const BOX_BORDER = "#d1d5db";
const GREEN = "#16a34a";

const ROW_COUNT = LINE_ITEMS.length + 1;

const pct = (n: number) => (n / RANGE_SCALE_MAX) * 100;

const RESTING = {
  rows: ROW_COUNT,
  total: PRICED_TOTAL,
  tbd: true,
  meter: true,
};

/** Compact names for the mobile rows, which show name + price only. */
const MOBILE_NAMES = [
  "Demo & haul-away",
  "Rough plumbing",
  "Shower pan + waterproofing",
  "Tile — shower walls, 78 sf",
  "Tile — floor, 58 sf",
];

function fadeUp(on: boolean, dy: number) {
  return {
    opacity: on ? 1 : 0,
    transform: on ? "none" : `translateY(${dy}px)`,
    transition: `opacity 300ms ${EASE}, transform 340ms ${EASE}`,
  };
}

export default function BidBuilderScene() {
  const rootRef = useRef<HTMLDivElement>(null);
  const countUp = useCountUp();
  const [rows, setRows] = useState(0);
  const [total, setTotal] = useState(0);
  const [tbd, setTbd] = useState(false);
  const [meter, setMeter] = useState(false);

  const steps = useMemo<TimelineStep[]>(() => {
    const s: TimelineStep[] = [
      [
        0,
        () => {
          setRows(0);
          setTotal(0);
          setTbd(false);
          setMeter(false);
        },
      ],
      [450, () => countUp(PRICED_TOTAL, 1700, setTotal)],
      [2150, () => setTbd(true)],
      [2700, () => setMeter(true)],
    ];
    // 250ms, then 300ms apart — out of phase with the 1700ms count-up.
    s.push([250, () => setRows(1)]);
    for (let i = 1; i < ROW_COUNT; i++) {
      s.push([250 + i * 300, () => setRows(i + 1)]);
    }
    return s;
  }, [countUp]);

  const { reducedMotion } = useSceneTimeline(rootRef, steps);
  const v = reducedMotion ? RESTING : { rows, total, tbd, meter };

  const meterStyle = {
    opacity: v.meter ? 1 : 0,
    transform: v.meter ? "none" : "translateY(10px)",
    transition: `opacity 360ms ${EASE}, transform 400ms ${EASE}`,
  };
  const barWidth = v.meter ? `${pct(BID_RANGE.max - BID_RANGE.min)}%` : "0%";

  const tbdChip = (
    <span
      className="ml-auto inline-flex items-center rounded-full border border-tbd-border bg-tbd-bg px-[9px] py-[3px] text-[9.5px] font-semibold text-tbd"
      style={{ opacity: v.tbd ? 1 : 0, transition: `opacity 300ms ${EASE}` }}
    >
      1 TBD
    </span>
  );

  const desktop = (
    <div className="absolute inset-0 flex flex-col rounded-[18px] border border-line bg-white p-[18px] shadow-brand-xl">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[15px] font-bold tracking-[-0.01em] text-ink">
            Labor items · {WEST_HIGHLANDS.title}
          </div>
          <div className="mt-[2px] text-[10.5px] text-muted">
            Labor + installation only — homeowner is supplying materials. Flag
            anything that needs a site visit as TBD.
          </div>
        </div>
        <span className="whitespace-nowrap text-[10.5px] font-semibold text-muted">
          Step 3 of 6
        </span>
      </div>

      <div className="mt-3 flex items-center gap-[10px] rounded-[8px] border border-line bg-surface p-[9px_11px]">
        <div>
          <div className="text-[9px] font-semibold uppercase tracking-[0.05em] text-muted">
            Running total (excluding TBD)
          </div>
          <div className="text-[19px] font-bold tabular-nums tracking-[-0.02em] text-navy">
            {dollars(v.total)}
          </div>
        </div>
        {tbdChip}
      </div>

      <div className="mt-[10px]">
        {LINE_ITEMS.map((li, i) => (
          <div
            key={li.name}
            className="flex items-center gap-[10px] py-[6px]"
            style={{ borderBottom: `1px solid ${HAIRLINE}`, ...fadeUp(v.rows > i, 8) }}
          >
            <span className="flex-1 text-[11.5px] font-semibold leading-[1.3] text-ink">
              {li.name}
              <i className="mt-px block text-[9.5px] font-normal not-italic text-muted">
                {li.detail}
              </i>
            </span>
            <span
              className="min-w-[56px] rounded-[4px] border px-2 py-[3px] text-right text-[11.5px] font-semibold tabular-nums text-ink"
              style={{ borderColor: BOX_BORDER }}
            >
              {li.amount.toLocaleString("en-US")}
            </span>
          </div>
        ))}

        <div
          className="-mx-[7px] flex items-center gap-[10px] rounded-[4px] px-[7px] py-[6px]"
          style={{
            background: v.tbd ? "var(--color-tbd-row)" : "transparent",
            ...fadeUp(v.rows > LINE_ITEMS.length, 8),
            transition: `opacity 300ms ${EASE}, transform 340ms ${EASE}, background 300ms ${EASE}`,
          }}
        >
          <span className="flex-1 text-[11.5px] font-semibold leading-[1.3] text-ink">
            {TBD_ITEM.name}
            <i className="mt-px block text-[9.5px] font-normal not-italic text-muted">
              {TBD_ITEM.bidDetail}
            </i>
          </span>
          <span
            className="rounded-[4px] border px-2 py-[3px] text-[9.5px] font-semibold"
            style={{
              borderColor: v.tbd ? "var(--color-tbd-border)" : BOX_BORDER,
              background: v.tbd ? "var(--color-tbd-bg)" : "#fff",
              color: v.tbd ? "var(--color-tbd)" : "#6b7280",
              transition: `all 300ms ${EASE}`,
            }}
          >
            TBD
          </span>
          <span
            className="min-w-[56px] rounded-[4px] px-2 py-[3px] text-right text-[11.5px] font-semibold tabular-nums"
            style={{
              border: `1px ${v.tbd ? "dashed var(--color-tbd-border)" : `solid ${BOX_BORDER}`}`,
              color: v.tbd ? "#6b7280" : "#111827",
              transition: `all 300ms ${EASE}`,
            }}
          >
            {v.tbd ? "—" : TBD_ITEM.preTbdAmount.toLocaleString("en-US")}
          </span>
        </div>
      </div>

      <div className="mt-auto pt-[14px]" style={meterStyle}>
        <div className="rounded-[12px] border border-line p-[13px_14px] shadow-brand-sm">
          <div className="flex items-end justify-between gap-3">
            <div>
              <div className="text-[9px] font-bold uppercase tracking-[0.06em] text-muted">
                Your bid range
              </div>
              <div className="mt-[2px] text-[22px] font-bold tabular-nums tracking-[-0.025em] text-tbd">
                {dollars(BID_RANGE.min)} – {dollars(BID_RANGE.max)}
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-muted">
                Calculated from {LINE_ITEMS.length} line items ·{" "}
                {dollars(PRICED_TOTAL)}
              </div>
              <div
                className="mt-[2px] text-[10.5px] font-semibold"
                style={{ color: GREEN }}
              >
                Brackets their {dollars(WEST_HIGHLANDS.budget)} budget
              </div>
            </div>
          </div>

          <div className="mt-[13px]">
            <div className="flex items-center gap-[5px] text-[9.5px] text-muted">
              <span className="size-2 rounded-[2px] bg-brand" />
              Your range
            </div>
            <div className="relative mt-[6px] h-[6px] rounded-[3px] bg-[#f3f4f6]">
              <div
                className="absolute inset-y-0 rounded-[3px] bg-brand"
                style={{
                  left: `${pct(BID_RANGE.min)}%`,
                  width: barWidth,
                  transition: `width 700ms ${EASE}`,
                }}
              />
            </div>
          </div>

          <div className="mt-[10px]">
            <div className="flex items-center gap-[5px] text-[9.5px] text-muted">
              <span className="size-2 rounded-[2px] bg-promo-dot/60" />
              Homeowner’s budget
            </div>
            <div className="relative mt-[6px] h-[6px] rounded-[3px] bg-[#f3f4f6]">
              <div
                className="absolute -inset-y-[2px] w-[3px] rounded-[2px] bg-promo-dot"
                style={{ left: `${pct(WEST_HIGHLANDS.budget)}%`, marginLeft: -1.5 }}
              />
            </div>
          </div>

          <div className="mt-[7px] flex justify-between text-[9px] text-muted">
            <span>$0</span>
            <span className="font-semibold text-slate">
              {dollars(WEST_HIGHLANDS.budget)} budget
            </span>
            <span>{dollars(RANGE_SCALE_MAX)}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const mobile = (
    <div className="absolute inset-0 flex flex-col overflow-hidden rounded-[16px] border border-line bg-white shadow-brand-xl">
      <div className="border-b border-line p-[12px_14px_10px]">
        <div className="text-[14px] font-bold text-ink">Your bid</div>
        <div className="mt-px text-[10.5px] text-muted">
          Labor + installation only
        </div>
      </div>

      <div className="flex-1 overflow-hidden p-[12px_14px]">
        <div className="flex items-center gap-[9px] rounded-[8px] border border-line bg-surface p-[8px_10px]">
          <div>
            <div className="text-[9px] font-semibold uppercase tracking-[0.05em] text-muted">
              Total excl. TBD
            </div>
            <div className="text-[17px] font-bold tabular-nums text-navy">
              {dollars(v.total)}
            </div>
          </div>
          {tbdChip}
        </div>

        <div className="mt-[10px]">
          {MOBILE_NAMES.map((name, i) => (
            <div
              key={name}
              className="flex items-center justify-between gap-2 py-[7px]"
              style={{
                borderBottom: `1px solid ${HAIRLINE}`,
                ...fadeUp(v.rows > i, 8),
              }}
            >
              <span className="text-[11.5px] text-slate">{name}</span>
              <span className="text-[12px] font-bold tabular-nums text-ink">
                {dollars(LINE_ITEMS[i].amount)}
              </span>
            </div>
          ))}
          <div
            className="-mx-2 flex items-center justify-between gap-2 rounded-[6px] px-2 py-[7px]"
            style={{
              background: v.tbd ? "var(--color-tbd-row)" : "transparent",
              ...fadeUp(v.rows > MOBILE_NAMES.length, 8),
              transition: `opacity 300ms ${EASE}, transform 340ms ${EASE}, background 300ms ${EASE}`,
            }}
          >
            <span className="flex-1 text-[11.5px] text-slate">
              {TBD_ITEM.shortName}
            </span>
            <span className="text-[11px] font-bold text-tbd">TBD</span>
          </div>
        </div>
      </div>

      <div
        className="border-t border-line bg-surface p-[11px_14px_13px]"
        style={meterStyle}
      >
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-[9px] font-semibold uppercase tracking-[0.06em] text-muted">
            Your range
          </span>
          <span className="text-[13px] font-bold tabular-nums text-tbd">
            {dollars(BID_RANGE.min)} – {dollars(BID_RANGE.max)}
          </span>
        </div>
        <div className="relative mt-2 h-[6px] rounded-[3px] bg-line">
          <div
            className="absolute inset-y-0 rounded-[3px] bg-brand"
            style={{
              left: `${pct(BID_RANGE.min)}%`,
              width: barWidth,
              transition: `width 700ms ${EASE}`,
            }}
          />
          <div
            className="absolute -inset-y-[3px] w-[3px] rounded-[2px] bg-promo-dot"
            style={{ left: `${pct(WEST_HIGHLANDS.budget)}%`, marginLeft: -1.5 }}
          />
        </div>
        <div
          className="mt-[7px] text-[10px] font-semibold"
          style={{ color: GREEN }}
        >
          Brackets their {dollars(WEST_HIGHLANDS.budget)} budget
        </div>
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
