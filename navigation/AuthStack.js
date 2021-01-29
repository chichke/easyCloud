import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { showHomeIcon, showProfileIcon } from '../components/TabBarIcon';
import UploadManager from '../components/UploadManager';
import t from '../translations';
import HomeStack from './HomeStack';
import ProfileStack from './ProfileStack';

const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <>
    <Tab.Navigator initialRouteName="Home" lazy={false}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{ tabBarIcon: showHomeIcon, tabBarLabel: t('nav.home') }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{ tabBarIcon: showProfileIcon, tabBarLabel: t('nav.prof') }}
      />
    </Tab.Navigator>
    <UploadManager />
  </>
);

export default AuthStack;
