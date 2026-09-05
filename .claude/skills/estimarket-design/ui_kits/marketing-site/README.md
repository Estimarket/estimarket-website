# Estimarket Marketing Site — UI Kit

A high-fidelity, click-thru recreation of the Estimarket marketing site (homepage → search results → property detail).

## What's in here

- `index.html` — entry. Loads React 18 + Babel + Lucide icons, and stitches all JSX modules into a single live app.
- `App.jsx` — root component + simple in-memory router (Home / Search / Detail).
- `components/` — reusable, mostly-cosmetic UI parts: Header, Footer, SearchBar, PropertyCard, Badge, Button, RatingDisplay, FilterBar, BookingWidget, ImageGallery, AmenityList, etc.
- `screens/` — three screens: `HomePage.jsx`, `SearchResults.jsx`, `PropertyDetail.jsx`.
- `data.jsx` — fake listings + destinations (no real photos — gradient placeholders stand in).

## Click-thru flow

1. **Home** — Hero with search bar overlay, destination grid, featured carousel, trust section, footer.
2. Click **Search** (in the search bar) → **Search Results** with filter chips + property grid + sticky right map placeholder.
3. Click any **property card** → **Property Detail** with image mosaic, booking widget (sticky right rail), amenities, reviews.
4. Click the logo or "Back" → home.

## Caveats

- **No real property photography.** All photos are CSS gradient placeholders shaped like 4:3 photos. Drop real `<img>` sources into `data.jsx` once available.
- **The map** on Search Results is a static brand-blue placeholder. Wire to Mapbox/Google Maps for production.
- **Date pickers and dropdowns** in the search bar are visual only; clicking them doesn't open a calendar (this is a UI kit, not a booking engine).
- Header sign-in, "List your property" and other CTAs are visual only.

## How to extend

Components are intentionally tiny and read top-to-bottom. To add a new screen, copy one in `screens/`, register a route key in `App.jsx`'s `screen` state, and link to it via `nav('your-key')`.
