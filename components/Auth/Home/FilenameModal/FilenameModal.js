import PropTypes from 'prop-types';
import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
// import t from '../../../../translations';
import styles from './styles';

export default function FilenameModal({ isModalVisible, onClose, onChangeFilename }) {
  const [filename, setFilename] = React.useState('');

  return (
    <Modal
      style={styles.modal}
      isVisible={isModalVisible}
      backdropOpacity={0.2}
      animationType="slide"
      swipeDirection={['up', 'down']}
    >
      <View style={styles.modalContainer}>
        <Text style={styles.boldTitle}>Voulez-vous renommer le fichier ?</Text>
        <TextInput
          placeholder="Nouveau nom"
          style={styles.textInput}
          keyboardType="default"
          maxLength={35}
          onChangeText={(text) => setFilename(text)}
        />
        <View style={styles.row}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.text}>Non</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onChangeFilename(filename)}>
            <Text style={styles.text}>Renommer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

FilenameModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  isModalVisible: PropTypes.bool.isRequired,
  onChangeFilename: PropTypes.func.isRequired,
};
