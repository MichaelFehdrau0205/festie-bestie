import React from 'react';
import { NavigationContainer, DarkTheme, Theme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from '../screens/OnboardingScreen';
import ProfileBuilderScreen from '../screens/ProfileBuilderScreen';
import ChatScreen from '../screens/ChatScreen';
import MainTabs from './MainTabs';
import { colors } from '../theme/theme';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const navTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.background,
    card: colors.surface,
    primary: colors.primary,
    text: colors.text,
    border: colors.border,
  },
};

export default function RootNavigator() {
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Onboarding">
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="ProfileBuilder" component={ProfileBuilderScreen} />
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={{ headerShown: true, title: '', headerStyle: { backgroundColor: colors.background }, headerTintColor: colors.text }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
