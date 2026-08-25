"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useSceneTimeline, { type TimelineStep } from "./useSceneTimeline";
import {
  CONFIRMATION_ITEMS,
  dollars,
  HOMEOWNER_NOTE,
  LINE_ITEMS,
  MATERIALS,
  PHOTOS,
  PROJECT,
  TBD_ITEM,
} from "./campaignDemoData";
import "./campaign.css";

// How It Works step 2 — reviewing a scope (reference scene B, ~9.2s, play
// once and hold). The scope column's scroll offsets are read from offsetTop
// at runtime, not hardcoded, so copy edits can't desync the motion. The
// mobile variant (photo-zoom-and-confirm) is a separately authored
// composition, not the desktop scene scaled down.

function DesktopScene() {
  const stageRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const notesRef = useRef<HTMLDivElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);

  const [scrollY, setScrollY] = useState(0);
  const [photo, setPhoto] = useState(0);
  const [flag, setFlag] = useState(false);
  const [footIn, setFootIn] = useState(false);
  const [cursorIn, setCursorIn] = useState(false);
  const [cursorClick, setCursorClick] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 30, y: 300 });

  const scrollTo = useCallback(
    (target: React.RefObject<HTMLDivElement | null>, pad: number) => {
      const host = leftRef.current;
      const scroll = scrollRef.current;
      const el = target.current;
      if (!host || !scroll || !el) return;
      const maxY = Math.max(0, scroll.scrollHeight - host.clientHeight);
      setScrollY(Math.max(0, Math.min(el.offsetTop - pad, maxY)));
    },
    [],
  );

  // Move the cursor to a thumbnail's centre, in stage coordinates.
  const cursorTo = useCallback((i: number) => {
    const stage = stageRef.current;
    const thumb = thumbsRef.current?.children[i] as HTMLElement | undefined;
    if (!stage || !thumb) return;
    const stageBox = stage.getBoundingClientRect();
    const t = thumb.getBoundingClientRect();
    setCursorPos({
      x: t.left - stageBox.left + t.width / 2 - 4,
      y: t.top - stageBox.top + t.height / 2 - 4,
    });
  }, []);

  const steps = useMemo<TimelineStep[]>(
    () => [
      [
        0,
        () => {
          setFlag(false);
          setFootIn(false);
          setCursorIn(false);
          setCursorClick(false);
          setScrollY(0);
          setPhoto(0);
          setCursorPos({ x: 30, y: 300 });
        },
      ],
      [700, () => scrollTo(descRef, 6)],
      [2200, () => scrollTo(itemsRef, 10)],
      [3100, () => setFlag(true)],
      [
        4600,
        () => {
          setCursorIn(true);
          cursorTo(1);
        },
      ],
      [5500, () => setCursorClick(true)],
      [
        5750,
        () => {
          setPhoto(1);
          setCursorClick(false);
        },
      ],
      [
        7200,
        () => {
          setCursorIn(false);
          scrollTo(notesRef, 34);
        },
      ],
      [8200, () => setFootIn(true)],
    ],
    [scrollTo, cursorTo],
  );

  const { reducedMotion } = useSceneTimeline(stageRef, steps);

  // Reduced-motion resting frame: scrolled to the labor line items with the
  // flagged row highlighted, the shower photo selected, footer CTA shown.
  useEffect(() => {
    if (reducedMotion) scrollTo(itemsRef, 10);
  }, [reducedMotion, scrollTo]);
  const v = reducedMotion
    ? { photo: 1, flag: true, footIn: true, cursorIn: false, cursorClick: false }
    : { photo, flag, footIn, cursorIn, cursorClick };

  return (
    <div className="dfc slot step-slot" aria-hidden="true">
      <div
        ref={stageRef}
        className={`stage sB${v.flag ? " flag" : ""}${v.footIn ? " foot-in" : ""}${v.cursorIn ? " cursor-in" : ""}`}
      >
        <div className="b-top">
          <div style={{ flex: 1 }}>
            <div className="b-t">{PROJECT.title}</div>
            <div className="b-m">{PROJECT.metaLine}</div>
          </div>
          <span className="chip open">Open for bids</span>
        </div>

        <div className="b-cols">
          <div ref={leftRef} className="b-left">
            <div
              ref={scrollRef}
              className="b-scroll"
              style={{ transform: `translateY(${-scrollY}px)` }}
            >
              <div className="stats">
                <div>
                  <div className="k">Budget</div>
                  <div className="v">{dollars(PROJECT.budget)}</div>
                </div>
                <div>
                  <div className="k">Photos</div>
                  <div className="v">{PROJECT.photoCount}</div>
                </div>
                <div>
                  <div className="k">Room size</div>
                  <div className="v">{PROJECT.roomSize}</div>
                </div>
              </div>
              <div ref={descRef} className="dsec">
                <h5>Project description</h5>
                <p className="narr">{PROJECT.description}</p>
              </div>

              <div ref={itemsRef} className="lineitems">
                <div className="li-head">
                  <span className="lh">Labor line items</span>
                  <span className="li-n">
                    {LINE_ITEMS.length + 1} items ·{" "}
                    {"you'll price these next"}
                  </span>
                </div>
                {LINE_ITEMS.map((li) => (
                  <div key={li.name} className="li">
                    <span className="dot" />
                    <span className="tx">
                      <b>{li.name}</b>
                      <i>{li.detail}</i>
                    </span>
                  </div>
                ))}
                <div className="li needs">
                  <span className="dot" />
                  <span className="tx">
                    <b>{TBD_ITEM.name}</b>
                    <i>{TBD_ITEM.scopeDetail}</i>
                  </span>
                  <span className="cchip">{TBD_ITEM.chip}</span>
                </div>
              </div>

              <div ref={notesRef} className="dsec">
                <h5>Homeowner notes</h5>
                <ul>
                  <li>
                    {HOMEOWNER_NOTE.quote} — {HOMEOWNER_NOTE.name}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <div className="viewer">
              <div className="main">
                {PHOTOS.map((p, i) => (
                  <div key={p.src} className={`ph${v.photo === i ? " on" : ""}`}>
                    <Image
                      src={p.src}
                      alt=""
                      fill
                      sizes="230px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="cap">{PHOTOS[v.photo].caption}</div>
              <div ref={thumbsRef} className="thumbs">
                {PHOTOS.map((p, i) => (
                  <div key={p.src} className={`ph${v.photo === i ? " sel" : ""}`}>
                    <Image
                      src={p.src}
                      alt=""
                      fill
                      sizes="60px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="matcard">
              <div className="mk2">Materials homeowner will provide</div>
              <div className="mgrid">
                {MATERIALS.map((col) => (
                  <div key={col.heading}>
                    <span className="mh">{col.heading}</span>
                    {col.items.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="b-foot">
          <button type="button" className="orange-btn b-cta" tabIndex={-1}>
            Bid on this project
          </button>
          <span className="b-fine">~3 min · No site visit needed to start</span>
        </div>

        <div
          className="cursor"
          style={{
            transform: `translate(${cursorPos.x}px, ${cursorPos.y}px)${v.cursorClick ? " scale(0.86)" : ""}`,
          }}
        >
          <svg viewBox="0 0 12 16">
            <path
              d="M1 1l9.5 6.8-4 .7 2.2 4.6-1.9.9-2.2-4.6L1 13.4z"
              fill="#fff"
              stroke="#0E214B"
              strokeWidth="1"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

function MobileScene() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [photo, setPhoto] = useState(0);
  const [conf, setConf] = useState(false);

  const steps = useMemo<TimelineStep[]>(
    () => [
      [
        0,
        () => {
          setPhoto(0);
          setConf(false);
        },
      ],
      [1100, () => setPhoto(1)],
      [2900, () => setPhoto(2)],
      [4300, () => setConf(true)],
    ],
    [],
  );

  const { reducedMotion } = useSceneTimeline(stageRef, steps);
  const v = reducedMotion ? { photo: 1, conf: true } : { photo, conf };

  return (
    <div className="dfc slot m-slot" aria-hidden="true">
      <div ref={stageRef} className={`stage mB2${v.conf ? " conf" : ""}`}>
        <div className="h">
          <div className="t">{PROJECT.title}</div>
          <div className="m">
            {PROJECT.neighborhood} · {PROJECT.roomSize} · {PROJECT.photoCount}{" "}
            photos
          </div>
        </div>
        <div className="v">
          <div className="main">
            {PHOTOS.map((p, i) => (
              <div key={p.src} className={`ph${v.photo === i ? " on" : ""}`}>
                <Image
                  src={p.src}
                  alt=""
                  fill
                  sizes="320px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <div className="thumbs">
            {PHOTOS.map((p, i) => (
              <div key={p.src} className={`ph${v.photo === i ? " sel" : ""}`}>
                <Image
                  src={p.src}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="cf">
          <div className="k">Needs contractor confirmation</div>
          <div className="b">{CONFIRMATION_ITEMS[0]}</div>
        </div>
      </div>
    </div>
  );
}

export default function ScopeReviewScene() {
  return (
    <>
      <div className="hidden md:block">
        <DesktopScene />
      </div>
      <div className="flex justify-center md:hidden">
        <MobileScene />
      </div>
    </>
  );
}
