import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import Home from './components/Auth/Home/Home';
import ScoreBoard from './components/Auth/ScoreBoard';
import Settings from './components/Auth/Settings';
import Profile from './components/Auth/Profile/Profile';
import Signin from './components/NonAuth/Signin';
import Signup from './components/NonAuth/Signup';
import SplashScreen from './components/SplashScreen';
import {
  showHomeIcon,
  showLoginIcon,
  showScoreBoardIcon,
  showSettingsIcon,
  showSignupIcon,
  showProfileIcon,
} from './components/TabBarIcon';
import firebase from './firebase';

const Tab = createBottomTabNavigator();

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  // Handle user state changes
  function onAuthStateChanged(data) {
    setUser(data);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const authSubscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);

    // unsubscribe on unmount
    return authSubscriber;
  }, []);

  if (initializing) {
    return <SplashScreen />;
  }

  return <NavigationContainer>{user ? <AuthStack /> : <NonAuthStack />}</NavigationContainer>;
}

export const AuthStack = () => (
  <Tab.Navigator initialRouteName="Home" lazy={false}>
    <Tab.Screen name="Home" component={Home} options={{ tabBarIcon: showHomeIcon }} />
    <Tab.Screen
      name="ScoreBoard"
      component={ScoreBoard}
      options={{ tabBarIcon: showScoreBoardIcon }}
    />
    <Tab.Screen name="Settings" component={Settings} options={{ tabBarIcon: showSettingsIcon }} />
    <Tab.Screen name="Profile" component={Profile} options={{ tabBarIcon: showProfileIcon }} />
  </Tab.Navigator>
);

export const NonAuthStack = () => (
  <Tab.Navigator initialRouteName="Login" lazy={false}>
    <Tab.Screen name="Login" component={Signin} options={{ tabBarIcon: showLoginIcon }} />
    <Tab.Screen name="Signup" component={Signup} options={{ tabBarIcon: showSignupIcon }} />
  </Tab.Navigator>
);
