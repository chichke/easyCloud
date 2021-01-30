import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CountUp } from 'use-count-up';
import humanFileSize from '../../../helpers/humanFileSize';

const styles = StyleSheet.create({
  brand: { color: 'white', fontSize: 25, fontWeight: 'bold' },
  row: { flexDirection: 'row', marginTop: 5 },
  countUp: { color: 'white', fontSize: 20 },
  container: { justifyContent: 'center', alignItems: 'center' },
  sizeType: { color: 'white', fontSize: 20, marginLeft: 10 },
});
const Title = (totalSize) => {
  const { val, type } = humanFileSize(totalSize);

  return (
    <View style={styles.container}>
      <Text style={styles.brand}>EasyCloud</Text>
      <View style={styles.row}>
        <Text style={styles.countUp}>
          <CountUp isCounting end={val} duration={1} />
        </Text>
        <Text style={styles.sizeType}>{type}</Text>
      </View>
    </View>
  );
};

export default Title;
