"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import useSceneTimeline, { useCountUp, type TimelineStep } from "./useSceneTimeline";
import {
  BID_RANGE,
  CONFIRMATION_ITEMS,
  dollars,
  LINE_ITEMS,
  LOHI_PHOTO,
  PHOTOS,
  PRICED_TOTAL,
  PROJECT,
  SECOND_CARD,
  TBD_ITEM,
} from "./campaignDemoData";
import "./campaign.css";

// The hero animation (reference scene A): four cross-faded phases —
// marketplace alert → scope glance → labor items → submitted — looping with a
// 3.2s gap, pausing whenever the slot scrolls out of view. The stage is a
// fixed 588×441 composition; a measuring wrapper scales it down proportionally
// on narrow viewports.

const STAGE_W = 588;
const STAGE_H = 441;

type HeroRow = {
  name: string;
  detail?: string;
  price: string;
  tbd?: boolean;
};

// The hero's labor card shows four named rows, a "+ 1 more" row standing in
// for the fifth, then the TBD row.
const HERO_ROWS: HeroRow[] = [
  ...LINE_ITEMS.slice(0, 4).map((li) => ({
    name: li.name,
    detail: li.heroDetail ?? li.detail,
    price: li.amount.toLocaleString("en-US"),
  })),
  {
    name: "+ 1 more line item",
    price: LINE_ITEMS[4].amount.toLocaleString("en-US"),
  },
  { name: TBD_ITEM.name, detail: TBD_ITEM.bidDetail, price: "—", tbd: true },
];

// Reduced-motion resting frame: the labor-items phase, all rows in, TBD chip
// shown, total complete.
const RESTING = {
  phase: 3,
  notifIn: false,
  revealCard: false,
  tbdOn: true,
  rowsIn: HERO_ROWS.length,
  total: PRICED_TOTAL,
};

export default function HeroLoopScene() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const countUp = useCountUp();
  const [scale, setScale] = useState(1);
  const [phase, setPhase] = useState(1);
  const [notifIn, setNotifIn] = useState(false);
  const [revealCard, setRevealCard] = useState(false);
  const [tbdOn, setTbdOn] = useState(false);
  const [rowsIn, setRowsIn] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => setScale(Math.min(1, el.clientWidth / STAGE_W));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const steps = useMemo<TimelineStep[]>(() => {
    const s: TimelineStep[] = [
      [
        0,
        () => {
          setPhase(1);
          setNotifIn(false);
          setRevealCard(false);
          setTbdOn(false);
          setRowsIn(0);
          setTotal(0);
        },
      ],
      [500, () => setNotifIn(true)],
      [
        2000,
        () => {
          setNotifIn(false);
          setRevealCard(true);
        },
      ],
      [3300, () => setPhase(2)],
      [5900, () => setPhase(3)],
      [6200, () => countUp(PRICED_TOTAL, 1500, setTotal)],
      [7700, () => setTbdOn(true)],
      [9600, () => setPhase(4)],
    ];
    // The reference staggers the rows with nested timeouts (i * 230ms from
    // 6200); flattened here so every timer is owned by the timeline.
    HERO_ROWS.forEach((_, i) => {
      s.push([6200 + i * 230, () => setRowsIn(i + 1)]);
    });
    return s;
  }, [countUp]);

  const { reducedMotion } = useSceneTimeline(stageRef, steps, {
    loop: true,
    loopGapMs: 3200,
  });
  const v = reducedMotion
    ? RESTING
    : { phase, notifIn, revealCard, tbdOn, rowsIn, total };

  return (
    // overflow-hidden: the scaled stage keeps its 588px layout width, which
    // would otherwise widen the page on narrow viewports
    <div
      ref={wrapRef}
      className="mx-auto w-full max-w-[588px] overflow-hidden"
      style={{ height: STAGE_H * scale }}
    >
      <div
        className="dfc slot hero-slot origin-top-left"
        style={{ transform: `scale(${scale})` }}
        aria-hidden="true"
      >
        <div
          ref={stageRef}
          data-phase={v.phase}
          className={`stage sA${v.notifIn ? " notif-in" : ""}${v.revealCard ? " reveal-card" : ""}${v.tbdOn ? " tbd-on" : ""}`}
        >
          {/* A1 — the marketplace, a new card arriving */}
          <div className="panel p1">
            <div className="mk">
              <div className="mk-head">
                <span className="t">Marketplace</span>
                <span className="m">Open projects in your service area</span>
              </div>
              <div className="mk-grid">
                <div className="pcard">
                  <div className="img ph">
                    <Image
                      src={LOHI_PHOTO.src}
                      alt=""
                      fill
                      sizes="236px"
                      className="object-cover"
                    />
                    <span className="chip cat">{SECOND_CARD.categoryChip}</span>
                    <span className="chip bids">{SECOND_CARD.bidsChip}</span>
                  </div>
                  <div className="body">
                    <div className="ttl">{SECOND_CARD.title}</div>
                    <div className="meta">{SECOND_CARD.cardMeta}</div>
                    <div className="bl">Budget</div>
                    <div className="row">
                      <span className="bud">{dollars(SECOND_CARD.budget)}</span>
                      <button type="button" className="orange-btn rb" tabIndex={-1}>
                        Review + bid
                      </button>
                    </div>
                  </div>
                </div>
                <div className="pcard fresh">
                  <div className="img ph">
                    <Image
                      src={PHOTOS[0].src}
                      alt=""
                      fill
                      sizes="236px"
                      className="object-cover"
                    />
                    <span className="chip cat">{PROJECT.categoryChip}</span>
                    <span className="chip bids">{PROJECT.bidsChip}</span>
                  </div>
                  <div className="body">
                    <div className="ttl">{PROJECT.title}</div>
                    <div className="meta">{PROJECT.cardMeta}</div>
                    <div className="bl">Budget</div>
                    <div className="row">
                      <span className="bud">{dollars(PROJECT.budget)}</span>
                      <button type="button" className="orange-btn rb" tabIndex={-1}>
                        Review + bid
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="notif">
            <div className="ico">
              <svg viewBox="0 0 24 24">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </div>
            <div>
              <div className="n-t">New project in your service area</div>
              <div className="n-b">{PROJECT.title}</div>
            </div>
            <div className="n-x">now</div>
          </div>

          {/* A2 — the scope glance */}
          <div className="panel p2">
            <div className="glance">
              <div className="g-head">
                <div style={{ flex: 1 }}>
                  <div className="g-t">{PROJECT.title}</div>
                  <div className="g-m">{PROJECT.metaLine}</div>
                </div>
                <span className="chip open">Open for bids</span>
              </div>
              <div className="g-body">
                <div>
                  <div className="gstat">
                    <div>
                      <div className="k">Budget</div>
                      <div className="v">{dollars(PROJECT.budget)}</div>
                    </div>
                    <div>
                      <div className="k">Room size</div>
                      <div className="v">{PROJECT.roomSize}</div>
                    </div>
                  </div>
                  <div className="gconf">
                    <div className="k">Needs contractor confirmation</div>
                    <ul>
                      {CONFIRMATION_ITEMS.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div>
                  <div className="ph g-photo">
                    <Image
                      src={PHOTOS[0].src}
                      alt=""
                      fill
                      sizes="152px"
                      className="object-cover"
                    />
                  </div>
                  <div className="g-thumbs">
                    {PHOTOS.map((p) => (
                      <div key={p.src} className="ph">
                        <Image
                          src={p.src}
                          alt=""
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="g-foot">
                <button type="button" className="orange-btn g-cta" tabIndex={-1}>
                  Bid on this project
                </button>
                <span className="g-fine">~3 min · No site visit needed to start</span>
              </div>
            </div>
          </div>

          {/* A3 — labor items, running total counting up */}
          <div className="panel p3">
            <div className="laborcard">
              <div className="lc-h">Labor items</div>
              <div className="rt">
                <div>
                  <div className="rt-k">Running total (excluding TBD)</div>
                  <div>
                    <span className="rt-v">{dollars(v.total)}</span>
                    <span className="rt-b">
                      of the {dollars(PROJECT.budget)} budget
                    </span>
                  </div>
                </div>
                <span className="chip tbd">1 TBD</span>
              </div>
              {HERO_ROWS.map((row, i) => (
                <div
                  key={row.name}
                  className={`lrowA${row.tbd ? " is-tbd" : ""}${v.rowsIn > i ? " in" : ""}`}
                >
                  <span className="n">
                    {row.name}
                    {row.detail ? <i>{row.detail}</i> : null}
                  </span>
                  <span className="p">{row.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* A4 — submitted */}
          <div className="panel p4">
            <div className="sent">
              <div className="check">
                <svg viewBox="0 0 24 24">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <div className="st">Bid submitted — no site visit</div>
              <div className="sb">Homeowners compare the midpoint of each range</div>
              <div className="rangebar">
                <div className="k">Your bid range</div>
                <div className="v">
                  {dollars(BID_RANGE.min)} – {dollars(BID_RANGE.max)}
                </div>
                <div className="m">
                  Calculated from {LINE_ITEMS.length} line items ·{" "}
                  {dollars(PRICED_TOTAL)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
