// Mock data used to drive the initial screens. Replace with real API/backend data later.

export type Buddy = {
  id: string;
  name: string; // made-up name or First + Last initial, per PRD guardrail
  age: number;
  distanceMiles: number;
  vibe: string[];
  genres: string[];
  bio: string;
  avatar: string;
  spotifyConnected: boolean;
  upcomingShows: string[];
};

export const buddies: Buddy[] = [
  {
    id: '1',
    name: 'Nova R.',
    age: 24,
    distanceMiles: 2.1,
    vibe: ['neon', 'raver'],
    genres: ['Electronic', 'Pop'],
    bio: 'Here for the bass drops and the friends who scream the drop with me.',
    avatar: 'nova',
    spotifyConnected: true,
    upcomingShows: ['Ultra Music Festival'],
  },
  {
    id: '2',
    name: 'Jax T.',
    age: 27,
    distanceMiles: 5.4,
    vibe: ['rock n roll', 'vintage'],
    genres: ['Rock', 'Indie'],
    bio: 'Front row or nothing. Always down to caravan to a show.',
    avatar: 'jax',
    spotifyConnected: true,
    upcomingShows: ['Burning Man'],
  },
  {
    id: '3',
    name: 'Sage M.',
    age: 22,
    distanceMiles: 8.9,
    vibe: ['y2k', 'hyperpop'],
    genres: ['Pop', 'Hyperpop'],
    bio: 'Glitter, glow sticks, and good vibes only.',
    avatar: 'sage',
    spotifyConnected: false,
    upcomingShows: ['Ariana Grande — Eternal Sunshine Tour'],
  },
  {
    id: '4',
    name: 'Wren P.',
    age: 25,
    distanceMiles: 1.3,
    vibe: ['goth', 'moody'],
    genres: ['Alt', 'Electronic'],
    bio: 'Looking for my concert bestie for this festival season.',
    avatar: 'wren',
    spotifyConnected: true,
    upcomingShows: ['Coachella'],
  },
];

export const genreOptions = [
  'Rock', 'Pop', 'Electronic', 'Hip-Hop', 'Indie', 'Country', 'R&B', 'Hyperpop', 'Alt', 'Metal',
];

export const artistEventOptions = [
  'Burning Man', 'Ariana Grande', 'Coachella', 'Ultra Music Festival', 'Tyler, The Creator',
  'South by Southwest', 'Bad Bunny', 'Lollapalooza',
];

export const vibeOptions = [
  'rock n roll', 'hipster', 'neon', 'y2k', 'goth', 'raver', 'outer space', 'vintage', 'hyperpop',
];

export type ChatMessage = {
  id: string;
  fromSelf: boolean;
  text: string;
  timestamp: string;
};

export const mockChat: ChatMessage[] = [
  { id: 'm1', fromSelf: false, text: "Icebreaker: what's the most chaotic show you've ever been to? 🎤", timestamp: '10:01 AM' },
  { id: 'm2', fromSelf: true, text: 'Omg, Ultra 2023 — lost my friends for 4 hours lol', timestamp: '10:03 AM' },
  { id: 'm3', fromSelf: false, text: "That's the festival experience honestly. You going to Ultra again this year?", timestamp: '10:04 AM' },
];

export type ShowEvent = {
  id: string;
  name: string;
  date: string;
  venue: string;
  attendingBuddies: string[];
};

export const upcomingShows: ShowEvent[] = [
  { id: 'e1', name: 'Ultra Music Festival', date: '2027-03-26', venue: 'Bayfront Park, Miami', attendingBuddies: ['Nova R.'] },
  { id: 'e2', name: 'Coachella', date: '2027-04-09', venue: 'Empire Polo Club, Indio', attendingBuddies: ['Wren P.'] },
  { id: 'e3', name: "Ariana Grande — Eternal Sunshine Tour", date: '2026-11-14', venue: 'Madison Square Garden, NYC', attendingBuddies: ['Sage M.'] },
];

export type Venue = {
  id: string;
  name: string;
  kind: string;
  distanceMiles: number;
};

export const venues: Venue[] = [
  { id: 'v1', name: 'Madison Square Garden', kind: 'Arena', distanceMiles: 3.2 },
  { id: 'v2', name: 'Barclays Center', kind: 'Arena', distanceMiles: 4.8 },
  { id: 'v3', name: 'The Warehouse', kind: 'Event space', distanceMiles: 1.7 },
  { id: 'v4', name: 'Forest Hills Stadium', kind: 'Stadium', distanceMiles: 7.4 },
];
