import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import firebase from '../../../firebase';
import { getItem } from '../../../helpers/firebase';
import getDate from '../../../helpers/getDate';
import getFilename from '../../../helpers/getFilename';
import humanFileSize from '../../../helpers/humanFileSize';
import { resetFiles } from '../../../redux/actions/file';
import Loading from '../../Loading';
import Modal from './FileOptionsModal/FileOptionsModal';
import IconSwitcher from './IconSwitcher';
import styles from './styles';

export default function FileItem({ item: itemRef }) {
  const [data, setData] = useState(undefined);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const dispatch = useDispatch();
  const { uid } = firebase.auth().currentUser;

  const fetchData = async () => {
    const item = await getItem(itemRef);
    setData(item);
  };

  useEffect(() => {
    fetchData();
    return dispatch(resetFiles());
  }, [itemRef, uid]);

  if (!data) return <Loading />;
  const { val, type } = humanFileSize(data.size);
  const readableSize = `${val} ${type}`;
  // eslint-disable-next-line
  const created = getDate(data.timeCreated);
  const updated = getDate(data.updated);
  const filename = getFilename(data.fullPath);

  const onClose = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity style={styles.file} onPress={() => setIsModalVisible(true)}>
        <View style={styles.iconContainer}>
          <IconSwitcher mime={data.contentType} />
        </View>

        <View style={styles.restContainer}>
          <Text style={styles.title}>{filename}</Text>
          <View style={styles.row}>
            <Text style={styles.subtitle} numberOfLines={1}>
              {readableSize}
            </Text>
            <Text style={styles.subtitle}>{updated}</Text>
          </View>
        </View>
        {/* <Text>{`Created: ${created}`}</Text> */}
      </TouchableOpacity>
      <Modal isModalVisible={isModalVisible} onClose={onClose} itemRef={itemRef} data={data} />
    </>
  );
}

FileItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  item: PropTypes.object.isRequired,
};
