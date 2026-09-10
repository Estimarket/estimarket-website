import { COMPARE_BIDS, KITCHEN, dollars, midpoint, type CompareBid } from "./homeDemoData";
import { StepSlot } from "./HomeStage";

// Slot 4 — Compare and choose (static). The homeowner's All Bids view from
// apps/web (homeowner)/projects/[jobId]/BidsList.tsx, sorted low → high.
//
// Mountain Crest is the chosen bid and deliberately not the cheapest: the
// promise is the best bid, not the lowest. Its CTA carries the real
// `outcome === "site_visit"` state.

const GREEN = "#16a34a";

const CHIP_TONES = {
  good: {
    borderColor: "rgba(22,163,74,0.4)",
    background: "rgba(22,163,74,0.1)",
    color: GREEN,
  },
  tbd: { borderColor: "#c9c9f0", background: "#eeeefb", color: "#4f46e5" },
  neutral: { borderColor: "#e5e7eb", background: "#f9fafb", color: "#6b7280" },
};

type ChipSpec = { label: string; tone: keyof typeof CHIP_TONES };

function chipsFor(bid: CompareBid): ChipSpec[] {
  const chips: ChipSpec[] = [
    { label: bid.startDate, tone: "neutral" },
    bid.tbds === 0
      ? { label: "No TBDs", tone: "good" }
      : { label: `${bid.tbds} TBD${bid.tbds > 1 ? "s" : ""}`, tone: "tbd" },
    { label: `${bid.lineItems} line items`, tone: "neutral" },
  ];
  if (bid.withinBudget) chips.push({ label: "Within budget", tone: "good" });
  return chips;
}

function Chip({ spec, size }: { spec: ChipSpec; size: "desktop" | "mobile" }) {
  return (
    <span
      className={`flex-none whitespace-nowrap rounded-[4px] border px-[5px] py-px font-semibold ${
        size === "desktop" ? "text-[9px]" : "text-[9.5px]"
      }`}
      style={CHIP_TONES[spec.tone]}
    >
      {spec.label}
    </span>
  );
}

function Avatar({ initials, size }: { initials: string; size: 32 | 38 }) {
  return (
    <span
      className="grid flex-none place-items-center rounded-full bg-navy text-[11px] font-bold text-white"
      style={{ width: size, height: size }}
    >
      {initials}
    </span>
  );
}

function NewBadge({ size }: { size: "desktop" | "mobile" }) {
  return (
    <span
      className={`rounded-[3px] bg-accent px-[5px] py-px font-bold text-white ${
        size === "desktop" ? "text-[8.5px]" : "text-[9px]"
      }`}
    >
      NEW
    </span>
  );
}

function Cta({ chosen }: { chosen?: boolean }) {
  return (
    <div className="mt-[7px] flex justify-end gap-[6px]">
      <span
        className="inline-flex h-[26px] items-center whitespace-nowrap rounded-[6px] bg-accent px-[11px] text-[10px] font-bold text-white"
        style={chosen ? { opacity: 0.6 } : undefined}
      >
        {chosen ? "Visit requested" : "Schedule visit"}
      </span>
      <span className="inline-flex h-[26px] items-center whitespace-nowrap rounded-[6px] border border-line bg-white px-[11px] text-[10px] font-semibold text-ink">
        View bid
      </span>
    </div>
  );
}

function DesktopCard({ bid }: { bid: CompareBid }) {
  const chosen = bid.visitRequested;
  return (
    <div
      className="flex items-center gap-[11px] rounded-[12px] bg-white p-[11px_12px]"
      style={
        chosen
          ? {
              border: "1.5px solid var(--color-accent)",
              boxShadow: "var(--shadow-brand-md)",
            }
          : {
              border: "1px solid var(--color-line)",
              boxShadow: bid.initials === "FC" ? undefined : "var(--shadow-brand-sm)",
            }
      }
    >
      <Avatar initials={bid.initials} size={38} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-[6px]">
          {bid.isNew && <NewBadge size="desktop" />}
          <span className="text-[12.5px] font-bold tracking-[-0.01em] text-ink">
            {bid.company}
          </span>
        </div>
        <div className="mt-[2px] text-[10px] text-muted">
          <span className="text-gold">★</span> {bid.rating} · {bid.jobs} jobs ·{" "}
          {bid.city}
        </div>
        {/* Chips wrap as whole units rather than clipping: the slot has room
            to spare vertically, and the chosen card's wider CTA leaves this
            column narrower than the others. */}
        <div className="mt-[6px] flex flex-wrap gap-1">
          {chipsFor(bid).map((spec) => (
            <Chip key={spec.label} spec={spec} size="desktop" />
          ))}
        </div>
      </div>
      <div className="flex-none text-right">
        <div
          className="text-[14px] font-bold tabular-nums tracking-[-0.01em]"
          style={{ color: GREEN }}
        >
          {dollars(bid.min)} – {dollars(bid.max)}
        </div>
        <div className="text-[9.5px] text-muted">est. {dollars(midpoint(bid))}</div>
        <Cta chosen={chosen} />
      </div>
    </div>
  );
}

/** Mobile shows three cards, with chips and CTAs only where they fit. */
function MobileCard({
  bid,
  show,
}: {
  bid: CompareBid;
  show?: "chips" | "ctas";
}) {
  const chosen = bid.visitRequested;
  return (
    <div
      className="rounded-[12px] bg-white p-[10px_11px]"
      style={
        chosen
          ? {
              border: "1.5px solid var(--color-accent)",
              boxShadow: "0 4px 6px rgba(14,33,75,0.08)",
            }
          : {
              border: "1px solid var(--color-line)",
              boxShadow: "0 1px 3px rgba(14,33,75,0.1)",
            }
      }
    >
      <div className="flex items-center gap-[9px]">
        <Avatar initials={bid.initials} size={32} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-[5px]">
            {bid.isNew && <NewBadge size="mobile" />}
            <span className="text-[12.5px] font-bold text-ink">{bid.company}</span>
          </div>
          <div className="mt-[2px] text-[10px] text-muted">
            <span className="text-gold">★</span> {bid.rating} · {bid.jobs} jobs
            {bid.tbds > 0 && ` · ${bid.tbds} TBDs`}
          </div>
        </div>
        <div className="flex-none text-right">
          <div
            className="text-[12.5px] font-bold tabular-nums"
            style={{ color: GREEN }}
          >
            {dollars(bid.min)} – {dollars(bid.max)}
          </div>
          <div className="text-[9.5px] text-muted">est. {dollars(midpoint(bid))}</div>
        </div>
      </div>

      {show === "chips" && (
        <div className="mt-2 flex gap-[5px]">
          {chipsFor(bid)
            .filter((c) => c.tone === "good")
            .map((spec) => (
              <Chip key={spec.label} spec={spec} size="mobile" />
            ))}
        </div>
      )}
      {show === "ctas" && <Cta chosen={chosen} />}
    </div>
  );
}

const FILTERS = [
  { label: "All", count: 4, active: true },
  { label: "New", count: 2 },
  { label: "Detailed line items", count: 3 },
  { label: "No TBDs", count: 2 },
];

function Desktop() {
  return (
    <>
      <div className="p-[14px_18px_0]">
        <div className="text-[14px] font-bold tracking-[-0.01em] text-ink">
          {KITCHEN.title} · all bids
        </div>
        <div className="mt-px text-[10px] text-muted">
          {KITCHEN.bidCount} bids · {dollars(KITCHEN.budget)} budget · compare the
          midpoint of each range
        </div>
        <div className="mt-3 flex items-center justify-between gap-[10px]">
          <div className="flex gap-[6px]">
            {FILTERS.map((f) => (
              <span
                key={f.label}
                className={`inline-flex items-center gap-[5px] rounded-full px-[10px] py-1 text-[10px] font-semibold ${
                  f.active
                    ? "border border-ink bg-ink text-white"
                    : "border border-line bg-white text-muted"
                }`}
              >
                {f.label}{" "}
                <span className={f.active ? "text-white/70" : undefined}>
                  {f.count}
                </span>
              </span>
            ))}
          </div>
          <span className="inline-flex items-center gap-[5px] whitespace-nowrap text-[10px] font-semibold text-muted">
            Sort · Price low to high <span className="text-ink">⇅</span>
          </span>
        </div>
      </div>

      <div className="absolute inset-x-[18px] bottom-0 top-[106px] flex flex-col gap-2">
        {COMPARE_BIDS.map((bid) => (
          <DesktopCard key={bid.company} bid={bid} />
        ))}
      </div>
    </>
  );
}

function Mobile() {
  return (
    <>
      <div className="p-[12px_14px_10px]">
        <div className="text-[14px] font-bold tracking-[-0.01em] text-ink">
          All bids · {KITCHEN.title}
        </div>
        <div className="mt-1 flex items-center justify-between gap-2">
          <span className="text-[10.5px] text-muted">
            {KITCHEN.bidCount} bids · {dollars(KITCHEN.budget)} budget
          </span>
          <span className="text-[10.5px] font-semibold text-muted">
            Price low → high ⇅
          </span>
        </div>
      </div>

      <div className="absolute inset-x-[14px] top-[62px] flex flex-col gap-2">
        <MobileCard bid={COMPARE_BIDS[0]} show="chips" />
        <MobileCard bid={COMPARE_BIDS[1]} show="ctas" />
        <MobileCard bid={COMPARE_BIDS[2]} />
      </div>
    </>
  );
}

export default function CompareBidsStill() {
  return <StepSlot tone="surface" desktop={<Desktop />} mobile={<Mobile />} />;
}
