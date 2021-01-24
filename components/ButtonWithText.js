import React from 'react';
import PropTypes from 'prop-types';
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
    style: PropTypes.string,
    styleText: PropTypes.string,
  };

  ButtonWithText.defaultProps = {
    disabled: styles.disabled,
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
