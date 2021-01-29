import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreenHelper from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';
import { ToastProvider } from 'react-native-fast-toast';
import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import FileScreen from './components/Auth/Home/FileScreen';
import HomeScreen from './components/Auth/Home/Home';
import Profile from './components/Auth/Profile/Profile';
import Settings from './components/Auth/Settings';
import Signin from './components/NonAuth/Signin';
import Signup from './components/NonAuth/Signup';
import SplashScreen from './components/SplashScreen';
import {
  showHomeIcon,
  showLoginIcon,
  showProfileIcon,
  showSignupIcon,
} from './components/TabBarIcon';
import UploadManager from './components/UploadManager';
import firebase from './firebase';
import store from './redux/store';
import t from './translations';

enableScreens();

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const queryClient = new QueryClient();

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  // Handle user state changes
  function onAuthStateChanged(data) {
    setUser(data);
    if (initializing) {
      setInitializing(false);
      SplashScreenHelper.hideAsync();
    }
  }

  useEffect(() => {
    SplashScreenHelper.preventAutoHideAsync();

    const authSubscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    // unsubscribe on unmount
    return authSubscriber;
  }, []);

  if (initializing) {
    return <SplashScreen />;
  }

  return (
    <ToastProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>{user ? <AuthStack /> : <NonAuthStack />}</NavigationContainer>
        </QueryClientProvider>
      </Provider>
    </ToastProvider>
  );
}

export const HomeStack = () => (
  <Stack.Navigator screenOptions={{ title: t('nav.home') }}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="File" component={FileScreen} />
  </Stack.Navigator>
);

export const ProfileStack = () => (
  <Stack.Navigator initialRouteName="Profile" screenOptions={{ title: t('nav.prof') }}>
    <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen name="Settings" component={Settings} />
  </Stack.Navigator>
);
export const AuthStack = () => (
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

export const NonAuthStack = () => (
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
