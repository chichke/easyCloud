import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React, { useRef, useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import firebase from '../../firebase';
import styles from './styles';

const logo = require('../../assets/easyCloud.png');
const error = require('../../assets/lottie/error.json');

export default function Signin() {
  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');
  const anim = useRef(undefined);
  const placeholderTextColor = '#8C8C8C';
  const { navigate } = useNavigation();

  const onSignin = async () => {
    await firebase.auth().signInWithEmailAndPassword(mail, pass);
  };
  const onSignup = () => {
    navigate('Signup');
  };
  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <View style={styles.container}>
        <Image source={logo} style={styles.image} />
        <TextInput
          onChangeText={setMail}
          placeholder="E-mail"
          placeholderTextColor={placeholderTextColor}
          style={styles.inputContainer}
          keyboardType="email-address"
          autoCorrect={false}
          autoCapitalize="none"
          value={mail}
        />
        <TextInput
          value={pass}
          onChangeText={setPass}
          placeholder="Mot de passe"
          placeholderTextColor={placeholderTextColor}
          style={styles.inputContainer}
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={onSignin}>
          <Text style={styles.text}>Connexion</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onSignup}>
          <Text style={styles.text}>Inscription</Text>
        </TouchableOpacity>
        <LottieView
          ref={anim}
          source={error}
          style={{ maxHeight: 200, maxWidth: 200, position: 'absolute' }}
          loop={false}
        />
      </View>
    </ScrollView>
  );
}
