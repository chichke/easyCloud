import React from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import firebase from '../../firebase';

function Settings() {
  const signout = () => {
    firebase.auth().signOut();
  };

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={signout}>
        <Text>Signout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default Settings;
