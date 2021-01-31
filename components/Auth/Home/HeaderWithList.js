import React from 'react';
import { StyleSheet } from 'react-native';
import ReactNativeParallaxHeader from 'react-native-parallax-header';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { getFiles } from '../../../helpers/firebase';
import Error from '../../Error';
import Loading from '../../Loading';
import { getFilesKey } from '../../queryKey';
import FileList from './FileList';
import Header from './Header';
import HeaderTitle from './HeaderTitle';
import { HEADER_HEIGHT } from './uiValues';

const linearGrad = require('../../../assets/Wiretap.jpg');

const styles = StyleSheet.create({
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

export default function HeaderWithList() {
  const query = useQuery(getFilesKey, getFiles);
  const totalSize = useSelector((state) => state.file.fileSize);

  console.log(totalSize);
  const { isLoading, isError, data, error } = query;

  if (isLoading) return <Loading />;

  if (isError) return <Error error={error} />;

  return (
    <ReactNativeParallaxHeader
      headerMinHeight={HEADER_HEIGHT}
      headerMaxHeight={250}
      extraScrollHeight={20}
      alwaysShowTitle={false}
      alwaysShowNavBar={false}
      navbarColor="#E94057"
      titleStyle={styles.titleStyle}
      title={HeaderTitle(totalSize)}
      backgroundImage={linearGrad}
      backgroundImageScale={1.2}
      renderNavBar={() => Header(totalSize)}
      renderContent={() => FileList(data)}
      containerStyle={styles.navBarContainer}
      contentContainerStyle={styles.navBarcontentContainer}
      innerContainerStyle={styles.navBarContainer}
    />
  );
}
