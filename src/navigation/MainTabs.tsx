import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapScreen from '../screens/MapScreen';
import MatchScreen from '../screens/MatchScreen';
import SetMeetupScreen from '../screens/SetMeetupScreen';
import BuddiesScreen from '../screens/BuddiesScreen';
import { colors } from '../theme/theme';
import { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

const ICONS: Record<keyof MainTabParamList, string> = {
  Map: '🗺️',
  Match: '💬',
  Meetup: '📅',
  Buddies: '🤝',
};

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border },
        tabBarIcon: () => <Text style={{ fontSize: 18 }}>{ICONS[route.name as keyof MainTabParamList]}</Text>,
      })}
    >
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Match" component={MatchScreen} />
      <Tab.Screen name="Meetup" component={SetMeetupScreen} options={{ title: 'Meetup' }} />
      <Tab.Screen name="Buddies" component={BuddiesScreen} />
    </Tab.Navigator>
  );
}
