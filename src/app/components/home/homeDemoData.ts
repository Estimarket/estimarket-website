// Demo data for the six home-page imagery slots, mirroring the shape of
// components/campaign/campaignDemoData.ts.
//
// Slot 3 (Contractors bid) shows the same West Highlands bath the campaign
// scenes show, so its line items, TBD item and bid range are imported from
// the campaign module rather than copied — one source of truth for that
// project's numbers. Everything else here is home-page-only.
//
// The values are internally consistent by design and several of them are
// load-bearing product truths. Do not "fix" them:
//   - A homeowner's budget is always a single figure; a contractor's bid is
//     always a range, and homeowners compare the midpoint.
//   - Bids are labor + installation only — the homeowner supplies materials.
//   - TBD items are excluded from the bid total. Never an allowance, never a
//     dollar figure.
//   - The bath's bid range brackets its budget on purpose, so the product's
//     "outside their budget" warning can never appear in the animated scenes.
//     Step 4's priciest bid does sit above budget — it simply loses the
//     "Within budget" chip, which is the real BidsList behaviour.

import {
  BID_RANGE,
  dollars,
  LINE_ITEMS,
  PRICED_TOTAL,
  RANGE_SCALE_MAX,
  TBD_ITEM,
} from "../campaign/campaignDemoData";

export {
  BID_RANGE,
  dollars,
  LINE_ITEMS,
  PRICED_TOTAL,
  RANGE_SCALE_MAX,
  TBD_ITEM,
};

/** The project that arrives during the hero and step-2 animations. */
export const KITCHEN = {
  title: "Wash Park kitchen",
  neighborhood: "Wash Park",
  cardMeta: "Wash Park, Denver · 2m ago · 12 photos",
  categoryChip: "Kitchen remodel",
  budget: 38000,
  roomSize: "12×14 ft",
  photoCount: 12,
  bidCount: 4,
  photo: "/images/home-kitchen-before.jpg",
};

/** The bath behind the hero's bid-comparison card and all of step 3. */
export const BATH = {
  title: "West Highlands bath",
  cardMeta: "West Highlands, Denver · 1h ago · 4 photos",
  categoryChip: "Full bath remodel",
  bidsChip: "2 bids",
  budget: 15000,
  photo: "/images/dfc-overview.jpg",
};

/** The project in step 5's schedule-a-visit still. */
export const FLOORS = {
  title: "Berkeley hardwood refinish",
  metaLine: "Denver, CO 80212 · 3 bids · $9,500 budget",
  budget: 9500,
  bidCount: 3,
  contractor: "Front Range Floorworks",
  photo: "/images/home-floors.jpg",
};

export type MarketplaceCard = {
  id: string;
  title: string;
  meta: string;
  chip: string;
  /** Bid count badge; the arriving card reads "New" on brand orange instead. */
  bids?: string;
  budget: number;
  photo: string;
  /** CSS object-position for the photo well; defaults to centre. */
  focal?: string;
  alt: string;
  /** The Wash Park kitchen — animates in and carries the brand-orange ring. */
  arriving?: boolean;
};

/** Step 2's six-card grid, in grid order. The hero's smaller panel shows the
 * first card and the arriving one. */
export const MARKETPLACE_CARDS: MarketplaceCard[] = [
  {
    id: "west-highlands",
    title: "West Highlands remodel",
    meta: "Denver · 1h ago · 4 photos",
    chip: "Full bath remodel",
    bids: "2 bids",
    budget: BATH.budget,
    photo: BATH.photo,
    focal: "50% 38%",
    alt: "Bathroom overview — existing layout",
  },
  {
    id: "lohi",
    title: "LoHi hall bath conversion",
    meta: "Denver · 6h ago · 3 photos",
    chip: "Tub to shower",
    bids: "1 bid",
    budget: 11000,
    // Source file is 473px wide — card use only, don't enlarge it.
    photo: "/images/dfc-lohi.jpg",
    focal: "50% 45%",
    alt: "Hall bathroom",
  },
  {
    id: "wash-park",
    title: KITCHEN.title,
    meta: "Denver · 4m ago · 12 photos",
    chip: "Kitchen remodel",
    budget: KITCHEN.budget,
    photo: KITCHEN.photo,
    focal: "50% 45%",
    alt: "Kitchen — existing layout",
    arriving: true,
  },
  {
    id: "berkeley",
    title: FLOORS.title,
    meta: "Denver · 2d ago · 7 photos",
    chip: "Floor replacement",
    bids: "3 bids",
    budget: FLOORS.budget,
    photo: FLOORS.photo,
    focal: "50% 60%",
    alt: "Hardwood floor",
  },
  {
    id: "sloans-lake",
    title: "Sloan’s Lake guest bath",
    meta: "Denver · 3d ago · 5 photos",
    chip: "Shower surround",
    budget: 6200,
    photo: "/images/dfc-shower.jpg",
    alt: "Existing tiled shower",
  },
  {
    id: "platt-park",
    title: "Platt Park powder room",
    meta: "Denver · 4d ago · 4 photos",
    chip: "Vanity swap",
    budget: 3400,
    photo: "/images/dfc-vanity.jpg",
    alt: "Vanity wall",
  },
];

/** Marketplace card count in the step-2 header, before and after the arrival. */
export const MARKETPLACE_COUNT = { from: 14, to: 15 };

export type Bid = {
  initials: string;
  company: string;
  rating: string;
  jobs: number;
  city: string;
  min: number;
  max: number;
};

/** A bid's midpoint, rounded to the nearest $50 — what homeowners compare. */
export const midpoint = (b: Pick<Bid, "min" | "max">) =>
  Math.round((b.min + b.max) / 2 / 50) * 50;

/** The two rows in the hero's bid-comparison card (the West Highlands bath). */
export const HERO_BIDS: Bid[] = [
  {
    initials: "BR",
    company: "Brennan Remodel Co.",
    rating: "4.9",
    jobs: 38,
    city: "Denver",
    min: BID_RANGE.min,
    max: BID_RANGE.max,
  },
  {
    initials: "FC",
    company: "Foothills Custom",
    rating: "4.7",
    jobs: 21,
    city: "Lakewood",
    min: 13900,
    max: 17400,
  },
];

export type CompareBid = Bid & {
  isNew?: boolean;
  tbds: number;
  lineItems: number;
  /** Relative start, as the real BidsList renders it. */
  startDate: string;
  /** Whether the range sits inside the homeowner's budget. */
  withinBudget: boolean;
  /** The real `outcome === "site_visit"` state — CTA reads "Visit requested". */
  visitRequested?: boolean;
};

/** Step 4's four bids on the Wash Park kitchen, sorted low → high.
 * Mountain Crest is the chosen one and deliberately not the cheapest: the
 * promise is the best bid, not the lowest. */
export const COMPARE_BIDS: CompareBid[] = [
  {
    initials: "SB",
    company: "Sundance Build Co.",
    rating: "4.8",
    jobs: 24,
    city: "Denver",
    min: 31200,
    max: 38000,
    isNew: true,
    tbds: 0,
    lineItems: 11,
    startDate: "Starts in 3 weeks",
    withinBudget: true,
  },
  {
    initials: "MC",
    company: "Mountain Crest Co.",
    rating: "4.9",
    jobs: 41,
    city: "Denver",
    min: 33400,
    max: 39800,
    tbds: 0,
    lineItems: 14,
    startDate: "Starts in 2 weeks",
    withinBudget: true,
    visitRequested: true,
  },
  {
    initials: "AR",
    company: "Alpine Reno",
    rating: "4.6",
    jobs: 12,
    city: "Arvada",
    min: 35900,
    max: 42500,
    isNew: true,
    tbds: 2,
    lineItems: 9,
    startDate: "Starts in 5 weeks",
    withinBudget: true,
  },
  {
    initials: "FC",
    company: "Foothills Custom",
    rating: "5.0",
    jobs: 6,
    city: "Golden",
    min: 38800,
    max: 46200,
    tbds: 1,
    lineItems: 12,
    startDate: "Starts in 8 weeks",
    withinBudget: false,
  },
];

/** Step 5's schedule-a-visit modal. The footer label is built from the
 * selected day and slot, exactly as the real ScheduleVisitModal does. */
export const VISIT_DAYS = [
  { weekday: "Mon", date: "14" },
  { weekday: "Tue", date: "15" },
  { weekday: "Wed", date: "16" },
  { weekday: "Thu", date: "17", selected: true },
  { weekday: "Fri", date: "18" },
  { weekday: "Sat", date: "19" },
];

export const VISIT_WEEKDAY_LONG = "Thursday";

export const VISIT_TIMES = [
  { label: "9:00 AM" },
  { label: "11:00 AM" },
  { label: "1:00 PM" },
  { label: "2:00 PM", selected: true },
  { label: "4:00 PM" },
];
