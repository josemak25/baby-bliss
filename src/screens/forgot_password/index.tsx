import React, { useState, useEffect } from 'react';
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
  SafeAreaView,
  Spinner
} from './styles';

import MailIcon from '../../../assets/icons/mail';
import Button from '../../components/button';
import userActions from '../../store/user/actions';
import { USER_ACTION_TYPES } from '../../store/user/types';
import { useStoreContext } from '../../store';
import showSnackbar from '../../commons/snackbar';
import { validateFormFields } from '../../components/inputField/utils';
import { ActivityIndicator } from 'react-native';

interface SplashScreenProp extends NavigationInterface {
  testID?: string;
}

export default function ForgotPasswordScreen({ navigation }: SplashScreenProp) {
  const { colors, fonts } = useThemeContext();
  const {
    store: { userState },
    dispatch
  } = useStoreContext();

  const [state, setState] = useState({ email: '', canShow: true });

  const onHandleChange = (value: string) => {
    setState({ ...state, email: value });
  };

  useEffect(() => {
    if (userState.errorMessage && !state.canShow) {
      return showSnackbar(colors.LIKE_POST_COLOR, userState.errorMessage);
    }
  }, [userState.errorMessage]);

  const handleSubmit = () => {
    //validate the email address before sending this form.
    const status = validateFormFields('email', state.email);
    if (status) {
      return showSnackbar(colors.LIKE_POST_COLOR, status);
    }
    userActions(USER_ACTION_TYPES.FORGOT_PASSWORD)(dispatch, {
      email: state.email
    });

    // on success navigate to reset password screen
    navigation.navigate('ResetPasswordScreen');
  };

  const setValidationError = (error: string) => {
    if (state.canShow) {
      showSnackbar('#F42850', error);
      setState({ ...state, canShow: false });
    }
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
              defaultValue={state.email}
              textContentType="emailAddress"
              keyboardType="email-address"
              setValidationError={setValidationError}
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
              title={`${userState.isLoading ? '' : 'reset password'}`}
              onPress={handleSubmit}
            />
            {userState.isLoading && (
              <Spinner>
                <ActivityIndicator size="small" color={colors.BG_LIGHT_COLOR} />
              </Spinner>
            )}
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
