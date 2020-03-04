import React, { useState } from 'react';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useThemeContext } from '../../theme';
import { useStoreContext } from '../../store';
import { POST_ACTION_TYPES } from '../../store/posts/types';
import postsActions from '../../store/posts/actions';
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
  postId: string;
};

export default function Message(props: MessageProps) {
  const { colors } = useThemeContext();
  const [{ userState }, dispatch] = useStoreContext();

  const { testID, postId } = props;

  const [message, setMessage] = useState('');

  const handleMediaInsert = () => {};

  const handleSendMessage = () => {
    postsActions(POST_ACTION_TYPES.POST_COMMENT)(dispatch, {
      authToken: userState.token,
      id: postId,
      content: message
    });
    setMessage('');
  };

  const handleEmoji = () => {};

  const handleChangeText = (message: string) => setMessage(message);

  return (
    <Container testID={testID}>
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
      <SendContainer onPress={handleSendMessage} testID="send-message">
        <MaterialCommunityIcons
          name="send"
          size={25}
          color={colors.INACTIVE_ICON_COLOR}
        />
      </SendContainer>
    </Container>
  );
}
