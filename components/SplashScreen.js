import * as SplashScreenHelper from 'expo-splash-screen';
import React, { useCallback } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const logo = require('../assets/easy-cloud.png');

const styles = StyleSheet.create({
  container: { flex: 1 },
  splash: { flex: 1, width: wp(100), height: hp(100) },
});

export default function SplashScreen() {
  const onLoad = useCallback(() => {
    console.log('onLoad');
    SplashScreenHelper.hideAsync();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={logo}
        onLoad={() => onLoad()}
        onLoadEnd={() => onLoad()}
        resizeMode="contain"
        style={styles.splash}
      />
    </View>
  );
}
