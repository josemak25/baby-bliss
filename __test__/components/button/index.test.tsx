import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import Button from '../../../src/components/button';
import Theme from '../../../src/theme';

describe('TEST BUTTON COMPONENT(<Button/>)', () => {
  const onPressMock = jest.fn();

  const { getByTestId, queryByTestId } = render(
    <Theme>
      <Button title="sign up" testID="signup-button" onPress={onPressMock} />
    </Theme>
  );

  test('test button to have a non existing testID on button', () => {
    expect.assertions(1);
    const button = queryByTestId('signup');
    expect(button).toBeNull();
  });

  test('test button to have an exiting testID on button', () => {
    const button = getByTestId('signup-button');
    expect(button).toBeTruthy();
  });

  test('test button to be pressed', () => {
    const button = getByTestId('signup-button');
    expect(fireEvent.press(button)).toBeTruthy();
  });
});
