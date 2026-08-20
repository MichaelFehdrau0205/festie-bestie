import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import ScreenContainer from '../components/ScreenContainer';
import { colors, radii, spacing, typography } from '../theme/theme';
import { buddies } from '../data/mockData';
import { MainTabParamList, RootStackParamList } from '../navigation/types';
import { matchScore, useAppState } from '../state/AppState';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Match'>,
  NativeStackScreenProps<RootStackParamList>
>;

export default function MatchScreen({ navigation }: Props) {
  const { profile, passedIds, matchedIds, likeBuddy, passBuddy } = useAppState();

  const feed = useMemo(
    () =>
      [...buddies]
        .filter((b) => !passedIds.includes(b.id))
        .sort((a, b) => matchScore(b.genres, b.vibe, profile) - matchScore(a.genres, a.vibe, profile)),
    [passedIds, profile]
  );

  return (
    <ScreenContainer scroll={false}>
      <Text style={typography.h1}>Your matches</Text>
      <Text style={[typography.bodyMuted, { marginTop: spacing.xs, marginBottom: spacing.md }]}>
        Like someone to confirm wristbands, then chat.
      </Text>

      <FlatList
        style={{ flex: 1 }}
        data={feed}
        keyExtractor={(b) => b.id}
        ListEmptyComponent={<Text style={typography.bodyMuted}>No more people in this area. Check Buddies for confirmed matches.</Text>}
        renderItem={({ item }) => {
          const confirmed = matchedIds.includes(item.id);
          const score = matchScore(item.genres, item.vibe, profile);
          return (
            <View style={styles.card}>
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              <View style={{ flex: 1 }}>
                <View style={styles.nameRow}>
                  <Text style={typography.h3}>{item.name}, {item.age}</Text>
                  {item.spotifyConnected && <Text style={styles.spotifyBadge}>♫ Spotify</Text>}
                </View>
                <Text style={styles.score}>{score} vibe match</Text>
                <Text style={typography.bodyMuted} numberOfLines={2}>{item.bio}</Text>
                <View style={styles.tagRow}>
                  {item.genres.map((g) => (
                    <Text key={g} style={styles.tag}>{g}</Text>
                  ))}
                </View>
                {confirmed && <Text style={styles.wristband}>🎫 Matching wristbands confirmed</Text>}
                <View style={styles.actions}>
                  <Pressable accessibilityRole="button" style={styles.pass} onPress={() => passBuddy(item.id)}>
                    <Text style={styles.passText}>Pass</Text>
                  </Pressable>
                  {!confirmed ? (
                    <Pressable accessibilityRole="button" style={styles.like} onPress={() => likeBuddy(item.id)}>
                      <Text style={styles.likeText}>Like + match</Text>
                    </Pressable>
                  ) : (
                    <Pressable
                      accessibilityRole="button"
                      style={styles.like}
                      onPress={() => navigation.navigate('Chat', { buddyId: item.id })}
                    >
                      <Text style={styles.likeText}>Open chat</Text>
                    </Pressable>
                  )}
                </View>
              </View>
            </View>
          );
        }}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  avatar: { width: 56, height: 56, borderRadius: radii.pill, marginRight: spacing.md },
  nameRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  spotifyBadge: { color: colors.primary, fontSize: 12, fontWeight: '700' },
  score: { color: colors.primary, fontWeight: '700', marginVertical: 4 },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', marginTop: spacing.xs, gap: 6 },
  tag: {
    fontSize: 11,
    color: colors.primary,
    backgroundColor: colors.chipBackground,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: radii.pill,
    overflow: 'hidden',
  },
  wristband: { color: colors.primary, fontWeight: '700', marginTop: spacing.sm },
  actions: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm },
  pass: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.pill,
    paddingVertical: 8,
    paddingHorizontal: 12,
    cursor: 'pointer',
  },
  like: {
    backgroundColor: colors.primary,
    borderRadius: radii.pill,
    paddingVertical: 8,
    paddingHorizontal: 12,
    cursor: 'pointer',
  },
  passText: { color: colors.text, fontWeight: '700' },
  likeText: { color: colors.background, fontWeight: '800' },
});
