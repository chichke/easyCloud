import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Signin from '../components/NonAuth/Signin';
import Signup from '../components/NonAuth/Signup';
import { showLoginIcon, showSignupIcon } from '../components/TabBarIcon';
import t from '../translations';

const Tab = createBottomTabNavigator();

const SigninOpt = { tabBarIcon: showLoginIcon, tabBarLabel: t('nav.login') };
const SignupOpt = { tabBarIcon: showSignupIcon, tabBarLabel: t('nav.signup') };
const NoAuthStack = () => (
  <Tab.Navigator initialRouteName="Login" lazy={false}>
    <Tab.Screen name="Login" component={Signin} options={SigninOpt} />
    <Tab.Screen name="Signup" component={Signup} options={SignupOpt} />
  </Tab.Navigator>
);

export default NoAuthStack;
