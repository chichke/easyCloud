import { Feather } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useToast } from 'react-native-fast-toast';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import * as yup from 'yup';
import firebase from '../../firebase';
import t from '../../translations';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    marginBottom: hp(2),
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: wp(3),
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default function ForgetModal({ setModalVisible }) {
  const [text, setText] = useState('');
  const toast = useToast();
  const schema = yup.string().email();

  const validateMail = async () => {
    const isValid = await schema.isValid(text);
    if (!isValid) toast.show(t('toast.forget.invalid'), { type: 'danger' });
    else {
      await firebase.auth().sendPasswordResetEmail(text);
      toast.show(t('toast.forget.success'), { type: 'success' });
    }
  };
  return (
    <>
      <Modal
        animationType="slide"
        transparent
        visible
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}
        style={{ position: 'absolute', width: wp(30), right: wp(35), top: hp(20) }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.openButton}
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <Feather name="x" size={wp(5)} />
            </TouchableOpacity>
            <Text style={styles.textStyle}>{t('v.forget.title')}</Text>
            <TextInput
              onChangeText={setText}
              value={text}
              placeholder={t('v.forget.ph')}
              style={{
                fontSize: wp(3),
                color: 'black',
                width: wp(80),
                height: wp(6),
                borderRadius: wp(2),
                borderColor: 'grey',
                borderWidth: wp(0.1),
              }}
              autoCapitalize="none"
              autoCompleteType="email"
              keyboardType="email-address"
              returnKeyType="done"
              onSubmitEditing={validateMail}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}

ForgetModal.propTypes = {
  setModalVisible: PropTypes.func.isRequired,
};
