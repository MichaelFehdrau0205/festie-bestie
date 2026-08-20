import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import Chip from '../components/Chip';
import { colors, radii, spacing, typography } from '../theme/theme';
import { buddies } from '../data/mockData';

// Screen Page 6 from SPRINT.md: "Screen shows all buddies"
// - collection of pictures/profiles
// - sortable by music preference or proximity
type SortMode = 'proximity' | 'genre';

export default function BuddiesScreen() {
  const [sortMode, setSortMode] = useState<SortMode>('proximity');

  const sorted = [...buddies].sort((a, b) =>
    sortMode === 'proximity'
      ? a.distanceMiles - b.distanceMiles
      : a.genres[0].localeCompare(b.genres[0])
  );

  return (
    <ScreenContainer scroll={false}>
      <Text style={typography.h1}>Your buddies</Text>
      <View style={styles.chipRow}>
        <Chip label="Sort: Proximity" selected={sortMode === 'proximity'} onPress={() => setSortMode('proximity')} />
        <Chip label="Sort: Music preference" selected={sortMode === 'genre'} onPress={() => setSortMode('genre')} />
      </View>

      <FlatList
        data={sorted}
        keyExtractor={(b) => b.id}
        numColumns={2}
        columnWrapperStyle={{ gap: spacing.md }}
        contentContainerStyle={{ gap: spacing.md, marginTop: spacing.md }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <Text style={typography.h3}>{item.name}</Text>
            <Text style={typography.bodyMuted}>{item.genres.join(', ')}</Text>
            <Text style={styles.distance}>{item.distanceMiles} mi away</Text>
          </View>
        )}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', marginTop: spacing.sm },
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  avatar: { width: 64, height: 64, borderRadius: radii.pill, marginBottom: spacing.sm },
  distance: { color: colors.primary, fontSize: 12, fontWeight: '700', marginTop: spacing.xs },
});
