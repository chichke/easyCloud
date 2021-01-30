import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Profile from '../components/Auth/Profile/Profile';
import EditProfile from '../components/Auth/Profile/EditProfile/EditProfile';
import t from '../translations';

const Stack = createStackNavigator();

const ProfileStack = () => (
  <Stack.Navigator initialRouteName="Profile" screenOptions={{ title: t('nav.prof') }}>
    <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen name="EditProfile" component={EditProfile} />
  </Stack.Navigator>
);

export default ProfileStack;
