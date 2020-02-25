import React from 'react';
import LottieView from 'lottie-react-native';
import { NavigationInterface } from '../../constants';

import {
  Container,
  ImageContainer,
  HeaderTitle,
  Title,
  TitleContent,
  TitleContainer
} from './styles';

interface SplashScreenProp extends NavigationInterface {
  testID?: string;
}

export default function ForgotPasswordScreen({ navigation }: SplashScreenProp) {
  return (
    <Container testID="forgot-password-container">
      <ImageContainer>
        <LottieView
          style={{ width: '100%', height: '100%' }}
          source={require('../../../assets/animations/forgot_password.json')}
          autoPlay
        />
      </ImageContainer>
      <TitleContainer>
        <Title>forgot password?</Title>
        <TitleContent>
          Enter the email address associated with your account
        </TitleContent>
      </TitleContainer>
    </Container>
  );
}

ForgotPasswordScreen.navigationOptions = {
  headerTitle: () => <HeaderTitle>forgot password</HeaderTitle>
};
