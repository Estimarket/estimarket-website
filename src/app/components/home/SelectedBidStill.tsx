import {
  COMPARE_BIDS,
  KITCHEN,
  THREAD,
  VISIT_DAYS,
  VISIT_TIMES,
  VISIT_WEEKDAY_LONG,
  dollars,
} from "./homeDemoData";
import { BareSlot } from "./HomeStage";

// Slot 3 — Step 03, Pick the best bid (still). The conversation with the
// chosen pro in its bid-selected state, from MessageThread.tsx plus the bid
// strip in messages/[jobId]/page.tsx, with the site-visit picker over it.
//
// The all-conversations rail is deliberately absent: this slot is about one
// selected bid. The picker overlaps the composer by design — in the product
// it is a modal over that screen — but must never cover the bid strip or
// either message bubble.

const DESKTOP = { w: 624, h: 594 };
const MOBILE = { w: 342, h: 420 };

const CHOSEN = COMPARE_BIDS.find((b) => b.visitRequested)!;
const SELECTED_TIME = VISIT_TIMES.find((t) => t.selected)!.label;
const REQUEST_LABEL = `Request ${VISIT_WEEKDAY_LONG} at ${SELECTED_TIME}`;

/** "Bid selected" is the real chip for outcome === "site_visit" | "accepted";
 * scheduling the visit is what flips it. */
const SELECTED_CHIP = "rgba(143,192,137,0.25)";
const FILL = "#f3f4f6";

function Avatar({
  initials,
  size,
  tone = "navy",
}: {
  initials: string;
  size: number;
  tone?: "navy" | "accent";
}) {
  return (
    <span
      className={`grid flex-none place-items-center rounded-full font-bold text-white ${
        tone === "navy" ? "bg-navy" : "bg-accent"
      }`}
      style={{ width: size, height: size, fontSize: size <= 28 ? 10 : 12.5 }}
    >
      {initials}
    </span>
  );
}

function BidStrip({ size }: { size: "desktop" | "mobile" }) {
  const d = size === "desktop";
  return (
    <div
      className={`flex items-center gap-[10px] border-b border-line ${d ? "p-[12px_18px]" : "p-[9px_14px]"}`}
      style={{ background: "rgba(243,244,246,0.6)" }}
    >
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-[7px]">
          <span className={`font-bold text-ink ${d ? "text-[14px]" : "text-[13px]"}`}>
            {KITCHEN.title}
          </span>
          <span
            className={`rounded-full px-2 py-[2px] font-semibold text-ink ${d ? "text-[11px]" : "text-[10.5px]"}`}
            style={{ background: SELECTED_CHIP }}
          >
            Bid selected
          </span>
        </div>
        <div
          className={`mt-[2px] tabular-nums text-muted ${d ? "text-[12px]" : "text-[11.5px]"}`}
        >
          {dollars(CHOSEN.min)} – {dollars(CHOSEN.max)}
        </div>
      </div>
      <span
        className={`inline-flex flex-none items-center whitespace-nowrap rounded-[8px] border border-line bg-white font-semibold text-ink ${
          d ? "h-[34px] px-[13px] text-[12.5px]" : "h-[30px] px-[11px] text-[11.5px]"
        }`}
      >
        View bid
      </span>
    </div>
  );
}

function Bubble({
  message,
  size,
}: {
  message: (typeof THREAD.messages)[number];
  size: "desktop" | "mobile";
}) {
  const d = size === "desktop";
  const mine = message.from === "homeowner";
  return (
    <div
      className={`flex items-end ${d ? "gap-[9px]" : "gap-2"} ${mine ? "flex-row-reverse" : ""}`}
    >
      <Avatar
        initials={message.initials}
        size={d ? 28 : 26}
        tone={mine ? "accent" : "navy"}
      />
      <div className="max-w-[78%]">
        <div
          className={
            d
              ? "rounded-[16px] p-[10px_15px] text-[13px] leading-[1.55]"
              : "rounded-[14px] p-[9px_12px] text-[12px] leading-[1.5]"
          }
          style={
            mine
              ? { background: "var(--color-tbd)", color: "#fff" }
              : { background: FILL, color: "var(--color-ink)" }
          }
        >
          {d ? message.body : message.mobileBody}
        </div>
        <div
          className={`text-muted ${d ? "mt-1 text-[11px]" : "mt-[2px] text-[10px]"} ${mine ? "text-right" : ""}`}
        >
          {message.time}
        </div>
      </div>
    </div>
  );
}

function DayPill({
  day,
  size,
}: {
  day: (typeof VISIT_DAYS)[number];
  size: "desktop" | "mobile";
}) {
  const d = size === "desktop";
  return (
    <div
      className={`flex flex-1 flex-col items-center rounded-[8px] border py-1 ${
        day.selected ? "border-accent bg-accent/10" : "border-line"
      }`}
    >
      <span
        className={`text-[9px] font-bold uppercase ${day.selected ? "text-ink" : "text-muted"}`}
      >
        {day.weekday}
      </span>
      <span className={`font-bold text-ink ${d ? "text-[13.5px]" : "text-[13px]"}`}>
        {day.date}
      </span>
    </div>
  );
}

function TimeSlot({
  time,
  size,
}: {
  time: (typeof VISIT_TIMES)[number];
  size: "desktop" | "mobile";
}) {
  const d = size === "desktop";
  return (
    <div
      className={`grid place-items-center rounded-[8px] border font-semibold ${
        d ? "h-7 text-[11.5px]" : "h-[26px] text-[11px]"
      } ${time.selected ? "border-accent bg-accent/10 text-ink" : "border-line text-muted"}`}
    >
      {time.label}
    </div>
  );
}

function PickerLabel({ children }: { children: string }) {
  return (
    <div className="text-[9.5px] font-bold uppercase tracking-[0.05em] text-muted">
      {children}
    </div>
  );
}

function PickerBody({ size }: { size: "desktop" | "mobile" }) {
  const d = size === "desktop";
  const days = d ? VISIT_DAYS.slice(0, 5) : VISIT_DAYS.slice(1, 5);
  const times = d
    ? [VISIT_TIMES[0], VISIT_TIMES[1], VISIT_TIMES[3]]
    : [VISIT_TIMES[0], VISIT_TIMES[1], VISIT_TIMES[3]];
  return (
    <>
      <div className="flex items-start justify-between gap-[10px]">
        <div>
          <div
            className={`font-bold tracking-[-0.01em] text-ink ${d ? "text-[14px]" : "text-[13px]"}`}
          >
            Schedule a site visit
          </div>
          <div className={`mt-px text-muted ${d ? "text-[11px]" : "text-[10.5px]"}`}>
            with {CHOSEN.company}
          </div>
        </div>
        <span className="text-[12px] text-muted">✕</span>
      </div>

      {d && (
        <div className="mt-[11px]">
          <PickerLabel>Pick a day</PickerLabel>
        </div>
      )}
      <div className={`flex gap-[6px] ${d ? "mt-[6px]" : "mt-2"}`}>
        {days.map((day) => (
          <DayPill key={day.date} day={day} size={size} />
        ))}
      </div>

      {d && (
        <div className="mt-[11px]">
          <PickerLabel>Pick a time</PickerLabel>
        </div>
      )}
      <div className={`grid grid-cols-3 gap-[6px] ${d ? "mt-[6px]" : "mt-[7px]"}`}>
        {times.map((t) => (
          <TimeSlot key={t.label} time={t} size={size} />
        ))}
      </div>

      <div
        className={`grid place-items-center rounded-[9px] bg-accent font-bold text-white ${
          d ? "mt-[11px] h-[34px] text-[12px]" : "mt-[9px] h-8 text-[11.5px]"
        }`}
      >
        {REQUEST_LABEL}
      </div>
    </>
  );
}

function Desktop() {
  return (
    <>
      <div className="absolute inset-x-0 top-0 flex h-[404px] overflow-hidden rounded-[18px] border border-line bg-white shadow-brand-xl">
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center gap-3 border-b border-line p-[13px_18px]">
            <Avatar initials={CHOSEN.initials} size={38} />
            <div className="min-w-0 flex-1">
              <div className="text-[15px] font-bold tracking-[-0.01em] text-ink">
                {CHOSEN.company}
              </div>
              <div className="mt-px text-[12px] text-muted">
                {THREAD.contact} · {THREAD.presence}
              </div>
            </div>
          </div>

          <BidStrip size="desktop" />

          <div className="flex flex-1 flex-col gap-3 overflow-hidden p-[16px_18px]">
            <div className="flex justify-center">
              <span
                className="rounded-full px-3 py-1 text-[11px] font-semibold text-muted"
                style={{ background: FILL }}
              >
                {THREAD.dayPill}
              </span>
            </div>
            {THREAD.messages.map((m) => (
              <Bubble key={m.time} message={m} size="desktop" />
            ))}
          </div>

          <div className="flex items-center gap-[9px] border-t border-line p-[12px_16px]">
            <span className="grid size-[34px] place-items-center rounded-[8px] text-[14px] text-muted">
              📎
            </span>
            <div className="flex h-10 flex-1 items-center rounded-[8px] border border-line px-[13px] text-[13px] text-muted">
              Type a message…
            </div>
            <span className="grid size-10 flex-none place-items-center rounded-[8px] bg-accent">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-[18px]"
              >
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
            </span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 w-[380px] rounded-[16px] border border-line bg-white p-[15px] shadow-brand-2xl">
        <PickerBody size="desktop" />
      </div>
    </>
  );
}

function Mobile() {
  return (
    <>
      <div className="absolute inset-0 flex flex-col overflow-hidden rounded-[16px] border border-line bg-white shadow-brand-xl">
        <div className="flex items-center gap-[10px] border-b border-line p-[10px_14px]">
          <Avatar initials={CHOSEN.initials} size={34} />
          <div className="min-w-0 flex-1">
            <div className="text-[13px] font-bold text-ink">{CHOSEN.company}</div>
            <div className="mt-px text-[10.5px] text-muted">{THREAD.presence}</div>
          </div>
        </div>

        <BidStrip size="mobile" />

        {/* Tight on purpose: the sheet below overlays ~186px of this 420px
            stage, and the rule is that it may cover the composer but never a
            message bubble. */}
        <div className="flex flex-1 flex-col gap-[6px] overflow-hidden p-[10px_14px]">
          {THREAD.messages.map((m) => (
            <Bubble key={m.time} message={m} size="mobile" />
          ))}
        </div>
      </div>

      <div
        className="absolute inset-x-0 bottom-0 rounded-[18px_18px_15px_15px] bg-white p-[11px_14px_12px]"
        style={{ boxShadow: "0 -12px 30px rgba(14,33,75,0.18)" }}
      >
        <PickerBody size="mobile" />
      </div>
    </>
  );
}

export default function SelectedBidStill() {
  return (
    <BareSlot
      desktop={{ ...DESKTOP, content: <Desktop /> }}
      mobile={{ ...MOBILE, content: <Mobile /> }}
    />
  );
}
