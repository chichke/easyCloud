import { useNavigation } from '@react-navigation/native';
import { AntDesign, EvilIcons } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import * as Sharing from 'expo-sharing';
import * as WebBrowser from 'expo-web-browser';
import React, { useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity, View } from 'react-native';
import { useToast } from 'react-native-fast-toast';
import { useQueryClient } from 'react-query';
import { deleteLogic, setPP } from '../../../helpers/firebase';
import getFilename from '../../../helpers/getFilename';
import { getFilesKey, selfDataKey } from '../../queryKey';
import styles from './modalStyles';

function ModalOptions({ iconName, title, onPress, color, size }) {
  return (
    <View style={styles.row}>
      <TouchableOpacity style={styles.row} onPress={onPress}>
        <View style={{ flex: 1 }}>
          {iconName === 'share-google' ? (
            <EvilIcons name="share-google" size={40} color="deepskyblue" style={styles.icon} />
          ) : (
            <AntDesign
              name={iconName}
              size={size ? size : 30}
              color={color ? color : 'deepskyblue'}
              style={styles.icon}
            />
          )}
        </View>
        <View style={{ flex: 8 }}>
          <Text style={styles.text}>{title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default function FileOptionsModal({ isModalVisible, onClose, itemRef, data }) {
  const navigation = useNavigation();
  const toast = useToast();
  const queryClient = useQueryClient();
  const { setOptions } = useNavigation();
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
        onClose();
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
        onClose();
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

  FileOptionsModal.propTypes = {
    iconName: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    color: PropTypes.string,
    size: PropTypes.number,
    onPress: PropTypes.func.isRequired,
    isModalVisible: PropTypes.bool.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    style: PropTypes.object,
  };

  FileOptionsModal.defaultProps = {};
  return (
    <Modal
      style={styles.modal}
      isVisible={isModalVisible}
      backdropOpacity={0.2}
      onBackdropPress={onClose}
    >
      <View style={styles.modalContainer}>
        <ModalOptions iconName="close" color="black" size={25} onPress={onClose} />
        <ModalOptions iconName="download" title="Enregistrer" onPress={onClose} />
        <ModalOptions iconName="share-google" title="Partager" onPress={shareFile} />
        <ModalOptions iconName="delete" title="Supprimer" onPress={deleteFile} />
        <ModalOptions iconName="eyeo" title="Prévisualiser" onPress={checkWebView} />
        {isImage && (
          <ModalOptions
            iconName="user"
            title="Définir comme photo de profil"
            onPress={setPicture}
          />
        )}
      </View>
    </Modal>
  );
}
