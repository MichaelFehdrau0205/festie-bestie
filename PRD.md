# Product Requirements Document: Festie Bestie

## 1. Overview

| | |
|---|---|
| **App Name** | Festie Bestie |
| **Theme** | Together |
| **Target Audience** | Gen Z, Gen Alpha |
| **Document Status** | Draft (based on initial concept sketch) |

## 2. Background / Context

Music festivals and live events are growing rapidly in popularity, fueled by influencer culture (e.g., Burning Man, South by Southwest). At the same time, music discovery and curation increasingly happens through platforms like Spotify and online fandoms. As people spend more time and money planning their next event, many lack companions who share their music taste to attend with them.

## 3. Problem Statement

**How might we help music festival goers bridge the gap and make friends with similar music tastes to attend festivals with?**

## 4. Proposed Solution

Festie Bestie allows concert and festival goers to find concert companions based on:
- Age
- Location
- Vibe
- Music taste

The app connects like-minded festival attendees before an event so they can plan, coordinate, and attend together.

## 5. Goals & Success Criteria

- Help users find compatible festival/concert companions ahead of an event
- Reduce the friction and safety concerns of meeting new people for shared events
- Drive discovery of upcoming shows through music-streaming integration (Spotify)

## 6. Design Direction

- **Color palette:** Green, similar to Spotify's brand palette
- **Typography/Style:** Bold, bright text
- **Iconography/Graphics:** Speakers, sunglasses, wristbands

## 7. Key Screens

1. **Onboarding / Sign Up** – account creation and initial entry point
2. **Build a Profile** – users set up their profile (music tastes, preferences, etc.)
3. **Map** – view potential buddies by geographic area
4. **Match / Chat Messaging** – connect and communicate with matched users
5. **Set Meetup (Pre-Event) / Manage Future Shows** – coordinate logistics for an upcoming event
6. **Buddies Screen** – shows all connected buddies

## 8. User Journey

1. User logs in, creates a profile, and saves it.
2. User views potential buddies on a map, filterable by geographic area.
3. User chats with a match to pre-screen them as a potential buddy before meeting.
4. User views a calendar, sets dates for shows/festivals they plan to attend, and can see which shows their buddies are attending.

## 9. Functional Requirements

### 9.1 Authentication & Profile
- Users must be able to log in and create an account
- Users must be able to build and save a profile, including:
  - Age / location / vibe / music taste
  - Alcohol preference (see Guardrails)
  - Favorite artists, music genres
  - Connected Spotify playlists

### 9.2 Discovery
- Users must be able to view potential buddies on a map
- Map results must be filterable by geographic area and other relevant filters

### 9.3 Matching & Messaging
- Users must be able to match with other users
- Users must be able to chat with a match to pre-screen them as a buddy prior to meeting in person

### 9.4 Events & Calendar
- Users must be able to view a calendar of shows/festivals
- Users must be able to set/save dates for shows or festivals they plan to attend
- Users must be able to see which shows their buddies are attending

### 9.5 Buddies
- Users must have a dedicated screen showing all of their current buddies

## 10. Guardrails & Safety

- **Age restriction:** Users must be 18+
- **Alcohol preference disclosure:** Users must indicate alcohol preferences on their profile
- **In-person meeting policy:** Buddies should meet in person for the first time in a safe, pre-arranged manner (safety-first approach)
- **Anti-catfishing measure:** Users must purchase their own event tickets, which helps verify intent and reduce catfishing risk

## 11. Monetization Strategy

**MVP approach:** Spotify plug-in / companion integration (additional platforms to be considered post-MVP)

**On Spotify:**
- Under an artist's page → Upcoming Shows section (curated by the app)
- Displays concert goers attending, with a call-to-action (CTA): *"Festie-Bestie – find a friend"*

**On the App:**
- User profiles can include favorite artists, music genres, and connected Spotify playlists, reinforcing the music-based matching experience

## 12. Open Questions / Areas for Further Definition

- What specific matching algorithm/weighting will be used across age, location, vibe, and music taste?
- What in-app safety features (reporting, blocking, verification) support the "meet in person first" guardrail?
- What is the long-term monetization model beyond the Spotify MVP integration (subscriptions, ads, partnerships)?
- What metrics will define success post-launch (matches made, meetups confirmed, retention, etc.)?
