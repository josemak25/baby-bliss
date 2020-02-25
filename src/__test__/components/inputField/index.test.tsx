import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import Theme from '../../../theme';
import { TextInput } from '../../../components/inputField/styles';

describe('TEST INPUT_FILED COMPONENT(<InputFiled/>)', () => {
  const onChangeTextMock = jest.fn();
  const onChangeMock = jest.fn();
  const onFocusMock = jest.fn();
  const onBlurMock = jest.fn();

  const { getByTestId, queryByTestId } = render(
    <Theme>
      <TextInput
        testID="textInput"
        defaultValue=""
        onChangeText={onChangeTextMock}
        placeholder=""
        onChange={onChangeMock}
        onBlur={onBlurMock}
        onFocus={onFocusMock}
        textContentType="none"
        keyboardType="default"
        returnKeyType="done"
        secureTextEntry={false}
      />
    </Theme>
  );

  test('It renders the textInput <TextInput/> component accurately', () => {
    const textInput = getByTestId('textInput');
    expect(textInput).toBeTruthy();
  });

  test('That text can be typed into the textInput', () => {
    const string = 'decagon';
    fireEvent.focus(getByTestId('textInput'));
    fireEvent.changeText(getByTestId('textInput'), string);
    expect(onFocusMock).toHaveBeenCalled();
    expect(onChangeTextMock).toHaveBeenCalledWith(string);
    fireEvent.blur(getByTestId('textInput'));
    expect(onBlurMock).toHaveBeenCalled();
  });
});
