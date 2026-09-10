import {
  FLOORS,
  VISIT_DAYS,
  VISIT_TIMES,
  VISIT_WEEKDAY_LONG,
} from "./homeDemoData";
import { StepSlot } from "./HomeStage";

// Slot 5 — Final walkthrough (static). apps/web ScheduleVisitModal.tsx over an
// abstracted project page: a dialog on desktop, a bottom sheet on mobile.
//
// The footer label is built from the selected day and slot, the way the real
// component builds it — not hard-coded prose.

const SELECTED_TIME = VISIT_TIMES.find((t) => t.selected)!.label;
const REQUEST_LABEL = `Request ${VISIT_WEEKDAY_LONG} at ${SELECTED_TIME}`;

function DayPill({
  day,
  size,
}: {
  day: (typeof VISIT_DAYS)[number];
  size: "desktop" | "mobile";
}) {
  const desktop = size === "desktop";
  return (
    <div
      className={`flex flex-col items-center rounded-[8px] border ${
        desktop ? "flex-none p-[6px_9px]" : "flex-1 py-[6px]"
      } ${day.selected ? "border-accent bg-accent/10" : "border-line"}`}
    >
      <span
        className={`font-bold uppercase ${desktop ? "text-[8.5px]" : "text-[9px]"} ${
          day.selected ? "text-ink" : "text-muted"
        }`}
      >
        {day.weekday}
      </span>
      <span
        className={`font-bold text-ink ${desktop ? "text-[13px]" : "text-[14px]"}`}
      >
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
  const desktop = size === "desktop";
  return (
    <div
      className={`grid place-items-center rounded-[8px] border font-semibold ${
        desktop ? "h-[30px] text-[11px]" : "h-[34px] text-[11.5px]"
      } ${time.selected ? "border-accent bg-accent/10 text-ink" : "border-line text-muted"}`}
    >
      {time.label}
    </div>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="text-[9.5px] font-bold uppercase tracking-[0.05em] text-muted">
      {children}
    </div>
  );
}

function ModalHeader({ size }: { size: "desktop" | "mobile" }) {
  const desktop = size === "desktop";
  return (
    <div className="flex items-start justify-between gap-[10px]">
      <div>
        <div className="text-[15px] font-bold tracking-[-0.01em] text-ink">
          Schedule a site visit
        </div>
        <div className="mt-[2px] text-[11px] text-muted">
          with {FLOORS.contractor}
        </div>
      </div>
      <span className={`text-muted ${desktop ? "text-[12px]" : "text-[13px]"}`}>
        ✕
      </span>
    </div>
  );
}

/** The project page behind the modal, abstracted to placeholder bid rows. */
function Backdrop({ size }: { size: "desktop" | "mobile" }) {
  const desktop = size === "desktop";
  const rows = desktop ? 4 : 3;
  return (
    <>
      <div className={`absolute inset-0 ${desktop ? "p-[16px_20px]" : "p-[14px]"}`}>
        <div className="text-[13px] font-bold text-ink">{FLOORS.title}</div>
        <div
          className={`mt-[2px] text-muted ${desktop ? "text-[10px]" : "text-[10.5px]"}`}
        >
          {desktop
            ? FLOORS.metaLine
            : `${FLOORS.bidCount} bids · $${FLOORS.budget.toLocaleString("en-US")} budget`}
        </div>
        <div
          className={`flex flex-col gap-2 ${desktop ? "mt-[14px]" : "mt-3"}`}
        >
          {Array.from({ length: rows }, (_, i) => (
            <div
              key={i}
              className="rounded-[12px] border border-line bg-white"
              style={{ height: desktop ? 62 : 56 }}
            />
          ))}
        </div>
      </div>
      <div className="absolute inset-0 bg-navy/40" />
    </>
  );
}

function Desktop() {
  return (
    <>
      <Backdrop size="desktop" />
      <div
        className="absolute left-1/2 top-1/2 w-[384px] rounded-[14px] border border-line bg-white p-5 shadow-brand-2xl"
        style={{ margin: "-186px 0 0 -192px" }}
      >
        <ModalHeader size="desktop" />

        <div className="mt-[18px]">
          <SectionLabel>Pick a day</SectionLabel>
        </div>
        <div className="mt-2 flex gap-[7px]">
          {VISIT_DAYS.map((day) => (
            <DayPill key={day.date} day={day} size="desktop" />
          ))}
        </div>

        <div className="mt-4">
          <SectionLabel>Pick a time</SectionLabel>
        </div>
        <div className="mt-2 grid grid-cols-3 gap-[7px]">
          {VISIT_TIMES.map((time) => (
            <TimeSlot key={time.label} time={time} size="desktop" />
          ))}
        </div>

        <div className="mt-[18px] grid h-9 place-items-center rounded-[8px] bg-accent text-[12px] font-bold text-white">
          {REQUEST_LABEL}
        </div>
      </div>
    </>
  );
}

function Mobile() {
  return (
    <>
      <Backdrop size="mobile" />
      <div
        className="absolute inset-x-0 bottom-0 rounded-t-[18px] bg-white p-[16px_16px_18px]"
        style={{ boxShadow: "0 -12px 30px rgba(14,33,75,0.25)" }}
      >
        <ModalHeader size="mobile" />

        <div className="mt-[14px]">
          <SectionLabel>Pick a day</SectionLabel>
        </div>
        <div className="mt-[7px] flex gap-[7px]">
          {VISIT_DAYS.slice(1, 5).map((day) => (
            <DayPill key={day.date} day={day} size="mobile" />
          ))}
        </div>

        <div className="mt-[14px]">
          <SectionLabel>Pick a time</SectionLabel>
        </div>
        <div className="mt-[7px] grid grid-cols-3 gap-[7px]">
          {[VISIT_TIMES[0], VISIT_TIMES[1], VISIT_TIMES[3]].map((time) => (
            <TimeSlot key={time.label} time={time} size="mobile" />
          ))}
        </div>

        <div className="mt-[14px] grid h-[42px] place-items-center rounded-[10px] bg-accent text-[13px] font-bold text-white">
          {REQUEST_LABEL}
        </div>
      </div>
    </>
  );
}

export default function WalkthroughStill() {
  return <StepSlot tone="surface" desktop={<Desktop />} mobile={<Mobile />} />;
}
