import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useToast } from 'react-native-fast-toast';
import { FAB } from 'react-native-paper';
import ReactNativeParallaxHeader from 'react-native-parallax-header';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { getFiles } from '../../../helpers/firebase';
import getBlob from '../../../helpers/getBlob';
import { setFile } from '../../../redux/actions/uploadManager';
import t from '../../../translations';
import Error from '../../Error';
import Loading from '../../Loading';
import { getFilesKey } from '../../queryKey';
import FileList from './FileList';
import FilenameModal from './FilenameModal/FilenameModal';
import RenderNavBar from './Header';
import Title from './HeaderTitle';
import { HEADER_HEIGHT } from './uiValues';

const linearGrad = require('../../../assets/Wiretap.jpg');

const s = StyleSheet.create({
  navBarContainer: {
    flex: 1,
  },
  navBarcontentContainer: {
    flexGrow: 1,
  },
  titleStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

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
      <ReactNativeParallaxHeader
        headerMinHeight={HEADER_HEIGHT}
        headerMaxHeight={250}
        extraScrollHeight={20}
        alwaysShowTitle={false}
        alwaysShowNavBar={false}
        navbarColor="#E94057"
        titleStyle={s.titleStyle}
        title={Title(totalSize)}
        backgroundImage={linearGrad}
        backgroundImageScale={1.2}
        renderNavBar={() => RenderNavBar(totalSize)}
        renderContent={() => FileList(data)}
        containerStyle={s.navBarContainer}
        contentContainerStyle={s.navBarcontentContainer}
        innerContainerStyle={s.navBarContainer}
      />
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
      <FilenameModal
        isModalVisible={isModalVisible}
        onClose={onClose}
        onChangeFilename={onChangeFilename}
      />
    </>
  );
}
