import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
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
    setTimeout(() => navigation.replace('HomeScreen'), 4000);
  }, []);

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
            style={{ resizeMode: 'contain', width: '100%', height: '100%' }}
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

SplashScreen.navigationOptions = ({ navigationOptions }) => {
  return {
    ...navigationOptions,
    headerTitle: () => null,
    headerLeft: () => null,
    headerStyle: { backgroundColor: '#F4F8FB' }
  };
};
