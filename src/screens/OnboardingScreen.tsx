import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ScreenContainer from '../components/ScreenContainer';
import Chip from '../components/Chip';
import PrimaryButton from '../components/PrimaryButton';
import { colors, spacing, typography } from '../theme/theme';
import { genreOptions, artistEventOptions, vibeOptions } from '../data/mockData';
import { RootStackParamList } from '../navigation/types';
import { useAppState } from '../state/AppState';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

const STEPS = [
  { title: 'Pick your genres', subtitle: 'Select all the music genres you vibe with.', options: genreOptions },
  { title: 'Artists & events', subtitle: 'Who or what are you into or hoping to go to?', options: artistEventOptions },
  { title: 'Describe your vibe', subtitle: 'Clothing, look, aesthetic — pick what fits you.', options: vibeOptions },
];

export default function OnboardingScreen({ navigation }: Props) {
  const { setOnboarding } = useAppState();
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<string[][]>([[], [], []]);

  const current = STEPS[step];
  const currentSelections = selections[step];
  const isLastStep = step === STEPS.length - 1;

  const toggle = (option: string) => {
    setSelections((prev) => {
      const next = [...prev];
      const set = new Set(next[step]);
      set.has(option) ? set.delete(option) : set.add(option);
      next[step] = Array.from(set);
      return next;
    });
  };

  const handleNext = () => {
    if (!isLastStep) {
      setStep((s) => s + 1);
      return;
    }
    setOnboarding(selections[0], selections[1], selections[2]);
    navigation.replace('ProfileBuilder');
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

      {currentSelections.length === 0 && (
        <Text style={styles.hint}>Tap at least one to continue.</Text>
      )}

      <View style={styles.footer}>
        {step > 0 && (
          <PrimaryButton
            label="Back"
            variant="ghost"
            onPress={() => setStep((s) => s - 1)}
            style={styles.backButton}
          />
        )}
        <PrimaryButton
          label={isLastStep ? "Let's go" : 'Next'}
          disabled={currentSelections.length === 0}
          onPress={handleNext}
          style={styles.nextButton}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: { marginTop: spacing.md },
  subtitle: { marginTop: spacing.xs, marginBottom: spacing.lg },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap' },
  hint: { color: colors.textMuted, marginTop: spacing.sm },
  footer: { marginTop: spacing.xl, flexDirection: 'row', gap: spacing.sm },
  backButton: { flex: 1 },
  nextButton: { flex: 1 },
});
