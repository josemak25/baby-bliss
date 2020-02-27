import React, { useState } from 'react';
import LottieView from 'lottie-react-native';
import { useThemeContext } from '../../theme';
import { NavigationInterface } from '../../constants';
import InputField from '../../components/inputField';
import boxShadow from '../../utils/boxShadows';

import {
  Container,
  ImageContainer,
  HeaderTitle,
  Title,
  TitleContent,
  TitleContainer,
  FormField,
  KeyboardAvoidingView,
  SafeAreaView
} from './styles';

import MailIcon from '../../../assets/icons/mail';
import Button from '../../components/button';

interface SplashScreenProp extends NavigationInterface {
  testID?: string;
}

export default function ForgotPasswordScreen({ navigation }: SplashScreenProp) {
  const { colors, fonts } = useThemeContext();

  const [email, setEmail] = useState('');

  const onHandleChange = (value: string) => setEmail(value);

  const handleSubmit = () => {
    // dispatch action to submit form

    // on success navigate to reset password screen
    navigation.navigate('ResetPasswordScreen');
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100}>
        <Container testID="forgot-password-container">
          <ImageContainer testID="lottie-animation-container">
            <LottieView
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
          <FormField>
            <InputField
              placeholder="Email"
              testID="email-input"
              onChangeText={onHandleChange}
              defaultValue={email}
              textContentType="emailAddress"
              keyboardType="email-address"
            >
              <MailIcon />
            </InputField>
            <Button
              testID="resetButton"
              buttonStyle={[
                {
                  backgroundColor: colors.POST_TIP_COLOR,
                  borderRadius: 2,
                  marginTop: 20
                },
                boxShadow({
                  elevation: 2,
                  color: 'rgba(175, 163, 180, 1)',
                  opacity: 0.3,
                  radius: 1,
                  height: 2.5
                })
              ]}
              textStyle={{
                color: colors.BG_LIGHT_COLOR,
                textTransform: 'uppercase',
                fontFamily: fonts.MONTSERRAT_SEMI_BOLD,
                fontSize: fonts.MEDIUM_SIZE - 1
              }}
              title="reset password"
              onPress={handleSubmit}
            />
          </FormField>
        </Container>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

ForgotPasswordScreen.navigationOptions = ({
  navigation,
  navigationOptions
}) => {
  const { navigationBackButton } = navigation.state;

  return {
    ...navigationOptions,
    ...navigationBackButton,
    headerTitle: () => <HeaderTitle>forgot password</HeaderTitle>
  };
};
