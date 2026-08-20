import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ScreenContainer from '../components/ScreenContainer';
import Chip from '../components/Chip';
import { colors, radii, spacing, typography } from '../theme/theme';
import { genreOptions, artistEventOptions, vibeOptions } from '../data/mockData';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

// Screen Page 1 from SPRINT.md: Simple onboarding flow
// Step 1: music genres (multi-select)
// Step 2: artists + events (multi-select)
// Step 3: vibe / aesthetic (multi-select)
const STEPS = [
  { title: 'Pick your genres', subtitle: 'Select all the music genres you vibe with.', options: genreOptions },
  { title: 'Artists & events', subtitle: 'Who or what are you into or hoping to go to?', options: artistEventOptions },
  { title: 'Describe your vibe', subtitle: 'Clothing, look, aesthetic — pick what fits you.', options: vibeOptions },
];

export default function OnboardingScreen({ navigation }: Props) {
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<string[][]>([[], [], []]);

  const current = STEPS[step];
  const currentSelections = selections[step];

  const toggle = (option: string) => {
    setSelections((prev) => {
      const next = [...prev];
      const set = new Set(next[step]);
      set.has(option) ? set.delete(option) : set.add(option);
      next[step] = Array.from(set);
      return next;
    });
  };

  const isLastStep = step === STEPS.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      navigation.replace('ProfileBuilder');
    } else {
      setStep((s) => s + 1);
    }
  };

  return (
    <ScreenContainer>
      <Text style={typography.label}>STEP {step + 1} OF {STEPS.length}</Text>
      <Text style={[typography.h1, styles.title]}>{current.title}</Text>
      <Text style={[typography.bodyMuted, styles.subtitle]}>{current.subtitle}</Text>

      <View style={styles.chipRow}>
        {current.options.map((option) => (
          <Chip
            key={option}
            label={option}
            selected={currentSelections.includes(option)}
            onPress={() => toggle(option)}
          />
        ))}
      </View>

      <View style={styles.footer}>
        <Pressable
          style={[styles.button, currentSelections.length === 0 && styles.buttonDisabled]}
          disabled={currentSelections.length === 0}
          onPress={handleNext}
        >
          <Text style={styles.buttonText}>{isLastStep ? "Let's go" : 'Next'}</Text>
        </Pressable>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: { marginTop: spacing.md },
  subtitle: { marginTop: spacing.xs, marginBottom: spacing.lg },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap' },
  footer: { marginTop: spacing.xl },
  button: {
    backgroundColor: colors.primary,
    borderRadius: radii.pill,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  buttonDisabled: { opacity: 0.4 },
  buttonText: { color: colors.background, fontWeight: '800', fontSize: 16 },
});
