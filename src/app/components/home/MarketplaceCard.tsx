import Image from "next/image";
import type { MarketplaceCard as Card } from "./homeDemoData";
import { dollars } from "./homeDemoData";

// The real contractor-facing project card (apps/web ProjectCard.tsx), in the
// two sizes these compositions use: the hero's 2-up panel and step 2's 3-up
// grid. The product card is aspect-[4/5]; both of these crop the photo well to
// a fixed height so two rows fit — the established approach for these stills.
//
// A budget is always one figure, never a range.

/** The warm placeholder the product shows behind a loading photo well. */
const WELL = "#efe6d6";

function Chip({
  children,
  className,
  size,
}: {
  children: React.ReactNode;
  className: string;
  size: "hero" | "grid";
}) {
  const metrics =
    size === "hero"
      ? "px-2 py-[2.5px] text-[9px]"
      : "px-[7px] py-[2px] text-[8.5px]";
  return (
    <span
      className={`absolute top-[7px] rounded-[6px] font-bold text-white ${metrics} ${className}`}
    >
      {children}
    </span>
  );
}

export default function MarketplaceCard({
  card,
  size,
  fill,
}: {
  card: Card;
  size: "hero" | "grid";
  /** Stretch to the grid row's height. The hero's console grid stretches every
   * cell, so a card that sized to its own content would sit short of its
   * neighbours whenever its title fitted on one line. */
  fill?: boolean;
}) {
  const hero = size === "hero";
  const photoH = hero ? 104 : 112;

  return (
    <div
      className={`${fill ? "h-full " : ""}${
        hero
          ? "overflow-hidden rounded-[12px] bg-white shadow-brand-lg"
          : "overflow-hidden rounded-[8px] border border-line bg-white"
      }`}
    >
      <div
        className="relative"
        style={{ height: photoH, background: WELL }}
      >
        <Image
          src={card.photo}
          alt={card.alt}
          fill
          sizes="180px"
          className="object-cover"
          style={{ objectPosition: card.focal ?? "50% 50%" }}
        />
        <Chip size={size} className="left-[7px] bg-navy tracking-[0.02em]">
          {card.chip}
        </Chip>
        {card.arriving ? (
          <Chip size={size} className="right-[7px] bg-brand">
            NEW
          </Chip>
        ) : card.bids ? (
          <Chip size={size} className="right-[7px] bg-navy/75">
            {card.bids}
          </Chip>
        ) : null}
      </div>

      {hero ? (
        <div className="p-[9px_11px_11px] text-ink">
          <div className="text-[12px] font-bold leading-[1.3]">{card.title}</div>
          <div className="mt-1 text-[9.5px] text-muted">{card.meta}</div>
          <div className="mt-2 text-[8.5px] font-semibold uppercase tracking-[0.06em] text-muted">
            Budget
          </div>
          <div className="mt-[2px] flex items-end justify-between">
            <span className="text-[12px] font-bold tabular-nums">
              {dollars(card.budget)}
            </span>
            <span className="rounded-[8px] bg-brand px-[9px] py-[5px] text-[9.5px] font-semibold text-white">
              Review + bid
            </span>
          </div>
        </div>
      ) : (
        <div className="p-[10px] text-ink">
          <div className="text-[11.5px] font-bold leading-[1.35] tracking-[-0.01em]">
            {card.title}
          </div>
          <div className="mt-[5px] text-[9px] text-muted">{card.meta}</div>
          <div className="mt-[10px] flex items-end justify-between">
            <div>
              <div className="text-[8px] font-medium tracking-[0.04em] text-muted">
                Budget
              </div>
              <div className="text-[10.5px] font-bold tabular-nums">
                {dollars(card.budget)}
              </div>
            </div>
            <span className="inline-flex h-5 items-center rounded-[6px] bg-accent px-[9px] text-[8.5px] font-bold text-white">
              Review + bid
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

/** The navy bell that fronts every "new project" alert in these scenes. */
export function BellIcon({ size = 28 }: { size?: number }) {
  return (
    <span
      className="flex flex-none items-center justify-center rounded-[8px] bg-navy"
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ width: size * 0.5, height: size * 0.5 }}
      >
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    </span>
  );
}
