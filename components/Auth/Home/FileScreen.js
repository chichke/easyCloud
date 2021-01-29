import { useNavigation, useRoute } from '@react-navigation/native';
import * as Sharing from 'expo-sharing';
import * as WebBrowser from 'expo-web-browser';
import React, { useLayoutEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useToast } from 'react-native-fast-toast';
import { useQueryClient } from 'react-query';
import { deleteLogic, setPP } from '../../../helpers/firebase';
import getFilename from '../../../helpers/getFilename';
import { getFilesKey, selfDataKey } from '../../queryKey';

export default function FileScreen() {
  const { params } = useRoute();
  const navigation = useNavigation();
  const { itemRef, data } = params;
  const toast = useToast();
  const queryClient = useQueryClient();
  const { setOptions } = useNavigation();
  const { goBack } = useNavigation();
  const shareFile = async () => {
    const isApiAvailable = await Sharing.isAvailableAsync();
    if (!isApiAvailable) toast.show('Impossible de partager sur ce device', { type: 'danger' });
    else {
      const url = await itemRef.getDownloadURL();
      await Sharing.shareAsync(url);
    }
  };

  // TODO REMOVE THIS WHEN NEEDED
  // const readableSize = humanFileSize(data.size);
  // const created = getDate(data.timeCreated);
  // const updated = getDate(data.updated);
  const filename = getFilename(data.fullPath);
  const mimeType = data.contentType;

  useLayoutEffect(() => {
    setOptions({
      title: filename,
    });
  }, [navigation, filename]);

  const deleteFile = () => {
    deleteLogic(itemRef)
      .then(() => {
        queryClient.invalidateQueries(selfDataKey);
        queryClient.invalidateQueries(getFilesKey);
        toast.show('Fichier supprimé', { type: 'success' });
        goBack();

        // File deleted successfully
      })
      .catch((error) => {
        console.log(error);
        toast.show('Erreur inconnue', { type: 'danger' });
        // Uh-oh, an error occurred!
      });
  };

  const setPicture = async () => {
    const url = await itemRef.getDownloadURL();
    setPP(url)
      .then(() => {
        toast.show('Image de profil modifié', { type: 'success' });
        queryClient.invalidateQueries(selfDataKey);
      })
      .catch((err) => {
        console.log(err);
        toast.show('Erreur inconnue', { type: 'danger' });
      });
  };

  const checkWebView = async () => {
    const url = await itemRef.getDownloadURL();
    await WebBrowser.openBrowserAsync(url);
  };
  const isImage = mimeType.startsWith('image/');

  return (
    <View>
      <TouchableOpacity onPress={shareFile}>
        <Text>Share</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={deleteFile}>
        <Text>Delete</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={checkWebView}>
        <Text>Check WebView</Text>
      </TouchableOpacity>

      {isImage && (
        <TouchableOpacity onPress={setPicture}>
          <Text>SetPP</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
