import React, { useState, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  ActivityIndicator,
  AsyncStorage
} from 'react-native';

import { StackActions, NavigationActions } from 'react-navigation';

import { useThemeContext } from '../../theme';
import { NavigationInterface, STORE_USER_PROFILE } from '../../constants';

import Button from '../../components/button';
import InputFiled from '../../components/inputField';

import UserIcon from '../../../assets/icons/user';
import MailIcon from '../../../assets/icons/mail';
import PhoneIcon from '../../../assets/icons/phone';
import PrivacyIcon from '../../../assets/icons/privacy';
import boxShadow from '../../utils/boxShadows';
import { useStoreContext } from '../../store';
import { USER_ACTION_TYPES } from '../../store/user/types';
import userActions from '../../store/user/actions';
import { Spinner } from '../signin/styles';
import { validateFormFields } from '../../components/inputField/utils';
import showSnackbar from '../../components/UI/snackbar';
import postsActions from '../../store/posts/actions';
import { POST_ACTION_TYPES } from '../../store/posts/types';

import {
  Container,
  Logo,
  FormFields,
  FormControls,
  TermsAndCondition,
  TermsLabel,
  TermsLink,
  SafeAreaView,
  HeaderTitle
} from './styles';

export default function SignUp({ navigation }: NavigationInterface) {
  const [state, setState] = useState({
    user: { name: '', username: '', email: '', mobileNumber: '', password: '' },
    hasSubmitted: false
  });

  const { colors, fonts } = useThemeContext();
  const [{ userState }, dispatch] = useStoreContext();

  const onHandleChange = (field: string) => (value: string) => {
    setState({
      ...state,
      user: { ...state.user, [field]: value }
    });
  };

  useEffect(() => {
    if (!userState.token && state.hasSubmitted) {
      showSnackbar(colors.LIKE_POST_COLOR, userState.errorMessage);
      return;
    }
    (async () => {
      if (state.hasSubmitted) {
        await storeUserProfile();
      }
    })();
  }, [userState.errorMessage, userState.token]);

  const storeUserProfile = async () => {
    await AsyncStorage.setItem(
      STORE_USER_PROFILE,
      JSON.stringify({
        payload: userState.user,
        token: userState.token
      })
    );
    postsActions(POST_ACTION_TYPES.LOAD_POSTS)(dispatch, userState.token);

    const goToProfileSetup = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'ProfileSetupScreen' })]
    });

    navigation.dispatch(goToProfileSetup);
  };

  const handleSubmit = () => {
    let phoneNumberCase = undefined;
    //validate the form  for empty fields before sending this form.
    for (let key in state.user) {
      if (!state.user[key]) {
        showSnackbar(colors.LIKE_POST_COLOR, 'Please all fields are required!');
        return;
      }
      phoneNumberCase = key === 'mobileNumber' ? 'mobileNumber' : undefined;
      key = key === 'mobileNumber' ? 'phone' : key;
      //validate the form fields for incorrect state before sending this form.
      if (!validateFormFields(key, state.user[phoneNumberCase || key])) {
        showSnackbar(colors.LIKE_POST_COLOR, `Please enter a valid ${key}`);
        return;
      }
    }
    userActions(USER_ACTION_TYPES.REGISTER_USER)(dispatch, state.user);
    setState({
      ...state,
      hasSubmitted: true
    });
  };

  return (
    <SafeAreaView>
      <Container>
        <KeyboardAvoidingView
          style={{ alignItems: 'center', width: '100%' }}
          behavior="padding"
          keyboardVerticalOffset={100}
        >
          <Logo
            testID="appLogo"
            source={require('../../../assets/images/logo.png')}
            style={{ resizeMode: 'contain' }}
          />
          <FormFields>
            <InputFiled
              placeholder="Name"
              testID="Name"
              onChangeText={onHandleChange('name')}
              defaultValue={state.user.name}
              textContentType="name"
              style={{
                borderTopStartRadius: 10,
                borderTopEndRadius: 10
              }}
            >
              <UserIcon
                fillColor={colors.ACTIVE_TAB_COLOR}
                width="40%"
                height="40%"
                useCase
              />
            </InputFiled>
            <InputFiled
              placeholder="Username"
              testID="userName"
              onChangeText={onHandleChange('username')}
              defaultValue={state.user.username}
              textContentType="name"
            >
              <UserIcon
                fillColor={colors.ACTIVE_TAB_COLOR}
                width="40%"
                height="40%"
                useCase
              />
            </InputFiled>
            <InputFiled
              placeholder="Email"
              testID="email"
              onChangeText={onHandleChange('email')}
              defaultValue={state.user.email}
              textContentType="emailAddress"
              keyboardType="email-address"
            >
              <MailIcon />
            </InputFiled>
            <InputFiled
              placeholder="Phone"
              testID="phone"
              onChangeText={onHandleChange('mobileNumber')}
              defaultValue={state.user.mobileNumber}
              textContentType="telephoneNumber"
              keyboardType="phone-pad"
            >
              <PhoneIcon />
            </InputFiled>
            <InputFiled
              placeholder="Password"
              testID="password"
              onChangeText={onHandleChange('password')}
              defaultValue={state.user.password}
              secureTextEntry={true}
              returnKeyType="done"
              style={{
                borderBottomStartRadius: 10,
                borderBottomEndRadius: 10
              }}
            >
              <PrivacyIcon />
            </InputFiled>
          </FormFields>
        </KeyboardAvoidingView>
        <FormControls>
          <Button
            testID="submitButton"
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
            onPress={handleSubmit}
            title={`${userState.isLoading ? '' : 'Submit'}`}
            disabled={userState.isLoading}
          />
          {userState.isLoading && (
            <Spinner>
              <ActivityIndicator size="small" color={colors.BG_LIGHT_COLOR} />
            </Spinner>
          )}
          <Button
            title="Log in"
            testID="loginButton"
            onPress={() => navigation.navigate('SignInScreen')}
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
                elevation: 0.3,
                color: 'rgba(175, 163, 180, 0.45)',
                opacity: 0.5,
                radius: 10,
                height: 0
              })
            ]}
          />
        </FormControls>
        <TermsAndCondition>
          <TermsLabel>By signing up you have agreed to our</TermsLabel>
          <TermsLink>Terms of Use & Privacy Policy</TermsLink>
        </TermsAndCondition>
      </Container>
    </SafeAreaView>
  );
}

SignUp.navigationOptions = ({ navigationOptions, navigation }) => {
  const { navigationBackButton } = navigation.state;

  return {
    ...navigationOptions,
    ...navigationBackButton,
    headerTitle: () => <HeaderTitle>signup</HeaderTitle>,
    headerStyle: { backgroundColor: '#F4F8FB' }
  };
};
