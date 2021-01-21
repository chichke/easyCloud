import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from './styles';

export default function Signup() {
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [phone, setPhone] = useState('');
  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');
  const [confirm, setConfirm] = useState('');
  const placeholderTextColor = '#8C8C8C';
  const { navigate } = useNavigation();

  const onSignIn = () => {
    navigate('Login');
  };
  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <View style={{ ...styles.container, marginTop: 60 }}>
        <TextInput
          placeholder="Prénom"
          placeholderTextColor={placeholderTextColor}
          style={styles.inputContainer}
          autoCorrect={false}
          onChangeText={setFirst}
          value={first}
        />
        <TextInput
          placeholder="Nom"
          placeholderTextColor={placeholderTextColor}
          style={styles.inputContainer}
          autoCorrect={false}
          onChangeText={setLast}
          value={last}
        />
        <TextInput
          placeholder="Téléphone"
          placeholderTextColor={placeholderTextColor}
          style={styles.inputContainer}
          autoCorrect={false}
          keyboardType="phone-pad"
          onChangeText={setPhone}
          value={phone}
        />
        <TextInput
          placeholder="E-mail"
          placeholderTextColor={placeholderTextColor}
          style={styles.inputContainer}
          keyboardType="email-address"
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={setMail}
          value={mail}
        />
        <TextInput
          placeholder="Mot de passe"
          placeholderTextColor={placeholderTextColor}
          style={styles.inputContainer}
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry
          onChangeText={setPass}
          value={pass}
        />
        <TextInput
          placeholder="Confirmer mot de passe"
          placeholderTextColor={placeholderTextColor}
          style={styles.inputContainer}
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry
          onChangeText={setConfirm}
          value={confirm}
        />
        <TouchableOpacity style={{ marginVertical: 20 }} onPress={onSignIn}>
          <Text style={styles.text}>Déjà enregistré(e) ?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>S&apos;inscrire</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
