import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { buddies, ChatMessage } from '../data/mockData';

const STORAGE_KEY = 'festiebestie-state-v1';

export type Profile = {
  name: string;
  age: string;
  preferredAgeRange: string;
  location: string;
  radius: string;
  bio: string;
  drinks: boolean;
  socialHandle: string;
  spotifyConnected: boolean;
  shows: string;
  photoUri: string;
  genres: string[];
  artistsEvents: string[];
  vibes: string[];
};

export type MeetupStatus = {
  meetupConfirmed: boolean;
  eventConfirmed: boolean;
  meetupDate: string;
};

type PersistedState = {
  profile: Profile | null;
  likedIds: string[];
  passedIds: string[];
  matchedIds: string[];
  chats: Record<string, ChatMessage[]>;
  meetups: Record<string, MeetupStatus>;
};

type AppStateValue = PersistedState & {
  ready: boolean;
  setOnboarding: (genres: string[], artistsEvents: string[], vibes: string[]) => void;
  saveProfile: (profile: Profile) => void;
  likeBuddy: (id: string) => void;
  passBuddy: (id: string) => void;
  confirmMatch: (id: string) => void;
  sendMessage: (buddyId: string, text: string) => void;
  setMeetup: (eventId: string, patch: Partial<MeetupStatus>) => void;
};

const emptyState: PersistedState = {
  profile: null,
  likedIds: [],
  passedIds: [],
  matchedIds: [],
  chats: {},
  meetups: {},
};

const AppStateContext = createContext<AppStateValue | null>(null);

function icebreakerFor(buddyId: string): ChatMessage[] {
  const buddy = buddies.find((b) => b.id === buddyId);
  const name = buddy?.name ?? 'there';
  return [
    {
      id: `${buddyId}-ice`,
      fromSelf: false,
      text: `Icebreaker: hey ${name.split(' ')[0]} — what's the most chaotic show you've ever been to? 🎤`,
      timestamp: 'Now',
    },
  ];
}

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<PersistedState>(emptyState);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (raw) {
          const parsed = JSON.parse(raw) as PersistedState;
          setState({ ...emptyState, ...parsed });
        }
      })
      .catch(() => {})
      .finally(() => setReady(true));
  }, []);

  useEffect(() => {
    if (!ready) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state)).catch(() => {});
  }, [ready, state]);

  const setOnboarding = useCallback((genres: string[], artistsEvents: string[], vibes: string[]) => {
    setState((prev) => ({
      ...prev,
      profile: {
        name: prev.profile?.name ?? '',
        age: prev.profile?.age ?? '',
        preferredAgeRange: prev.profile?.preferredAgeRange ?? '',
        location: prev.profile?.location ?? '',
        radius: prev.profile?.radius ?? '',
        bio: prev.profile?.bio ?? '',
        drinks: prev.profile?.drinks ?? false,
        socialHandle: prev.profile?.socialHandle ?? '',
        spotifyConnected: prev.profile?.spotifyConnected ?? false,
        shows: prev.profile?.shows ?? '',
        photoUri: prev.profile?.photoUri ?? '',
        genres,
        artistsEvents,
        vibes,
      },
    }));
  }, []);

  const saveProfile = useCallback((profile: Profile) => {
    setState((prev) => ({ ...prev, profile }));
  }, []);

  const likeBuddy = useCallback((id: string) => {
    setState((prev) => {
      const likedIds = prev.likedIds.includes(id) ? prev.likedIds : [...prev.likedIds, id];
      const matchedIds = prev.matchedIds.includes(id) ? prev.matchedIds : [...prev.matchedIds, id];
      const chats = prev.chats[id] ? prev.chats : { ...prev.chats, [id]: icebreakerFor(id) };
      return { ...prev, likedIds, matchedIds, chats, passedIds: prev.passedIds.filter((x) => x !== id) };
    });
  }, []);

  const passBuddy = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      passedIds: prev.passedIds.includes(id) ? prev.passedIds : [...prev.passedIds, id],
      likedIds: prev.likedIds.filter((x) => x !== id),
    }));
  }, []);

  const confirmMatch = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      matchedIds: prev.matchedIds.includes(id) ? prev.matchedIds : [...prev.matchedIds, id],
      likedIds: prev.likedIds.includes(id) ? prev.likedIds : [...prev.likedIds, id],
      chats: prev.chats[id] ? prev.chats : { ...prev.chats, [id]: icebreakerFor(id) },
    }));
  }, []);

  const sendMessage = useCallback((buddyId: string, text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const selfId = `self-${Date.now()}`;
    setState((prev) => {
      const existing = prev.chats[buddyId] ?? icebreakerFor(buddyId);
      return {
        ...prev,
        chats: {
          ...prev.chats,
          [buddyId]: [...existing, { id: selfId, fromSelf: true, text: trimmed, timestamp: 'Now' }],
        },
      };
    });
    setTimeout(() => {
      setState((later) => {
        const thread = later.chats[buddyId] ?? [];
        if (thread.some((m) => m.id === `reply-${selfId}`)) return later;
        return {
          ...later,
          chats: {
            ...later.chats,
            [buddyId]: [
              ...thread,
              {
                id: `reply-${selfId}`,
                fromSelf: false,
                text: "I'm in — let's lock a meetup on the calendar tab 🎫",
                timestamp: 'Now',
              },
            ],
          },
        };
      });
    }, 700);
  }, []);

  const setMeetup = useCallback((eventId: string, patch: Partial<MeetupStatus>) => {
    setState((prev) => ({
      ...prev,
      meetups: {
        ...prev.meetups,
        [eventId]: {
          meetupConfirmed: prev.meetups[eventId]?.meetupConfirmed ?? false,
          eventConfirmed: prev.meetups[eventId]?.eventConfirmed ?? false,
          meetupDate: prev.meetups[eventId]?.meetupDate ?? '',
          ...patch,
        },
      },
    }));
  }, []);

  const value = useMemo<AppStateValue>(
    () => ({
      ...state,
      ready,
      setOnboarding,
      saveProfile,
      likeBuddy,
      passBuddy,
      confirmMatch,
      sendMessage,
      setMeetup,
    }),
    [state, ready, setOnboarding, saveProfile, likeBuddy, passBuddy, confirmMatch, sendMessage, setMeetup]
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error('useAppState must be used inside AppStateProvider');
  return ctx;
}

export function matchScore(buddyGenres: string[], buddyVibes: string[], profile: Profile | null) {
  if (!profile) return 1;
  const genreHits = buddyGenres.filter((g) => profile.genres.includes(g)).length;
  const vibeHits = buddyVibes.filter((v) => profile.vibes.includes(v)).length;
  const eventHits = profile.artistsEvents.filter((e) =>
    buddyGenres.concat(buddyVibes).join(' ').toLowerCase().includes(e.toLowerCase())
  ).length;
  return genreHits * 3 + vibeHits * 2 + eventHits + 1;
}
