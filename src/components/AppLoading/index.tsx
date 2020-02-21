import React from 'react';
import { Image } from 'react-native';
import { AppLoading as ExpoAppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';

export default function AppLoading({ setIsAppReady }) {
  const cacheImages = (images: number[]) => {
    return images.map(image => {
      return typeof image === 'string'
        ? Image.prefetch(image)
        : Asset.fromModule(image).downloadAsync();
    });
  };

  const cacheFonts = (fonts: any[]) => {
    return fonts.map(font => Font.loadAsync(font));
  };

  const loadAllAppAssets = async () => {
    const imageAssets = cacheImages([
      require('../../../assets/icon.png'),
      require('../../../assets/splash.png')
    ]);

    const fontAssets = cacheFonts([
      {
        'notosans-regular': require('../../../assets/fonts/NotoSans-Regular.ttf')
      },
      {
        'notosans-bold': require('../../../assets/fonts/NotoSans-Bold.ttf')
      }
    ]);

    await Promise.all([...imageAssets, ...fontAssets]);
  };

  return (
    <ExpoAppLoading
      startAsync={loadAllAppAssets}
      onFinish={() => setIsAppReady(true)}
      onError={console.warn}
    />
  );
}
