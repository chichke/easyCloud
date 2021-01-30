import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { getClassNameForMimeType } from 'font-awesome-filetypes';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  icon: {
    alignSelf: 'center',
  },
});

export default function IconSwitcher({ mime }) {
  const className = getClassNameForMimeType(mime);
  const { colors } = useTheme();
  return <FontAwesome5 name={className} size={wp(8)} color={colors.primary} style={styles.icon} />;
}

IconSwitcher.propTypes = {
  mime: PropTypes.string.isRequired,
};
