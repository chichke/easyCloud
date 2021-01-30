import { useTheme } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { useToast } from 'react-native-fast-toast';
import { FAB } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import getBlob from '../../../helpers/getBlob';
import { setFile } from '../../../redux/actions/uploadManager';
import t from '../../../translations';
import FilenameModal from './FilenameModal/FilenameModal';
import styles from './FileOptionsModal/styles';
import HeaderWithList from './HeaderWithList';

export default function Home() {
  // eslint-disable-next-line
  const uploading = useSelector((state) => state.uploadManager.uploading);
  const files = useSelector((state) => state.file.files);
  const { colors } = useTheme();

  const [state, setState] = React.useState({ open: false });
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [blob, setBlob] = React.useState(undefined);
  const onStateChange = ({ open }) => setState({ open });
  const toast = useToast();
  const dispatch = useDispatch();

  const onClose = () => {
    setIsModalVisible(false);
    dispatch(setFile(blob));
  };

  const onChangeFilename = (filename) => {
    if (!filename) global.toast.show(t('v.home.name.empty'), { type: 'warning' });
    else if (files.includes(filename))
      global.toast.show(t('toast.home.alreadyExist'), { type: 'warning' });
    else {
      dispatch(setFile(blob, false, filename));
      setIsModalVisible(false);
    }
  };

  const pickFile = async () => {
    const { type, uri } = await DocumentPicker.getDocumentAsync({ copyToCacheDirectory: false });
    if (type === 'cancel') toast.show(t('toast.home.cancel'), { type: 'normal', placement: 'top' });
    else {
      toast.show(t('toast.home.preparing'), { type: 'success' });
      setBlob(await getBlob(uri));
      setIsModalVisible(true);
    }
  };

  const pickImage = async () => {
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
    });

    if (cancelled) toast.show(t('toast.home.cancel'), { type: 'normal' });
    else {
      toast.show(t('toast.home.preparing'), { type: 'success' });
      setBlob(await getBlob(uri));
      setIsModalVisible(true);
    }
  };

  const { open } = state;

  return (
    <>
      <HeaderWithList />
      <FAB.Group
        open={open}
        icon={open ? 'close' : 'plus'}
        fabStyle={{ ...styles, backgroundColor: colors.primary }}
        visible={!uploading}
        actions={[
          {
            icon: 'image',
            label: t('v.home.fab.img'),
            onPress: () => pickImage(),
          },
          {
            icon: 'file',
            label: t('v.home.fab.file'),
            onPress: () => pickFile(),
          },
        ]}
        onStateChange={onStateChange}
      />
      <FilenameModal
        isModalVisible={isModalVisible}
        onClose={onClose}
        onChangeFilename={onChangeFilename}
      />
    </>
  );
}
