import {
  COMPARE_BIDS,
  HERO_CONTRACTOR,
  HERO_HOMEOWNER,
  HERO_THREAD,
  KITCHEN,
  KITCHEN_SCOPE_CHECKS,
  bidSpan,
  compactDollars,
} from "./homeDemoData";
import {
  CheckGlyph,
  Composer,
  DayPill,
  Initials,
  MessageRow,
  PhoneFrame,
} from "./HeroChrome";
import { enter, panelIn, riseIn, type HeroState } from "./heroMotion";

// The home hero's homeowner side: the mobile app walking build → bids →
// message, with three beat cards alongside that light up with the screen.
//
// Screens mirror the real app — the scope step of the guided flow
// (engine/FlowScreen.tsx), the project's bid list (screens/home/ProjectCard)
// and the contractor thread. Only the third has no shipped mobile screen yet;
// see the note in HeroFlip.tsx.

/** The three bids that land on the kitchen, in the order the product sorts
 * them — low to high by range. The fourth belongs to /homeowners step 02. */
const BIDS = COMPARE_BIDS.slice(0, 3);

/** The mobile app's select-blue, which is not a marketing token: it is the
 * product's own selected-control colour. */
const SELECT = "#245ABC";
const SELECT_SOFT = "#E8F2FF";

const BEATS = [
  {
    title: "Build your project",
    body: "Answer a few questions and we write the contractor-grade scope for you.",
  },
  {
    title: "See every bid",
    body: "Itemized bids from local contractors, priced off the same scope.",
  },
  {
    title: "Message from the app",
    body: "Ask questions and settle timing without another evening sales visit.",
  },
];

/** One scope checkbox. The unchecked row is always painted; the checked row
 * sits on top of it and fades in, so the row never reflows as it ticks. */
function ScopeCheck({
  name,
  detail,
  on,
}: {
  name: string;
  detail: string;
  on: boolean;
}) {
  const label = (
    <div className="min-w-0 flex-1">
      <div className="text-[10px] font-semibold leading-[1.25] text-ink">{name}</div>
      <div className="mt-[2px] text-[8px] leading-[1.35] text-muted">{detail}</div>
    </div>
  );
  return (
    <div className="relative mb-[6px]">
      <div className="flex items-center gap-2 rounded-[6px] border-[0.5px] border-[#D1D5DB] bg-white p-[7px_9px]">
        {label}
        <span className="size-[15px] flex-none rounded-[3px] border-[0.5px] border-[#D1D5DB] bg-white" />
      </div>
      <div
        className="absolute inset-0 flex items-center gap-2 rounded-[6px] border-[1.5px] p-[7px_9px]"
        style={{
          borderColor: SELECT,
          background: SELECT_SOFT,
          opacity: on ? 1 : 0,
          transition: "opacity 260ms var(--ease-enter)",
        }}
      >
        {label}
        <span
          className="grid size-[15px] flex-none place-items-center rounded-[3px]"
          style={{ background: SELECT }}
        >
          <CheckGlyph />
        </span>
      </div>
    </div>
  );
}

/** A bid row on the phone's bid list. */
function PhoneBidRow({
  bid,
  on,
}: {
  bid: (typeof BIDS)[number];
  on: boolean;
}) {
  return (
    <div
      className="flex items-center gap-[6px] border-b border-[#F3F4F6] py-[7px]"
      style={riseIn(on, 6)}
    >
      <Initials size={22}>{bid.initials}</Initials>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[10px] font-bold leading-[1.2] text-ink">
          {bid.company}
        </div>
        <div className="mt-[2px] text-[8px] text-muted">
          <span className="text-gold">★</span> {bid.rating} · {bid.jobs} jobs
        </div>
      </div>
      <span className="flex-none whitespace-nowrap text-[8.5px] font-bold tabular-nums text-ink">
        {compactDollars(bid.min)} – {compactDollars(bid.max)}
      </span>
    </div>
  );
}

/** Screen 1 — the guided flow's scope step. */
function BuildScreen({ v }: { v: HeroState }) {
  return (
    <div className="absolute inset-0 flex flex-col" style={panelIn(v.hoScreen, 1)}>
      <div className="flex-none p-[4px_12px_3px]">
        <div className="h-[3px] overflow-hidden rounded-[4px] bg-[#F3F4F6]">
          <div className="h-[3px] w-1/4 rounded-[4px] bg-accent" />
        </div>
        <div className="mt-[6px] text-[9px] font-semibold uppercase tracking-[0.8px] text-accent">
          Step 2 of 8 · Scope
        </div>
      </div>
      <div className="min-h-0 flex-1 p-[8px_12px_0]">
        <div className="text-[14px] font-bold leading-[1.2] tracking-[-0.01em]">
          What’s in scope?
        </div>
        <div className="m-[5px_0_11px] text-[9.5px] leading-[1.4] text-muted">
          Select everything being updated in this kitchen.
        </div>
        {KITCHEN_SCOPE_CHECKS.map((check, i) => (
          <ScopeCheck key={check.name} {...check} on={v.hoChecks > i} />
        ))}
      </div>
      {/* Continue and Publish are stacked, not swapped: the button keeps its
          box while the label and colour change under it. */}
      <div className="flex-none p-[6px_12px_10px]">
        <div className="relative h-9">
          <span
            className="absolute inset-0 flex items-center justify-center rounded-[11px] bg-slate text-[11px] font-semibold text-white"
            style={{
              opacity: v.hoCta ? 0 : 1,
              transition: "opacity 280ms var(--ease-enter)",
            }}
          >
            Continue
          </span>
          <span
            className="absolute inset-0 flex items-center justify-center rounded-[11px] bg-accent text-[11px] font-bold text-white"
            style={{
              opacity: v.hoCta ? 1 : 0,
              transform: v.hoCta ? "none" : "scale(0.95)",
              transition:
                "opacity 280ms var(--ease-enter), transform 420ms var(--ease-spring)",
            }}
          >
            Publish project
          </span>
        </div>
      </div>
    </div>
  );
}

/** Screen 2 — the project's bid list, filling in as bids land. */
function BidsScreen({ v }: { v: HeroState }) {
  const landed = BIDS.slice(0, v.hoBids);
  return (
    <div className="absolute inset-0 flex flex-col" style={panelIn(v.hoScreen, 2)}>
      <div className="flex-none border-b border-line p-[2px_12px_8px]">
        <div className="flex items-center gap-[6px]">
          <span className="text-[13px] text-muted">‹</span>
          <span className="text-[13px] font-bold tracking-[-0.01em]">
            {KITCHEN.title}
          </span>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-[#E7F3E5] px-[7px] py-[2px] text-[8px] font-bold text-[#2D7C28]">
            <span className="block size-[5px] rounded-full bg-[#2D7C28]" />
            LIVE
          </span>
        </div>
        <div className="mt-[3px] text-[9px] text-muted">
          Denver · Kitchen — full gut remodel
        </div>
      </div>
      <div className="flex flex-none border-b border-line p-[9px_12px]">
        <div className="flex-1">
          <div className="text-[8px] font-semibold tracking-[0.6px] text-[#9CA3AF]">
            BIDS
          </div>
          <div className="mt-[2px] text-[14px] font-bold">{v.hoBids}</div>
        </div>
        <div className="flex-[1.6]">
          <div className="text-[8px] font-semibold tracking-[0.6px] text-[#9CA3AF]">
            BID RANGE
          </div>
          <div className="mt-[2px] text-[14px] font-bold tabular-nums">
            {bidSpan(landed)}
          </div>
        </div>
      </div>
      <div className="relative min-h-0 flex-1 p-[2px_12px_0]">
        {BIDS.map((bid, i) => (
          <PhoneBidRow key={bid.company} bid={bid} on={v.hoBids > i} />
        ))}
        <div
          className="mt-[10px] rounded-[9px] border border-dashed border-[#D1D5DB] p-[9px] text-center text-[9px] font-semibold text-muted"
          style={{
            opacity: v.hoBids >= 1 ? 0 : 1,
            transition: "opacity 300ms var(--ease-enter)",
          }}
        >
          We notified 15 Denver contractors. Bids arrive here.
        </div>
      </div>
      <div className="flex-none p-[8px_12px_10px]">
        <span className="flex h-[34px] items-center justify-center rounded-[11px] bg-accent text-[11px] font-bold text-white">
          Compare bids
        </span>
      </div>
    </div>
  );
}

/** Screen 3 — the thread with the contractor. */
function MessageScreen({ v }: { v: HeroState }) {
  return (
    <div
      className="absolute inset-0 flex flex-col bg-white"
      style={panelIn(v.hoScreen, 3)}
    >
      <div className="flex flex-none items-center gap-[7px] border-b border-line p-[2px_12px_9px]">
        <span className="text-[13px] text-muted">‹</span>
        <Initials size={26}>{HERO_CONTRACTOR.initials}</Initials>
        <div className="min-w-0">
          <div className="text-[11px] font-bold leading-[1.2]">
            {HERO_CONTRACTOR.name}
          </div>
          <div className="mt-px text-[8.5px] text-muted">{KITCHEN.title}</div>
        </div>
      </div>
      <div className="flex min-h-0 flex-1 flex-col justify-end gap-2 p-[10px_12px]">
        <DayPill>Today</DayPill>
        {HERO_THREAD.map((msg, i) => (
          <MessageRow
            key={msg.body}
            // The homeowner is looking at her own phone, so her lines are the
            // outbound ones here; the contractor console flips both.
            mine={msg.from === "homeowner"}
            initials={
              msg.from === "homeowner"
                ? HERO_HOMEOWNER.initials
                : HERO_CONTRACTOR.initials
            }
            body={msg.body}
            outbound={SELECT}
            size="phone"
            style={riseIn(v.hoMsg > i, 8)}
          />
        ))}
      </div>
      <Composer size="phone" />
    </div>
  );
}

/** The beat cards beside the phone — one per screen, lit by the active one. */
function Beat({
  index,
  on,
  title,
  body,
}: {
  index: number;
  on: boolean;
  title: string;
  body: string;
}) {
  return (
    <div
      className="flex items-start gap-3 rounded-[14px] border p-[13px_15px]"
      style={{
        background: on ? "rgba(255,255,255,0.13)" : "rgba(255,255,255,0.04)",
        borderColor: on ? "rgba(255,255,255,0.34)" : "rgba(255,255,255,0.12)",
        transition: `background 320ms var(--ease-enter), border-color 320ms var(--ease-enter)`,
      }}
    >
      <span
        className="grid size-[22px] flex-none place-items-center rounded-full border text-[11px] font-bold"
        style={{
          background: on ? "var(--color-accent)" : "rgba(255,255,255,0.08)",
          borderColor: on ? "var(--color-accent)" : "rgba(255,255,255,0.22)",
          color: on ? "#fff" : "rgba(255,255,255,0.8)",
          transition: `background 320ms var(--ease-enter), border-color 320ms var(--ease-enter), color 320ms var(--ease-enter)`,
        }}
      >
        {index}
      </span>
      <div>
        <div className="text-[14px] font-bold text-white">{title}</div>
        <div className="mt-[3px] text-[11.5px] leading-[1.45] text-white/72">
          {body}
        </div>
      </div>
    </div>
  );
}

export default function HeroFlipHomeowner({ v }: { v: HeroState }) {
  return (
    <div
      className="absolute inset-x-0 top-[44px] h-[456px]"
      style={{
        opacity: v.side === "homeowner" ? 1 : 0,
        transform: v.side === "homeowner" ? "none" : "translateX(-20px)",
        transition: enter(420, 460),
      }}
    >
      <div className="absolute left-0 top-0">
        <PhoneFrame w={224} h={456} radius={36}>
          <div className="relative min-h-0 flex-1">
            <BuildScreen v={v} />
            <BidsScreen v={v} />
            <MessageScreen v={v} />
          </div>
        </PhoneFrame>
      </div>

      <div className="absolute inset-x-0 left-[252px] top-[22px] flex flex-col gap-3">
        {BEATS.map((beat, i) => (
          <Beat
            key={beat.title}
            index={i + 1}
            on={v.hoScreen === i + 1}
            {...beat}
          />
        ))}
      </div>
    </div>
  );
}
