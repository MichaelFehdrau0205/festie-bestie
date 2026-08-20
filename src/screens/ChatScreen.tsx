import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ScreenContainer from '../components/ScreenContainer';
import Avatar from '../components/Avatar';
import { colors, radii, spacing, typography } from '../theme/theme';
import { buddies } from '../data/mockData';
import { RootStackParamList } from '../navigation/types';
import { useAppState } from '../state/AppState';

type Props = NativeStackScreenProps<RootStackParamList, 'Chat'>;

export default function ChatScreen({ route }: Props) {
  const buddy = buddies.find((b) => b.id === route.params.buddyId) ?? buddies[0];
  const { chats, sendMessage, likeBuddy, matchedIds } = useAppState();
  const [draft, setDraft] = useState('');
  const confirmed = matchedIds.includes(buddy.id);
  const messages = useMemo(() => chats[buddy.id] ?? [], [chats, buddy.id]);

  const send = () => {
    if (!draft.trim()) return;
    if (!confirmed) likeBuddy(buddy.id);
    sendMessage(buddy.id, draft);
    setDraft('');
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScreenContainer scroll={false}>
        <View style={styles.header}>
          <Avatar imageKey={buddy.avatar} size={48} />
          <View>
            <Text style={typography.h3}>{buddy.name}</Text>
            <Text style={styles.matchBadge}>
              {confirmed ? '🎫 Matched — wristbands confirmed' : 'Tap send to match wristbands'}
            </Text>
          </View>
        </View>

        <FlatList
          style={{ flex: 1 }}
          data={messages}
          keyExtractor={(m) => m.id}
          contentContainerStyle={{ paddingVertical: spacing.md }}
          ListEmptyComponent={<Text style={typography.bodyMuted}>Say hi — an icebreaker starts the chat.</Text>}
          renderItem={({ item }) => (
            <View style={[styles.bubble, item.fromSelf ? styles.bubbleSelf : styles.bubbleOther]}>
              <Text style={styles.bubbleText}>{item.text}</Text>
            </View>
          )}
        />

        <View style={styles.composer}>
          <TextInput
            style={styles.input}
            placeholder="Send a message..."
            placeholderTextColor={colors.textMuted}
            value={draft}
            onChangeText={setDraft}
            onSubmitEditing={send}
            returnKeyType="send"
          />
          <Pressable accessibilityRole="button" style={styles.sendButton} onPress={send}>
            <Text style={styles.sendButtonText}>Send</Text>
          </Pressable>
        </View>
      </ScreenContainer>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm, gap: spacing.md },
  matchBadge: { color: colors.primary, fontSize: 12, fontWeight: '700', marginTop: 2 },
  bubble: { maxWidth: '80%', padding: spacing.sm, borderRadius: radii.md, marginBottom: spacing.sm },
  bubbleOther: { backgroundColor: colors.surface, alignSelf: 'flex-start' },
  bubbleSelf: { backgroundColor: colors.chipBackground, alignSelf: 'flex-end' },
  bubbleText: { color: colors.text },
  composer: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  input: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    color: colors.text,
  },
  sendButton: {
    backgroundColor: colors.primary,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    cursor: 'pointer',
  },
  sendButtonText: { color: colors.background, fontWeight: '800' },
});
