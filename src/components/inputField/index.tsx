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
    testID
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

  const decorateTextFieldOnBlur = () => {
    switch (placeholder.toLowerCase()) {
      case 'username':
        if (inputState.text.trim().length < 5) {
          return updateFeedBack(false);
        }
        updateFeedBack(true);
        break;
      case 'email':
        const EMAIL_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!EMAIL_PATTERN.test(inputState.text.trim())) {
          return updateFeedBack(false);
        }
        updateFeedBack(true);
        break;
      case 'phone':
        const PHONE_PATTERN = /^(\+234|0)\d{10}$/;
        if (!PHONE_PATTERN.test(inputState.text)) {
          return updateFeedBack(false);
        }
        updateFeedBack(true);
      case 'password':
        if (inputState.text.trim().length < 6) {
          return updateFeedBack(false);
        }
        updateFeedBack(true);
        break;
      default:
        break;
    }
  };

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
            ? colors.IDLE_INPUT_COLOR
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
          onBlur={decorateTextFieldOnBlur}
          onFocus={decorateTextFieldOnFocus}
          textContentType={textContentType}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          secureTextEntry={secureTextEntry}
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
