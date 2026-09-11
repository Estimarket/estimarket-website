import type { CSSProperties, ReactNode } from "react";

// Device chrome and small glyphs shared by the two hero stages: the phone the
// homeowner holds (both heroes) and the browser window the contractor works in
// (home hero, contractor side).
//
// The frames are drawn rather than imported as images so they scale with the
// stage and cost nothing to load. Everything here is presentational — the
// stages are `aria-hidden`, and the surrounding copy carries the meaning.

/** Signal bars, wifi and battery — the right half of a phone status bar. */
function StatusGlyphs() {
  return (
    <span className="flex items-center gap-1">
      <span className="flex items-end gap-[1.5px]">
        {[3.5, 5, 6.5, 8].map((h) => (
          <span
            key={h}
            className="block w-[2.5px] rounded-[1px] bg-ink"
            style={{ height: h }}
          />
        ))}
      </span>
      <svg
        viewBox="0 0 24 24"
        className="size-[11px]"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12.55a11 11 0 0 1 14 0" />
        <path d="M8.5 16.05a6 6 0 0 1 7 0" />
        <path d="M12 19.5h.01" />
      </svg>
      <span className="relative block h-[8.5px] w-[17px] rounded-[2.5px] border-[1.2px] border-ink/45">
        <span className="absolute inset-y-px left-px block w-[10px] rounded-[1.5px] bg-ink" />
      </span>
    </span>
  );
}

/**
 * An iPhone frame around a screen stack. `w`/`h` are the outer frame; the
 * screen inside is inset by the 6px bezel.
 *
 * The status bar is rendered inside the screen's flex column rather than over
 * it, so a screen that fills the remaining height can never run under it.
 */
export function PhoneFrame({
  w,
  h,
  radius,
  children,
}: {
  w: number;
  h: number;
  radius: number;
  children: ReactNode;
}) {
  const notchW = Math.round(w * 0.27);
  const barH = w >= 228 ? 32 : 30;
  return (
    <div
      className="p-[6px]"
      style={{
        width: w,
        height: h,
        borderRadius: radius,
        background: "#0b1220",
        boxShadow:
          "0 25px 50px rgba(5,12,30,0.45), 0 0 0 1.5px rgba(255,255,255,0.18)",
      }}
    >
      <div
        className="relative flex size-full flex-col overflow-hidden bg-surface text-ink"
        style={{ borderRadius: radius - 6 }}
      >
        <span
          className="absolute top-[7px] left-1/2 z-10 block h-[17px] rounded-full"
          style={{
            width: notchW,
            marginLeft: -notchW / 2,
            background: "#0b1220",
          }}
        />
        <div
          className="flex flex-none items-center justify-between px-[15px] text-[10px] font-bold"
          style={{ height: barH }}
        >
          <span>9:41</span>
          <StatusGlyphs />
        </div>
        {children}
        <div className="grid h-5 flex-none place-items-center">
          <span className="block h-1 w-[78px] rounded-full bg-ink/80" />
        </div>
      </div>
    </div>
  );
}

/** The contractor's browser window: traffic lights, a URL pill, then the app. */
export function BrowserFrame({
  w,
  h,
  url,
  children,
}: {
  w: number;
  h: number;
  url: string;
  children: ReactNode;
}) {
  return (
    <div
      className="flex flex-col overflow-hidden rounded-[14px] bg-surface"
      style={{
        width: w,
        height: h,
        boxShadow:
          "0 25px 50px rgba(5,12,30,0.4), 0 0 0 1px rgba(255,255,255,0.16)",
      }}
    >
      <div className="flex h-[30px] flex-none items-center gap-[10px] border-b border-line bg-white px-3">
        <span className="flex gap-[5px]">
          <span className="block size-2 rounded-full bg-line" />
          <span className="block size-2 rounded-full bg-line" />
          <span className="block size-2 rounded-full bg-line" />
        </span>
        <span className="flex h-[18px] max-w-[340px] flex-1 items-center rounded-full bg-[#F3F4F6] px-[10px] text-[8.5px] text-muted">
          {url}
        </span>
      </div>
      <div className="relative min-h-0 flex-1">{children}</div>
    </div>
  );
}

/** The white tick on a filled control. */
export function CheckGlyph({ size = 10 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      style={{ width: size, height: size }}
      fill="none"
      stroke="#fff"
      strokeWidth={3.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

/** The paper plane on every composer's send button. */
export function SendGlyph({ size = 14 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 18 18"
      style={{ width: size, height: size }}
      fill="none"
      stroke="#fff"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15.5 2.5 8 10" />
      <path d="M15.5 2.5 11 15.5 8 10 2.5 7z" />
    </svg>
  );
}

/** A circular initials avatar. `tone` picks the party: navy is "me" on this
 * surface, grey is the other end of the thread. */
export function Initials({
  children,
  size,
  tone = "navy",
}: {
  children: string;
  size: number;
  tone?: "navy" | "grey";
}) {
  return (
    <span
      className={`grid flex-none place-items-center rounded-full font-bold ${
        tone === "navy" ? "bg-navy text-white" : "bg-[#F3F4F6] text-slate"
      }`}
      style={{ width: size, height: size, fontSize: size * 0.36 }}
    >
      {children}
    </span>
  );
}

/** The pill that dates a conversation. */
export function DayPill({ children }: { children: string }) {
  return (
    <span className="self-center rounded-full bg-[#F3F4F6] px-[9px] py-[2px] text-[8px] font-bold text-muted">
      {children}
    </span>
  );
}

/**
 * One message in a thread. `mine` flips the row and paints the bubble in the
 * surface's own outbound colour — mobile select blue on the homeowner's phone,
 * bid indigo in the contractor's web console.
 */
export function MessageRow({
  initials,
  body,
  mine,
  outbound,
  size,
  style,
}: {
  initials: string;
  body: string;
  mine: boolean;
  outbound: string;
  size: "phone" | "web";
  style?: CSSProperties;
}) {
  const phone = size === "phone";
  return (
    <div
      className={`flex items-end ${phone ? "gap-[6px]" : "gap-[7px]"} ${
        mine ? "flex-row-reverse" : ""
      }`}
      style={style}
    >
      <Initials size={phone ? 20 : 22} tone={mine ? "navy" : "grey"}>
        {initials}
      </Initials>
      <span
        className="rounded-[14px]"
        style={{
          maxWidth: phone ? "78%" : "66%",
          padding: phone ? "7px 10px" : "8px 11px",
          fontSize: phone ? 9.5 : 10,
          lineHeight: phone ? 1.45 : 1.5,
          background: mine ? outbound : "#F3F4F6",
          color: mine ? "#fff" : "var(--color-ink)",
        }}
      >
        {body}
      </span>
    </div>
  );
}

/** The composer pinned to the bottom of a thread. */
export function Composer({ size }: { size: "phone" | "web" }) {
  const phone = size === "phone";
  const box = phone ? 30 : 28;
  return (
    <div
      className={`flex flex-none items-center border-t border-line ${
        phone ? "gap-[7px] p-[8px_12px_10px]" : "gap-2 p-[9px_14px]"
      }`}
    >
      <span
        className={`flex flex-1 items-center rounded-[9px] border px-[10px] text-[9.5px] text-[#9CA3AF] ${
          phone ? "border-[#D1D5DB]" : "border-[#d5d1c8]"
        }`}
        style={{ height: box }}
      >
        Message…
      </span>
      <span
        className="grid flex-none place-items-center rounded-[9px] bg-accent"
        style={{ width: box, height: box }}
      >
        <SendGlyph size={phone ? 14 : 13} />
      </span>
    </div>
  );
}
