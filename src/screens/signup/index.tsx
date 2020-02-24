import React, { useState } from 'react';
import InputFiled from '../../components/inputField';

import { Container, Logo, FormFields, FormControls } from './styles';
import UserIcon from '../../../assets/icons/user';
import { View, KeyboardAvoidingView } from 'react-native';
import MailIcon from '../../../assets/icons/mail';
import PhoneIcon from '../../../assets/icons/phone';
import PrivacyIcon from '../../../assets/icons/privacy';
import Button from '../../components/button';
import { useThemeContext } from '../../theme';
import boxShadow from '../../utils/boxShadows';

export default function SignUp(props) {
  const [values, setValues] = useState({
    userName: '',
    email: '',
    phone: '',
    password: ''
  });
  const { colors, fonts } = useThemeContext();

  const onHandleChange = (field: string) => (value: string) => {
    setValues({ ...values, [field]: value });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <Container>
        <Logo source={require('../../../assets/images/logo.png')} />
        <FormFields>
          <InputFiled
            placeholder="Username"
            testID="userName"
            onChangeText={onHandleChange('userName')}
            defaultValue={values.userName}
            textContentType="name"
          >
            <UserIcon />
          </InputFiled>
          <InputFiled
            placeholder="Email"
            testID="email"
            onChangeText={onHandleChange('email')}
            defaultValue={values.email}
            textContentType="emailAddress"
            keyboardType="email-address"
          >
            <MailIcon />
          </InputFiled>
          <InputFiled
            placeholder="Phone"
            testID="phone"
            onChangeText={onHandleChange('phone')}
            defaultValue={values.phone}
            textContentType="telephoneNumber"
            keyboardType="phone-pad"
          >
            <PhoneIcon />
          </InputFiled>
          <InputFiled
            placeholder="Password"
            testID="password"
            onChangeText={onHandleChange('password')}
            defaultValue={values.password}
            textContentType="password"
            returnKeyType="done"
          >
            <PrivacyIcon />
          </InputFiled>
          <FormControls>
            <Button
              testID="signupButton"
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
                textTransform: 'uppercase',
                fontFamily: fonts.MONTSERRAT_SEMI_BOLD,
                fontSize: fonts.MEDIUM_SIZE - 1
              }}
              title="Sign up"
              onPress={() => props.navigation.navigate('HomeScreen')}
            />
            <Button
              title="Log in"
              testID="loginButton"
              onPress={() => props.navigation.navigate('HomeScreen')}
              textStyle={{
                color: colors.POST_TIP_COLOR,
                fontFamily: fonts.MONTSERRAT_SEMI_BOLD,
                fontSize: fonts.MEDIUM_SIZE,
                textTransform: 'capitalize'
              }}
              buttonStyle={[
                {
                  borderRadius: 2
                },
                boxShadow({
                  elevation: 0.1,
                  color: 'rgba(175, 163, 180, 0.45)',
                  opacity: 0.3,
                  radius: 10,
                  height: 0
                })
              ]}
            />
          </FormControls>
        </FormFields>
      </Container>
    </KeyboardAvoidingView>
  );
}

SignUp.navigationOptions = ({ navigationOptions }) => {
  return {
    ...navigationOptions,
    headerStyle: {
      backgroundColor: '#F4F8FB'
    }
  };
};
