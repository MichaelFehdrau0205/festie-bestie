# Festie Bestie

A matching app that helps festival and concert goers find like-minded companions — based on age, location, vibe, and music taste — to plan and attend live shows together.

## Project Docs

This folder is the source of truth for building Festie Bestie. Read them in this order:

1. **[PRD.md](./PRD.md)** — Product Requirements Document. The "why" and "what": problem statement, target audience, proposed solution, key screens, functional requirements, guardrails/safety rules, and monetization strategy. Start here for product context.
2. **[SPRINT.md](./SPRINT.md)** — Sprint plan. The "how" and "in what order": a feature spec per screen plus a task checklist for implementation. Use this to scope and sequence work.

## App Summary

- **Theme:** Together
- **Audience:** Gen Z, Gen Alpha
- **Core loop:** Onboard (music genres, artists/events, vibe) → build profile → discover buddies on a map → match & chat → set up an in-person meetup → track buddies and shows attended together.

## Key Screens

1. Onboarding / Sign Up
2. Build a Profile
3. Map (discover buddies by area)
4. Match / Chat Messaging
5. Set Meetup (pre-event) / Manage Future Shows
6. Buddies Screen

## Guardrails (do not compromise on these)

- Users must be 18+
- Alcohol preference must be disclosed on profile
- First in-person meetings should follow a safe, pre-arranged process
- Users must purchase their own event tickets (anti-catfishing measure)

## Tech Stack

- **React Native + Expo** (TypeScript template)
- **React Navigation** — native stack (Onboarding → Profile → Main) + bottom tabs (Map, Match, Meetup, Buddies)
- Mock data only for now (`src/data/mockData.ts`) — no backend/API wired up yet

## Getting Started

```bash
npm install
npm run start      # opens Expo dev tools; scan the QR with Expo Go, or
npm run ios        # requires macOS + Xcode
npm run android     # requires Android Studio/emulator
npm run web         # quickest way to preview in a browser
```

## Project Structure

```
App.tsx                     # entry point
src/
  navigation/                # RootNavigator (stack) + MainTabs (bottom tabs), route types
  screens/
    OnboardingScreen.tsx      # Screen Page 1: genres -> artists/events -> vibe
    ProfileBuilderScreen.tsx  # Screen Page 2: profile fields
    MapScreen.tsx             # Screen Page 3: buddies/venues by proximity (placeholder map UI)
    MatchScreen.tsx           # Screen Page 4: match feed
    ChatScreen.tsx            # Screen Page 4: chat + match confirmation
    SetMeetupScreen.tsx       # Screen Page 5: meetup + event confirmation
    BuddiesScreen.tsx         # Screen Page 6: all buddies, sortable
  components/                # shared UI (Chip, ScreenContainer)
  theme/                      # colors, spacing, typography (Spotify-style green palette)
  data/                       # mock data for buddies, chat, shows, onboarding options
```

Every screen file is commented with which SPRINT.md "Screen Page" it implements, so you can cross-reference the docs while editing.

## Working with Claude Code / Cursor

- Point the assistant at `PRD.md` first for product intent, then `SPRINT.md` for the task breakdown and checklist.
- Treat the guardrails below as non-negotiable constraints on any feature work.
- Open questions from both docs (matching algorithm weighting, in-app safety features, long-term monetization, success metrics) are not yet decided — flag them rather than assuming an answer.
- As sprint tasks are completed, check them off in `SPRINT.md` to keep it in sync with actual progress.
- The map screen currently ships a list-based placeholder instead of a real map SDK — wiring up `react-native-maps` (or similar) with real venue/proximity data is a good next task.
- Next real steps: replace mock data with a backend (auth, profiles, matching, chat, calendar), add real photo upload, wire Spotify OAuth.

## Guardrails (do not compromise on these)

- Users must be 18+
- Alcohol preference must be disclosed on profile
- First in-person meetings should follow a safe, pre-arranged process
- Users must purchase their own event tickets (anti-catfishing measure)

## Status

Early prototype. Onboarding, profile builder, map (placeholder), match/chat, meetup, and buddies screens are scaffolded with mock data and no backend. PRD and sprint plan are based on early concept sketches; screens and requirements are subject to change as the design is refined.
