import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CountUp } from 'use-count-up';
import humanFileSize from '../../../helpers/humanFileSize';
import { HEADER_HEIGHT, NAV_BAR_HEIGHT, STATUS_BAR_HEIGHT } from './uiValues';

const styles = StyleSheet.create({
  navContainer: {
    height: HEADER_HEIGHT,
    marginHorizontal: 10,
  },
  statusBar: {
    height: STATUS_BAR_HEIGHT,
    backgroundColor: 'transparent',
  },
  navBar: {
    height: NAV_BAR_HEIGHT,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  brand: { color: 'white', fontSize: 22, fontWeight: 'bold' },
  row: { flexDirection: 'row' },
  countUp: { color: 'white', fontSize: 20 },
  sizeType: { color: 'white', fontSize: 20, marginLeft: 10 },
});

const RenderNavBar = (totalSize) => {
  const { val, type } = humanFileSize(totalSize);

  return (
    <View style={styles.navContainer}>
      <View style={styles.statusBar} />
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.brand}>EasyCloud</Text>
        </TouchableOpacity>
        <View style={styles.row}>
          <Text style={styles.countUp}>
            <CountUp isCounting end={val} duration={1} />
          </Text>
          <Text style={styles.sizeType}>{type}</Text>
        </View>
      </View>
    </View>
  );
};

export default RenderNavBar;
