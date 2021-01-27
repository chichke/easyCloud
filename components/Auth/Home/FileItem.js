import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { getItem } from '../../../helpers/firebase';
import getDate from '../../../helpers/getDate';
import getFilename from '../../../helpers/getFilename';
import humanFileSize from '../../../helpers/humanFileSize';
import Loading from '../../Loading';

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
  const created = getDate(data.timeCreated);
  const updated = getDate(data.updated);
  const filename = getFilename(data.fullPath);
  return (
    <TouchableOpacity>
      <Text>{`Type: ${data.contentType}`}</Text>
      <Text>{`Size: ${readableSize}`}</Text>
      <Text>{`Created: ${created}`}</Text>
      <Text>{`Updated: ${updated}`}</Text>
      <Text>{`Name: ${filename}`}</Text>
    </TouchableOpacity>
  );
}

FileItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  item: PropTypes.object.isRequired,
};
