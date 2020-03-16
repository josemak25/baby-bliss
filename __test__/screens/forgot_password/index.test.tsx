import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import Theme from '../../../src/theme';
import { createNavigationTestProps } from '../../../src/constants';
import ForgotPasswordScreen from '../../../src/screens/forgot_password';
import { StoreProvider } from '../../../src/store';

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

const mountComponent = () => {
  const props: any = createNavigationTestProps();
  const renderedProps = render(
    <StoreProvider>
      <Theme>
        <ForgotPasswordScreen {...props} />
      </Theme>
    </StoreProvider>
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
    const { queryByTestId } = mountComponent();
    const resetButton = queryByTestId('resetButton');
    expect(resetButton).toBeTruthy();
    fireEvent.press(resetButton);
  });
});
