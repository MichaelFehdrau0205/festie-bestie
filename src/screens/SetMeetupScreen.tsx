import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import { colors, radii, spacing, typography } from '../theme/theme';
import { upcomingShows } from '../data/mockData';

// Screen Page 5 from SPRINT.md: Set meet up
// - Calendar to set up/agree an in-person meet up first
// - Calendar showing event dates of concerts
// - Confirmation of meet up + confirmation of agreed event
export default function SetMeetupScreen() {
  const [confirmedIds, setConfirmedIds] = useState<Record<string, boolean>>({});

  const toggleConfirm = (id: string) => {
    setConfirmedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <ScreenContainer scroll={false}>
      <Text style={typography.h1}>Set a meetup</Text>
      <Text style={[typography.bodyMuted, { marginTop: spacing.xs, marginBottom: spacing.md }]}>
        Agree on an in-person meetup and confirm which shows you're going to together.
      </Text>

      <View style={styles.safetyNote}>
        <Text style={typography.bodyMuted}>
          🛡️ Safety first: meet in a public, pre-arranged spot for your first hangout.
        </Text>
      </View>

      <FlatList
        data={upcomingShows}
        keyExtractor={(e) => e.id}
        renderItem={({ item }) => {
          const confirmed = !!confirmedIds[item.id];
          return (
            <View style={styles.card}>
              <View style={{ flex: 1 }}>
                <Text style={typography.h3}>{item.name}</Text>
                <Text style={typography.bodyMuted}>{item.venue}</Text>
                <Text style={typography.bodyMuted}>{item.date}</Text>
                {item.attendingBuddies.length > 0 && (
                  <Text style={styles.buddyText}>With {item.attendingBuddies.join(', ')}</Text>
                )}
              </View>
              <Pressable
                style={[styles.confirmButton, confirmed && styles.confirmButtonActive]}
                onPress={() => toggleConfirm(item.id)}
              >
                <Text style={confirmed ? styles.confirmTextActive : styles.confirmText}>
                  {confirmed ? 'Confirmed ✓' : 'Confirm'}
                </Text>
              </Pressable>
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  buddyText: { color: colors.primary, marginTop: spacing.xs, fontSize: 13, fontWeight: '600' },
  confirmButton: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: radii.pill,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  confirmButtonActive: { backgroundColor: colors.primary },
  confirmText: { color: colors.primary, fontWeight: '700' },
  confirmTextActive: { color: colors.background, fontWeight: '800' },
});
