import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { Image, ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import { useToast } from 'react-native-fast-toast';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { selfData } from '../../../../helpers/firebase';
import getBlob from '../../../../helpers/getBlob';
import { setFile } from '../../../../redux/actions/uploadManager';
import t from '../../../../translations';
import Button from '../../../ButtonWithText';
import Error from '../../../Error';
import Loading from '../../../Loading';
import { selfDataKey } from '../../../queryKey';
import styles from './styles';

export default function EditProfile() {
  const placeholderTextColor = '#8C8C8C';
  const toast = useToast();
  const dispatch = useDispatch();

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

  const { isLoading, isError, data, error } = query;

  if (isLoading) return <Loading />;

  if (isError) return <Error error={error} />;

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.picContainer} onPress={pickImage}>
          <Image source={{ uri: data.pp }} style={styles.profilePic} />
        </TouchableOpacity>
        <TextInput
          placeholder="Nom"
          placeholderTextColor={placeholderTextColor}
          style={styles.inputContainer}
          autoCorrect={false}
          autoCapitalize="none"
          // value={mail}
        />
        <TextInput
          placeholder="Prénom"
          placeholderTextColor={placeholderTextColor}
          style={styles.inputContainer}
          autoCorrect={false}
          autoCapitalize="none"
          // value={mail}
        />
        <TextInput
          placeholder="E-mail"
          placeholderTextColor={placeholderTextColor}
          style={styles.inputContainer}
          keyboardType="email-address"
          autoCorrect={false}
          autoCapitalize="none"
          // value={mail}
        />
        <Button
          style={styles.button}
          styleText={styles.textButton}
          title="Mettre à jour"
          // onPress={onUpdate}
        />
      </View>
    </ScrollView>
  );
}
