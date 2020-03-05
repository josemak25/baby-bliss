import React, { useState, useEffect, useRef } from 'react';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useThemeContext } from '../../theme';
import { POST_ACTION_TYPES } from '../../store/posts/types';

import {
  Container,
  MediaInsertContainer,
  EmojiContainer,
  SendContainer,
  MessageInput
} from './styles';

type MessageProps = {
  style?: {};
  testID?: string;
  focus: boolean;
  dispatchMessage(): void;
  setNewMessage(message: string): void;
  message: string;
};

export default function Message(props: MessageProps) {
  const { colors } = useThemeContext();
  const ref = useRef(null);
  const { testID, focus, dispatchMessage, setNewMessage, message } = props;

  useEffect(() => {
    ref.current.focus();
  }, [focus]);

  const handleMediaInsert = () => {};

  const onSendMessage = () => {
    dispatchMessage();
    setNewMessage('');
  };

  const handleEmoji = () => {};

  const handleChangeText = (message: string) => setNewMessage(message);

  return (
    <Container testID={testID}>
      <MediaInsertContainer onPress={handleMediaInsert}>
        <FontAwesome5 name="plus" size={13} color={colors.BG_LIGHT_COLOR} />
      </MediaInsertContainer>
      <MessageInput
        placeholder="Write comment here…"
        onChangeText={handleChangeText}
        defaultValue={message}
        autoFocus={focus}
        ref={inputField => (ref.current = inputField)}
      />
      <EmojiContainer onPress={handleEmoji}>
        <FontAwesome5
          name="smile"
          size={25}
          color={colors.INACTIVE_ICON_COLOR}
        />
      </EmojiContainer>
      <SendContainer onPress={onSendMessage} testID="send-message">
        <MaterialCommunityIcons
          name="send"
          size={25}
          color={colors.INACTIVE_ICON_COLOR}
        />
      </SendContainer>
    </Container>
  );
}
