import React, { useState, useRef, useEffect } from 'react';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useThemeContext } from '../../theme';

import {
  Container,
  EmojiContainer,
  SendContainer,
  MessageInput
} from './styles';
import { Keyboard } from 'react-native';

type MessageProps = {
  style?: {};
  testID?: string;
  // focus: boolean;
  dispatchMessage(): void;
  setNewMessage(message: string): void;
  message: string;
  handleInsertEmoji(status: boolean): void;
};

export default function Message(props: MessageProps) {
  const { colors } = useThemeContext();
  const [state, setState] = useState({ inputType: 'smile' });

  const ref = useRef(null);
  const {
    testID,
    // focus,
    dispatchMessage,
    setNewMessage,
    message,
    handleInsertEmoji
  } = props;

  // useEffect(() => {
  //   // if (focus) {
  //   ref.current.focus();
  //   // }
  // }, [focus]);

  const onSendMessage = () => {
    dispatchMessage();
    setNewMessage('');
  };

  const handleChangeText = (message: string) => setNewMessage(message);

  const swapInputType = () => {
    const inputType = state.inputType === 'smile' ? 'keyboard' : 'smile';
    setState({ inputType });
  };

  return (
    <Container testID={testID}>
      <MessageInput
        placeholder="Write comment here…"
        onChangeText={handleChangeText}
        defaultValue={message}
        autoFocus={false}
        ref={inputField => (ref.current = inputField)}
        onFocus={() => {
          handleInsertEmoji(false);
          setState({ ...state, inputType: 'smile' });
        }}
      />
      <EmojiContainer
        onPress={() => {
          handleInsertEmoji(true);
          swapInputType();
        }}
      >
        <FontAwesome5
          name={state.inputType}
          size={20}
          color={colors.INACTIVE_ICON_COLOR}
        />
      </EmojiContainer>
      <SendContainer onPress={onSendMessage} testID="send-message">
        <MaterialCommunityIcons
          name="send"
          size={25}
          color={colors.POST_TIP_COLOR}
        />
      </SendContainer>
    </Container>
  );
}
