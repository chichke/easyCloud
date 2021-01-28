import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { AntDesign, EvilIcons } from '@expo/vector-icons';
import { getItem } from '../../../helpers/firebase';
import getDate from '../../../helpers/getDate';
import getFilename from '../../../helpers/getFilename';
import humanFileSize from '../../../helpers/humanFileSize';
import Loading from '../../Loading';
import styles from './styles';

export default function FileItem({ item }) {
  const [data, setData] = useState(undefined);

  const fetchData = async () => {
    setData(await getItem(item));
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
  return (
    <TouchableOpacity style={styles.file}>
      <View style={styles.iconContainer}>
        {data.contentType.startsWith('image') ? (
          <EvilIcons name="image" size={40} color="deepskyblue" style={styles.icon} />
        ) : (
          <AntDesign name="filetext1" size={30} color="deepskyblue" style={styles.icon} />
        )}
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
