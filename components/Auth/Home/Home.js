import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { FAB } from 'react-native-paper';
import { useToast } from 'react-native-fast-toast';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { getFiles } from '../../../helpers/firebase';
import getBlob from '../../../helpers/getBlob';
import { setFile } from '../../../redux/actions/uploadManager';
import Error from '../../Error';
import Loading from '../../Loading';
import { getFilesKey } from '../../queryKey';
import FileItem from './FileItem';
import styles from './styles';

export default function Home() {
  // eslint-disable-next-line
  const uploading = useSelector((state) => state.uploadManager.uploading);
  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });

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
      const blob = await getBlob(uri);

      console.log('Constructing blobs done');
      dispatch(setFile(blob));
    }
  };

  const query = useQuery(getFilesKey, getFiles);

  const { isLoading, isError, data, error } = query;

  const { open } = state;

  if (isLoading) return <Loading />;

  if (isError) return <Error error={error} />;

  // console.log(data.length);
  return (
    <View style={styles.container}>
      <Text style={styles.boldText}>Uploaded files</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => <FileItem item={item} />}
        keyExtractor={(item, index) => String(index)}
      />

      <FAB.Group
        open={open}
        icon={open ? 'close' : 'plus'}
        actions={[
          {
            icon: 'image',
            label: 'Image',
            onPress: () => pickImage(),
          },
          {
            icon: 'file',
            label: 'File',
            onPress: () => pickFile(),
          },
        ]}
        onStateChange={onStateChange}
      />
    </View>
  );
}
