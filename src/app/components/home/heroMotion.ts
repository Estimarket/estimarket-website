import type { CSSProperties } from "react";
import { enter } from "./HomeStage";

// The motion vocabulary the two hero stages share, and the state object the
// home hero's timeline drives. Keeping the derived styles here means the
// homeowner and contractor layers can't drift apart on timing.

export { enter };

/** The flat state one 18s cycle of the home hero moves through. */
export type HeroState = {
  side: "homeowner" | "contractor";
  /** Homeowner phone: 1 build · 2 bids · 3 message. */
  hoScreen: 1 | 2 | 3;
  hoChecks: number;
  hoCta: boolean;
  hoBids: number;
  hoMsg: number;
  /** Contractor console: 1 marketplace · 2 labor items · 3 messages. */
  coScreen: 1 | 2 | 3;
  coNew: boolean;
  coItems: number;
  coTotal: number;
  coSubmit: boolean;
  coMsg: number;
};

/**
 * A screen in a stack of cross-fading panels. The inactive panels sit 14px
 * off in the direction of travel — earlier screens to the left, later ones to
 * the right — so a forward step always reads as forward motion.
 */
export const panelIn = (current: number, n: number): CSSProperties => ({
  opacity: current === n ? 1 : 0,
  transform:
    current === n ? "none" : `translateX(${current > n ? -14 : 14}px)`,
  transition:
    "opacity 300ms var(--ease-enter), transform 360ms var(--ease-enter)",
});

/** A list row landing: it rises the last few pixels as it fades in. */
export const riseIn = (on: boolean, px: number): CSSProperties => ({
  opacity: on ? 1 : 0,
  transform: on ? "none" : `translateY(${px}px)`,
  transition:
    "opacity 300ms var(--ease-enter), transform 380ms var(--ease-enter)",
});

/** A value that is simply present or not — no movement. */
export const fadeIn = (on: boolean, ms = 260): CSSProperties => ({
  opacity: on ? 1 : 0,
  transition: `opacity ${ms}ms var(--ease-enter)`,
});
