import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, Text, View } from 'react-native';
import Button from '../../ButtonWithText';
import styles from './styles';

const profilePic = require('../../../assets/profile-pic.png');

export default function Profile() {
  const { navigate } = useNavigation();

  // const onEdit = () => {
  //   navigate('Edit');
  // };

  const onSettings = () => {
    navigate('Settings');
  };

  return (
    <View style={styles.container}>
      <View style={styles.picContainer}>
        <Image source={profilePic} style={styles.profilePic} />
      </View>
      <View style={styles.texts}>
        <Text style={styles.name}>Nom Prénom</Text>
        <Text style={styles.email}>test@mail.com</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          styleText={styles.textButton}
          title="Editer le profil"
          // onPress={onEdit}
        />
        <Button
          style={styles.button}
          styleText={styles.textButton}
          title="Réglages"
          onPress={onSettings}
        />
      </View>
    </View>
  );
}
