import React from 'react';
import { Image, ImageSourcePropType, ImageStyle, StyleProp, StyleSheet, View } from 'react-native';
import { colors } from '../theme/theme';

export const avatarSources: Record<string, ImageSourcePropType> = {
  nova: require('../../assets/avatars/nova.png'),
  jax: require('../../assets/avatars/jax.png'),
  sage: require('../../assets/avatars/sage.png'),
  wren: require('../../assets/avatars/wren.png'),
  you1: require('../../assets/avatars/you1.png'),
  you2: require('../../assets/avatars/you2.png'),
  you3: require('../../assets/avatars/you3.png'),
  you4: require('../../assets/avatars/you4.png'),
  fallback: require('../../assets/icon.png'),
};

export const photoOptionKeys = ['you1', 'you2', 'you3', 'you4'] as const;

export function resolveAvatar(key?: string | null): ImageSourcePropType {
  if (key && avatarSources[key]) return avatarSources[key];
  return avatarSources.you1;
}

type Props = {
  imageKey?: string | null;
  size?: number;
  style?: StyleProp<ImageStyle>;
  rounded?: number;
};

export default function Avatar({ imageKey, size = 56, style, rounded }: Props) {
  return (
    <View style={[styles.frame, { width: size, height: size, borderRadius: rounded ?? size / 2 }]}>
      <Image
        source={resolveAvatar(imageKey)}
        style={[{ width: size, height: size, borderRadius: rounded ?? size / 2 }, style]}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    overflow: 'hidden',
    backgroundColor: colors.surfaceAlt,
  },
});
