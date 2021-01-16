import React from 'react';
import { Text, View, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import { styles } from './styles';

export default function Signin({ navigation }) {
  const placeholderTextColor = '#8C8C8C';

  const onSignUp = () => {
    navigation.navigate('Signup');
  };
  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <View style={styles.container}>
        <Image source={require('../../assets/easyCloud.png')} style={styles.image} />
        <TextInput
          placeholder="E-mail"
          placeholderTextColor={placeholderTextColor}
          style={styles.inputContainer}
          keyboardType={'email-address'}
          autoCorrect={false}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Mot de passe"
          placeholderTextColor={placeholderTextColor}
          style={styles.inputContainer}
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry={true}
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
