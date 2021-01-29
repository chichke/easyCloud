import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { useToast } from 'react-native-fast-toast';
import { FAB } from 'react-native-paper';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { getFiles } from '../../../helpers/firebase';
import getBlob from '../../../helpers/getBlob';
import humanFileSize from '../../../helpers/humanFileSize';
import { setFile } from '../../../redux/actions/uploadManager';
import t from '../../../translations';
import Error from '../../Error';
import Loading from '../../Loading';
import { getFilesKey } from '../../queryKey';
import FileItem from './FileItem';
import FilenameModal from './FilenameModal/FilenameModal';
import styles from './styles';

export default function Home() {
  // eslint-disable-next-line
  const uploading = useSelector((state) => state.uploadManager.uploading);
  const totalSize = useSelector((state) => state.fileSize.fileSize);

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
    dispatch(setFile(blob, false, filename));
    setIsModalVisible(false);
  };

  const pickFile = async () => {
    const { type, uri } = await DocumentPicker.getDocumentAsync({ copyToCacheDirectory: false });
    if (type === 'cancel') toast.show(t('toast.home.cancel'), { type: 'normal' });
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
      console.log('Constructing blobs');

      console.log('Constructing blobs done');
      setBlob(await getBlob(uri));
      setIsModalVisible(true);
    }
  };

  const query = useQuery(getFilesKey, getFiles);

  const { isLoading, isError, data, error } = query;

  const { open } = state;

  if (isLoading) return <Loading />;

  if (isError) return <Error error={error} />;

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.boldText}>{t('v.home.title')}</Text>
        <FlatList
          data={data}
          renderItem={({ item }) => <FileItem item={item} reload={totalSize === 0} />}
          keyExtractor={(item, index) => String(index)}
        />

        <Text>{`${t('v.home.total')} ${humanFileSize(totalSize)}`}</Text>
        <FAB.Group
          open={open}
          icon={open ? 'close' : 'plus'}
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
      </View>
      <FilenameModal
        isModalVisible={isModalVisible}
        onClose={onClose}
        onChangeFilename={onChangeFilename}
      />
    </>
  );
}
