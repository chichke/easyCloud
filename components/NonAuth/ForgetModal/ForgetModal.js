import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import Modal from 'react-native-modal';
import { useToast } from 'react-native-fast-toast';
import * as yup from 'yup';
import firebase from '../../../firebase';
import t from '../../../translations';
import styles from './styles';

export default function ForgetModal({ isModalVisible, onClose }) {
  const [text, setText] = useState('');
  const toast = useToast();
  const schema = yup.string().email();

  const validateMail = async () => {
    const isValid = await schema.isValid(text);
    if (!isValid) toast.show(t('toast.forget.invalid'), { type: 'danger' });
    else {
      await firebase.auth().sendPasswordResetEmail(text);
      toast.show(t('toast.forget.success'), { type: 'success' });
      onClose();
    }
  };
  return (
    <Modal
      style={styles.modal}
      isVisible={isModalVisible}
      backdropOpacity={0.2}
      onBackdropPress={onClose}
      animationType="slide"
      swipeDirection={['up', 'down']}
    >
      <View style={styles.modalContainer}>
        <Text style={styles.boldTitle}>{t('v.forget.title')}</Text>
        <TextInput
          onChangeText={setText}
          value={text}
          placeholder={t('v.forget.ph')}
          style={styles.textInput}
          maxLength={35}
          autoCapitalize="none"
          autoCompleteType="email"
          keyboardType="email-address"
          returnKeyType="done"
          onSubmitEditing={validateMail}
        />
      </View>
    </Modal>
  );
}

ForgetModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  isModalVisible: PropTypes.bool.isRequired,
};
