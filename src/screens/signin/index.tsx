import React, { useState, useEffect } from 'react';

import BouncyCheckbox from '../../libs/bouncyCheckbox';
import { ActivityIndicator, AsyncStorage } from 'react-native';
import { useThemeContext } from '../../theme';
import { NavigationInterface, STORE_USER_PROFILE } from '../../constants';
import Button from '../../components/button';
import InputFiled from '../../components/inputField';
import PrivacyIcon from '../../../assets/icons/privacy';
import boxShadow from '../../utils/boxShadows';
import userActions from '../../store/user/actions';
import { useStoreContext } from '../../store';
import { USER_ACTION_TYPES } from '../../store/user/types';
import showSnackbar from '../../components/UI/snackbar';
import UserIcon from '../../../assets/icons/user';
import { validateFormFields } from '../../components/inputField/utils';

import {
  Container,
  Logo,
  FormFields,
  FormControls,
  Conditions,
  SafeAreaView,
  HeaderTitle,
  KeyboardAvoidingView,
  Spinner
} from './styles';

export default function SignIn({ navigation }: NavigationInterface) {
  const { colors, fonts } = useThemeContext();
  const [{ userState }, dispatch] = useStoreContext();

  const [values, setValues] = useState({
    user: { username: '', password: '' },
    rememberMe: true,
    canShow: true
  });

  useEffect(() => {
    if (userState.token && values.rememberMe) {
      storeUserProfile();
    }
    if (userState.errorMessage && !userState.isLoading) {
      showSnackbar('#F42850', userState.errorMessage);
    }
    if (userState.token) navigation.replace('HomeScreen');
  }, [userState.token, userState.errorMessage, userState.isLoading]);

  const storeUserProfile = async () => {
    const { token, user } = userState;

    await AsyncStorage.setItem(
      STORE_USER_PROFILE,
      JSON.stringify({ token, payload: user })
    );
    navigation.replace('HomeScreen');
  };

  const onHandleChange = (field: string) => (value: string) => {
    setValues({ ...values, user: { ...values.user, [field]: value } });
  };

  const setValidationError = (error: string) => {
    if (values.canShow) showSnackbar('#F42850', error);
  };

  const handleSubmit = () => {
    //validate the form  for empty fields before sending this form.
    for (let key in values.user) {
      if (!values.user[key]) {
        showSnackbar(colors.LIKE_POST_COLOR, 'Please all fields are required!');
        return;
      }
      //validate the form fields for incorrect state before sending this form.
      const status = validateFormFields(key, values.user[key]);
      if (status) {
        showSnackbar(colors.LIKE_POST_COLOR, status);
        return;
      }
    }
    userActions(USER_ACTION_TYPES.LOGIN_USER)(dispatch, values.user);
  };

  return (
    <SafeAreaView>
      <Container>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100}>
          <Logo
            testID="appLogo"
            source={require('../../../assets/images/logo.png')}
            style={{ resizeMode: 'contain', margin: 15 }}
          />

          <FormFields>
            <InputFiled
              placeholder="Username"
              testID="username"
              onChangeText={onHandleChange('username')}
              defaultValue={values.user.username}
              setValidationError={setValidationError}
              style={{
                borderTopStartRadius: 10,
                borderTopEndRadius: 10
              }}
            >
              <UserIcon width="40%" height="40%" />
            </InputFiled>
            <InputFiled
              placeholder="Password"
              testID="password"
              onChangeText={onHandleChange('password')}
              defaultValue={values.user.password}
              secureTextEntry={true}
              returnKeyType="done"
              setValidationError={setValidationError}
              style={{
                borderBottomStartRadius: 10,
                borderBottomEndRadius: 10
              }}
            >
              <PrivacyIcon />
            </InputFiled>
            <Conditions>
              <BouncyCheckbox
                isChecked
                fillColor={colors.POST_TIP_COLOR}
                fontSize={fonts.SMALL_SIZE + 2}
                fontFamily={fonts.MONTSERRAT_SEMI_BOLD}
                checkboxSize={20}
                text="Remember Me"
                onPress={(rememberMe: boolean) =>
                  setValues({ ...values, rememberMe })
                }
              />

              <Button
                title="forgot password?"
                testID="resetAccount"
                onPress={() => navigation.navigate('ForgotPasswordScreen')}
                textStyle={{
                  color: colors.FONT_LIGHT_COLOR,
                  fontFamily: fonts.MONTSERRAT_SEMI_BOLD,
                  fontSize: fonts.SMALL_SIZE + 2,
                  textTransform: 'capitalize'
                }}
              />
            </Conditions>
          </FormFields>
        </KeyboardAvoidingView>
        <FormControls>
          <Button
            testID="loginButton"
            buttonStyle={[
              {
                backgroundColor: colors.POST_TIP_COLOR,
                borderRadius: 2
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
              textTransform: 'capitalize',
              fontFamily: fonts.MONTSERRAT_SEMI_BOLD,
              fontSize: fonts.MEDIUM_SIZE + 2
            }}
            title={`${userState.isLoading ? '' : 'login'}`}
            onPress={handleSubmit}
            disabled={userState.isLoading}
          />
          {userState.isLoading && (
            <Spinner>
              <ActivityIndicator size="small" color={colors.BG_LIGHT_COLOR} />
            </Spinner>
          )}
          <Button
            title="create account"
            testID="createAccount"
            onPress={() => {
              setValues({ ...values, canShow: false });
              navigation.navigate('SignUpScreen');
            }}
            textStyle={{
              color: colors.FONT_DARK_COLOR,
              fontFamily: fonts.MONTSERRAT_SEMI_BOLD,
              fontSize: fonts.MEDIUM_SIZE + 2,
              textTransform: 'capitalize'
            }}
            buttonStyle={[
              {
                borderRadius: 2,
                marginTop: 15
              },
              boxShadow({
                elevation: 0.3,
                color: 'rgba(175, 163, 180, 0.45)',
                opacity: 0.5,
                radius: 10,
                height: 0
              })
            ]}
          />
        </FormControls>
      </Container>
    </SafeAreaView>
  );
}

SignIn.navigationOptions = ({ navigation, navigationOptions }) => {
  const { navigationBackButton } = navigation.state;

  return {
    ...navigationOptions,
    ...navigationBackButton,
    headerTitle: () => <HeaderTitle>signin</HeaderTitle>,
    headerStyle: { backgroundColor: '#F4F8FB' }
  };
};
