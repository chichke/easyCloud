import PropTypes from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';

export default function Error({ error }) {
  return (
    <View>
      <Text>{error}</Text>
    </View>
  );
}

Error.propTypes = {
  error: PropTypes.string,
};

Error.defaultProps = {
  error: 'Unknwon Error',
};
