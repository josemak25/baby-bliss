import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import Theme from '../../../theme';
import { createNavigationTestProps } from '../../../constants';
import ForgotPasswordScreen from '../../../screens/forgot_password';

const mountComponent = () => {
  const props: any = createNavigationTestProps();
  const renderedProps = render(
    <Theme>
      <ForgotPasswordScreen {...props} />
    </Theme>
  );
  return {
    props,
    ...renderedProps
  };
};

describe(' TEST FORGOT PASSWORD SCREEN (<ForgotPasswordScreen/>)', () => {
  test('It renders the forgot password screen successfully', () => {
    const { queryByTestId } = mountComponent();
    expect(queryByTestId('forgot-password-container')).toBeTruthy();
  });

  test('It successfully lottie animation container rendered on page launch', () => {
    const { queryByTestId } = mountComponent();
    expect(queryByTestId('lottie-animation-container')).toBeTruthy();
  });

  test('That the screen has the necessary input field', () => {
    const { getByTestId } = mountComponent();
    expect(getByTestId('email-input')).toBeTruthy();
  });

  test('The submit button to send request to reset password was pressed', () => {
    const { props, queryByTestId } = mountComponent();
    const resetButton = queryByTestId('resetButton');
    expect(resetButton).toBeTruthy();
    fireEvent.press(queryByTestId('resetButton'));
    expect(props.navigation.navigate).toHaveBeenCalledTimes(1);
    expect(props.navigation.navigate).toHaveBeenCalledWith(
      'ResetPasswordScreen'
    );
  });
});
