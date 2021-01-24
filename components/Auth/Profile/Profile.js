import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect } from 'react';
import { Image, Platform, Text, TouchableOpacity, View } from 'react-native';
import { useToast } from 'react-native-fast-toast';
import { useQuery } from 'react-query';
import firebase from '../../../firebase';
import selfData from '../../../helpers/selfData';
import Button from '../../ButtonWithText';
import Error from '../../Error';
import Loading from '../../Loading';
import styles from './styles';

export default function Profile() {
  const { navigate } = useNavigation();
  const { email } = firebase.auth().currentUser;
  const toast = useToast();
  // const onEdit = () => {
  //   navigate('Edit');
  // };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          toast.show('Sorry, we need camera roll permissions to make this work!', {
            type: 'danger',
          });
        }
      }
    })();
  }, []);

  const query = useQuery('selfdata', selfData);

  const onSettings = () => {
    navigate('Settings');
  };

  const { isLoading, isError, data, error } = query;

  if (isLoading) return <Loading />;

  if (isError) return <Error error={error} />;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.picContainer}>
        <Image source={{ uri: data.pp }} style={styles.profilePic} />
      </TouchableOpacity>
      <View style={styles.texts}>
        <Text style={styles.name}>{`${data.first} ${data.last}`}</Text>
        <Text style={styles.email}>{email}</Text>
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
