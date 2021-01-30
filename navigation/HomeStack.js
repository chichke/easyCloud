import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import HomeScreen from '../components/Auth/Home/Home';
import t from '../translations';

const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ title: t('nav.home'), headerShown: false }}>
    <Stack.Screen name="Home" component={HomeScreen} />
  </Stack.Navigator>
);

export default HomeStack;
