import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from './styles';

const logo = require('../../assets/easyCloud.png');

export default function Signin() {
  const placeholderTextColor = '#8C8C8C';
  const { navigate } = useNavigation();
  const onSignUp = () => {
    navigate('Signup');
  };
  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <View style={styles.container}>
        <Image source={logo} style={styles.image} />
        <TextInput
          placeholder="E-mail"
          placeholderTextColor={placeholderTextColor}
          style={styles.inputContainer}
          keyboardType="email-address"
          autoCorrect={false}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Mot de passe"
          placeholderTextColor={placeholderTextColor}
          style={styles.inputContainer}
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Connexion</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onSignUp}>
          <Text style={styles.text}>Inscription</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
