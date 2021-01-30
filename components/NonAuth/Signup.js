import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useToast } from 'react-native-fast-toast';
import { createAccount } from '../../helpers/firebase';
import t from '../../translations';
import transFire from '../../translations/firebase';
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
        toast.show(t('toast.signup.success'), { type: 'success' });
      })
      .catch((err) => {
        toast.show(transFire(err.code), { type: 'danger' });
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
      toast.show(t('toast.signup.empty'), { type: 'danger' });
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
      <ScrollView style={styles.scrollView}>
        <View style={styles.signUpContainer}>
          <Image source={logo} style={styles.signUpImage} />

          <TextInput
            placeholder={t('v.signup.fname')}
            placeholderTextColor={placeholderTextColor}
            style={styles.inputContainer}
            autoCorrect={false}
            onChangeText={setFirst}
            value={first}
          />
          <TextInput
            placeholder={t('v.signup.lname')}
            placeholderTextColor={placeholderTextColor}
            style={styles.inputContainer}
            autoCorrect={false}
            onChangeText={setLast}
            value={last}
          />
          <TextInput
            placeholder={t('v.signup.phone')}
            placeholderTextColor={placeholderTextColor}
            style={styles.inputContainer}
            autoCorrect={false}
            keyboardType="phone-pad"
            onChangeText={setPhone}
            value={phone}
          />
          <TextInput
            placeholder={t('v.signup.mail')}
            placeholderTextColor={placeholderTextColor}
            style={styles.inputContainer}
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={setMail}
            value={mail}
          />
          <TextInput
            placeholder={t('v.signup.pass')}
            placeholderTextColor={placeholderTextColor}
            style={styles.inputContainer}
            autoCorrect={false}
            autoCapitalize="none"
            secureTextEntry
            onChangeText={setPass}
            value={pass}
          />
          <TextInput
            placeholder={t('v.signup.confirm')}
            placeholderTextColor={placeholderTextColor}
            style={styles.inputContainer}
            autoCorrect={false}
            autoCapitalize="none"
            secureTextEntry
            onChangeText={setConfirm}
            value={confirm}
          />
          <TouchableOpacity style={styles.already} onPress={onSignin}>
            <Text style={styles.text}>{t('v.signup.already')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onSignup}>
            <Text style={styles.text}>{t('v.signup.signup')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}
