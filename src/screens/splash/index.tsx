import React, { useEffect, useState } from 'react';
import { ActivityIndicator, AsyncStorage } from 'react-native';
import { useThemeContext } from '../../theme';
import { useStoreContext } from '../../store';
import CARD_ITEM from '../../utils/getItemCardSize';
import ScreenGridSizeActions from '../../store/grid/actions';
import { USER_TYPES } from '../../store/user/types';

import {
  NavigationInterface,
  STORE_USER_PROFILE,
  USER_FIRST_LAUNCH
} from '../../constants';

import { Container, ImageContainer, Image } from './styles';
interface SplashScreenProp extends NavigationInterface {
  testID?: string;
}

export default function SplashScreen({ navigation }: SplashScreenProp) {
  const { colors } = useThemeContext();
  const { dispatch } = useStoreContext();

  const [splash, setSplash] = useState({
    appLogoLoaded: true,
    pregnancyLogoLoaded: false,
    mobileGridSize: { cardSize: 320, numOfColumn: 1 }
  });

  useEffect(() => {
    handleAppLayout();
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

  const handleAppLayout = () => {
    const { cardSize, numOfColumn } = CARD_ITEM;
    setSplash({ ...splash, mobileGridSize: { cardSize, numOfColumn } });
    ScreenGridSizeActions(dispatch, CARD_ITEM);
  };

  const checkInitialLaunch = async () => {
    try {
      const [firstTimeLaunch, storedUserProfile] = await AsyncStorage.multiGet([
        USER_FIRST_LAUNCH,
        STORE_USER_PROFILE
      ]);

      const [, firstTimeLaunchValue] = firstTimeLaunch;
      const [, storedUserProfileValue] = storedUserProfile;
      if (!firstTimeLaunchValue) {
        await AsyncStorage.setItem(USER_FIRST_LAUNCH, '1');
        return navigation.replace('GetStartedScreen');
      }

      if (storedUserProfileValue) {
        //Navigate this user to the home screen if he still has token stored
        const { payload, token } = JSON.parse(storedUserProfileValue);

        if (payload) {
          dispatch({
            type: USER_TYPES.LOAD_FROM_STORE,
            payload: { payload, token }
          });

          if (payload.isApproved) {
            return navigation.replace('HomeScreen');
          }
          return navigation.replace('ProfileSetupScreen');
        }
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
