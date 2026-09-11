import Image from "next/image";
import {
  BID_RAIL,
  HERO_CONTRACTOR,
  HERO_HOMEOWNER,
  HERO_SECOND_THREAD,
  HERO_THREAD,
  KITCHEN,
  KITCHEN_LABOR,
  KITCHEN_LABOR_ROWS,
  MARKETPLACE_CARDS,
  MARKETPLACE_COUNT,
  dollars,
} from "./homeDemoData";
import MarketplaceCard from "./MarketplaceCard";
import { Composer, DayPill, Initials, MessageRow } from "./HeroChrome";
import { BrowserFrame } from "./HeroChrome";
import { enter, fadeIn, panelIn, riseIn, type HeroState } from "./heroMotion";

// The home hero's contractor side: the web console walking marketplace → labor
// items → messages, with three beat cards under the window.
//
// Screens mirror apps/web — the marketplace grid, the bid flow's Labor items
// step (rail at 2 of 6) and the contractor's message pane.

/** The console's hairline is warmer than the app's `line`; it is the web
 * product's own border colour, not an approximation of one. */
const HAIRLINE = "#d5d1c8";

/** The web console's outbound bubble colour — bid indigo, the colour the bid
 * surfaces use. Not the mobile app's select blue. */
const INDIGO = "#534AB8";

/** Three standing cards plus the Wash Park kitchen, which lands last. */
const STANDING = [
  MARKETPLACE_CARDS[0],
  MARKETPLACE_CARDS[1],
  MARKETPLACE_CARDS[3],
];
const ARRIVING = MARKETPLACE_CARDS[2];

const URLS: Record<HeroState["coScreen"], string> = {
  1: "estimarket.com/marketplace",
  2: "estimarket.com/projects/den-1042/bid/line-items",
  3: "estimarket.com/messages",
};

const BEATS = [
  { title: "Browse the marketplace", body: "Open projects near you, no lead fees." },
  { title: "Bid on a real scope", body: "Price line items from home." },
  { title: "Message the homeowner", body: "Answer questions in one thread." },
];

const CHIPS = ["All", "Bathrooms", "Kitchens", "Windows"];

/** Screen 1 — the marketplace grid, with the kitchen arriving into it. */
function MarketplaceScreen({ v }: { v: HeroState }) {
  return (
    <div
      className="absolute inset-0 flex flex-col bg-surface"
      style={panelIn(v.coScreen, 1)}
    >
      <div className="flex flex-none items-center border-b border-line bg-white p-[9px_14px]">
        <div>
          <div className="text-[13px] font-bold tracking-[-0.01em]">Marketplace</div>
          <div className="mt-[2px] text-[9px] text-muted">
            Browse open projects in your service area.
          </div>
        </div>
        <div className="ml-auto flex items-center gap-[7px]">
          <Initials size={22}>{HERO_CONTRACTOR.initials}</Initials>
          <span className="text-[9px] font-semibold text-slate">
            {HERO_CONTRACTOR.name}
          </span>
        </div>
      </div>

      <div className="flex flex-none items-center gap-[7px] p-[9px_14px_0]">
        <span
          className="flex h-6 w-[190px] items-center gap-[6px] rounded-[6px] border bg-white px-[9px] text-[8.5px] text-[#9CA3AF]"
          style={{ borderColor: HAIRLINE }}
        >
          <svg
            viewBox="0 0 16 16"
            className="size-[11px]"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <circle cx="7" cy="7" r="4.5" />
            <path d="m10.5 10.5 3 3" strokeLinecap="round" />
          </svg>
          Search projects by type or location
        </span>
        {CHIPS.map((chip) => {
          const active = chip === "Kitchens";
          return (
            <span
              key={chip}
              className={`inline-flex h-5 items-center rounded-full border px-[9px] text-[8.5px] ${
                active ? "font-bold text-ink" : "font-medium text-muted"
              }`}
              style={{
                borderColor: active ? "var(--color-accent)" : HAIRLINE,
                background: active ? "#FEE9DF" : "#fff",
              }}
            >
              {chip}
            </span>
          );
        })}
        <span className="ml-auto text-[8.5px] text-muted">
          {v.coNew ? MARKETPLACE_COUNT.to : MARKETPLACE_COUNT.from} projects ·
          Newest first
        </span>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-4 gap-[10px] p-[11px_14px_0]">
        {STANDING.map((card) => (
          <MarketplaceCard key={card.id} card={card} size="grid" fill />
        ))}
        {/* The arriving card and the dashed placeholder it replaces occupy the
            same cell, so the grid never reflows as the project lands. */}
        <div className="relative">
          <div
            className="h-full rounded-[8px]"
            style={{
              outline: "2px solid var(--color-brand)",
              outlineOffset: 1,
              opacity: v.coNew ? 1 : 0,
              transform: v.coNew ? "none" : "translateY(-10px) scale(0.97)",
              transition:
                "opacity 380ms var(--ease-enter), transform 460ms var(--ease-spring)",
            }}
          >
            <MarketplaceCard card={ARRIVING} size="grid" fill />
          </div>
          <div
            className="absolute inset-0 grid place-items-center rounded-[8px] border-[1.5px] border-dashed border-[#D1D5DB] bg-surface"
            style={fadeIn(!v.coNew, 320)}
          >
            <span className="text-[9px] font-semibold text-muted">Loading…</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Screen 2 — the bid flow's Labor items step. */
function LaborScreen({ v }: { v: HeroState }) {
  return (
    <div
      className="absolute inset-0 flex bg-surface"
      style={panelIn(v.coScreen, 2)}
    >
      <div
        className="flex w-[138px] flex-none flex-col border-r p-[10px_6px]"
        style={{ borderColor: HAIRLINE }}
      >
        <Image
          src="/brand/lockup-color.png"
          alt=""
          width={96}
          height={15}
          className="m-[0_8px_10px] block h-[15px] w-auto"
        />
        <div className="m-[0_8px_9px] text-[8.5px] font-semibold text-muted">
          ‹ Exit bid flow
        </div>
        <div className="m-[0_8px_5px] text-[7.5px] font-bold uppercase tracking-[0.08em] text-muted">
          Bid flow
        </div>
        {BID_RAIL.map((step, i) => {
          const done = i === 0;
          const current = i === 1;
          const filled = done || current;
          return (
            <div
              key={step}
              className={`flex h-6 items-center gap-[7px] rounded-[6px] px-2 text-[9px] ${
                current
                  ? "bg-white font-bold text-ink shadow-brand-sm"
                  : "font-medium text-muted"
              }`}
            >
              <span
                className="grid size-[14px] flex-none place-items-center rounded-full border text-[7.5px] font-bold"
                style={{
                  background: filled ? "var(--color-accent)" : "#fff",
                  borderColor: filled ? "var(--color-accent)" : HAIRLINE,
                  color: filled ? "#fff" : "var(--color-muted)",
                }}
              >
                {done ? "✓" : i + 1}
              </span>
              <span className="whitespace-nowrap">{step}</span>
            </div>
          );
        })}
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex-none border-b border-line bg-white p-[9px_14px]">
          <div className="text-[13px] font-bold tracking-[-0.01em]">Labor items</div>
          <div className="mt-[2px] text-[9px] text-muted">
            Labor + installation only — the homeowner supplies materials.
          </div>
        </div>
        <div className="flex min-h-0 flex-1 flex-col gap-[6px] overflow-hidden p-[8px_14px]">
          {KITCHEN_LABOR.map((group) => (
            <div
              key={group.name}
              className="rounded-[8px] border bg-white p-[4px_9px]"
              style={{ borderColor: HAIRLINE }}
            >
              <div className="text-[10px] font-bold leading-[1.3] text-ink">
                {group.name}
              </div>
              {group.rows.map((row) => {
                // Rows reveal in document order, so a row's cue is its index
                // across the whole flattened list, not within its group.
                const on = v.coItems > KITCHEN_LABOR_ROWS.indexOf(row);
                return (
                  <div key={row.name} className="flex items-center gap-[10px] py-px">
                    <div className="flex min-w-0 flex-1 items-center gap-[6px]">
                      <span className="text-[9.5px] font-bold leading-[1.3] text-ink">
                        {row.name}
                      </span>
                      {row.tbd && (
                        <span className="flex-none rounded-[4px] bg-slate/10 px-[5px] py-px text-[7.5px] font-bold text-slate">
                          Confirm on site
                        </span>
                      )}
                    </div>
                    {/* The empty field is always painted; the priced value (or
                        the TBD marker) fades in over it, so the row holds its
                        width as the contractor works down the list. */}
                    <div className="relative h-5 w-[86px] flex-none">
                      <span
                        className="absolute inset-0 flex items-center justify-end rounded-[6px] border bg-white px-2 text-[9.5px] font-bold text-[#9ca3af]"
                        style={{ borderColor: HAIRLINE }}
                      >
                        {row.tbd ? "—" : "0"}
                      </span>
                      {row.tbd ? (
                        <span
                          className="absolute inset-0 flex items-center justify-center rounded-[6px] border text-[9px] font-bold"
                          style={{
                            borderColor: INDIGO,
                            background: "var(--color-tbd-bg)",
                            color: INDIGO,
                            ...fadeIn(on),
                          }}
                        >
                          TBD ✓
                        </span>
                      ) : (
                        <span
                          className="absolute inset-0 flex items-center justify-end rounded-[6px] border bg-white px-2 text-[9.5px] font-bold tabular-nums text-ink"
                          style={{ borderColor: HAIRLINE, ...fadeIn(on) }}
                        >
                          {dollars(row.amount ?? 0)}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}

          <div
            className="mt-auto flex items-center gap-3 rounded-[8px] border bg-white p-[8px_10px]"
            style={{ borderColor: HAIRLINE }}
          >
            <span
              className="inline-flex items-center gap-[5px] rounded-full bg-[#E7F3E5] px-2 py-[3px] text-[8.5px] font-bold text-[#2D7C28]"
              style={fadeIn(v.coSubmit, 300)}
            >
              ✓ Within homeowner’s budget
            </span>
            <div className="ml-auto text-right">
              <div className="text-[7.5px] font-bold uppercase tracking-[0.05em] text-muted">
                Running total (excluding TBD)
              </div>
              <div className="text-[17px] font-bold tabular-nums tracking-[-0.02em]">
                {dollars(v.coTotal)}
              </div>
            </div>
            <span className="inline-flex h-7 flex-none items-center rounded-[7px] bg-accent px-3 text-[10px] font-bold text-white">
              Continue
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Screen 3 — the contractor's inbox, same conversation from her end. */
function MessagesScreen({ v }: { v: HeroState }) {
  return (
    <div className="absolute inset-0 flex bg-white" style={panelIn(v.coScreen, 3)}>
      <div className="w-[196px] flex-none border-r border-line bg-surface p-[10px]">
        <div className="mb-[9px] text-[12px] font-bold">Messages</div>
        <div className="mb-[6px] rounded-[8px] bg-white p-[8px_9px] shadow-brand-sm">
          <div className="flex items-center gap-[6px]">
            <Initials size={20}>{HERO_HOMEOWNER.initials}</Initials>
            <span className="text-[10px] font-bold">{HERO_HOMEOWNER.name}</span>
            <span className="ml-auto text-[8px] text-muted">2m</span>
          </div>
          <div className="mt-1 text-[8.5px] text-muted">
            {KITCHEN.title} · Bid submitted
          </div>
        </div>
        <div className="rounded-[8px] p-[8px_9px]">
          <div className="flex items-center gap-[6px]">
            <Initials size={20} tone="grey">
              {HERO_SECOND_THREAD.initials}
            </Initials>
            <span className="text-[10px] font-semibold text-slate">
              {HERO_SECOND_THREAD.name}
            </span>
            <span className="ml-auto text-[8px] text-muted">
              {HERO_SECOND_THREAD.when}
            </span>
          </div>
          <div className="mt-1 text-[8.5px] text-muted">
            {HERO_SECOND_THREAD.meta}
          </div>
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex-none border-b border-line p-[9px_14px]">
          <div className="text-[12px] font-bold">{HERO_HOMEOWNER.name}</div>
          <div className="mt-[2px] text-[8.5px] text-muted">
            {KITCHEN.title} · Denver
          </div>
        </div>
        <div className="flex min-h-0 flex-1 flex-col justify-end gap-[9px] p-[11px_14px]">
          <DayPill>Today</DayPill>
          {HERO_THREAD.map((msg, i) => (
            <MessageRow
              key={msg.body}
              // Mirror of the homeowner's phone: here the contractor's lines
              // are the outbound ones.
              mine={msg.from === "contractor"}
              initials={
                msg.from === "contractor"
                  ? HERO_CONTRACTOR.initials
                  : HERO_HOMEOWNER.initials
              }
              body={msg.body}
              outbound={INDIGO}
              size="web"
              style={riseIn(v.coMsg > i, 8)}
            />
          ))}
        </div>
        <Composer size="web" />
      </div>
    </div>
  );
}

/** The beat cards under the window — three across, lit by the active screen. */
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
      className="block rounded-[14px] border p-[11px_14px]"
      style={{
        background: on ? "rgba(255,255,255,0.13)" : "rgba(255,255,255,0.04)",
        borderColor: on ? "rgba(255,255,255,0.34)" : "rgba(255,255,255,0.12)",
        transition: `background 320ms var(--ease-enter), border-color 320ms var(--ease-enter)`,
      }}
    >
      <div className="flex items-center gap-2">
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
        <div className="whitespace-nowrap text-[12px] font-bold text-white">
          {title}
        </div>
      </div>
      <div className="mt-[7px] text-[11px] leading-[1.45] text-white/72">{body}</div>
    </div>
  );
}

export default function HeroFlipContractor({ v }: { v: HeroState }) {
  return (
    <div
      className="absolute inset-x-0 top-[44px] h-[456px]"
      style={{
        opacity: v.side === "contractor" ? 1 : 0,
        transform: v.side === "contractor" ? "none" : "translateX(20px)",
        transition: enter(420, 460),
      }}
    >
      <div className="absolute left-0 top-0">
        <BrowserFrame w={660} h={352} url={URLS[v.coScreen]}>
          <MarketplaceScreen v={v} />
          <LaborScreen v={v} />
          <MessagesScreen v={v} />
        </BrowserFrame>
      </div>

      <div className="absolute inset-x-0 top-[364px] grid grid-cols-3 gap-3">
        {BEATS.map((beat, i) => (
          <Beat
            key={beat.title}
            index={i + 1}
            on={v.coScreen === i + 1}
            {...beat}
          />
        ))}
      </div>
    </div>
  );
}
