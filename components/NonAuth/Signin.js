import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useToast } from 'react-native-fast-toast';
import firebase from '../../firebase';
import t from '../../translations';
import ForgetModal from './ForgetModal';
import styles from './styles';

const logo = require('../../assets/easy-cloud.png');

export default function Signin() {
  const toast = useToast();
  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');
  const placeholderTextColor = '#8C8C8C';
  const { navigate } = useNavigation();
  const [showModal, setShowModal] = useState(false);

  const onSignin = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(mail, pass);
    } catch (e) {
      toast.show(t('toast.signin.error'), { type: 'danger' });
    }
  };
  const onSignup = () => {
    navigate('Signup');
  };
  return (
    <>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <Image source={logo} style={styles.image} />

          <TextInput
            onChangeText={setMail}
            placeholder={t('v.forget.ph')}
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
            placeholder={t('v.signup.pass')}
            placeholderTextColor={placeholderTextColor}
            style={styles.inputContainer}
            autoCorrect={false}
            autoCapitalize="none"
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={onSignin}>
            <Text style={styles.text}>{t('v.signin.login')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onSignup}>
            <Text style={styles.text}>{t('v.signin.signup')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.forgetButton} onPress={() => setShowModal(true)}>
            <Text style={styles.text}>{t('v.signin.forget')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {showModal && <ForgetModal setModalVisible={setShowModal} />}
    </>
  );
}
