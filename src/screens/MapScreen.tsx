import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Image } from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import ScreenContainer from '../components/ScreenContainer';
import Chip from '../components/Chip';
import Avatar from '../components/Avatar';
import { colors, radii, spacing, typography } from '../theme/theme';
import { buddies, upcomingShows, venues } from '../data/mockData';
import { resolveFestival } from '../data/festivalImages';
import { MainTabParamList, RootStackParamList } from '../navigation/types';
import { useAppState } from '../state/AppState';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Map'>,
  NativeStackScreenProps<RootStackParamList>
>;

const FILTERS = ['All', 'This week', 'Shows near me', 'My matches'] as const;

export default function MapScreen({ navigation }: Props) {
  const { matchedIds } = useAppState();
  const [activeFilter, setActiveFilter] = useState<(typeof FILTERS)[number]>('All');

  const people = useMemo(() => {
    let list = [...buddies].sort((a, b) => a.distanceMiles - b.distanceMiles);
    if (activeFilter === 'Shows near me') list = list.filter((b) => b.distanceMiles <= 5);
    if (activeFilter === 'My matches') list = list.filter((b) => matchedIds.includes(b.id));
    if (activeFilter === 'This week') list = list.filter((b) => b.upcomingShows.length > 0);
    return list;
  }, [activeFilter, matchedIds]);

  return (
    <ScreenContainer scroll={false}>
      <Text style={typography.h1}>Nearby</Text>
      <Text style={[typography.bodyMuted, { marginTop: spacing.xs, marginBottom: spacing.md }]}>
        Tap a pin or a person to open their match card.
      </Text>

      <View style={styles.chipRow}>
        {FILTERS.map((f) => (
          <Chip key={f} label={f} selected={activeFilter === f} onPress={() => setActiveFilter(f)} />
        ))}
      </View>

      <View style={styles.map}>
        {people.slice(0, 4).map((person, index) => (
          <Pressable
            key={person.id}
            accessibilityRole="button"
            onPress={() => navigation.navigate('Chat', { buddyId: person.id })}
            style={[styles.pin, pinPosition(index)]}
          >
            <Avatar imageKey={person.avatar} size={36} />
            <Text style={styles.pinLabel}>{person.name.split(' ')[0]}</Text>
          </Pressable>
        ))}
        {venues.slice(0, 3).map((venue, index) => (
          <View key={venue.id} style={[styles.venuePin, venuePosition(index)]}>
            <Image source={resolveFestival(venue.image)} style={styles.venueThumb} />
            <Text style={styles.pinLabel}>{venue.name.split(' ')[0]}</Text>
          </View>
        ))}
      </View>

      <Text style={[typography.h3, { marginTop: spacing.lg, marginBottom: spacing.sm }]}>Festivals & shows</Text>
      <FlatList
        horizontal
        data={upcomingShows}
        keyExtractor={(show) => show.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: spacing.sm, paddingBottom: spacing.md }}
        renderItem={({ item }) => (
          <View style={styles.showCard}>
            <Image source={resolveFestival(item.image)} style={styles.showCover} resizeMode="cover" />
            <Text style={styles.showName} numberOfLines={1}>{item.name}</Text>
            <Text style={styles.showMeta} numberOfLines={1}>{item.venue}</Text>
          </View>
        )}
      />

      <Text style={[typography.h3, { marginTop: spacing.sm, marginBottom: spacing.sm }]}>
        {activeFilter === 'All' ? 'Closest to you' : activeFilter}
      </Text>
      <FlatList
        style={styles.list}
        data={people}
        keyExtractor={(b) => b.id}
        ListEmptyComponent={<Text style={typography.bodyMuted}>Nobody in this filter yet — like someone on Match.</Text>}
        renderItem={({ item }) => (
          <Pressable
            accessibilityRole="button"
            style={styles.row}
            onPress={() => navigation.navigate('Chat', { buddyId: item.id })}
          >
            <Avatar imageKey={item.avatar} size={48} />
            <View style={{ flex: 1 }}>
              <Text style={typography.h3}>{item.name}</Text>
              <Text style={typography.bodyMuted}>{item.upcomingShows[0] ?? item.vibe.join(' · ')}</Text>
            </View>
            <Text style={styles.distance}>{item.distanceMiles} mi</Text>
          </Pressable>
        )}
      />
    </ScreenContainer>
  );
}

function pinPosition(index: number) {
  const spots = [
    { top: 24, left: 28 },
    { top: 70, left: 160 },
    { top: 40, right: 36 },
    { bottom: 28, left: 90 },
  ];
  return spots[index % spots.length];
}

function venuePosition(index: number) {
  const spots = [
    { bottom: 20, right: 24 },
    { top: 18, left: 120 },
    { bottom: 50, left: 200 },
  ];
  return spots[index % spots.length];
}

const styles = StyleSheet.create({
  chipRow: { flexDirection: 'row', flexWrap: 'wrap' },
  map: {
    height: 180,
    borderRadius: radii.lg,
    backgroundColor: '#14301d',
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  pin: { position: 'absolute', alignItems: 'center', cursor: 'pointer' },
  venuePin: { position: 'absolute', alignItems: 'center' },
  venueThumb: { width: 36, height: 36, borderRadius: 8, backgroundColor: colors.surfaceAlt },
  pinLabel: { color: colors.text, fontSize: 11, fontWeight: '700', marginTop: 2 },
  showCard: { width: 180, backgroundColor: colors.surface, borderRadius: radii.md, overflow: 'hidden', borderWidth: 1, borderColor: colors.border },
  showCover: { width: 180, height: 100, backgroundColor: colors.surfaceAlt },
  showName: { color: colors.text, fontWeight: '700', fontSize: 13, paddingHorizontal: spacing.sm, paddingTop: spacing.sm },
  showMeta: { color: colors.textMuted, fontSize: 12, paddingHorizontal: spacing.sm, paddingBottom: spacing.sm },
  list: { flex: 1 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    cursor: 'pointer',
    gap: spacing.md,
  },
  distance: { color: colors.primary, fontWeight: '700', marginRight: spacing.sm },
});
