import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import HomeScreen from '../components/Auth/Home/Home';
import t from '../translations';

const Stack = createStackNavigator();

const screenOptions = { title: t('nav.home'), headerShown: false };

const HomeStack = () => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen name="Home" component={HomeScreen} />
  </Stack.Navigator>
);

export default HomeStack;
