import React, { useEffect, useState, useContext } from 'react';
import { ActivityIndicator } from 'react-native';
import { ThemeContext } from 'styled-components';

import { Container, ImageContainer, Image } from './styles';

export default function SplashScreen({ navigation }) {
  const { colors } = useContext(ThemeContext);

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
      4000
    );
    setTimeout(() => navigation.replace('HomeScreen'), 8000);
  }, []);

  return (
    <Container
      start={{ x: 0, y: 1 }}
      end={{ x: 0, y: 0 }}
      colors={[colors.GRADIENT_COLOR_FROM, colors.GRADIENT_COLOR_TO]}
    >
      {splash.appLogoLoaded && (
        <ImageContainer>
          <Image
            style={{ resizeMode: 'contain', width: '100%', height: '100%' }}
            source={require('../../../assets/images/splash.png')}
            fadeDuration={0}
          />
        </ImageContainer>
      )}

      {splash.pregnancyLogoLoaded && (
        <Image
          style={{ resizeMode: 'stretch' }}
          source={require('../../../assets/images/splash_pregnancy.png')}
          fadeDuration={0}
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

SplashScreen.navigationOptions = {
  header: () => null
};
