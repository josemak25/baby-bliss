import React, { useState } from 'react';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useThemeContext } from '../../theme';

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
};

export default function Message(props: MessageProps) {
  const { colors } = useThemeContext();

  const [message, setMessage] = useState('');

  const handleMediaInsert = () => {};

  const handleSendMessage = () => {};

  const handleEmoji = () => {};

  const handleChangeText = (message: string) => setMessage(message);

  return (
    <Container>
      <MediaInsertContainer onPress={handleMediaInsert}>
        <FontAwesome5 name="plus" size={13} color={colors.BG_LIGHT_COLOR} />
      </MediaInsertContainer>
      <MessageInput
        placeholder="Write comment here…"
        onChangeText={handleChangeText}
        defaultValue={message}
      />
      <EmojiContainer onPress={handleEmoji}>
        <FontAwesome5
          name="smile"
          size={25}
          color={colors.INACTIVE_ICON_COLOR}
        />
      </EmojiContainer>
      <SendContainer onPress={handleSendMessage}>
        <MaterialCommunityIcons
          name="send"
          size={25}
          color={colors.INACTIVE_ICON_COLOR}
        />
      </SendContainer>
    </Container>
  );
}
