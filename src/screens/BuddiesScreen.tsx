import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import ScreenContainer from '../components/ScreenContainer';
import Chip from '../components/Chip';
import Avatar from '../components/Avatar';
import { colors, radii, spacing, typography } from '../theme/theme';
import { buddies } from '../data/mockData';
import { MainTabParamList, RootStackParamList } from '../navigation/types';
import { useAppState } from '../state/AppState';

type SortMode = 'proximity' | 'genre';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Buddies'>,
  NativeStackScreenProps<RootStackParamList>
>;

export default function BuddiesScreen({ navigation }: Props) {
  const { matchedIds, reset } = useAppState();
  const [sortMode, setSortMode] = useState<SortMode>('proximity');

  const collection = useMemo(() => {
    const list = buddies.filter((b) => matchedIds.includes(b.id));
    return [...list].sort((a, b) =>
      sortMode === 'proximity' ? a.distanceMiles - b.distanceMiles : a.genres[0].localeCompare(b.genres[0])
    );
  }, [matchedIds, sortMode]);

  return (
    <ScreenContainer scroll={false}>
      <Text style={typography.h1}>Your buddies</Text>
      <Pressable
        accessibilityRole="button"
        onPress={() => {
          reset();
          navigation.getParent()?.reset({ index: 0, routes: [{ name: 'Onboarding' }] });
        }}
      >
        <Text style={styles.startOver}>← Start over (first page)</Text>
      </Pressable>
      <View style={styles.chipRow}>
        <Chip label="Sort: Proximity" selected={sortMode === 'proximity'} onPress={() => setSortMode('proximity')} />
        <Chip label="Sort: Music preference" selected={sortMode === 'genre'} onPress={() => setSortMode('genre')} />
      </View>

      <FlatList
        style={{ flex: 1 }}
        data={collection}
        keyExtractor={(b) => b.id}
        numColumns={2}
        columnWrapperStyle={collection.length > 1 ? { gap: spacing.md } : undefined}
        contentContainerStyle={{ gap: spacing.md, marginTop: spacing.md }}
        ListEmptyComponent={
          <Text style={typography.bodyMuted}>No buddies yet. Open Match, tap Like + match, then they show up here.</Text>
        }
        renderItem={({ item }) => (
          <Pressable
            accessibilityRole="button"
            style={styles.card}
            onPress={() => navigation.navigate('Chat', { buddyId: item.id })}
          >
            <View style={{ marginBottom: spacing.sm }}>
              <Avatar imageKey={item.avatar} size={88} rounded={16} />
            </View>
            <Text style={typography.h3}>{item.name}</Text>
            <Text style={typography.bodyMuted}>{item.genres.join(', ')}</Text>
            <Text style={styles.distance}>{item.distanceMiles} mi away</Text>
          </Pressable>
        )}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', marginTop: spacing.sm },
  startOver: { color: colors.primary, fontWeight: '700', marginTop: spacing.xs, marginBottom: spacing.sm },
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    cursor: 'pointer',
    overflow: 'hidden',
  },
  distance: { color: colors.primary, fontSize: 12, fontWeight: '700', marginTop: spacing.xs },
});
