import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Switch } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ScreenContainer from '../components/ScreenContainer';
import PrimaryButton from '../components/PrimaryButton';
import Avatar, { photoOptionKeys } from '../components/Avatar';
import { colors, radii, spacing, typography } from '../theme/theme';
import { RootStackParamList } from '../navigation/types';
import { useAppState } from '../state/AppState';

type Props = NativeStackScreenProps<RootStackParamList, 'ProfileBuilder'>;

export default function ProfileBuilderScreen({ navigation }: Props) {
  const { profile, saveProfile } = useAppState();
  const [name, setName] = useState(profile?.name ?? '');
  const [age, setAge] = useState(profile?.age ?? '');
  const [preferredAgeRange, setPreferredAgeRange] = useState(profile?.preferredAgeRange ?? '21-29');
  const [location, setLocation] = useState(profile?.location ?? '');
  const [radius, setRadius] = useState(profile?.radius ?? '25');
  const [bio, setBio] = useState(profile?.bio ?? '');
  const [drinks, setDrinks] = useState(profile?.drinks ?? false);
  const [socialHandle, setSocialHandle] = useState(profile?.socialHandle ?? '');
  const [spotifyConnected, setSpotifyConnected] = useState(profile?.spotifyConnected ?? false);
  const [shows, setShows] = useState(profile?.shows ?? (profile?.artistsEvents ?? []).join(', '));
  const [photoUri, setPhotoUri] = useState(profile?.photoUri || photoOptionKeys[0]);
  const [error, setError] = useState('');

  const ageNumber = Number(age);
  const canSave = useMemo(
    () => name.trim().length > 1 && Number.isFinite(ageNumber) && ageNumber >= 18 && photoUri.length > 0 && bio.trim().length > 0,
    [name, ageNumber, photoUri, bio]
  );

  const onSave = () => {
    if (ageNumber < 18) {
      setError('You must be 18+ to use Festie Bestie.');
      return;
    }
    if (!canSave) {
      setError('Add your name, age (18+), bio, and a photo to save.');
      return;
    }
    saveProfile({
      name: name.trim(),
      age: String(ageNumber),
      preferredAgeRange,
      location,
      radius,
      bio: bio.trim(),
      drinks,
      socialHandle,
      spotifyConnected,
      shows,
      photoUri,
      genres: profile?.genres ?? [],
      artistsEvents: profile?.artistsEvents ?? [],
      vibes: profile?.vibes ?? [],
    });
    navigation.replace('Main');
  };

  return (
    <ScreenContainer>
      <Text style={typography.h1}>Build your profile</Text>
      <Text style={[typography.bodyMuted, { marginTop: spacing.xs, marginBottom: spacing.lg }]}>
        This is what buddies will see. Keep it real — or make up a name, your call.
      </Text>

      <Field label="Profile name" value={name} onChangeText={setName} placeholder="Nova R. or a made-up name" />
      <Field label="Your age (18+)" value={age} onChangeText={setAge} placeholder="e.g. 24" keyboardType="number-pad" />
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
      <Text style={styles.toggleHint}>{drinks ? 'Drinks: Yes' : 'Drinks: No'}</Text>

      <Field label="Social media handle" value={socialHandle} onChangeText={setSocialHandle} placeholder="@yourhandle" />

      <View style={styles.row}>
        <Text style={typography.label}>CONNECT SPOTIFY</Text>
        <Switch value={spotifyConnected} onValueChange={setSpotifyConnected} trackColor={{ true: colors.primary }} />
      </View>
      <Text style={styles.toggleHint}>{spotifyConnected ? 'Spotify connected' : 'Not connected yet'}</Text>

      <Field label="Upcoming shows / festivals" value={shows} onChangeText={setShows} placeholder="Coachella, Ultra..." />

      <Text style={typography.label}>PHOTOS (TAP TO CHOOSE)</Text>
      <View style={styles.photoRow}>
        {photoOptionKeys.map((key) => (
          <Pressable
            key={key}
            accessibilityRole="button"
            onPress={() => setPhotoUri(key)}
            style={[styles.photoChoice, photoUri === key && styles.photoChoiceSelected]}
          >
            <Avatar imageKey={key} size={72} />
          </Pressable>
        ))}
      </View>
      <Text style={styles.toggleHint}>Photo selected ✓</Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <PrimaryButton label="Save profile" onPress={onSave} disabled={!canSave} style={{ marginTop: spacing.lg, marginBottom: spacing.xl }} />
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
    marginBottom: spacing.xs,
  },
  toggleHint: { color: colors.textMuted, marginBottom: spacing.md, fontSize: 13 },
  photoRow: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm, marginBottom: spacing.sm },
  photoChoice: {
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: radii.pill,
    cursor: 'pointer',
  },
  photoChoiceSelected: { borderColor: colors.primary },
  error: { color: colors.danger, marginTop: spacing.sm, fontWeight: '700' },
});
