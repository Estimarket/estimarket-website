// Fake data for the UI kit. Photos are color-tinted gradients (--photo-h drives hue).

const DESTINATIONS = [
  { id: 'aspen',     name: 'Aspen, Colorado',     homes: 1284, hue: 210 },
  { id: 'malibu',    name: 'Malibu, California',  homes:  897, hue:  30 },
  { id: 'kauai',     name: 'Kauai, Hawaii',       homes:  642, hue: 170 },
  { id: 'jackson',   name: 'Jackson Hole, WY',    homes:  531, hue: 200 },
  { id: 'tulum',     name: 'Tulum, Mexico',       homes:  743, hue: 190 },
  { id: 'lakecomo',  name: 'Lake Como, Italy',    homes:  319, hue: 220 },
  { id: 'cotswolds', name: 'The Cotswolds, UK',   homes:  412, hue: 110 },
  { id: 'queenstown',name: 'Queenstown, NZ',      homes:  287, hue: 195 },
];

const LISTINGS = [
  {
    id: 'snowmass-cabin',
    title: 'Pine cabin with hot tub, Snowmass',
    location: 'Snowmass Village, Colorado',
    guests: 6, beds: 3, baths: 2, bedrooms: 3,
    rating: 4.92, reviews: 312,
    price: 320, total: 1920,
    badges: ['Superhost'],
    hue: 210, warm: false,
    host: { name: 'Eleanor M.', joined: '2019', response: '100% in under an hour' },
    description: "Tucked into a quiet stand of aspens just minutes from the ski village, this three-bedroom cabin sleeps six across one king, one queen, and two twins. The wraparound deck is the heart of it — outdoor fireplace, hot tub, and views straight up to Snowmass Mountain.",
    amenities: ['Wifi','Hot tub','Fireplace','Kitchen','Ski-in/ski-out','Free parking','Heating','Washer','Dryer','Coffee maker']
  },
  {
    id: 'malibu-villa',
    title: 'Oceanfront villa, Point Dume',
    location: 'Malibu, California',
    guests: 8, beds: 4, baths: 3, bedrooms: 4,
    rating: 4.88, reviews: 87,
    price: 540, total: 3240,
    badges: ['Popular'],
    hue: 30, warm: true,
    host: { name: 'Daniel R.', joined: '2017', response: '98% in under two hours' },
    description: 'A glass-walled mid-century perched directly over Westward Beach. Wake up to the Pacific, fall asleep to the same. Sleeps eight comfortably, with a private path down to the sand.',
    amenities: ['Wifi','Pool','Beach access','Kitchen','Hot tub','Free parking','Outdoor shower','BBQ grill','Workspace','Washer']
  },
  {
    id: 'kauai-bungalow',
    title: 'Garden bungalow steps from Hanalei Bay',
    location: 'Hanalei, Kauai',
    guests: 4, beds: 2, baths: 1, bedrooms: 2,
    rating: 4.95, reviews: 201,
    price: 285, total: 1710,
    badges: ['Superhost','Verified'],
    hue: 170, warm: false,
    host: { name: 'Leilani K.', joined: '2020', response: '100% in minutes' },
    description: 'An open-plan bungalow surrounded by plumeria and ginger. Walk to the bay in five minutes; surfboards and beach gear included.',
    amenities: ['Wifi','Outdoor shower','Kitchen','Surfboards','BBQ grill','Free parking','Ceiling fans','Hammock','Beach gear']
  },
  {
    id: 'cotswolds-stone',
    title: 'Honey-stone cottage in the Cotswolds',
    location: 'Bourton-on-the-Water, UK',
    guests: 5, beds: 3, baths: 2, bedrooms: 3,
    rating: 4.79, reviews: 156,
    price: 210, total: 1260,
    badges: [],
    hue: 90, warm: true,
    host: { name: 'Margaret T.', joined: '2016', response: '95% in a few hours' },
    description: 'A 17th-century stone cottage with a low-beamed sitting room and a walled garden. Quintessentially English, and a short walk to the village green.',
    amenities: ['Wifi','Fireplace','Kitchen','Garden','Heating','Free parking','Washer','Coffee maker','Pets allowed']
  },
  {
    id: 'tulum-jungle',
    title: 'Jungle treehouse with private cenote',
    location: 'Tulum, Mexico',
    guests: 4, beds: 2, baths: 2, bedrooms: 2,
    rating: 4.97, reviews: 421,
    price: 395, total: 2370,
    badges: ['Superhost'],
    hue: 150, warm: false,
    host: { name: 'Mateo G.', joined: '2018', response: '100% in under an hour' },
    description: 'A palapa-roofed treehouse fifteen feet up, with a freshwater cenote you can swim in just below. Off-grid solar, on-grid wifi.',
    amenities: ['Wifi','Cenote access','Outdoor shower','Kitchen','Yoga deck','Bikes','Beach gear','Ceiling fans']
  },
  {
    id: 'jackson-lodge',
    title: 'Modern lodge with Teton views',
    location: 'Jackson, Wyoming',
    guests: 10, beds: 5, baths: 4, bedrooms: 5,
    rating: 4.85, reviews: 64,
    price: 720, total: 4320,
    badges: ['Last chance'],
    hue: 200, warm: false,
    host: { name: 'Anders L.', joined: '2015', response: '99% in under two hours' },
    description: 'Floor-to-ceiling glass framing the Tetons. Ten guests across five bedrooms, with a chef-grade kitchen, ski room, and elk that occasionally cross the front yard.',
    amenities: ['Wifi','Hot tub','Fireplace','Chef kitchen','Ski room','Free parking','Workspace','Washer','Heated floors','EV charger']
  }
];

const REVIEWS = [
  { name: 'Sophie L.',  date: 'April 2026',    rating: 5, text: "Photos don't do it justice — the deck at sunset was worth the trip alone. Eleanor was a thoughtful host; we got a hand-written welcome note with hike recs and the wood stove already going." },
  { name: 'Marcus T.',  date: 'February 2026', rating: 5, text: 'Came for a long weekend with extended family. Sleeping arrangements actually worked for four adults and two kids, kitchen was stocked, and the hot tub was the highlight every night.' },
  { name: 'Priya N.',   date: 'December 2025', rating: 4, text: 'Beautiful cabin, exactly as described. The drive from the lift is a little longer than it sounds on a snowy day, but the place itself was perfect.' },
];

Object.assign(window, { DESTINATIONS, LISTINGS, REVIEWS });
