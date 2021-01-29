import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { getItem } from '../../../helpers/firebase';
import getDate from '../../../helpers/getDate';
import getFilename from '../../../helpers/getFilename';
import humanFileSize from '../../../helpers/humanFileSize';
import Loading from '../../Loading';
import IconSwitcher from './IconSwitcher';
import styles from './styles';

export default function FileItem({ item: itemRef }) {
  const [data, setData] = useState(undefined);
  const { navigate } = useNavigation();

  const fetchData = async () => {
    setData(await getItem(itemRef));
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (!data) return <Loading />;
  const readableSize = humanFileSize(data.size);
  // eslint-disable-next-line
  const created = getDate(data.timeCreated);
  const updated = getDate(data.updated);
  const filename = getFilename(data.fullPath);

  const gotoDescription = () => {
    navigate('File', { itemRef, data });
  };
  return (
    <TouchableOpacity style={styles.file} onPress={gotoDescription}>
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
  );
}

FileItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  item: PropTypes.object.isRequired,
};
