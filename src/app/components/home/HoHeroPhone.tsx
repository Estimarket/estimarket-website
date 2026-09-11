import Image from "next/image";
import {
  KITCHEN,
  KITCHEN_CAPTURES,
  KITCHEN_GENERATION,
  KITCHEN_SCOPE_GROUPS,
} from "./homeDemoData";
import { CheckGlyph, PhoneFrame } from "./HeroChrome";
import { fadeIn, panelIn } from "./heroMotion";

// The phone inside the /homeowners hero: the real capture-and-scope flow,
// walking project type → guided photos → "Building your listing…" → the
// finished overview, ending on Publish project.
//
// The generating screen drives itself, so it hides the flow chrome — no step
// header, no close, no footer — exactly as the product does.

/** The mobile app's select blue and its soft fill: the product's own
 * selected-control colours, not marketing tokens. */
const SELECT = "#245ABC";
const SELECT_SOFT = "#E8F2FF";
const DONE = "#1C7C3E";

export type HoPhoneState = {
  /** 1 project type · 2 photos · 3 generating · 4 overview. */
  step: 1 | 2 | 3 | 4;
  typePicked: boolean;
  shots: number;
  /** Which generation row is working; rows below it are done. */
  genStep: number;
  cta: boolean;
};

const STEP_LABELS: Record<HoPhoneState["step"], string> = {
  1: "Step 1 of 8 · Project type",
  2: "Step 3 of 8 · Photos",
  3: "",
  4: "Step 8 of 8 · Overview",
};

const STEP_PCT: Record<HoPhoneState["step"], number> = {
  1: 12.5,
  2: 37.5,
  3: 37.5,
  4: 100,
};

const PROJECT_TYPES = [
  {
    name: "Full gut remodel",
    detail: "New everything — cabinets, counters, appliances, flooring",
  },
  { name: "Mid-range remodel", detail: "Replace cabinets and counters, keep layout" },
  { name: "Cosmetic refresh", detail: "New counters, backsplash, paint, hardware only" },
  { name: "Cabinets only", detail: "Replace or reface — no other trades" },
];

const SUMMARY = [
  { label: "Project", value: "Kitchen — full gut" },
  { label: "Timeline", value: "1–3 months" },
  { label: "Budget", value: "$32k – $38k" },
  { label: "Photos", value: `${KITCHEN.photoCount} uploaded` },
];

/** A radio option. As with the scope checks, the unselected row is always
 * painted and the selected one fades in over it, so nothing reflows. */
function TypeOption({
  name,
  detail,
  on,
}: {
  name: string;
  detail: string;
  on?: boolean;
}) {
  const label = (bold: boolean) => (
    <div className="min-w-0 flex-1">
      <div
        className={`text-[10px] leading-[1.25] text-ink ${
          bold ? "font-bold" : "font-semibold"
        }`}
      >
        {name}
      </div>
      <div className="mt-[2px] text-[8px] leading-[1.35] text-muted">{detail}</div>
    </div>
  );
  return (
    <div className="relative">
      <div className="flex items-center gap-2 rounded-[9px] border-[0.5px] border-[#D1D5DB] bg-white p-[7px_9px]">
        {label(false)}
        <span className="size-[15px] flex-none rounded-full border-[1.5px] border-[#D1D5DB]" />
      </div>
      {on !== undefined && (
        <div
          className="absolute inset-0 flex items-center gap-2 rounded-[9px] border-[1.5px] p-[7px_9px]"
          style={{
            borderColor: SELECT,
            background: SELECT_SOFT,
            ...fadeIn(on),
          }}
        >
          {label(true)}
          <span
            className="grid size-[15px] flex-none place-items-center rounded-full border-[1.5px]"
            style={{ borderColor: SELECT }}
          >
            <span
              className="block size-2 rounded-full"
              style={{ background: SELECT }}
            />
          </span>
        </div>
      )}
    </div>
  );
}

/** One guided capture tile: the camera prompt, then the photo that fills it. */
function CaptureTile({
  label,
  zoom,
  origin,
  on,
}: {
  label: string;
  zoom: number;
  origin: string;
  on: boolean;
}) {
  return (
    <div className="w-[56px]">
      <div
        className="relative grid size-[56px] place-items-center overflow-hidden rounded-[8px] border"
        style={{ background: SELECT_SOFT, borderColor: SELECT }}
      >
        <svg
          viewBox="0 0 24 24"
          className="size-[15px]"
          fill="none"
          stroke={SELECT}
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z" />
          <circle cx="12" cy="13" r="3.5" />
        </svg>
        {/* `sizes` is well above the 56px tile: the zoomed framings magnify
            the source up to 2.4x, and a tile-sized file would render soft. */}
        <Image
          src={KITCHEN.photo}
          alt=""
          fill
          sizes="224px"
          className="object-cover"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: origin,
            ...fadeIn(on, 320),
          }}
        />
      </div>
      <div className="mt-[3px] text-center text-[7.5px] leading-[1.25] text-muted">
        {label}
      </div>
    </div>
  );
}

/** One "Building your listing…" row: pending → working → done. */
function GenerationRow({
  label,
  working,
  done,
}: {
  label: string;
  working: boolean;
  done: boolean;
}) {
  return (
    <div className="relative flex min-h-[30px] items-center gap-2 rounded-[9px] border-[0.5px] border-[#D1D5DB] bg-white px-[9px]">
      <span
        className="absolute -inset-[0.5px] rounded-[9px] border-[1.5px]"
        style={{
          borderColor: SELECT,
          background: SELECT_SOFT,
          ...fadeIn(working),
        }}
      />
      <span className="relative z-[1] size-[15px] flex-none">
        <span className="absolute inset-0 rounded-full border-[1.5px] border-[#D1D5DB]" />
        <span
          className="absolute inset-0 grid place-items-center rounded-full border-[1.5px]"
          style={{ borderColor: SELECT, ...fadeIn(working, 220) }}
        >
          <span className="block size-2 rounded-full" style={{ background: SELECT }} />
        </span>
        <span
          className="absolute inset-0 grid place-items-center rounded-full"
          style={{ background: DONE, ...fadeIn(done, 220) }}
        >
          <CheckGlyph size={9} />
        </span>
      </span>
      <span className="relative z-[1] text-[9.5px] font-semibold text-ink">
        {label}
      </span>
    </div>
  );
}

export default function HoHeroPhone({ v }: { v: HoPhoneState }) {
  // The generating screen owns the whole phone while it runs.
  const chrome = v.step !== 3;
  return (
    <PhoneFrame w={228} h={480} radius={38}>
      <div
        className="flex flex-none justify-end p-[2px_12px_0]"
        style={fadeIn(chrome, 260)}
      >
        <svg
          viewBox="0 0 24 24"
          className="size-[15px]"
          fill="none"
          stroke="var(--color-muted)"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </div>

      <div className="flex-none p-[8px_12px_3px]" style={fadeIn(chrome, 260)}>
        <div className="h-[3px] overflow-hidden rounded-[4px] bg-[#F3F4F6]">
          <div
            className="h-[3px] rounded-[4px] bg-accent"
            style={{
              width: `${STEP_PCT[v.step]}%`,
              transition: "width 520ms var(--ease-enter)",
            }}
          />
        </div>
        <div className="mt-[6px] text-[9px] font-semibold uppercase tracking-[0.8px] text-accent">
          {STEP_LABELS[v.step]}
        </div>
      </div>

      <div className="relative m-[8px_12px_0] min-h-0 flex-1">
        {/* 1 — project type */}
        <div className="absolute inset-0" style={panelIn(v.step, 1)}>
          <div className="text-[14px] font-bold leading-[1.2] tracking-[-0.01em]">
            What kind of kitchen project is this?
          </div>
          <div className="mt-[5px] text-[9.5px] leading-[1.4] text-muted">
            This shapes the questions we ask you next.
          </div>
          <div className="mt-[11px] flex flex-col gap-[6px]">
            {PROJECT_TYPES.map((type, i) => (
              <TypeOption
                key={type.name}
                {...type}
                on={i === 0 ? v.typePicked : undefined}
              />
            ))}
          </div>
        </div>

        {/* 2 — guided photos */}
        <div className="absolute inset-0 overflow-hidden" style={panelIn(v.step, 2)}>
          <div className="text-[14px] font-bold leading-[1.2] tracking-[-0.01em]">
            Add photos of your kitchen
          </div>
          <div className="mt-[5px] text-[9.5px] leading-[1.4] text-muted">
            Contractors use these to price accurately.
          </div>
          <div className="mt-[9px] rounded-[8px] bg-[#FEF5DA] p-[7px_8px]">
            <div className="flex items-center gap-1">
              <svg
                viewBox="0 0 24 24"
                className="size-[11px] flex-none"
                fill="none"
                stroke="#C9A126"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2" />
              </svg>
              <span className="text-[9px] font-semibold text-[#C9A126]">
                Tips for accurate photos
              </span>
            </div>
            <div className="mt-[3px] text-[8px] leading-[1.4] text-ink">
              Good lighting · shoot from corners · capture cabinets inside and out.
            </div>
          </div>
          <div className="mb-[6px] mt-[11px] flex items-center justify-between">
            <span className="text-[8.5px] font-semibold uppercase tracking-[0.6px] text-muted">
              Kitchen
            </span>
            <span className="rounded-[4px] bg-[#DCF5E4] px-[5px] py-[1.5px] text-[7.5px] font-semibold tracking-[0.4px] text-[#1C7C3E]">
              ALWAYS
            </span>
          </div>
          <div className="flex flex-wrap gap-[6px]">
            {KITCHEN_CAPTURES.map((capture, i) => (
              <CaptureTile key={capture.label} {...capture} on={v.shots > i} />
            ))}
            <div className="w-[56px]">
              <div className="grid size-[56px] place-items-center rounded-[8px] border border-[#D1D5DB] bg-[#F3F4F6] text-[17px] leading-none text-muted">
                ＋
              </div>
              <div className="mt-[3px] text-center text-[7.5px] leading-[1.25] text-muted">
                Add more
              </div>
            </div>
          </div>
        </div>

        {/* 3 — generating */}
        <div
          className="absolute inset-0 flex flex-col items-center pt-[14px]"
          style={panelIn(v.step, 3)}
        >
          <div className="grid size-[44px] place-items-center rounded-full bg-accent">
            <svg
              viewBox="0 0 24 24"
              className="size-5"
              fill="none"
              stroke="#fff"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
            </svg>
          </div>
          <div className="mt-[13px] text-[14px] font-bold">Building your listing…</div>
          <div className="mt-[3px] text-[9.5px] text-muted">
            This usually takes about 20 seconds.
          </div>
          <div className="mt-[15px] flex flex-col gap-[6px] self-stretch">
            {KITCHEN_GENERATION.map((label, i) => (
              <GenerationRow
                key={label}
                label={label}
                working={v.step === 3 && v.genStep === i + 1}
                done={v.step === 3 && v.genStep > i + 1}
              />
            ))}
          </div>
        </div>

        {/* 4 — the finished listing */}
        <div className="absolute inset-0 overflow-hidden" style={panelIn(v.step, 4)}>
          <div className="text-[14px] font-bold leading-[1.2] tracking-[-0.01em]">
            {KITCHEN.title} remodel
          </div>
          <div className="mt-[3px] text-[9.5px] text-muted">
            Denver, CO · ready to publish
          </div>

          <div className="mt-[9px] flex gap-1">
            {KITCHEN_CAPTURES.slice(0, 3).map((capture) => (
              <div
                key={capture.label}
                className="relative h-[42px] min-w-0 flex-1 overflow-hidden rounded-[6px]"
              >
                <Image
                  src={KITCHEN.photo}
                  alt=""
                  fill
                  sizes="224px"
                  className="object-cover"
                  style={{
                    transform: `scale(${capture.zoom})`,
                    transformOrigin: capture.origin,
                  }}
                />
              </div>
            ))}
            <span className="grid h-[42px] w-[34px] flex-none place-items-center rounded-[6px] bg-[#F3F4F6] text-[9px] font-bold text-muted">
              +{KITCHEN.photoCount - 3}
            </span>
          </div>

          <div className="mt-[11px] grid grid-cols-2 gap-[9px_10px] border-t border-[#D1D5DB]/70 pt-[10px]">
            {SUMMARY.map((row) => (
              <div key={row.label}>
                <div className="text-[7.5px] font-bold uppercase tracking-[0.5px] text-muted">
                  {row.label}
                </div>
                <div className="mt-[2px] text-[10px] font-semibold text-ink">
                  {row.value}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 text-[8.5px] font-bold uppercase tracking-[0.5px] text-muted">
            Scope
          </div>
          <div className="mt-[6px] flex flex-col gap-[5px]">
            {KITCHEN_SCOPE_GROUPS.map((group) => (
              <div
                key={group.name}
                className="flex items-center gap-[7px] rounded-[8px] border-[0.5px] border-[#D1D5DB] bg-white p-[6px_8px]"
              >
                <span
                  className="grid size-[13px] flex-none place-items-center rounded-full"
                  style={{ background: DONE }}
                >
                  <CheckGlyph size={8} />
                </span>
                <span className="min-w-0 flex-1 text-[9.5px] font-semibold text-ink">
                  {group.name}
                </span>
                <span className="flex-none text-[8.5px] text-muted">
                  {group.items} {group.items === 1 ? "item" : "items"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-none p-[6px_12px_0]" style={fadeIn(chrome, 260)}>
        <div className="py-[3px] text-[9.5px] font-medium text-muted">← Back</div>
        <div className="relative mt-[2px] h-10">
          <span
            className="absolute inset-0 flex items-center justify-center rounded-[12px] bg-slate text-[11px] font-semibold text-white"
            style={fadeIn(!v.cta, 280)}
          >
            Continue
          </span>
          <span
            className="absolute inset-0 flex items-center justify-center rounded-[12px] bg-accent text-[11px] font-bold text-white"
            style={{
              opacity: v.cta ? 1 : 0,
              transform: v.cta ? "none" : "scale(0.95)",
              transition:
                "opacity 280ms var(--ease-enter), transform 420ms var(--ease-spring)",
            }}
          >
            Publish project
          </span>
        </div>
      </div>
    </PhoneFrame>
  );
}
