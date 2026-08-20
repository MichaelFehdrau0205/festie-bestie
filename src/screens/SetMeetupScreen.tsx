import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import Chip from '../components/Chip';
import { colors, radii, spacing, typography } from '../theme/theme';
import { buddies, upcomingShows } from '../data/mockData';
import { useAppState } from '../state/AppState';
import Avatar from '../components/Avatar';

const DATE_OPTIONS = ['Sat 6pm', 'Sun 2pm', 'Fri 7pm', 'Tonight'];

export default function SetMeetupScreen() {
  const { meetups, setMeetup, matchedIds } = useAppState();

  return (
    <ScreenContainer scroll={false}>
      <Text style={typography.h1}>Set a meetup</Text>
      <Text style={[typography.bodyMuted, { marginTop: spacing.xs, marginBottom: spacing.md }]}>
        Pick a public first-meet time, then confirm the show you'll attend together.
      </Text>

      <View style={styles.safetyNote}>
        <Text style={typography.bodyMuted}>
          🛡️ Safety first: meet in a public, pre-arranged spot for your first hangout. Buy your own ticket.
        </Text>
      </View>

      <FlatList
        style={{ flex: 1 }}
        data={upcomingShows}
        keyExtractor={(e) => e.id}
        renderItem={({ item }) => {
          const status = meetups[item.id];
          return (
            <View style={styles.card}>
              <Text style={typography.h3}>{item.name}</Text>
              <Text style={typography.bodyMuted}>{item.venue}</Text>
              <Text style={typography.bodyMuted}>{item.date}</Text>
              {item.attendingBuddies.length > 0 && (
                <View style={styles.attending}>
                  {item.attendingBuddies.map((name) => {
                    const buddy = buddies.find((b) => b.name === name);
                    return (
                      <View key={name} style={styles.attendingPerson}>
                        <Avatar imageKey={buddy?.avatar} size={36} />
                        <Text style={styles.buddyText}>{name}</Text>
                      </View>
                    );
                  })}
                </View>
              )}

              <Text style={[typography.label, { marginTop: spacing.md }]}>FIRST MEET TIME</Text>
              <View style={styles.chipRow}>
                {DATE_OPTIONS.map((option) => (
                  <Chip
                    key={option}
                    label={option}
                    selected={status?.meetupDate === option}
                    onPress={() => setMeetup(item.id, { meetupDate: option })}
                  />
                ))}
              </View>

              <View style={styles.actions}>
                <Pressable
                  accessibilityRole="button"
                  style={[styles.confirmButton, status?.meetupConfirmed && styles.confirmButtonActive]}
                  onPress={() => setMeetup(item.id, { meetupConfirmed: !status?.meetupConfirmed })}
                >
                  <Text style={status?.meetupConfirmed ? styles.confirmTextActive : styles.confirmText}>
                    {status?.meetupConfirmed ? 'Meetup locked ✓' : 'Confirm meetup'}
                  </Text>
                </Pressable>
                <Pressable
                  accessibilityRole="button"
                  style={[styles.confirmButton, status?.eventConfirmed && styles.confirmButtonActive]}
                  onPress={() => setMeetup(item.id, { eventConfirmed: !status?.eventConfirmed })}
                >
                  <Text style={status?.eventConfirmed ? styles.confirmTextActive : styles.confirmText}>
                    {status?.eventConfirmed ? 'Show locked ✓' : 'Confirm show'}
                  </Text>
                </Pressable>
              </View>
              {matchedIds.length === 0 && (
                <Text style={styles.hint}>Match someone first so you have a buddy to meet.</Text>
              )}
            </View>
          );
        }}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  safetyNote: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  buddyText: { color: colors.primary, fontSize: 13, fontWeight: '600' },
  attending: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md, marginTop: spacing.sm },
  attendingPerson: { alignItems: 'center', gap: 4 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', marginTop: spacing.xs },
  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.sm },
  confirmButton: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: radii.pill,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    cursor: 'pointer',
  },
  confirmButtonActive: { backgroundColor: colors.primary },
  confirmText: { color: colors.primary, fontWeight: '700' },
  confirmTextActive: { color: colors.background, fontWeight: '800' },
  hint: { color: colors.textMuted, marginTop: spacing.sm, fontSize: 12 },
});
