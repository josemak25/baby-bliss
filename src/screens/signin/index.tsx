import React, { useState } from 'react';
import BouncyCheckbox from '../../lib/bouncyCheckbox';
import { useThemeContext } from '../../theme';
import { NavigationInterface } from '../../constants';

import Button from '../../components/button';
import InputFiled from '../../components/inputField';

import MailIcon from '../../../assets/icons/mail';
import PrivacyIcon from '../../../assets/icons/privacy';
import boxShadow from '../../utils/boxShadows';

import {
  Container,
  Logo,
  FormFields,
  FormControls,
  Conditions,
  RememberMe,
  SafeAreaView,
  HeaderTitle,
  KeyboardAvoidingView
} from './styles';

export default function SignIn({ navigation }: NavigationInterface) {
  const { colors, fonts } = useThemeContext();

  const [values, setValues] = useState({ email: '', password: '' });

  const onHandleChange = (field: string) => (value: string) => {
    setValues({ ...values, [field]: value });
  };

  const handleSubmit = () => {
    // dispatch action to submit form

    // on success navigate to home screen
    navigation.replace('HomeScreen');
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
              placeholder="Email"
              testID="email"
              onChangeText={onHandleChange('email')}
              defaultValue={values.email}
              textContentType="emailAddress"
              keyboardType="email-address"
              style={{
                borderTopStartRadius: 10,
                borderTopEndRadius: 10
              }}
            >
              <MailIcon />
            </InputFiled>
            <InputFiled
              placeholder="Password"
              testID="password"
              onChangeText={onHandleChange('password')}
              defaultValue={values.password}
              secureTextEntry={true}
              returnKeyType="done"
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
              />
              <RememberMe></RememberMe>
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
            title="login"
            onPress={handleSubmit}
          />
          <Button
            title="create account"
            testID="createAccount"
            onPress={() => navigation.navigate('SignUpScreen')}
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
