import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Switch } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ScreenContainer from '../components/ScreenContainer';
import { colors, radii, spacing, typography } from '../theme/theme';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'ProfileBuilder'>;

// Screen Page 2 from SPRINT.md: Profile Builder fields
export default function ProfileBuilderScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [preferredAgeRange, setPreferredAgeRange] = useState('');
  const [location, setLocation] = useState('');
  const [radius, setRadius] = useState('');
  const [bio, setBio] = useState('');
  const [drinks, setDrinks] = useState(false);
  const [socialHandle, setSocialHandle] = useState('');
  const [spotifyConnected, setSpotifyConnected] = useState(false);
  const [shows, setShows] = useState('');

  return (
    <ScreenContainer>
      <Text style={typography.h1}>Build your profile</Text>
      <Text style={[typography.bodyMuted, { marginTop: spacing.xs, marginBottom: spacing.lg }]}>
        This is what buddies will see. Keep it real — or make up a name, your call.
      </Text>

      <Field label="Profile name" value={name} onChangeText={setName} placeholder="Nova R. or a made-up name" />
      <Field label="Your age" value={age} onChangeText={setAge} placeholder="e.g. 24" keyboardType="number-pad" />
      <Field label="Preferred match age range" value={preferredAgeRange} onChangeText={setPreferredAgeRange} placeholder="e.g. 21-28" />
      <Field label="Location + zip" value={location} onChangeText={setLocation} placeholder="Brooklyn, NY 11201" />
      <Field label="Travel radius for shows (miles)" value={radius} onChangeText={setRadius} placeholder="e.g. 25" keyboardType="number-pad" />
      <Field
        label="Your vibe (1-2 sentences)"
        value={bio}
        onChangeText={setBio}
        placeholder="Who are you and who are you looking for?"
        multiline
      />

      <View style={styles.row}>
        <Text style={typography.label}>ALCOHOL PREFERENCE</Text>
        <Switch value={drinks} onValueChange={setDrinks} trackColor={{ true: colors.primary }} />
      </View>

      <Field label="Social media handle" value={socialHandle} onChangeText={setSocialHandle} placeholder="@yourhandle" />

      <View style={styles.row}>
        <Text style={typography.label}>CONNECT SPOTIFY</Text>
        <Switch value={spotifyConnected} onValueChange={setSpotifyConnected} trackColor={{ true: colors.primary }} />
      </View>

      <Field label="Upcoming shows / festivals" value={shows} onChangeText={setShows} placeholder="Coachella, Ultra..." />

      <View style={styles.photoBox}>
        <Text style={typography.bodyMuted}>+ Add at least 1 photo</Text>
      </View>

      <Pressable style={styles.button} onPress={() => navigation.replace('Main')}>
        <Text style={styles.buttonText}>Save profile</Text>
      </Pressable>
    </ScreenContainer>
  );
}

function Field(props: {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  placeholder?: string;
  multiline?: boolean;
  keyboardType?: 'default' | 'number-pad';
}) {
  return (
    <View style={styles.field}>
      <Text style={typography.label}>{props.label.toUpperCase()}</Text>
      <TextInput
        style={[styles.input, props.multiline && styles.inputMultiline]}
        value={props.value}
        onChangeText={props.onChangeText}
        placeholder={props.placeholder}
        placeholderTextColor={colors.textMuted}
        multiline={props.multiline}
        keyboardType={props.keyboardType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  field: { marginBottom: spacing.md },
  input: {
    marginTop: spacing.xs,
    backgroundColor: colors.surface,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    color: colors.text,
  },
  inputMultiline: { minHeight: 70, textAlignVertical: 'top' },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  photoBox: {
    height: 100,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: radii.pill,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  buttonText: { color: colors.background, fontWeight: '800', fontSize: 16 },
});
