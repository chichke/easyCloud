import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Text, ScrollView, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { styles } from './styles';

export default function Signup({ navigation }) {
  const placeholderTextColor = '#8C8C8C';

  const onSignIn = () => {
    navigation.navigate('Login');
  };
  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <View style={{ ...styles.container, marginTop: 60 }}>
        <TextInput
          placeholder="Prénom"
          placeholderTextColor={placeholderTextColor}
          style={styles.inputContainer}
          autoCorrect={false}
        />
        <TextInput
          placeholder="Nom"
          placeholderTextColor={placeholderTextColor}
          style={styles.inputContainer}
          autoCorrect={false}
        />
        <TextInput
          placeholder="Téléphone"
          placeholderTextColor={placeholderTextColor}
          style={styles.inputContainer}
          autoCorrect={false}
          keyboardType={'phone-pad'}
        />
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
        <TextInput
          placeholder="Confirmer mot de passe"
          placeholderTextColor={placeholderTextColor}
          style={styles.inputContainer}
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry={true}
        />
        <TouchableOpacity style={{ marginVertical: 20 }} onPress={onSignIn}>
          <Text style={styles.text}>Déjà enregistré(e) ?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>S'inscrire</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
