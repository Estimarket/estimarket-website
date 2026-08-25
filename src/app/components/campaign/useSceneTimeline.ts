"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type TimelineStep = [delayMs: number, run: () => void];

type Options = {
  /** Replay after the last step plus `loopGapMs` while visible; pause and
   * clear timers off-screen. Play-once scenes hold their final frame and
   * never replay on re-entry. */
  loop?: boolean;
  loopGapMs?: number;
};

/**
 * Drives a scene's step timeline (a port of the reference prototype's
 * `Timeline` class and IntersectionObserver wiring). The timeline starts when
 * the element is at least 50% visible. When the visitor prefers reduced
 * motion, no timers run at all — the scene must render its resting state off
 * the returned `reducedMotion` flag instead.
 */
export default function useSceneTimeline(
  ref: React.RefObject<HTMLElement | null>,
  steps: TimelineStep[],
  { loop = false, loopGapMs = 0 }: Options = {},
) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const stepsRef = useRef(steps);
  const timersRef = useRef<number[]>([]);
  const playedRef = useRef(false);
  const finishedRef = useRef(false);

  useEffect(() => {
    stepsRef.current = steps;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const stop = () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };

    const play = () => {
      stop();
      let max = 0;
      for (const [ms, run] of stepsRef.current) {
        max = Math.max(max, ms);
        timersRef.current.push(window.setTimeout(run, ms));
      }
      if (loop) {
        timersRef.current.push(window.setTimeout(play, max + loopGapMs));
      } else {
        timersRef.current.push(
          window.setTimeout(() => {
            finishedRef.current = true;
          }, max),
        );
      }
    };

    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyMotionPref = () => {
      setReducedMotion(mql.matches);
      if (mql.matches) stop();
    };
    applyMotionPref();
    mql.addEventListener("change", applyMotionPref);

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (mql.matches) continue;
          if (entry.isIntersecting) {
            if (loop) play();
            else if (!playedRef.current) {
              playedRef.current = true;
              play();
            }
          } else if (loop) {
            stop();
          }
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      mql.removeEventListener("change", applyMotionPref);
      stop();
      // StrictMode double-invokes this effect in dev. Clearing the timers
      // above prevents two timelines racing; if a play-once run was cut short
      // here, let the re-run start it over instead of holding a partial frame.
      if (!finishedRef.current) playedRef.current = false;
    };
  }, [ref, loop, loopGapMs]);

  return { reducedMotion };
}

/**
 * The reference's `countUp`: animates a value from 0 to `to` over `ms` with
 * cubic ease-out, feeding each frame to `set`. Frames are cancelled on
 * unmount so no state update can fire after the component is gone.
 */
export function useCountUp() {
  const rafsRef = useRef<number[]>([]);

  useEffect(() => {
    const rafs = rafsRef.current;
    return () => {
      rafs.forEach(cancelAnimationFrame);
    };
  }, []);

  return useCallback((to: number, ms: number, set: (v: number) => void) => {
    let start: number | null = null;
    const frame = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / ms, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      set(Math.round(to * eased));
      if (p < 1) rafsRef.current.push(requestAnimationFrame(frame));
    };
    rafsRef.current.push(requestAnimationFrame(frame));
  }, []);
}
