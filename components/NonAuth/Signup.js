import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useToast } from 'react-native-fast-toast';
import { createAccount } from '../../helpers/firebase';
import Loading from '../Loading';
import schema from './Schema';
import styles from './styles';

const logo = require('../../assets/easy-cloud.png');

export default function Signup() {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [phone, setPhone] = useState('');
  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');
  const [confirm, setConfirm] = useState('');
  const placeholderTextColor = '#8C8C8C';
  const { navigate } = useNavigation();

  const onSignin = () => {
    navigate('Login');
  };

  const createAcc = (formData) => {
    createAccount(formData)
      .then(() => {
        toast.show('Successfully created your account!', { type: 'success' });
      })
      .catch((err) => {
        toast.show(err.message, { type: 'danger' });
        setLoading(false);
      });
  };
  const onSignup = () => {
    const formData = {
      first,
      last,
      phone,
      mail,
      pass,
      confirm,
    };

    if (!first || !last || !phone || !mail || !pass || !confirm)
      toast.show('One of the field is empty!', { type: 'danger' });
    else
      schema
        .validate(formData)
        .then(() => {
          setLoading(true);
          createAcc(formData);
        })
        .catch((err) => {
          err.errors.forEach((e) => {
            toast.show(e, { type: 'danger' });
          });
          setLoading(false);
        });
  };

  if (loading) return <Loading />;

  return (
    <>
      <ScrollView style={{ backgroundColor: 'white' }}>
        <View style={{ ...styles.container, marginTop: 60 }}>
          <Image source={logo} style={styles.image} />

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
          <TouchableOpacity style={{ marginVertical: 20 }} onPress={onSignin}>
            <Text style={styles.text}>Déjà enregistré(e) ?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onSignup}>
            <Text style={styles.text}>S&apos;inscrire</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}
