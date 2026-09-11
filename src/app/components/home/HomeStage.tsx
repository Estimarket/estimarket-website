"use client";

import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";

// Shared geometry for the home page's imagery slots.
//
// Every composition is authored at a fixed pixel size and scaled to fit its
// column — the same approach the campaign scenes take in HeroLoopScene.tsx.
// Authoring at a fixed size is what lets the type inside a stage sit at 8–14px:
// the scale factor, not the font size, carries legibility.
//
// Mobile is *separately authored*, never the desktop stage scaled down (the
// rule from docs/campaign-motion/SPEC.md). Below 640px each slot renders a
// different, simpler composition with larger type.

/** Desktop step slot. ~1:1 on purpose — the images these replace are
 * 1788×1734 rendered at 560 wide, so the step column height doesn't change. */
export const STEP_STAGE = { w: 560, h: 540 };
export const STEP_STAGE_MOBILE = { w: 342, h: 348 };

export const HERO_STAGE = { w: 580, h: 500 };
export const HERO_STAGE_MOBILE = { w: 342, h: 330 };

/**
 * Measures its own width and scales a fixed-size stage down to fit, keeping
 * the wrapper's height in step so the scaled box doesn't leave a gap. The
 * stage keeps its authored layout width, which would otherwise widen the page
 * on narrow viewports — hence `overflow-hidden`.
 */
export function ScaledStage({
  w,
  h,
  className,
  children,
}: {
  w: number;
  h: number;
  className?: string;
  children: ReactNode;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => setScale(Math.min(1, el.clientWidth / w));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [w]);

  return (
    <div
      ref={wrapRef}
      className="mx-auto w-full overflow-hidden"
      style={{ maxWidth: w, height: h * scale }}
    >
      {/* line-height: normal, not the 1.5 Tailwind's preflight puts on html.
          These compositions are authored against the browser default, and at
          1.5 every line box inside a stage runs ~25% tall — enough to push
          pinned footers over the content above them. Anything that needs a
          specific leading sets it locally. */}
      <div
        className={`relative origin-top-left ${className ?? ""}`}
        style={{
          width: w,
          height: h,
          transform: `scale(${scale})`,
          lineHeight: "normal",
        }}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * The card chrome around a step slot, holding the separately-authored desktop
 * and mobile compositions. The whole slot is `aria-hidden` — these are
 * imagery, and the surrounding copy carries the meaning.
 *
 * `rootRef` is for the animated slots: it points at a wrapper that is present
 * at every breakpoint, so one timeline drives both compositions. The hidden
 * one never animates visibly, and `display: none` keeps it from reporting an
 * intersection of its own.
 */
export function StepSlot({
  tone,
  mobileTone = tone,
  desktop,
  mobile,
  rootRef,
}: {
  tone: "white" | "surface";
  /** Some slots sit on a different ground at phone width — step 1's mobile
   * composition is the app screen itself, so it runs edge-to-edge on white. */
  mobileTone?: "white" | "surface";
  desktop: ReactNode;
  mobile: ReactNode;
  rootRef?: RefObject<HTMLDivElement | null>;
}) {
  const bg = tone === "white" ? "bg-white" : "bg-surface";
  const mobileBg = mobileTone === "white" ? "bg-white" : "bg-surface";
  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="mx-auto w-full max-w-[560px] select-none"
    >
      <div
        className={`hidden overflow-hidden rounded-[24px] border border-line shadow-brand-lg sm:block ${bg}`}
      >
        <ScaledStage {...STEP_STAGE}>{desktop}</ScaledStage>
      </div>
      <div
        className={`overflow-hidden rounded-[16px] border border-line shadow-brand-md sm:hidden ${mobileBg}`}
      >
        <ScaledStage {...STEP_STAGE_MOBILE}>{mobile}</ScaledStage>
      </div>
    </div>
  );
}

/**
 * A slot with no card chrome, for /homeowners: the images those slots replace
 * are bare `drop-shadow-xl` PNGs, so each composition is transparent and its
 * own cards carry the shadow. Otherwise it behaves like `StepSlot` — one
 * timeline drives both separately-authored compositions, and `rootRef` sits on
 * a wrapper present at every breakpoint.
 */
export function BareSlot({
  desktop,
  mobile,
  rootRef,
}: {
  desktop: { w: number; h: number; content: ReactNode };
  mobile: { w: number; h: number; content: ReactNode };
  rootRef?: RefObject<HTMLDivElement | null>;
}) {
  return (
    <div ref={rootRef} aria-hidden="true" className="w-full select-none">
      <div className="hidden sm:block">
        <ScaledStage w={desktop.w} h={desktop.h}>
          {desktop.content}
        </ScaledStage>
      </div>
      <div className="sm:hidden">
        <ScaledStage w={mobile.w} h={mobile.h}>
          {mobile.content}
        </ScaledStage>
      </div>
    </div>
  );
}

/** Enter transition shared by every arriving element in these scenes. */
export const enter = (ms = 380, transformMs = 420) =>
  `opacity ${ms}ms var(--ease-enter), transform ${transformMs}ms var(--ease-enter)`;

/** The notification drop — opacity eases, transform springs. */
export const springIn = (ms = 320, transformMs = 460) =>
  `opacity ${ms}ms var(--ease-enter), transform ${transformMs}ms var(--ease-spring)`;
