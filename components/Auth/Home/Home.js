import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { useToast } from 'react-native-fast-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setFile } from '../../../redux/actions/uploadManager';

export default function Home() {
  const uploading = useSelector((state) => state.uploadManager.uploading);
  const toast = useToast();
  const dispatch = useDispatch();

  const pickFile = async () => {
    const { type, file } = await DocumentPicker.getDocumentAsync({ copyToCacheDirectory: false });
    if (type === 'cancel') toast.show('User cancelled', { type: 'normal' });
    else {
      dispatch(setFile(file));
      console.log(file);
      toast.show('Preparing file for upload', { type: 'success' });
    }
  };

  const pickImage = async () => {
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (cancelled) toast.show('User cancelled', { type: 'normal' });
    else {
      toast.show('Preparing file for upload', { type: 'success' });
      console.log('Constructing blobs');
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          resolve(xhr.response);
        };
        xhr.onerror = (e) => {
          console.log(e);
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
      });

      console.log('Constructing blobs done');
      dispatch(setFile(blob));
    }
  };

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={pickImage} disabled={uploading}>
        <Text>Image</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={pickFile} disabled={uploading}>
        <Text>File</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
