/* eslint-disable no-nested-ternary */
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useToast } from 'react-native-fast-toast';
import { FAB } from 'react-native-paper';
import ReactNativeParallaxHeader from 'react-native-parallax-header';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { CountUp } from 'use-count-up';
import { getFiles } from '../../../helpers/firebase';
import getBlob from '../../../helpers/getBlob';
import humanFileSize from '../../../helpers/humanFileSize';
import { setFile } from '../../../redux/actions/uploadManager';
import t from '../../../translations';
import Error from '../../Error';
import Loading from '../../Loading';
import { getFilesKey } from '../../queryKey';
import FileItem from './FileItem';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
export const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
export const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 64;
export const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;
const linearGrad = require('../../../assets/Wiretap.jpg');

const s = StyleSheet.create({
  navContainer: {
    height: HEADER_HEIGHT,
    marginHorizontal: 10,
  },
  statusBar: {
    height: STATUS_BAR_HEIGHT,
    backgroundColor: 'transparent',
  },
  navBar: {
    height: NAV_BAR_HEIGHT,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
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
  const onStateChange = ({ open }) => setState({ open });

  const toast = useToast();
  const dispatch = useDispatch();

  const pickFile = async () => {
    const { type, uri } = await DocumentPicker.getDocumentAsync({ copyToCacheDirectory: false });
    if (type === 'cancel') toast.show(t('toast.home.cancel'), { type: 'normal' });
    else {
      toast.show(t('toast.home.preparing'), { type: 'success' });
      const blob = await getBlob(uri);
      // TODO setFile 3 eme params is filename!
      dispatch(setFile(blob));
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
      const blob = await getBlob(uri);

      console.log('Constructing blobs done');
      // TODO setFile 3 eme params is filename!
      dispatch(setFile(blob));
    }
  };

  const query = useQuery(getFilesKey, getFiles);

  const { isLoading, isError, data, error } = query;

  const { open } = state;

  if (isLoading) return <Loading />;

  if (isError) return <Error error={error} />;

  const FileList = () => data.map((value, index) => <FileItem item={value} key={String(index)} />);

  const Title = () => {
    const { val, type } = humanFileSize(totalSize);

    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>EasyCloud</Text>
        <View style={{ flexDirection: 'row', marginTop: 5 }}>
          <Text style={{ color: 'white', fontSize: 20 }}>
            <CountUp isCounting end={val} duration={1} />
          </Text>
          <Text style={{ color: 'white', fontSize: 20, marginLeft: 10 }}>{type}</Text>
        </View>
      </View>
    );
  };
  const RenderNavBar = () => {
    const { val, type } = humanFileSize(totalSize);

    return (
      <View style={s.navContainer}>
        <View style={s.statusBar} />
        <View style={s.navBar}>
          <TouchableOpacity onPress={() => {}}>
            <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}>EasyCloud</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: 'white', fontSize: 20 }}>
              <CountUp isCounting end={val} duration={1} />
            </Text>
            <Text style={{ color: 'white', fontSize: 20, marginLeft: 10 }}>{type}</Text>
          </View>
        </View>
      </View>
    );
  };

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
        title={Title()}
        backgroundImage={linearGrad}
        backgroundImageScale={1.2}
        renderNavBar={RenderNavBar}
        renderContent={FileList}
        containerStyle={s.navBarContainer}
        contentContainerStyle={s.navBarcontentContainer}
        innerContainerStyle={s.navBarContainer}
        scrollViewProps={{
          onScrollBeginDrag: () => console.log('onScrollBeginDrag'),
          onScrollEndDrag: () => console.log('onScrollEndDrag'),
        }}
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
    </>
  );
}
