import * as SplashScreenHelper from 'expo-splash-screen';
import React, { useCallback } from 'react';
import { Image, View } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const logo = require('../assets/easy-cloud.png');

export default function SplashScreen() {
  const onLoad = useCallback(() => {
    console.log('onLoad');
    SplashScreenHelper.hideAsync();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={logo}
        onLoad={() => onLoad()}
        onLoadEnd={() => onLoad()}
        resizeMode="contain"
        style={{ flex: 1, width: wp(100), height: hp(100) }}
      />
    </View>
  );
}
