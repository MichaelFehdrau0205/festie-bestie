# Festie Bestie — Sprint Plan

_Source: hand-drawn screen notes (Screen Pages 1–6)_
_Date: 2026-08-20_

## Overview

Festie Bestie is a matching app for people to connect over shared music taste, artists/events, and festival "vibe," then coordinate meeting up in person at a show. The flow below moves from onboarding → profile → discovery (map/match) → chat → in-person meet-up planning → buddies list.

---

## Feature Spec by Screen

### 1. Onboarding Flow (Screen Page 1)

Simple, multi-step onboarding to establish taste and vibe before profile building.

1. **Music genres** — user selects multiple genres (e.g. rock, pop, electronic).
2. **Artists + events** — user selects artists and/or events they like or are interested in (e.g. Burning Man, Ariana Grande).
3. **Vibe description** — user describes their vibe via clothing/look/aesthetic tags (e.g. rock 'n' roll, hipster, neon, Y2K, goth, raver, outer space).

### 2. Profile Builder (Screen Page 2)

Fields to complete after onboarding:

- Profile name — made-up name, or First name + Last initial
- Age range (own age)
- Preferred age range for matches
- Location + zip code, plus travel radius for shows
- 1–2 sentence bio describing their vibe and who they're looking for
- Alcohol preference — Y/N
- Social media handles, Spotify profile/playlists
- Upcoming shows/festivals they're attending
- Photos — at least 1 required, multiple allowed

### 3. Map Screen (Screen Page 3)

- Shows proximity of other users on a map
- Lets users discover stadiums, arenas, and new event spaces
- Filters for calendar dates, shows, and matches in the user's area

### 4. Match Screen, Chat & Match Confirmation (Screen Page 4)

- **Match screen** — shows the collection of people the user matches vibes with; displays their profile, bio, pictures, socials, and Spotify.
- **Chat / messaging** — an icon or section users click into to send messages, pictures, videos, or links.
- **Match confirmation** — a "matching wristbands" icon marks a confirmed match; an icebreaker prompt kicks off the chat.

### 5. Set Meet Up (Screen Page 5)

- Calendar to set up and agree on an initial in-person meet up
- Calendar showing event/concert dates
- Confirmation flow for the meet up itself
- Confirmation flow for the agreed-upon event(s) to attend together

### 6. Buddies Screen (Screen Page 6)

- Displays all "buddies" as a collection of pictures/profiles
- Sortable by music preference or by proximity

---

## Sprint Backlog

### Onboarding
- [ ] Build genre selection step (multi-select)
- [ ] Build artists/events selection step (multi-select, searchable)
- [ ] Build vibe/aesthetic selection step (multi-select tags)
- [ ] Wire onboarding steps into a single flow with progress indicator

### Profile Builder
- [ ] Profile name field (validate made-up name or First + Last initial format)
- [ ] Age range input (own age)
- [ ] Preferred match age range input (range slider)
- [ ] Location/zip input + travel radius selector
- [ ] Bio text field (1–2 sentence limit/guidance)
- [ ] Alcohol preference toggle (Y/N)
- [ ] Social media handle inputs + Spotify account connect
- [ ] Upcoming shows/festivals input (list or connect to calendar)
- [ ] Photo upload (min 1, support multiple)

### Map Screen
- [ ] Map view showing proximity of nearby users
- [ ] Venue discovery (stadiums, arenas, event spaces)
- [ ] Filter UI: calendar dates, shows, matches in area
- [ ] Location permissions handling

### Match / Chat
- [ ] Match feed UI (profile, bio, pictures, socials, Spotify preview)
- [ ] Matching algorithm/logic (vibe-based)
- [ ] Chat icon/entry point on match cards
- [ ] Messaging: text, photo, video, and link support
- [ ] Match confirmation UI ("matching wristbands" icon)
- [ ] Icebreaker prompt to open new chats

### Set Meet Up
- [ ] Calendar UI to propose/agree on initial in-person meet up
- [ ] Calendar UI showing concert/event dates
- [ ] Meet-up confirmation flow (both parties confirm)
- [ ] Event confirmation flow (both parties confirm which event to attend)

### Buddies Screen
- [ ] Buddies list UI (pictures/profiles grid)
- [ ] Sort by music preference
- [ ] Sort by proximity

### Verification
- [ ] Review this doc against original screen notes for accuracy
- [ ] Confirm screen order/navigation flow with team before dev kickoff

---

## Open Questions
- Is match confirmation ("wristbands") one-sided or does it require mutual acceptance?
- Does the meet-up calendar sync with device calendars (Google/Apple) or is it in-app only?
- Any specific matching algorithm weighting (genre vs. vibe vs. proximity)?
