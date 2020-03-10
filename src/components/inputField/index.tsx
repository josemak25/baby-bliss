import React, { FunctionComponent, useState, useEffect } from 'react';
import { useThemeContext } from '../../theme';

import {
  Container,
  InputContainer,
  TextInput,
  IconContainer,
  Placeholder,
  CheckedContainer
} from './styles';
import CheckedIcon from '../../../assets/icons/checked';
import ErrorIcon from '../../../assets/icons/error';
import { validateFormFields } from './utils';

type InputFieldProps = {
  placeholder: string;
  testID?: string;
  onChangeText(e: string): void;
  defaultValue: string;
  textContentType?: any;
  keyboardType?: any;
  returnKeyType?: any;
  secureTextEntry?: boolean;
  style?: object;
  disable?: boolean;
  activeColor?: string;
  ignoreValidation?: boolean;
};

const InputFiled: FunctionComponent<InputFieldProps> = props => {
  const { colors } = useThemeContext();

  const {
    onChangeText,
    defaultValue,
    children,
    placeholder,
    textContentType = 'name',
    keyboardType = 'default',
    returnKeyType = 'next',
    secureTextEntry = false,
    style,
    testID,
    disable = false,
    ignoreValidation = false
  } = props;

  const [inputState, setInputState] = useState({
    text: '',
    showInputTab: false,
    activateColor: false,
    isValid: true,
    canShowIsValid: false,
    isTouched: false
  });

  useEffect(() => {
    const { text } = inputState;
    if (text) {
      setInputState({ ...inputState, showInputTab: true });
    } else setInputState({ ...inputState, showInputTab: false });
  }, [inputState.text]);

  const handleTextChange = ({ nativeEvent }) => {
    const { text } = nativeEvent;
    setInputState({ ...inputState, text });
  };

  function updateFeedBack(value: boolean) {
    setInputState({
      ...inputState,
      isValid: value,
      activateColor: true,
      canShowIsValid: true
    });
  }

  const decorateTextFieldOnFocus = () => {
    setInputState({
      ...inputState,
      activateColor: false,
      canShowIsValid: !inputState.isValid
    });
  };

  return (
    <Container
      style={[
        style,
        {
          backgroundColor: inputState.activateColor
            ? props.activeColor || colors.IDLE_INPUT_COLOR
            : colors.BG_LIGHT_COLOR
        }
      ]}
    >
      <IconContainer>{children}</IconContainer>
      <InputContainer>
        {inputState.showInputTab && (
          <Placeholder>{props.placeholder}</Placeholder>
        )}
        <TextInput
          testID={testID}
          defaultValue={defaultValue}
          onChangeText={onChangeText}
          placeholder={placeholder}
          onChange={handleTextChange}
          onBlur={() => {
            if (!ignoreValidation)
              updateFeedBack(validateFormFields(placeholder, inputState.text));
          }}
          onFocus={decorateTextFieldOnFocus}
          textContentType={textContentType}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          secureTextEntry={secureTextEntry}
          editable={!disable}
          autoCapitalize="none"
        />
        {inputState.canShowIsValid && (
          <CheckedContainer>
            {inputState.isValid ? <CheckedIcon /> : <ErrorIcon />}
          </CheckedContainer>
        )}
      </InputContainer>
    </Container>
  );
};

export default InputFiled;
