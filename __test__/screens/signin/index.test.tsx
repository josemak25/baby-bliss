import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import Theme from '../../../src/theme';
import { createNavigationTestProps } from '../../../src/constants';
import SignInScreen from '../../../src/screens/signin';

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

const mountComponent = () => {
  const props: any = createNavigationTestProps();
  const renderedProps = render(
    <Theme>
      <SignInScreen {...props} />
    </Theme>
  );
  return { props, ...renderedProps };
};

describe(' TEST SIGN_IN SCREEN (<SignInScreen/>)', () => {
  test('It renders the App logo component', () => {
    const { queryByTestId } = mountComponent();
    expect(queryByTestId('appLogo')).toBeTruthy();
  });

  test('That the screen has all the necessary input fields', () => {
    const { getByTestId } = mountComponent();
    expect(getByTestId('email')).toBeTruthy();
    expect(getByTestId('password')).toBeTruthy();
  });

  test('That the forgot password button was pressed', () => {
    const { props, queryByTestId } = mountComponent();
    const signUpButton = queryByTestId('resetAccount');
    expect(signUpButton).toBeTruthy();
    fireEvent.press(queryByTestId('resetAccount'));
    expect(props.navigation.navigate).toHaveBeenCalledTimes(1);
    expect(props.navigation.navigate).toHaveBeenCalledWith(
      'ForgotPasswordScreen'
    );
  });

  test('That the login button was pressed', () => {
    const { props, queryByTestId } = mountComponent();
    const loginButton = queryByTestId('loginButton');
    expect(loginButton).toBeTruthy();
    fireEvent.press(queryByTestId('loginButton'));
    expect(props.navigation.replace).toHaveBeenCalledTimes(1);
    expect(props.navigation.replace).toHaveBeenCalledWith('HomeScreen');
  });

  test('That the sigUp button was pressed', () => {
    const { props, queryByTestId } = mountComponent();
    const signUpButton = queryByTestId('createAccount');
    expect(signUpButton).toBeTruthy();
    fireEvent.press(queryByTestId('createAccount'));
    expect(props.navigation.navigate).toHaveBeenCalledTimes(1);
    expect(props.navigation.navigate).toHaveBeenCalledWith('SignUpScreen');
  });
});
