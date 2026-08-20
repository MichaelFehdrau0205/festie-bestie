import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import ScreenContainer from '../components/ScreenContainer';
import { colors, radii, spacing, typography } from '../theme/theme';
import { buddies } from '../data/mockData';
import { MainTabParamList, RootStackParamList } from '../navigation/types';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Match'>,
  NativeStackScreenProps<RootStackParamList>
>;

// Screen Page 4 from SPRINT.md: Match screen — collection of people you match vibes with,
// showing profile/bio/pictures/socials/spotify. Tapping a card opens Chat.
export default function MatchScreen({ navigation }: Props) {
  return (
    <ScreenContainer scroll={false}>
      <Text style={typography.h1}>Your matches</Text>
      <Text style={[typography.bodyMuted, { marginTop: spacing.xs, marginBottom: spacing.md }]}>
        People who match your vibe. Say hi before you meet up.
      </Text>

      <FlatList
        data={buddies}
        keyExtractor={(b) => b.id}
        renderItem={({ item }) => (
          <Pressable style={styles.card} onPress={() => navigation.navigate('Chat', { buddyId: item.id })}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={{ flex: 1 }}>
              <View style={styles.nameRow}>
                <Text style={typography.h3}>{item.name}, {item.age}</Text>
                {item.spotifyConnected && <Text style={styles.spotifyBadge}>♫ Spotify</Text>}
              </View>
              <Text style={typography.bodyMuted} numberOfLines={2}>{item.bio}</Text>
              <View style={styles.tagRow}>
                {item.genres.map((g) => (
                  <Text key={g} style={styles.tag}>{g}</Text>
                ))}
              </View>
            </View>
          </Pressable>
        )}
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
});
