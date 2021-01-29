import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
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
  showSettingsIcon,
  showSignupIcon,
} from './components/TabBarIcon';
import UploadManager from './components/UploadManager';
import firebase from './firebase';
import store from './redux/store';

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

export const Home = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'My home' }} />
    <Stack.Screen name="File" component={FileScreen} />
  </Stack.Navigator>
);

export const AuthStack = () => (
  <>
    <Tab.Navigator initialRouteName="Home" lazy={false}>
      <Tab.Screen name="Home" component={Home} options={{ tabBarIcon: showHomeIcon }} />
      <Tab.Screen name="Settings" component={Settings} options={{ tabBarIcon: showSettingsIcon }} />
      <Tab.Screen name="Profile" component={Profile} options={{ tabBarIcon: showProfileIcon }} />
    </Tab.Navigator>
    <UploadManager />
  </>
);

export const NonAuthStack = () => (
  <Tab.Navigator initialRouteName="Login" lazy={false}>
    <Tab.Screen name="Login" component={Signin} options={{ tabBarIcon: showLoginIcon }} />
    <Tab.Screen name="Signup" component={Signup} options={{ tabBarIcon: showSignupIcon }} />
  </Tab.Navigator>
);
