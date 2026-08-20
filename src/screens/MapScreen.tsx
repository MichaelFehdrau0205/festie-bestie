import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import Chip from '../components/Chip';
import { colors, radii, spacing, typography } from '../theme/theme';
import { buddies } from '../data/mockData';

// Screen Page 3 from SPRINT.md: Map screen
// NOTE: This is a placeholder "map-style" list view (sorted by proximity) so the
// screen works in Expo Go without native map SDK setup. Swap in react-native-maps
// or a MapView provider once API keys / native config are ready — see SPRINT.md.
const FILTERS = ['All', 'This week', 'Shows near me', 'My matches'];

export default function MapScreen() {
  const [activeFilter, setActiveFilter] = useState('All');
  const sorted = [...buddies].sort((a, b) => a.distanceMiles - b.distanceMiles);

  return (
    <ScreenContainer scroll={false}>
      <Text style={typography.h1}>Nearby</Text>
      <Text style={[typography.bodyMuted, { marginTop: spacing.xs, marginBottom: spacing.md }]}>
        Discover buddies, venues, and shows around you.
      </Text>

      <View style={styles.chipRow}>
        {FILTERS.map((f) => (
          <Chip key={f} label={f} selected={activeFilter === f} onPress={() => setActiveFilter(f)} />
        ))}
      </View>

      <View style={styles.mapPlaceholder}>
        <Text style={typography.h3}>🗺️ Map view</Text>
        <Text style={typography.bodyMuted}>Pins would show buddies, stadiums, arenas & event spaces near you.</Text>
      </View>

      <Text style={[typography.h3, { marginTop: spacing.lg, marginBottom: spacing.sm }]}>Closest to you</Text>
      <FlatList
        data={sorted}
        keyExtractor={(b) => b.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={{ flex: 1 }}>
              <Text style={typography.h3}>{item.name}</Text>
              <Text style={typography.bodyMuted}>{item.vibe.join(' · ')}</Text>
            </View>
            <Text style={styles.distance}>{item.distanceMiles} mi</Text>
          </View>
        )}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  chipRow: { flexDirection: 'row', flexWrap: 'wrap' },
  mapPlaceholder: {
    height: 160,
    borderRadius: radii.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  avatar: { width: 44, height: 44, borderRadius: radii.pill, marginRight: spacing.md },
  distance: { color: colors.primary, fontWeight: '700' },
});
