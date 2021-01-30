import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Profile from '../components/Auth/Profile/Profile';
import Settings from '../components/Auth/Settings';
import t from '../translations';

const Stack = createStackNavigator();

const ProfileStack = () => (
  <Stack.Navigator
    initialRouteName="Profile"
    screenOptions={{ title: t('nav.prof'), headerShown: false }}
  >
    <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen name="Settings" component={Settings} />
  </Stack.Navigator>
);

export default ProfileStack;
