import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import EditProfile from '../components/Auth/Profile/EditProfile/EditProfile';
import Profile from '../components/Auth/Profile/Profile';
import t from '../translations';

const Stack = createStackNavigator();

const screenOptions = { title: t('nav.prof'), headerShown: false };
const ProfileStack = () => (
  <Stack.Navigator initialRouteName="Profile" screenOptions={screenOptions}>
    <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen name="EditProfile" component={EditProfile} />
  </Stack.Navigator>
);

export default ProfileStack;
