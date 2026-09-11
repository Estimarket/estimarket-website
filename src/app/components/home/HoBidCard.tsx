import { dollars, midpoint, type CompareBid } from "./homeDemoData";

// The homeowner's bid row from apps/web (homeowner)/projects/[jobId]/BidsList.tsx,
// in the three sizes /homeowners uses: the hero's All Bids card, the step-02
// live feed, and the compact mobile list.
//
// A contractor's bid is always a range; the `est.` beneath it is the midpoint,
// which is what the product tells homeowners to compare.

const GREEN = "#16a34a";

const TONES = {
  good: {
    borderColor: "rgba(22,163,74,0.4)",
    background: "rgba(22,163,74,0.1)",
    color: GREEN,
  },
  tbd: { borderColor: "#c9c9f0", background: "#eeeefb", color: "#4f46e5" },
  neutral: { borderColor: "#e5e7eb", background: "#f9fafb", color: "#6b7280" },
};

function Chip({
  label,
  tone,
  size,
}: {
  label: string;
  tone: keyof typeof TONES;
  size: number;
}) {
  return (
    <span
      className="flex-none whitespace-nowrap rounded-[4px] border px-[7px] py-[2px] font-semibold"
      style={{ ...TONES[tone], fontSize: size }}
    >
      {label}
    </span>
  );
}

function Avatar({ initials, size }: { initials: string; size: number }) {
  return (
    <span
      className="grid flex-none place-items-center rounded-full bg-navy font-bold text-white"
      style={{ width: size, height: size, fontSize: size <= 30 ? 10.5 : 12.5 }}
    >
      {initials}
    </span>
  );
}

function Meta({ bid, size, city }: { bid: CompareBid; size: number; city: boolean }) {
  return (
    <div className="text-muted" style={{ fontSize: size, marginTop: 2 }}>
      <span className="text-gold">★</span> {bid.rating} · {bid.jobs} jobs
      {city && ` · ${bid.city}`}
    </div>
  );
}

function Range({
  bid,
  size,
  estSize,
}: {
  bid: CompareBid;
  size: number;
  estSize: number;
}) {
  return (
    <>
      <div
        className="font-bold tabular-nums tracking-[-0.01em]"
        style={{ color: GREEN, fontSize: size }}
      >
        {dollars(bid.min)} – {dollars(bid.max)}
      </div>
      <div className="text-muted" style={{ fontSize: estSize }}>
        est. {dollars(midpoint(bid))}
      </div>
    </>
  );
}

/** The hero's All Bids card rows — the fullest treatment: NEW badge, chips
 * and, on all but the last row, the two CTAs. */
export function HeroBidRow({ bid, cta }: { bid: CompareBid; cta: boolean }) {
  const chosen = bid.visitRequested;
  return (
    <div
      className="flex items-center gap-3 rounded-[12px] p-3"
      style={
        chosen
          ? {
              border: "1.5px solid var(--color-accent)",
              boxShadow: "var(--shadow-brand-md)",
            }
          : {
              border: "1px solid var(--color-line)",
              boxShadow: cta ? "var(--shadow-brand-sm)" : undefined,
            }
      }
    >
      <Avatar initials={bid.initials} size={42} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-[7px]">
          {bid.isNew && (
            <span className="rounded-[4px] bg-accent px-[6px] py-px text-[10px] font-bold text-white">
              NEW
            </span>
          )}
          <span className="text-[14px] font-bold tracking-[-0.01em] text-ink">
            {bid.company}
          </span>
        </div>
        <Meta bid={bid} size={11.5} city />
        <div className="mt-[7px] flex flex-wrap gap-[6px]">
          {bid.tbds === 0 ? (
            <Chip label="No TBDs" tone="good" size={10.5} />
          ) : (
            <Chip label={`${bid.tbds} TBDs`} tone="tbd" size={10.5} />
          )}
          <Chip label={`${bid.lineItems} line items`} tone="neutral" size={10.5} />
          {bid.withinBudget && (
            <Chip label="Within budget" tone="good" size={10.5} />
          )}
        </div>
      </div>
      <div className="flex-none text-right">
        <Range bid={bid} size={16} estSize={11} />
        {cta && (
          <div className="mt-[9px] flex justify-end gap-[7px]">
            <span className="inline-flex h-[30px] items-center whitespace-nowrap rounded-[7px] bg-accent px-3 text-[11.5px] font-bold text-white">
              Schedule visit
            </span>
            <span className="inline-flex h-[30px] items-center whitespace-nowrap rounded-[7px] border border-line bg-white px-3 text-[11.5px] font-semibold text-ink">
              View bid
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/** Step 02's live feed row — no CTAs, one line-items chip. */
export function FeedBidRow({ bid, style }: { bid: CompareBid; style?: React.CSSProperties }) {
  return (
    <div
      className="flex items-center gap-3 rounded-[12px] border border-line p-[11px_12px] shadow-brand-sm"
      style={style}
    >
      <Avatar initials={bid.initials} size={40} />
      <div className="min-w-0 flex-1">
        <div className="text-[13.5px] font-bold tracking-[-0.01em] text-ink">
          {bid.company}
        </div>
        <Meta bid={bid} size={11} city />
        <div className="mt-[6px] flex gap-[6px]">
          <Chip label={`${bid.lineItems} line items`} tone="neutral" size={10} />
        </div>
      </div>
      <div className="flex-none text-right">
        <Range bid={bid} size={15} estSize={10.5} />
      </div>
    </div>
  );
}

/** The compact row both mobile compositions use. */
export function CompactBidRow({
  bid,
  selected,
  style,
}: {
  bid: CompareBid;
  selected?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className="flex items-center gap-[9px] rounded-[10px] p-[9px]"
      style={{
        border: selected
          ? "1.5px solid var(--color-accent)"
          : "1px solid var(--color-line)",
        ...style,
      }}
    >
      <Avatar initials={bid.initials} size={30} />
      <div className="min-w-0 flex-1">
        <div className="text-[12px] font-bold text-ink">{bid.company}</div>
        <div className="mt-px text-[10px] text-muted">
          <span className="text-gold">★</span> {bid.rating} · {bid.jobs} jobs
        </div>
      </div>
      <div className="flex-none text-right">
        <div
          className="text-[12px] font-bold tabular-nums"
          style={{ color: GREEN }}
        >
          {dollars(bid.min)} – {dollars(bid.max)}
        </div>
        <div className="text-[9.5px] text-muted">est. {dollars(midpoint(bid))}</div>
      </div>
    </div>
  );
}

/** The rounded-pill filter chips both All Bids surfaces carry. */
export function FilterPill({
  label,
  count,
  active,
}: {
  label: string;
  count: number;
  active?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-[6px] whitespace-nowrap rounded-full px-3 py-[5px] text-[11.5px] font-semibold ${
        active
          ? "border border-ink bg-ink text-white"
          : "border border-line bg-white text-muted"
      }`}
    >
      {label} <span className={active ? "text-white/70" : undefined}>{count}</span>
    </span>
  );
}
