"use client";

import { useMemo, useRef, useState } from "react";
import useSceneTimeline, {
  useCountUp,
  type TimelineStep,
} from "../campaign/useSceneTimeline";
import {
  BID_RANGE,
  LINE_ITEMS,
  PRICED_TOTAL,
  RANGE_SCALE_MAX,
  TBD_ITEM,
  BATH,
  dollars,
} from "./homeDemoData";
import { StepSlot } from "./HomeStage";

// Slot 3 — Contractors bid (animated). Two phases of the real bid flow:
// (bid)/projects/[jobId]/bid/line-items, then …/bid/range.
//
// The rows stagger in, the running total counts up, the last item flips to
// TBD — excluded from the total, never an allowance — and the pane cross-fades
// to Set bid range while the left rail advances.

const EASE = "var(--ease-enter)";
const HAIRLINE = "#f3f4f6";
const KNOB_BORDER = "#d1d5db";

/** Six rows: the five priced line items, then the one flagged TBD. */
const ROW_COUNT = LINE_ITEMS.length + 1;

/** Percent along the shared $0 → $25,000 track. */
const pct = (n: number) => (n / RANGE_SCALE_MAX) * 100;

const RESTING = {
  rows: ROW_COUNT,
  total: PRICED_TOTAL,
  tbd: true,
  banner: true,
  range: true,
};

/** The mobile pane is authored separately: shorter names, a "+ 1 more"
 * stand-in for the fifth item, and the total pinned to a bottom bar. */
const MOBILE_ROWS = [
  { name: "Demo & haul-away", price: 1800 },
  { name: "Rough plumbing", price: 2200 },
  { name: "Shower pan + waterproofing", price: 3100 },
  { name: "Tile — shower walls, 78 sf", price: 3900 },
  { name: "+ 1 more line item", price: 2300 },
];

const RAIL_STEPS = ["Overview", "Questions", "Line items", "Set range", "Notes", "Review"];

function stagger(on: boolean) {
  return {
    opacity: on ? 1 : 0,
    transform: on ? "none" : "translateY(6px)",
    transition: `opacity 260ms ${EASE}, transform 260ms ${EASE}`,
  };
}

function RailRow({
  index,
  label,
  state,
}: {
  index: number;
  label: string;
  state: "done" | "active" | "todo";
}) {
  const dot =
    state === "done"
      ? { background: "#0e214b", border: "1.5px solid #0e214b", color: "#fff" }
      : state === "active"
        ? { background: "#e85d26", border: "1.5px solid #e85d26", color: "#fff" }
        : { background: "transparent", border: `1.5px solid ${KNOB_BORDER}`, color: "#6b7280" };

  return (
    <div
      className="flex items-center gap-[7px] py-1 text-[9.5px]"
      style={{
        fontWeight: state === "active" ? 700 : 400,
        color: state === "active" ? "#111827" : "#6b7280",
      }}
    >
      <span
        className="grid size-[15px] flex-none place-items-center rounded-full text-[7.5px] font-bold"
        style={{ ...dot, transition: `all 300ms ${EASE}` }}
      >
        {state === "done" ? "✓" : index + 1}
      </span>
      {label}
    </div>
  );
}

export default function BidScene() {
  const rootRef = useRef<HTMLDivElement>(null);
  const countUp = useCountUp();
  const [rows, setRows] = useState(0);
  const [total, setTotal] = useState(0);
  const [tbd, setTbd] = useState(false);
  const [banner, setBanner] = useState(false);
  const [range, setRange] = useState(false);

  const steps = useMemo<TimelineStep[]>(() => {
    const s: TimelineStep[] = [
      [
        0,
        () => {
          setRows(0);
          setTotal(0);
          setTbd(false);
          setBanner(false);
          setRange(false);
        },
      ],
      [500, () => countUp(PRICED_TOTAL, 1900, setTotal)],
      [2500, () => setTbd(true)],
      [3000, () => setBanner(true)],
      [4000, () => setRange(true)],
    ];
    for (let i = 0; i < ROW_COUNT; i++) {
      s.push([250 + i * 340, () => setRows(i + 1)]);
    }
    return s;
  }, [countUp]);

  const { reducedMotion } = useSceneTimeline(rootRef, steps);
  const v = reducedMotion ? RESTING : { rows, total, tbd, banner, range };

  const rangeFade = {
    opacity: v.range ? 1 : 0,
    transition: `opacity 400ms ${EASE}`,
  };

  const railState = (i: number): "done" | "active" | "todo" => {
    if (i < 2) return "done";
    if (i === 2) return v.range ? "done" : "active";
    if (i === 3) return v.range ? "active" : "todo";
    return "todo";
  };

  const desktop = (
    <>
      {/* Left rail — where this bid is in the flow */}
      <div className="absolute inset-y-0 left-0 w-[108px] border-r border-line bg-surface p-[14px_10px]">
        <div className="mb-[9px] text-[8px] font-bold uppercase tracking-[0.09em] text-muted">
          Your bid
        </div>
        {RAIL_STEPS.map((label, i) => (
          <RailRow key={label} index={i} label={label} state={railState(i)} />
        ))}
      </div>

      {/* Phase A — labor items */}
      <div className="absolute inset-y-0 left-[108px] right-0 p-[14px_16px]">
        <div className="text-[14px] font-bold tracking-[-0.01em] text-ink">
          Labor items
        </div>
        <div className="m-[2px_0_8px] text-[10px] leading-[1.45] text-muted">
          Labor + installation only — homeowner is supplying materials. Flag
          anything that needs a site visit as TBD.
        </div>

        <div className="mb-[7px] flex items-center gap-[9px] rounded-[8px] border border-line bg-surface p-[7px_10px]">
          <div>
            <div className="text-[8.5px] font-semibold uppercase tracking-[0.05em] text-muted">
              Running total (excluding TBD)
            </div>
            <div className="text-[18px] font-bold tabular-nums tracking-[-0.02em] text-navy">
              {dollars(v.total)}
            </div>
          </div>
          <span
            className="ml-auto inline-flex items-center rounded-full border border-tbd-border bg-tbd-bg px-2 py-[3px] text-[9.5px] font-semibold text-tbd"
            style={{
              opacity: v.tbd ? 1 : 0,
              transition: `opacity 300ms ${EASE}`,
            }}
          >
            1 TBD
          </span>
        </div>

        {LINE_ITEMS.map((item, i) => (
          <div
            key={item.name}
            className="flex items-center gap-[9px] py-[4.5px]"
            style={{ borderBottom: `1px solid ${HAIRLINE}`, ...stagger(v.rows > i) }}
          >
            <span className="flex-1 text-[11px] font-semibold leading-[1.3] text-ink">
              {item.name}
              <i className="mt-px block text-[9px] font-normal not-italic text-muted">
                {item.detail}
              </i>
            </span>
            <span
              className="min-w-[52px] rounded-[4px] border px-[7px] py-[3px] text-right text-[11px] font-semibold tabular-nums text-ink"
              style={{ borderColor: KNOB_BORDER }}
            >
              {item.amount.toLocaleString("en-US")}
            </span>
          </div>
        ))}

        {/* The flagged row: price clears, border goes dashed, row tints */}
        <div
          className="-mx-[7px] flex items-center gap-[9px] rounded-[4px] px-[7px] py-[5px]"
          style={{
            background: v.tbd ? "var(--color-tbd-row)" : "transparent",
            ...stagger(v.rows > LINE_ITEMS.length),
            transition: `opacity 260ms ${EASE}, transform 260ms ${EASE}, background 300ms ${EASE}`,
          }}
        >
          <span className="flex-1 text-[11px] font-semibold leading-[1.3] text-ink">
            {TBD_ITEM.name}
            <i className="mt-px block text-[9px] font-normal not-italic text-muted">
              {TBD_ITEM.bidDetail}
            </i>
          </span>
          <span
            className="rounded-[4px] border px-[7px] py-[3px] text-[9px] font-semibold"
            style={{
              borderColor: v.tbd ? "var(--color-tbd-border)" : KNOB_BORDER,
              background: v.tbd ? "var(--color-tbd-bg)" : "#fff",
              color: v.tbd ? "var(--color-tbd)" : "#6b7280",
              transition: `all 300ms ${EASE}`,
            }}
          >
            TBD
          </span>
          <span
            className="min-w-[52px] rounded-[4px] px-[7px] py-[3px] text-right text-[11px] font-semibold tabular-nums"
            style={{
              border: `1px ${v.tbd ? "dashed var(--color-tbd-border)" : `solid ${KNOB_BORDER}`}`,
              color: v.tbd ? "#6b7280" : "#111827",
              transition: `all 300ms ${EASE}`,
            }}
          >
            {v.tbd ? "—" : TBD_ITEM.preTbdAmount.toLocaleString("en-US")}
          </span>
        </div>

        <div
          className="mt-[10px] flex gap-2 rounded-[8px] border border-tbd-border bg-tbd-bg p-[8px_10px] text-[10px] leading-[1.45] text-slate"
          style={{
            opacity: v.banner ? 1 : 0,
            transform: v.banner ? "none" : "translateY(6px)",
            transition: `opacity 320ms ${EASE}, transform 320ms ${EASE}`,
          }}
        >
          <span className="flex-none font-bold text-tbd">TBD</span>
          <span>
            TBD items aren’t included in your bid total — you’ll confirm them
            after a site visit.
          </span>
        </div>
      </div>

      {/* Phase B — set bid range, cross-fading over the same pane */}
      <div
        className="absolute inset-y-0 left-[108px] right-0 bg-white p-[14px_16px]"
        style={{ ...rangeFade, pointerEvents: "none" }}
      >
        <div className="flex h-full flex-col">
          <div className="text-[14px] font-bold tracking-[-0.01em] text-ink">
            Set your bid range
          </div>
          <div className="m-[2px_0_12px] text-[10px] leading-[1.45] text-muted">
            We calculated a starting point from your line items. Adjust your min
            and max — homeowners compare the midpoint.
          </div>

          <div className="rounded-[12px] border border-line p-[14px] shadow-brand-sm">
            <div className="text-[9px] font-bold uppercase tracking-[0.06em] text-muted">
              Your bid range
            </div>
            <div className="mt-[2px] text-[27px] font-bold tabular-nums tracking-[-0.025em] text-tbd">
              {dollars(BID_RANGE.min)} – {dollars(BID_RANGE.max)}
            </div>
            <div className="mt-[2px] text-[10px] text-muted">
              Defaults from your {LINE_ITEMS.length} line items — min is your
              total, max adds 10%
            </div>

            {/* Two aligned scales on one shared $0 → $25,000 track */}
            <div className="mt-[18px]">
              <div className="flex items-center gap-[5px] text-[9.5px] text-muted">
                <span className="size-2 rounded-[2px] bg-brand" />
                Your range
              </div>
              <div className="relative mt-[6px] h-[6px] rounded-[3px] bg-[#f3f4f6]">
                <div
                  className="absolute inset-y-0 rounded-[3px] bg-brand"
                  style={{
                    left: `${pct(BID_RANGE.min)}%`,
                    width: v.range ? `${pct(BID_RANGE.max - BID_RANGE.min)}%` : 0,
                    transition: `width 700ms ${EASE}`,
                  }}
                />
                {[BID_RANGE.min, BID_RANGE.max].map((n) => (
                  <span
                    key={n}
                    className="absolute top-1/2 size-[13px] rounded-full border-2 border-brand bg-white"
                    style={{ left: `${pct(n)}%`, margin: "-6.5px 0 0 -6.5px" }}
                  />
                ))}
              </div>
            </div>

            <div className="mt-3">
              <div className="flex items-center gap-[5px] text-[9.5px] text-muted">
                <span className="size-2 rounded-[2px] bg-promo-dot/60" />
                Homeowner’s budget
              </div>
              <div className="relative mt-[6px] h-[6px] rounded-[3px] bg-[#f3f4f6]">
                <div
                  className="absolute -inset-y-[2px] w-[3px] rounded-[2px] bg-promo-dot"
                  style={{ left: `${pct(BATH.budget)}%`, marginLeft: -1.5 }}
                />
              </div>
            </div>

            <div className="mt-[7px] flex justify-between text-[9px] text-muted">
              <span>$0</span>
              <span className="font-semibold text-slate">
                {dollars(BATH.budget)} budget
              </span>
              <span>{dollars(RANGE_SCALE_MAX)}</span>
            </div>

            <div className="mt-4 flex gap-3">
              {[
                { label: "Your minimum", value: BID_RANGE.min, focused: false },
                { label: "Your maximum", value: BID_RANGE.max, focused: true },
              ].map((f) => (
                <div key={f.label} className="flex-1">
                  <div className="mb-1 text-[9px] font-bold uppercase tracking-[0.05em] text-tbd">
                    {f.label}
                  </div>
                  <div
                    className="rounded-[6px] border p-[7px_10px] text-[12px] font-bold tabular-nums text-ink"
                    style={{
                      borderColor: f.focused ? "var(--color-tbd)" : "var(--color-line)",
                    }}
                  >
                    {dollars(f.value)}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-[10px] text-[9.5px] font-semibold text-muted">
              ⟲ Reset to calculated default
            </div>
          </div>

          <div className="mt-[10px] rounded-[8px] border border-tbd/30 bg-tbd/10 p-[9px_11px]">
            <div className="text-[10.5px] font-bold text-ink">
              ⚠ TBD — excluded from total
            </div>
            <div className="mt-[2px] text-[10px] text-muted">
              · {TBD_ITEM.name} — confirm after site visit
            </div>
          </div>

          <div className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-[14px]">
            <span className="text-[11px] font-semibold text-muted">← Back</span>
            <span className="inline-flex h-8 items-center rounded-[8px] bg-accent px-4 text-[12px] font-bold text-white">
              Add notes →
            </span>
          </div>
        </div>
      </div>
    </>
  );

  const mobile = (
    <>
      <div className="border-b border-line p-[12px_14px_10px]">
        <div className="text-[14px] font-bold tracking-[-0.01em] text-ink">
          Labor items
        </div>
        <div className="mt-px text-[10.5px] text-muted">
          Labor + installation only · flag TBDs
        </div>
      </div>

      <div className="absolute inset-x-[14px] top-[62px]">
        {MOBILE_ROWS.map((row, i) => (
          <div
            key={row.name}
            className="flex items-center justify-between gap-2 py-[7px]"
            style={{ borderBottom: `1px solid ${HAIRLINE}`, ...stagger(v.rows > i) }}
          >
            <span className="text-[12px] text-slate">{row.name}</span>
            <span className="text-[12.5px] font-bold tabular-nums text-ink">
              {dollars(row.price)}
            </span>
          </div>
        ))}

        <div
          className="-mx-2 flex items-center justify-between gap-2 rounded-[6px] px-2 py-[7px]"
          style={{
            background: v.tbd ? "var(--color-tbd-row)" : "transparent",
            ...stagger(v.rows > MOBILE_ROWS.length),
            transition: `opacity 260ms ${EASE}, transform 260ms ${EASE}, background 300ms ${EASE}`,
          }}
        >
          <span className="text-[12px] text-slate">{TBD_ITEM.shortName}</span>
          <span className="text-[11px] font-bold text-tbd">TBD</span>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 flex h-[66px] items-center justify-between border-t border-line bg-surface px-[14px]">
        <div>
          <div className="text-[9.5px] font-semibold uppercase tracking-[0.06em] text-muted">
            Total excl. TBD
          </div>
          <div className="text-[19px] font-bold tabular-nums tracking-[-0.02em] text-navy">
            {dollars(v.total)}
          </div>
        </div>
        <div className="text-right" style={rangeFade}>
          <div className="text-[9.5px] font-semibold uppercase tracking-[0.06em] text-muted">
            Bid range
          </div>
          <div className="text-[14px] font-bold tabular-nums text-tbd">
            {dollars(BID_RANGE.min)} – {dollars(BID_RANGE.max)}
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
