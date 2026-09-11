import { BareSlot } from "../home/HomeStage";
import { BID_RANGE, SITE_VISIT, WEST_HIGHLANDS, dollars } from "./coDemoData";

// Slot 3 — Step 03, Match and close (still). Three cards on a transparent
// stage: the selection banner, the contractor's walkthrough-availability
// settings, and the homeowner's request.
//
// The site visit happens *after* the bid was selected — that ordering is the
// page's whole pitch, so the banner leads and the request follows.

const DESKTOP = { w: 624, h: 440 };
const MOBILE = { w: 342, h: 330 };

const GOOD = "#8fc089";
/** The real "selected" chip fill from messages/format.ts CHIP_CLASS.selected. */
const SELECTED_CHIP = "rgba(143,192,137,0.25)";

function CheckAvatar({ size }: { size: 32 | 46 }) {
  return (
    <span
      className="grid flex-none place-items-center rounded-full"
      style={{
        width: size,
        height: size,
        background: "rgba(143,192,137,0.16)",
        border: `2px solid ${GOOD}`,
      }}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={GOOD}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ width: size === 46 ? 22 : 16, height: size === 46 ? 22 : 16 }}
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </span>
  );
}

function Tile({
  label,
  value,
  tbd,
}: {
  label: string;
  value: string;
  tbd?: boolean;
}) {
  return (
    <div
      className={`flex-1 rounded-[8px] p-[9px_11px] ${
        tbd ? "border border-tbd-border bg-tbd-bg" : "bg-surface"
      }`}
    >
      <div
        className={`text-[9px] font-semibold uppercase tracking-[0.05em] ${
          tbd ? "text-tbd" : "text-muted"
        }`}
      >
        {label}
      </div>
      <div className="text-[14px] font-bold tabular-nums text-ink">{value}</div>
    </div>
  );
}

function Desktop() {
  return (
    <>
      <div className="absolute inset-x-0 top-0 rounded-[16px] border border-line bg-white p-[18px] shadow-brand-xl">
        <div className="flex items-center gap-[14px]">
          <CheckAvatar size={46} />
          <div className="min-w-0 flex-1">
            <div className="text-[16px] font-bold tracking-[-0.01em] text-ink">
              Your bid was selected — {WEST_HIGHLANDS.title}
            </div>
            <div className="mt-[3px] text-[12px] text-muted">
              · Coordinate the site visit with the homeowner
            </div>
          </div>
          <span className="inline-flex h-9 flex-none items-center whitespace-nowrap rounded-[8px] bg-accent px-[15px] text-[12.5px] font-bold text-white">
            Schedule site visit →
          </span>
        </div>

        <div className="mt-[14px] flex gap-2 border-t border-line pt-[14px]">
          <Tile
            label="Your bid"
            value={`${dollars(BID_RANGE.min)} – ${dollars(BID_RANGE.max)}`}
          />
          <Tile label="Status" value="Site visit scheduled" />
          <Tile label="To confirm on site" value="1 TBD item" tbd />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-[300px] rounded-[16px] border border-line bg-white p-4 shadow-brand-2xl">
        <div className="text-[13.5px] font-bold text-ink">
          Walkthrough availability
        </div>
        <div className="mt-3 flex items-center justify-between gap-[10px]">
          <span className="text-[11.5px] font-semibold text-ink">
            Accept walkthrough requests
          </span>
          <span className="relative h-5 w-[34px] flex-none rounded-full bg-accent">
            <span className="absolute right-[2px] top-[2px] size-4 rounded-full bg-white" />
          </span>
        </div>
        <div className="mt-3 flex gap-2">
          {[
            { label: "Min notice", value: SITE_VISIT.minNotice },
            { label: "Per week", value: SITE_VISIT.perWeek },
          ].map((t) => (
            <div
              key={t.label}
              className="flex-1 rounded-[8px] border border-line p-[7px_9px]"
            >
              <div className="text-[8.5px] font-semibold uppercase tracking-[0.05em] text-muted">
                {t.label}
              </div>
              <div className="text-[12.5px] font-bold text-ink">{t.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 right-0 w-[300px] rounded-[16px] border border-line bg-white p-4 shadow-brand-2xl">
        <div className="text-[9px] font-bold uppercase tracking-[0.06em] text-muted">
          Requested by {SITE_VISIT.requester}
        </div>
        <div className="mt-1 text-[17px] font-bold tracking-[-0.01em] text-ink">
          {SITE_VISIT.day}
        </div>
        <div className="mt-[2px] text-[13px] text-slate">
          {SITE_VISIT.time} · {SITE_VISIT.place}
        </div>
        <div className="mt-3 flex gap-[7px]">
          <span className="inline-flex h-8 flex-1 items-center justify-center rounded-[8px] bg-marine text-[11.5px] font-bold text-white">
            Confirm
          </span>
          <span className="inline-flex h-8 flex-1 items-center justify-center whitespace-nowrap rounded-[8px] border border-line bg-white text-[11.5px] font-semibold text-ink">
            Propose another time
          </span>
        </div>
      </div>
    </>
  );
}

/** Mobile keeps the banner and the request; the availability settings are cut. */
function Mobile() {
  return (
    <>
      <div className="absolute inset-x-0 top-0 rounded-[14px] border border-line bg-white p-[14px] shadow-brand-xl">
        <div className="flex items-center gap-[10px]">
          <CheckAvatar size={32} />
          <div className="min-w-0">
            <div className="text-[13px] font-bold text-ink">
              Your bid was selected
            </div>
            <div className="mt-px text-[10.5px] text-muted">
              {WEST_HIGHLANDS.title} · {dollars(BID_RANGE.min)} –{" "}
              {dollars(BID_RANGE.max)}
            </div>
          </div>
        </div>
        <div className="mt-3 grid h-[34px] place-items-center rounded-[8px] bg-accent text-[12px] font-bold text-white">
          Schedule site visit →
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 rounded-[14px] border border-line bg-white p-[13px_14px] shadow-brand-lg">
        <div className="text-[9px] font-bold uppercase tracking-[0.06em] text-muted">
          Requested by {SITE_VISIT.requester}
        </div>
        <div className="mt-[3px] text-[13.5px] font-bold text-ink">
          {SITE_VISIT.day} · {SITE_VISIT.time}
        </div>
        <div className="mt-[9px] flex gap-[6px]">
          <span
            className="rounded-full px-[9px] py-[3px] text-[10px] font-semibold text-ink"
            style={{ background: SELECTED_CHIP }}
          >
            Site visit scheduled
          </span>
          <span className="rounded-full border border-tbd-border bg-tbd-bg px-[9px] py-[3px] text-[10px] font-semibold text-tbd">
            1 TBD item
          </span>
        </div>
      </div>
    </>
  );
}

export default function MatchCloseStill() {
  return (
    <BareSlot
      desktop={{ ...DESKTOP, content: <Desktop /> }}
      mobile={{ ...MOBILE, content: <Mobile /> }}
    />
  );
}
