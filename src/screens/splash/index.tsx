import React, { useEffect, useState } from 'react';
import { ActivityIndicator, AsyncStorage } from 'react-native';
import { NavigationInterface } from '../../constants';

import { Container, ImageContainer, Image } from './styles';
import { useThemeContext } from '../../theme';

interface SplashScreenProp extends NavigationInterface {
  testID?: string;
}

export default function SplashScreen({ navigation }: SplashScreenProp) {
  const { colors } = useThemeContext();

  const [splash, setSplash] = useState({
    appLogoLoaded: true,
    pregnancyLogoLoaded: false
  });

  useEffect(() => {
    setTimeout(
      () =>
        setSplash({
          ...splash,
          appLogoLoaded: false,
          pregnancyLogoLoaded: true
        }),
      2000
    );
    setTimeout(checkInitialLaunch, 4000);
  }, []);

  const checkInitialLaunch = async () => {
    try {
      const firstTimeLaunch = await AsyncStorage.getItem('@FIRST_TIME_LAUNCH');
      if (!firstTimeLaunch) {
        await AsyncStorage.setItem('@FIRST_TIME_LAUNCH', '1');
        return navigation.replace('GetStartedScreen');
      }
      navigation.replace('SignInScreen');
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <Container
      start={{ x: 0, y: 1 }}
      end={{ x: 0, y: 0 }}
      colors={[colors.GRADIENT_COLOR_FROM, colors.GRADIENT_COLOR_TO]}
      testID="app-container"
    >
      {splash.appLogoLoaded && (
        <ImageContainer>
          <Image
            style={{
              resizeMode: 'contain',
              width: '60%',
              height: '100%',
              bottom: 50,
              left: 10
            }}
            source={require('../../../assets/images/splash.png')}
            fadeDuration={0}
            testID="app-icon"
          />
        </ImageContainer>
      )}

      {splash.pregnancyLogoLoaded && (
        <Image
          style={{ resizeMode: 'stretch' }}
          source={require('../../../assets/images/splash_pregnancy.png')}
          fadeDuration={0}
          testID="pregnancy-photo"
        />
      )}

      {splash.pregnancyLogoLoaded ? (
        <ActivityIndicator
          size="large"
          color={colors.POST_TIP_COLOR}
          style={{ position: 'absolute', bottom: 100 }}
        />
      ) : null}
    </Container>
  );
}

SplashScreen.navigationOptions = { headerShown: false };
