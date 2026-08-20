import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Pressable, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ScreenContainer from '../components/ScreenContainer';
import { colors, radii, spacing, typography } from '../theme/theme';
import { buddies, mockChat, ChatMessage } from '../data/mockData';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Chat'>;

// Part of Screen Page 4 in SPRINT.md: Chat messaging + match confirmation (wristbands icon,
// icebreaker to start the chat).
export default function ChatScreen({ route }: Props) {
  const buddy = buddies.find((b) => b.id === route.params.buddyId) ?? buddies[0];
  const [messages, setMessages] = useState<ChatMessage[]>(mockChat);
  const [draft, setDraft] = useState('');

  const send = () => {
    if (!draft.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: `local-${Date.now()}`, fromSelf: true, text: draft.trim(), timestamp: 'Now' },
    ]);
    setDraft('');
  };

  return (
    <ScreenContainer scroll={false}>
      <View style={styles.header}>
        <Image source={{ uri: buddy.avatar }} style={styles.avatar} />
        <View>
          <Text style={typography.h3}>{buddy.name}</Text>
          <Text style={styles.matchBadge}>🎫 Matched — wristbands confirmed</Text>
        </View>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(m) => m.id}
        contentContainerStyle={{ paddingVertical: spacing.md }}
        renderItem={({ item }) => (
          <View style={[styles.bubble, item.fromSelf ? styles.bubbleSelf : styles.bubbleOther]}>
            <Text style={styles.bubbleText}>{item.text}</Text>
          </View>
        )}
      />

      <View style={styles.composer}>
        <TextInput
          style={styles.input}
          placeholder="Send a message, photo, video, or link..."
          placeholderTextColor={colors.textMuted}
          value={draft}
          onChangeText={setDraft}
        />
        <Pressable style={styles.sendButton} onPress={send}>
          <Text style={styles.sendButtonText}>Send</Text>
        </Pressable>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
  avatar: { width: 44, height: 44, borderRadius: radii.pill, marginRight: spacing.md },
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
  },
  sendButtonText: { color: colors.background, fontWeight: '800' },
});
