// Demo data for the four /contractors imagery slots.
//
// One story runs through all of them: the West Highlands full bath remodel,
// $15,000 homeowner budget, seen from the contractor's side — it appears in
// the hero inbox, gets browsed in step 01, priced in step 02 and won in
// step 03.
//
// The line items, TBD item and bid range are the campaign's West Highlands
// numbers, imported rather than copied so the campaign page, the home page and
// this page never drift apart.
//
// Product truths this data encodes — do not "fix" them:
//   - TBD items are excluded from a bid total. Never an allowance amount.
//   - Bids are labor + installation only; the homeowner supplies materials.
//   - A homeowner's budget is one figure; a contractor's bid is a range, and
//     the range is always shown bracketing the budget, never as one number.
//   - Contractors pay a flat monthly fee, never per lead and never per bid.
//   - Site visits happen *after* a bid is selected. That is the whole pitch.

import {
  BID_RANGE,
  LINE_ITEMS,
  PRICED_TOTAL,
  RANGE_SCALE_MAX,
  TBD_ITEM,
  dollars,
} from "../home/homeDemoData";

export { BID_RANGE, LINE_ITEMS, PRICED_TOTAL, RANGE_SCALE_MAX, TBD_ITEM, dollars };

export type CoProject = {
  id: string;
  title: string;
  /** Trade badge over the photo, and the lead half of the mobile meta line. */
  type: string;
  meta: string;
  budget: number;
  photo: string;
  focal?: string;
  /** Bid-count badge; the arriving project reads NEW on brand orange. */
  bids?: string;
  isNew?: boolean;
};

export const WEST_HIGHLANDS: CoProject = {
  id: "west-highlands",
  title: "West Highlands remodel",
  type: "Full bath remodel",
  meta: "Denver · 1h ago · 4 photos",
  budget: 15000,
  photo: "/images/dfc-overview.jpg",
  focal: "50% 38%",
  isNew: true,
};

export const LOHI: CoProject = {
  id: "lohi",
  title: "LoHi hall bath conversion",
  type: "Tub to shower",
  meta: "Denver · 6h ago · 3 photos",
  budget: 11000,
  // Source file is 473px wide — card use only, don't enlarge it.
  photo: "/images/dfc-lohi.jpg",
  focal: "50% 45%",
  bids: "1 bid",
};

export const SLOANS_LAKE: CoProject = {
  id: "sloans-lake",
  title: "Sloan’s Lake guest bath",
  type: "Shower surround",
  meta: "Denver · 3d ago · 5 photos",
  budget: 6200,
  photo: "/images/dfc-shower.jpg",
};

/** The hero inbox shows two; step 01's grid shows three. */
export const INBOX_PROJECTS = [WEST_HIGHLANDS, LOHI];
export const MARKETPLACE_PROJECTS = [WEST_HIGHLANDS, LOHI, SLOANS_LAKE];

/** Mobile meta lines pair the trade with the bid count, or "No bids yet". */
export const bidLine = (p: CoProject) =>
  `${p.type} · ${p.bids ?? "No bids yet"}`;

/** The marketplace count before and after the trade filter is applied — the
 * point of step 01 is that the feed narrows to *your* trade. */
export const PROJECT_COUNT = { all: 26, filtered: 14 };

export const FILTER_CHIPS = ["All", "Bathrooms", "Kitchens", "Windows"];

/** Step 01's footer strip: what every listing carries before you bid. */
export const LISTING_FACTS = [
  { label: "Labor items", value: "14 scoped" },
  { label: "Site photos", value: "4 + sizes" },
  { label: "Materials", value: "Homeowner" },
  { label: "Flagged", value: "1 TBD", tbd: true },
];

/** Step 03: the homeowner's walkthrough request, after the bid was selected. */
export const SITE_VISIT = {
  requester: "Sarah K.",
  day: "Thursday, Sep 17",
  time: "2:00 PM",
  place: "West Highlands, Denver",
  minNotice: "24 hrs",
  perWeek: "6 max",
};

/** The hero's celebratory pill. A won bid, not a lead fee. */
export const WON_AMOUNT = 37850;

/** Hero inbox footer — the flat-fee line, which must never imply per-bid cost. */
export const ACCESS_LINE = "Bids don’t cost you anything — flat $25/mo access";
