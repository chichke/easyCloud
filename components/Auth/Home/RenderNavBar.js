import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { HEADER_HEIGHT, NAV_BAR_HEIGHT, STATUS_BAR_HEIGHT } from './UIvalues';

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
});

const RenderNavBar = () => (
  <View style={styles.navContainer}>
    <View style={styles.statusBar} />
    <View style={styles.navBar}>
      <TouchableOpacity onPress={() => {}}>
        <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}>EasyCloud</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {}}>
        <Text style={{ color: 'white', fontSize: 18 }}>5 GB</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default RenderNavBar;
