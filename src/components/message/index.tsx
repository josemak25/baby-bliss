import React, { useRef } from 'react';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

import { useThemeContext } from '../../theme';
import {
  Container,
  EmojiContainer,
  SendContainer,
  MessageInput
} from './styles';

type MessageProps = {
  style?: {};
  testID?: string;
  dispatchMessage(): void;
  setNewMessage(message: string): void;
  message: string;
  scrollViewOnFocus(): void;
  isInputEmoji(status: boolean): void;
  inputType: string;
};

export default function Message(props: MessageProps) {
  const { colors } = useThemeContext();

  const ref = useRef(null);
  const {
    testID,
    dispatchMessage,
    setNewMessage,
    message,
    scrollViewOnFocus,
    isInputEmoji,
    inputType
  } = props;

  const onSendMessage = () => {
    dispatchMessage();
    setNewMessage('');
  };

  const handleChangeText = (message: string) => setNewMessage(message);

  return (
    <Container testID={testID}>
      <MessageInput
        placeholder="Write comment here…"
        onChangeText={handleChangeText}
        defaultValue={message}
        autoFocus={false}
        ref={inputField => (ref.current = inputField)}
        onFocus={() => {
          scrollViewOnFocus();
          setState({ ...state, inputType: 'smile' });
          isInputEmoji(false);
        }}
      />
      <EmojiContainer
        onPress={() => {
          isInputEmoji(true);
        }}
      >
        <FontAwesome5
          name={inputType}
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
