/* eslint-disable no-return-assign */
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreenHelper from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';
import Toast, { ToastProvider } from 'react-native-fast-toast';
import 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import SplashScreen from './components/SplashScreen';
import firebase from './firebase';
import AuthStack from './navigation/AuthStack';
import NoAuthStack from './navigation/NoAuthStack';
import store from './redux/store';

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
          <NavigationContainer>{user ? <AuthStack /> : <NoAuthStack />}</NavigationContainer>
        </QueryClientProvider>
      </Provider>
      <Toast ref={(ref) => (global.toast = ref)} placement="top" />
    </ToastProvider>
  );
}
