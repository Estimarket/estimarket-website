"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import useSceneTimeline, { type TimelineStep } from "../campaign/useSceneTimeline";
import {
  KITCHEN,
  KITCHEN_SCOPE,
  KITCHEN_TBD,
  KITCHEN_THUMBS,
  SCOPE_QUESTIONS,
  dollars,
} from "./homeDemoData";
import { BareSlot } from "./HomeStage";

// Slot 1 — Step 01, Describe your project (animated). The homeowner capture
// app answering its guided questions, then the finished scope sliding in.
//
// The scope card carries no prices: a homeowner's scope has none. The budget
// is the homeowner's single figure; contractors add the money later.

const DESKTOP = { w: 624, h: 448 };
const MOBILE = { w: 342, h: 360 };
const EASE = "var(--ease-enter)";
const WELL = "#efe6d6";

const RESTING = { rows: SCOPE_QUESTIONS.length, gen: true, scope: true };

function SparkleIcon({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="#fff" style={{ width: size, height: size }}>
      <path d="M12 2.5l1.7 4.6 4.6 1.7-4.6 1.7L12 15.1l-1.7-4.6L5.7 8.8l4.6-1.7L12 2.5zM18.5 14l.9 2.3 2.3.9-2.3.9-.9 2.3-.9-2.3-2.3-.9 2.3-.9.9-2.3z" />
    </svg>
  );
}

function rowIn(on: boolean) {
  return {
    opacity: on ? 1 : 0,
    transform: on ? "none" : "translateY(8px)",
    transition: `opacity 300ms ${EASE}, transform 340ms ${EASE}`,
  };
}

function ProgressBar({ answered }: { answered: number }) {
  return (
    <div className="mt-2 h-[5px] overflow-hidden rounded-[3px] bg-[#f3f4f6]">
      <div
        className="h-full rounded-[3px] bg-accent"
        style={{
          width: `${(answered / SCOPE_QUESTIONS.length) * 100}%`,
          transition: `width 500ms ${EASE}`,
        }}
      />
    </div>
  );
}

function QuestionCard({
  q,
  on,
  size,
}: {
  q: (typeof SCOPE_QUESTIONS)[number];
  on: boolean;
  size: "desktop" | "mobile";
}) {
  const d = size === "desktop";
  return (
    <div
      className={`rounded-[10px] border border-line ${d ? "p-[8px_10px]" : "p-[9px_11px]"}`}
      style={rowIn(on)}
    >
      <div className={`text-muted ${d ? "text-[9.5px]" : "text-[10px]"}`}>
        {q.prompt}
      </div>
      <div className="mt-[3px] flex items-center gap-[6px]">
        <span
          className={d ? "text-[11px]" : "text-[12px]"}
          style={{ color: "#16a34a" }}
        >
          ✓
        </span>
        <span
          className={`font-semibold text-ink ${d ? "text-[11.5px]" : "text-[12.5px]"}`}
        >
          {q.answer}
        </span>
      </div>
    </div>
  );
}

function ScopeBullet({ children }: { children: string }) {
  return (
    <div className="relative mb-1 pl-3 text-[10.5px] leading-[1.5] text-slate">
      <span className="absolute left-0 top-[6px] size-1 rounded-[2px] bg-[#d1d5db]" />
      {children}
    </div>
  );
}

export default function ScopeBuilderScene() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [rows, setRows] = useState(0);
  const [gen, setGen] = useState(false);
  const [scope, setScope] = useState(false);

  const steps = useMemo<TimelineStep[]>(() => {
    const s: TimelineStep[] = [
      [
        0,
        () => {
          setRows(0);
          setGen(false);
          setScope(false);
        },
      ],
      [1050, () => setGen(true)],
      [1850, () => setScope(true)],
    ];
    for (let i = 0; i < SCOPE_QUESTIONS.length; i++) {
      s.push([200 + i * 300, () => setRows(i + 1)]);
    }
    return s;
  }, []);

  const { reducedMotion } = useSceneTimeline(rootRef, steps);
  const v = reducedMotion ? RESTING : { rows, gen, scope };

  const genStyle = {
    opacity: v.gen ? 1 : 0,
    transform: v.gen ? "none" : "translateY(10px)",
    transition: `opacity 380ms ${EASE}, transform 380ms ${EASE}`,
  };

  const desktop = (
    <>
      {/* Phone — the guided scope builder mid-run */}
      <div className="absolute left-0 top-5 h-[408px] w-[272px] overflow-hidden rounded-[18px] border border-line bg-white p-4 shadow-brand-xl">
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-bold text-ink">Kitchen remodel</span>
          <span className="text-[10px] text-muted">
            Step 3 of 7
          </span>
        </div>
        <ProgressBar answered={v.rows} />

        <div className="mt-[14px] flex flex-col gap-2">
          {SCOPE_QUESTIONS.map((q, i) => (
            <QuestionCard key={q.prompt} q={q} on={v.rows > i} size="desktop" />
          ))}
        </div>

        <div className="mt-3 grid grid-cols-4 gap-1">
          {KITCHEN_THUMBS.map((src, i) => (
            <div
              key={i}
              className="relative h-10 overflow-hidden rounded-[6px]"
              style={{ background: WELL }}
            >
              <Image src={src} alt="" fill sizes="70px" className="object-cover" />
            </div>
          ))}
          <div className="grid h-10 place-items-center rounded-[6px] bg-[#f3f4f6] text-[10px] font-semibold text-muted">
            +{KITCHEN.photoCount - KITCHEN_THUMBS.length}
          </div>
        </div>

        <div
          className="mt-3 flex items-center gap-[9px] rounded-[10px] border border-line bg-surface p-[9px_11px]"
          style={genStyle}
        >
          <span className="grid size-[26px] flex-none place-items-center rounded-full bg-accent">
            <SparkleIcon size={14} />
          </span>
          <div>
            <div className="text-[11.5px] font-bold text-ink">
              Building your listing…
            </div>
            <div className="mt-px text-[9.5px] text-muted">Writing your scope</div>
          </div>
        </div>
      </div>

      {/* Scope card — the finished listing, no prices */}
      <div
        className="absolute right-0 top-[52px] w-[336px] rounded-[16px] border border-line bg-white p-4 shadow-brand-2xl"
        style={{
          opacity: v.scope ? 1 : 0,
          transform: v.scope ? "none" : "translateX(28px) translateY(10px)",
          transition: `opacity 420ms ${EASE}, transform 480ms ${EASE}`,
        }}
      >
        <div className="flex items-start justify-between gap-[10px]">
          <div>
            <div className="text-[14px] font-bold tracking-[-0.01em] text-ink">
              {KITCHEN.title}
            </div>
            <div className="mt-[2px] text-[10.5px] text-muted">
              Your project scope · ready to post
            </div>
          </div>
          <span className="inline-flex whitespace-nowrap rounded-full bg-[#fee9df] px-[9px] py-[3px] text-[9.5px] font-semibold text-[#c04e18]">
            Scope ready
          </span>
        </div>

        <div className="mt-3 flex gap-[7px]">
          {[
            { label: "Budget", value: dollars(KITCHEN.budget) },
            { label: "Room size", value: KITCHEN.roomSize },
          ].map((t) => (
            <div key={t.label} className="flex-1 rounded-[8px] bg-surface p-[7px_9px]">
              <div className="text-[8.5px] font-semibold uppercase tracking-[0.05em] text-muted">
                {t.label}
              </div>
              <div className="text-[13px] font-bold tabular-nums text-ink">
                {t.value}
              </div>
            </div>
          ))}
        </div>

        <div className="mb-[6px] mt-[13px] text-[9px] font-bold uppercase tracking-[0.07em] text-muted">
          Scope of work
        </div>
        {KITCHEN_SCOPE.map((line) => (
          <ScopeBullet key={line}>{line}</ScopeBullet>
        ))}

        <div className="mt-3 rounded-[8px] border border-tbd-border bg-tbd-bg p-[8px_10px]">
          <div className="mb-[3px] text-[9px] font-bold uppercase tracking-[0.06em] text-tbd">
            Marked TBD
          </div>
          <div className="text-[10.5px] leading-[1.45] text-slate">
            {KITCHEN_TBD}
          </div>
        </div>

        <div className="mt-[13px] flex items-center justify-between gap-[10px] border-t border-line pt-[11px]">
          <span className="text-[10px] text-muted">
            {KITCHEN.scopeItemCount} items · {KITCHEN.photoCount} photos ·
            measurements ✓
          </span>
          <span className="inline-flex h-[30px] items-center whitespace-nowrap rounded-[8px] bg-accent px-[13px] text-[11.5px] font-bold text-white">
            Post project
          </span>
        </div>
      </div>
    </>
  );

  const mobile = (
    <>
      <div className="absolute inset-x-0 top-0 rounded-[16px] border border-line bg-white p-4 shadow-brand-xl">
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-bold text-ink">Kitchen remodel</span>
          <span className="text-[10.5px] text-muted">Step 3 of 7</span>
        </div>
        <ProgressBar answered={v.rows} />
        <div className="mt-[14px] flex flex-col gap-[9px]">
          {SCOPE_QUESTIONS.map((q, i) => (
            <QuestionCard key={q.prompt} q={q} on={v.rows > i} size="mobile" />
          ))}
        </div>
      </div>

      <div
        className="absolute inset-x-0 bottom-0 flex items-center gap-[11px] rounded-[14px] border border-line bg-white p-[12px_14px] shadow-brand-lg"
        style={{
          opacity: v.scope ? 1 : 0,
          transform: v.scope ? "none" : "translateY(10px)",
          transition: `opacity 420ms ${EASE}, transform 460ms ${EASE}`,
        }}
      >
        <span className="grid size-[34px] flex-none place-items-center rounded-full bg-accent">
          <SparkleIcon size={17} />
        </span>
        <div>
          <div className="text-[12.5px] font-bold text-ink">
            Your scope is ready
          </div>
          <div className="mt-px text-[10.5px] text-muted">
            {KITCHEN.scopeItemCount} items · {KITCHEN.photoCount} photos ·
            measurements ✓
          </div>
        </div>
      </div>
    </>
  );

  return (
    <BareSlot
      rootRef={rootRef}
      desktop={{ ...DESKTOP, content: desktop }}
      mobile={{ ...MOBILE, content: mobile }}
    />
  );
}
