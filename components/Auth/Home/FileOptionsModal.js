import { AntDesign, EvilIcons } from '@expo/vector-icons';
import * as Sharing from 'expo-sharing';
import * as WebBrowser from 'expo-web-browser';
import PropTypes from 'prop-types';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useToast } from 'react-native-fast-toast';
import Modal from 'react-native-modal';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { useQueryClient } from 'react-query';
import { deleteLogic, setPP } from '../../../helpers/firebase';
import t from '../../../translations';
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
            <AntDesign name={iconName} size={size} color={color} style={styles.icon} />
          )}
        </View>
        <View style={{ flex: 8 }}>
          <Text style={styles.text}>{title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

ModalOptions.propTypes = {
  iconName: PropTypes.string.isRequired,
  title: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
};

ModalOptions.defaultProps = {
  color: 'deepskyblue',
  size: widthPercentageToDP(8),
  title: '',
};

export default function FileOptionsModal({ isModalVisible, onClose, itemRef, data }) {
  const toast = useToast();
  const queryClient = useQueryClient();
  const shareFile = async () => {
    const isApiAvailable = await Sharing.isAvailableAsync();
    if (!isApiAvailable) toast.show(t('toast.fscreen.disabledApi'), { type: 'danger' });
    else {
      const url = await itemRef.getDownloadURL();
      await Sharing.shareAsync(url);
    }
  };

  // TODO REMOVE THIS WHEN NEEDED
  // const readableSize = humanFileSize(data.size);
  // const created = getDate(data.timeCreated);
  // const updated = getDate(data.updated);
  // const filename = getFilename(data.fullPath);
  const mimeType = data.contentType;

  const deleteFile = () => {
    deleteLogic(itemRef)
      .then(() => {
        toast.show(t('toast.fscreen.deletedFile'), { type: 'success' });
        onClose();
        queryClient.invalidateQueries(selfDataKey);
        queryClient.invalidateQueries(getFilesKey);
        // File deleted successfully
      })
      .catch((error) => {
        console.log(error);
        toast.show(t('toast.fscreen.unknwon'), { type: 'danger' });
        // Uh-oh, an error occurred!
      });
  };

  const setPicture = async () => {
    const url = await itemRef.getDownloadURL();
    setPP(url)
      .then(() => {
        toast.show(t('toast.fscreen.modifiedpp'), { type: 'success' });
        queryClient.invalidateQueries(selfDataKey);
        onClose();
      })
      .catch((err) => {
        console.log(err);
        toast.show(t('toast.fscreen.unknwon'), { type: 'danger' });
      });
  };

  const checkWebView = async () => {
    const url = await itemRef.getDownloadURL();
    await WebBrowser.openBrowserAsync(url);
  };
  const isImage = mimeType.startsWith('image/');

  return (
    <Modal
      style={styles.modal}
      isVisible={isModalVisible}
      backdropOpacity={0.2}
      onBackdropPress={onClose}
    >
      <View style={styles.modalContainer}>
        <ModalOptions iconName="close" color="black" size={25} onPress={onClose} />
        <ModalOptions iconName="download" title={t('v.home.modal.save')} onPress={onClose} />
        <ModalOptions iconName="share-google" title={t('v.home.modal.share')} onPress={shareFile} />
        <ModalOptions iconName="delete" title={t('v.home.modal.delete')} onPress={deleteFile} />
        <ModalOptions iconName="eyeo" title={t('v.home.modal.check')} onPress={checkWebView} />
        {isImage && (
          <ModalOptions iconName="user" title={t('v.home.modal.setpp')} onPress={setPicture} />
        )}
      </View>
    </Modal>
  );
}

FileOptionsModal.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  itemRef: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  isModalVisible: PropTypes.bool.isRequired,
};
