// import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useToast } from 'react-native-fast-toast';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import firebase from '../../../firebase';
import { selfData } from '../../../helpers/firebase';
import getBlob from '../../../helpers/getBlob';
import { setFile } from '../../../redux/actions/uploadManager';
import t from '../../../translations';
import Button from '../../ButtonWithText';
import Error from '../../Error';
import Loading from '../../Loading';
import { selfDataKey } from '../../queryKey';
import styles from './styles';

export default function Profile() {
  // const { navigate } = useNavigation();
  const { email } = firebase.auth().currentUser;
  const toast = useToast();
  const dispatch = useDispatch();
  // const onEdit = () => {
  //   navigate('Edit');
  // };

  const pickImage = async () => {
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (cancelled) toast.show(t('toast.home.cancel'), { type: 'normal' });
    else {
      toast.show(t('toast.home.preparing'), { type: 'success' });
      console.log('Constructing blobs');
      const blob = await getBlob(uri);

      console.log('Constructing blobs done');
      // TODO setFile 3 eme params is filename!
      dispatch(setFile(blob, true));
    }
  };
  const query = useQuery(selfDataKey, selfData);

  const signout = () => {
    firebase.auth().signOut();
  };

  const { isLoading, isError, data, error } = query;

  if (isLoading) return <Loading />;

  if (isError) return <Error error={error} />;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.picContainer} onPress={pickImage}>
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
          title={t('v.prof.edit')}
          // onPress={onEdit}
        />
        <Button
          style={styles.button}
          styleText={styles.textButton}
          title={t('v.prof.cog')}
          onPress={signout}
        />
      </View>
    </View>
  );
}
