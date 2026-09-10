import Image from "next/image";
import { KITCHEN, dollars } from "./homeDemoData";
import { StepSlot } from "./HomeStage";

// Slot 1 — Build your scope (static). Two overlapping homeowner-app screens
// from apps/mobile/src/scope/: GeneratingView behind, ReviewScreen in front.
//
// Static: no timeline, no client boundary.

const WELL = "#efe6d6";
const ACTIVE_BLUE = "#245abc";
const DONE_GREEN = "#1C7C3E";

const SCOPE_LINES = [
  "Remove all cabinetry, counters and appliances; keep the footprint.",
  "Set 22 lin ft of new base + wall cabinets, homeowner supplied.",
];

/** The four rows of GeneratingView, mid-run: two done, one active, one queued. */
const CHECKLIST = [
  { label: "Reading your photos", state: "done" },
  { label: "Estimating room dimensions", state: "done" },
  { label: "Writing your scope", state: "active" },
  { label: "Building your materials list", state: "pending" },
] as const;

function SparkleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="#fff" className="size-5">
      <path d="M12 2.5l1.7 4.6 4.6 1.7-4.6 1.7L12 15.1l-1.7-4.6L5.7 8.8l4.6-1.7L12 2.5zM18.5 14l.9 2.3 2.3.9-2.3.9-.9 2.3-.9-2.3-2.3-.9 2.3-.9.9-2.3z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="#fff"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-[11px]"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function ChecklistRow({ row }: { row: (typeof CHECKLIST)[number] }) {
  const active = row.state === "active";
  return (
    <div
      className="flex min-h-[34px] items-center gap-[9px] rounded-[12px] px-[11px]"
      style={
        active
          ? { background: "#eaf2fb", border: `1.5px solid ${ACTIVE_BLUE}` }
          : { background: "#fff", border: "0.5px solid var(--color-line)" }
      }
    >
      {row.state === "done" ? (
        <span
          className="grid size-[18px] flex-none place-items-center rounded-full"
          style={{ background: DONE_GREEN }}
        >
          <CheckIcon />
        </span>
      ) : active ? (
        <span
          className="grid size-[18px] flex-none place-items-center rounded-full"
          style={{ border: `1.5px solid ${ACTIVE_BLUE}` }}
        >
          <span
            className="size-[9px] rounded-full"
            style={{ background: ACTIVE_BLUE }}
          />
        </span>
      ) : (
        <span className="size-[18px] flex-none rounded-full border-[1.5px] border-line" />
      )}
      <span
        className={
          row.state === "pending"
            ? "text-[11px] font-normal text-muted"
            : "text-[11px] font-semibold text-ink"
        }
      >
        {row.label}
      </span>
    </div>
  );
}

function StatTile({
  label,
  value,
  size,
}: {
  label: string;
  value: string;
  size: "desktop" | "mobile";
}) {
  const desktop = size === "desktop";
  return (
    <div
      className={`flex-1 rounded-[8px] bg-surface ${desktop ? "p-[6px_8px]" : "p-[8px_10px]"}`}
    >
      <div
        className={`font-semibold uppercase tracking-[0.05em] text-muted ${
          desktop ? "text-[8px]" : "text-[9.5px]"
        }`}
      >
        {label}
      </div>
      <div
        className={`font-bold tabular-nums text-ink ${desktop ? "text-[12px]" : "text-[14px]"}`}
      >
        {value}
      </div>
    </div>
  );
}

function ScopeBullet({ children, size }: { children: string; size: "desktop" | "mobile" }) {
  const desktop = size === "desktop";
  return (
    <div
      className={`relative mb-[3px] leading-[1.5] text-slate ${
        desktop ? "pl-[11px] text-[10px]" : "pl-3 text-[11.5px]"
      }`}
    >
      <span
        className="absolute left-0 size-1 rounded-[2px] bg-[#d1d5db]"
        style={{ top: desktop ? 6 : 7 }}
      />
      {children}
    </div>
  );
}

function Desktop() {
  return (
    <>
      {/* Behind — GeneratingView, still working */}
      <div className="absolute left-[26px] top-[140px] h-[316px] w-[236px] overflow-hidden rounded-[18px] border border-line bg-white p-[18px_16px] shadow-brand-md">
        <div className="mx-auto mb-[14px] mt-[6px] grid size-11 place-items-center rounded-full bg-accent">
          <SparkleIcon />
        </div>
        <div className="text-center text-[15px] font-bold text-ink">
          Building your listing…
        </div>
        <div className="mb-[14px] mt-[3px] text-center text-[11px] text-muted">
          This usually takes about 20 seconds.
        </div>
        <div className="flex flex-col gap-[7px]">
          {CHECKLIST.map((row) => (
            <ChecklistRow key={row.label} row={row} />
          ))}
        </div>
      </div>

      {/* Front — ReviewScreen, the listing as contractors will see it */}
      <div className="absolute left-[268px] top-[30px] flex h-[500px] w-[268px] flex-col overflow-hidden rounded-[18px] border border-line bg-white shadow-brand-xl">
        <div className="p-[16px_16px_10px]">
          <div className="text-[16px] font-bold tracking-[-0.01em] text-ink">
            Here’s your listing
          </div>
          <div className="mt-[2px] text-[10.5px] text-muted">
            This is exactly what contractors see when they bid.
          </div>
        </div>

        <div className="flex-1 overflow-hidden px-4">
          <div
            className="relative h-24 overflow-hidden rounded-[8px]"
            style={{ background: WELL }}
          >
            <Image
              src={KITCHEN.photo}
              alt=""
              fill
              sizes="240px"
              className="object-cover"
            />
          </div>

          <div className="mt-1 grid grid-cols-4 gap-1">
            {["/images/home-floors.jpg", KITCHEN.photo, "/images/dfc-vanity.jpg"].map(
              (src, i) => (
                <div
                  key={i}
                  className="relative h-[26px] overflow-hidden rounded-[4px]"
                  style={{ background: WELL }}
                >
                  <Image src={src} alt="" fill sizes="60px" className="object-cover" />
                </div>
              ),
            )}
            <div className="grid h-[26px] place-items-center rounded-[4px] bg-[#f3f4f6] text-[9px] font-semibold text-muted">
              +{KITCHEN.photoCount - 3}
            </div>
          </div>

          <div className="mt-[10px] flex gap-[6px]">
            <StatTile label="Budget" value={dollars(KITCHEN.budget)} size="desktop" />
            <StatTile label="Room size" value={KITCHEN.roomSize} size="desktop" />
          </div>

          <div className="mt-[11px]">
            <div className="mb-[5px] text-[8.5px] font-bold uppercase tracking-[0.07em] text-muted">
              Scope of work
            </div>
            {SCOPE_LINES.map((line) => (
              <ScopeBullet key={line} size="desktop">
                {line}
              </ScopeBullet>
            ))}
          </div>

          {/* The scope viewer's "needs confirmation" block. In the bid flow
              this same truth appears as a per-line-item chip instead. */}
          <div className="mt-[10px] rounded-[8px] border border-tbd-border bg-tbd-bg p-[7px_9px]">
            <div className="mb-[3px] text-[8.5px] font-bold uppercase tracking-[0.06em] text-tbd">
              Needs contractor confirmation
            </div>
            <div className="text-[10px] leading-[1.45] text-slate">
              Panel capacity for the new range circuit is unknown.
            </div>
          </div>
        </div>

        <div className="p-[10px_16px_14px]">
          <div className="grid h-[34px] place-items-center rounded-[8px] bg-accent text-[12px] font-bold text-white">
            Publish project
          </div>
        </div>
      </div>
    </>
  );
}

function Mobile() {
  return (
    <>
      <div className="p-[14px_14px_10px]">
        <div className="text-[15px] font-bold tracking-[-0.01em] text-ink">
          Here’s your listing
        </div>
        <div className="mt-[2px] text-[11px] text-muted">
          This is exactly what contractors see when they bid.
        </div>
      </div>

      <div className="px-[14px]">
        <div
          className="relative h-[108px] overflow-hidden rounded-[10px]"
          style={{ background: WELL }}
        >
          <Image src={KITCHEN.photo} alt="" fill sizes="342px" className="object-cover" />
        </div>

        <div className="mt-[10px] flex gap-2">
          <StatTile label="Budget" value={dollars(KITCHEN.budget)} size="mobile" />
          <StatTile label="Scope items" value="14" size="mobile" />
        </div>

        <div className="mt-3">
          <div className="mb-[6px] text-[9.5px] font-bold uppercase tracking-[0.07em] text-muted">
            Scope of work
          </div>
          <ScopeBullet size="mobile">{SCOPE_LINES[0]}</ScopeBullet>
        </div>
      </div>

      <div className="absolute inset-x-[14px] bottom-[14px]">
        <div className="grid h-10 place-items-center rounded-[10px] bg-accent text-[13px] font-bold text-white">
          Publish project
        </div>
      </div>
    </>
  );
}

export default function StepScopeStill() {
  return (
    <StepSlot
      tone="surface"
      mobileTone="white"
      desktop={<Desktop />}
      mobile={<Mobile />}
    />
  );
}
