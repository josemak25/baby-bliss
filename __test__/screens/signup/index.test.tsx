import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import Theme from '../../../src/theme';
import { createNavigationTestProps } from '../../../src/constants';
import SignUpScreen from '../../../src/screens/signup';
import { StoreProvider } from '../../../src/store';

const mountComponent = () => {
  const onHandleChange = jest.fn(() => {});

  const props: any = createNavigationTestProps();
  const renderedProps = render(
    <StoreProvider>
      <Theme>
        <SignUpScreen {...props} />
      </Theme>
    </StoreProvider>
  );
  return {
    props,
    ...renderedProps,
    onHandleChange
  };
};

describe(' TEST GET_SIGNUP SCREEN (<SignUpScreen/>)', () => {
  test('It renders the App logo component', () => {
    const { queryByTestId } = mountComponent();
    expect(queryByTestId('appLogo')).toBeTruthy();
  });

  test('That the screen has all the necessary input fields', () => {
    const { getByTestId } = mountComponent();
    expect(getByTestId('userName')).toBeTruthy();
    expect(getByTestId('email')).toBeTruthy();
    expect(getByTestId('phone')).toBeTruthy();
    expect(getByTestId('password')).toBeTruthy();
  });

  test('That the login button was pressed', () => {
    const { props, queryByTestId } = mountComponent();
    const loginButton = queryByTestId('loginButton');
    expect(loginButton).toBeTruthy();
    fireEvent.press(queryByTestId('loginButton'));
    expect(props.navigation.navigate).toHaveBeenCalledTimes(1);
    expect(props.navigation.navigate).toHaveBeenCalledWith('SignInScreen');
  });

  test('That the sigUp button was pressed', () => {
    const { queryByTestId } = mountComponent();
    const signUpButton = queryByTestId('submitButton');
    expect(signUpButton).toBeTruthy();
    fireEvent.press(signUpButton);
  });
});
