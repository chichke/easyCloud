import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
  },
});

export default function ButtonWithText(props) {
  const { style, styleText, title, disabled } = props;

  const onPress = () => props.onPress && props.onPress();

  ButtonWithText.propTypes = {
    disabled: PropTypes.bool,
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    style: PropTypes.object,
    // eslint-disable-next-line react/forbid-prop-types
    styleText: PropTypes.object,
  };

  ButtonWithText.defaultProps = {
    disabled: false,
    style: styles.container,
    styleText: styles.text,
  };

  return (
    <TouchableOpacity
      style={[styles.container, disabled ? styles.disabled : undefined, style]}
      onPress={onPress}
      disabled={disabled}
    >
      {title && <Text style={[styles.text, styleText]}>{title}</Text>}
    </TouchableOpacity>
  );
}
