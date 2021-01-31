import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import t from '../../../translations';

export default function EmptyList() {
  return (
    <View style={styles.emptyList}>
      <Text style={styles.emptyListText}>{t('v.home.fab.empty')}</Text>
    </View>
  );
}
