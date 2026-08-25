// Demo data shared by the three campaign scenes (and mirrored by the static
// step images rendered from docs/campaign-motion/static-steps.html — if any
// of these values change, those PNGs must be re-rendered to match).
//
// The numbers are internally consistent by design: the five priced line items
// sum to $13,300, and the bid range deliberately brackets the homeowner's
// $15,000 budget so the product's "your range falls outside their budget"
// warning can never appear in the marketing. Do not "fix" either.

export type LineItem = {
  name: string;
  detail: string;
  /** Shorter detail used where the hero's narrower card needs it. */
  heroDetail?: string;
  amount: number;
};

export const PROJECT = {
  title: "West Highlands remodel",
  metaLine: "Denver, CO 80211 · Submitted 1h ago · 2 bids so far",
  cardMeta: "West Highlands, Denver · 1h ago · 4 photos",
  categoryChip: "Full bath remodel",
  bidsChip: "2 bids",
  /** A homeowner's budget is always a single figure, never a range. */
  budget: 15000,
  roomSize: "5×9 ft",
  photoCount: 4,
  description:
    "Full gut of a 5×9 bath down to the studs. Tear out the shower — tile, pan and glass — " +
    "and rebuild in the same footprint. New 36-inch vanity where the old one sits, new floor tile " +
    "throughout, and add an exhaust fan; there's only a skylight now. Homeowner is supplying all " +
    "finish materials.",
};

export const SECOND_CARD = {
  title: "LoHi hall bath conversion",
  cardMeta: "LoHi, Denver · 6h ago · 3 photos",
  categoryChip: "Tub to shower",
  bidsChip: "1 bid",
  budget: 11000,
};

export const LINE_ITEMS: LineItem[] = [
  {
    name: "Demo — tile, vanity, glass surround",
    detail: "Includes haul-away",
    amount: 1800,
  },
  {
    name: "Rough plumbing — vanity + shower",
    detail: "Same footprint, materials supplied",
    heroDetail: "Same footprint",
    amount: 2200,
  },
  {
    name: "Shower pan + waterproofing",
    detail: "New pan, membrane, curb",
    amount: 3100,
  },
  {
    name: "Tile — shower walls, 78 sq ft",
    detail: "Homeowner supplies tile",
    amount: 3900,
  },
  {
    name: "Tile — floor, 58 sq ft",
    detail: "Subfloor prep + install",
    amount: 2300,
  },
];

/** The flagged item. TBD items are excluded from the bid total — they are
 * not an allowance and never a dollar amount in the total. */
export const TBD_ITEM = {
  name: "Toilet drain + vent relocation",
  /** Detail line in the bid builder / hero labor list. */
  bidDetail: "Behind the alcove wall — confirm at site visit",
  /** Detail line in the scope viewer's labor list. */
  scopeDetail: "Behind the alcove wall — see the under-sink photo",
  /** Price shown before the row is flagged TBD in the bid-builder scene. */
  preTbdAmount: 1100,
  chip: "Confirm on site",
};

export const PRICED_TOTAL = LINE_ITEMS.reduce((sum, li) => sum + li.amount, 0); // $13,300

/** A contractor's bid is a range calculated from the line items; homeowners
 * compare the midpoint. The range brackets the $15,000 budget. */
export const BID_RANGE = { min: 12300, max: 16600 };

/** Left edge $0, right edge $25,000 on the set-bid-range scale. */
export const RANGE_SCALE_MAX = 25000;

export const CONTRACTOR = { name: "Marcus B.", company: "Brennan Remodel Co." };

export const HOMEOWNER_NOTE = {
  quote:
    '"Would prefer matte black fixtures throughout. Flexible on tile pattern; happy with installer\'s recommendation."',
  name: "Sarah K.",
};

/** Scope items the homeowner's photos can't settle — shown in the hero's
 * scope glance. In the product these become "Confirm on site" chips on the
 * individual labor line items, never a standalone block in the bid flow. */
export const CONFIRMATION_ITEMS = [
  "Toilet drain + vent location unknown behind the alcove wall.",
  "Photos don't confirm whether the skylight shaft is insulated.",
];

export const MATERIALS = [
  { heading: "Shower", items: ["Wall + pan tile — 78 sf", "Niche insert, grout"] },
  {
    heading: "Vanity + electrical",
    items: ['36" vanity + top', "Sconce, mirror, fan"],
  },
];

export const PHOTOS = [
  {
    src: "/images/dfc-overview.jpg",
    alt: "Bathroom overview — existing layout",
    caption: "Overview — existing layout",
  },
  {
    src: "/images/dfc-shower.jpg",
    alt: "Existing tiled shower",
    caption: "Shower — comes out in demo",
  },
  {
    src: "/images/dfc-vanity.jpg",
    alt: "Vanity wall",
    caption: "Vanity wall",
  },
  {
    src: "/images/dfc-plumbing.jpg",
    alt: "Under-sink plumbing rough-in",
    caption: "Under sink — existing rough-in",
  },
];

/** Photo for the second marketplace card. The source file is 473px wide —
 * card use only, don't enlarge it. */
export const LOHI_PHOTO = { src: "/images/dfc-lohi.jpg", alt: "Hall bathroom" };

export const dollars = (n: number) => "$" + n.toLocaleString("en-US");
