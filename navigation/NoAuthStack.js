import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Signin from '../components/NonAuth/Signin';
import Signup from '../components/NonAuth/Signup';
import { showLoginIcon, showSignupIcon } from '../components/TabBarIcon';
import t from '../translations';

const Tab = createBottomTabNavigator();

const NoAuthStack = () => (
  <Tab.Navigator initialRouteName="Login" lazy={false}>
    <Tab.Screen
      name="Login"
      component={Signin}
      options={{ tabBarIcon: showLoginIcon, tabBarLabel: t('nav.login') }}
    />
    <Tab.Screen
      name="Signup"
      component={Signup}
      options={{ tabBarIcon: showSignupIcon, tabBarLabel: t('nav.signup') }}
    />
  </Tab.Navigator>
);

export default NoAuthStack;
