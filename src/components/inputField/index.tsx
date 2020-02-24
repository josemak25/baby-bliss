import React, { FunctionComponent, useState, useEffect } from 'react';
import {
  Container,
  InputContainer,
  TextInput,
  IconContainer,
  Placeholder
} from './styles';
import { useThemeContext } from '../../theme';

type InputFieldProps = {
  placeholder: string;
  testID?: string;
  onChangeText(e: string): void;
  defaultValue: string;
  textContentType: any;
  keyboardType?: any;
  returnKeyType?: any;
};

const InputFiled: FunctionComponent<InputFieldProps> = props => {
  const {
    onChangeText,
    defaultValue,
    children,
    placeholder,
    textContentType = 'name',
    keyboardType = 'default',
    returnKeyType = 'next'
  } = props;
  const { colors } = useThemeContext();

  const [inputState, setInputState] = useState({
    text: '',
    showInputTab: false,
    style: {
      backgroundColor: colors.BG_LIGHT_COLOR,
      borderBottomStartRadius: 20,
      borderBottomEndRadius: 20,
      borderTopStartRadius: 0,
      borderTopEndRadius: 0
    },
    isOnBlur: false
  });

  useEffect(() => {
    const { text } = inputState;
    if (text) {
      setInputState({ ...inputState, showInputTab: true });
    } else setInputState({ ...inputState, showInputTab: false });
  }, [inputState.text]);

  const handleTextChange = ({ nativeEvent }) => {
    const { text } = nativeEvent;
    setInputState({
      ...inputState,
      text
    });
  };

  const decorateTextFieldOnBlur = () => {
    setInputState({
      ...inputState,
      style: {
        backgroundColor: colors.IDLE_INPUT_COLOR,
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        borderBottomStartRadius: 0,
        borderBottomEndRadius: 0
      }
    });
  };
  const decorateTextFieldOnFocus = () => {
    setInputState({
      ...inputState,
      style: {
        backgroundColor: colors.BG_LIGHT_COLOR,
        borderBottomStartRadius: 20,
        borderBottomEndRadius: 20,
        borderTopStartRadius: 0,
        borderTopEndRadius: 0
      }
    });
  };

  return (
    <Container style={{ ...inputState.style }}>
      <IconContainer>{children}</IconContainer>
      <InputContainer>
        {inputState.showInputTab && (
          <Placeholder>{props.placeholder}</Placeholder>
        )}
        <TextInput
          defaultValue={defaultValue}
          onChangeText={onChangeText}
          placeholder={placeholder}
          onChange={handleTextChange}
          onBlur={decorateTextFieldOnBlur}
          onFocus={decorateTextFieldOnFocus}
          textContentType={textContentType}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
        />
      </InputContainer>
    </Container>
  );
};

export default InputFiled;
