import React, { useState } from 'react';
import { Animated, Easing, TouchableWithoutFeedback, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useThemeContext } from '../../theme';
import ResponsiveImage from '../../libs/responsiveImage';
import LoveIcon from '../../../assets/icons/love';
import { CommentInterface, POST_ACTION_TYPES } from '../../store/posts/types';
import { simpleDateFormatter } from '../../lib/timeSince';

import {
  Container,
  ImageContainer,
  ImageWrapper,
  CommenterName,
  CommentDetails,
  UserComment,
  CommentDetailsHeader,
  CommenterTime,
  ActionContainer,
  LikeContainer,
  LikeComment,
  ReplayComment,
  ReplyContainer,
  ImageOutlineBar,
  ReplyComment
} from './styles';

type CommentProps = {
  style?: {};
  testID?: string;
  comment: CommentInterface;
  handleOnFocusRequest(actionType: string, contentId: string): void;
  handleLikeComment(id: string, commentIndex: number): void;
  commentIndex: number;
  avatar: string;
};

export default function Comment(props: CommentProps) {
  const { colors, fonts } = useThemeContext();

  const [state, setState] = useState({
    animateImage: new Animated.Value(0),
    likedComment: false
  });

  const {
    comment,
    testID,
    handleOnFocusRequest,
    handleLikeComment,
    commentIndex,
    avatar
  } = props;

  const commentTime = simpleDateFormatter(comment.createdAt);

  const handleCommentReply = () => {
    handleOnFocusRequest(POST_ACTION_TYPES.REPLY_COMMENT, comment._id);
  };

  const startLikeAnimation = (id: string) => {
    setState({ ...state, likedComment: !state.likedComment });

    if (!state.likedComment) {
      state.animateImage.setValue(0);
      return Animated.timing(state.animateImage, {
        toValue: 1,
        duration: 1300,
        easing: Easing.linear,
        useNativeDriver: true
      }).start(() => handleLikeComment(id, commentIndex));
    }

    handleLikeComment(id, commentIndex);
  };

  return (
    <Container testID={testID}>
      <ImageContainer>
        <ImageWrapper>
          <ResponsiveImage
            imageUrl={avatar ? avatar : 'https://bit.ly/2TcUWv4'}
            width={60}
            height={60}
            resizeMode="contain"
            style={{
              borderRadius: 50,
              borderWidth: 5,
              borderColor: colors.BD_DARK_COLOR
            }}
          />
        </ImageWrapper>
        <ImageOutlineBar />
      </ImageContainer>
      <CommentDetails>
        <CommentDetailsHeader>
          <CommenterName>{comment.user.name}</CommenterName>
          <CommenterTime
            style={{
              fontSize: commentTime.length > 3 ? fonts.SMALL_SIZE + 2 : null
            }}
          >
            {commentTime}
          </CommenterTime>
        </CommentDetailsHeader>
        <UserComment>
          {comment.replyTo && (
            <ReplyComment>{`@${comment.replyTo.user.name} `}</ReplyComment>
          )}
          {comment.content}
        </UserComment>
        <ActionContainer>
          <TouchableWithoutFeedback
            testID="like-comment-container"
            onPress={() => startLikeAnimation(comment._id)}
          >
            <LikeContainer>
              <LottieView
                source={require('../../../assets/animations/twitter-heart.json')}
                style={{
                  height: 150,
                  width: 150,
                  position: 'absolute',
                  top: -19,
                  alignSelf: 'center'
                }}
                progress={state.animateImage}
              />
              {!state.likedComment && (
                <LoveIcon
                  style={{ position: 'relative', right: -8, top: 8 }}
                  width="60%"
                  height="60%"
                />
              )}
            </LikeContainer>
          </TouchableWithoutFeedback>
          <LikeComment>like</LikeComment>
          <ReplyContainer onPress={handleCommentReply}>
            <MaterialCommunityIcons
              name="reply"
              size={25}
              color={colors.INACTIVE_ICON_COLOR}
            />
          </ReplyContainer>
          <ReplayComment>reply</ReplayComment>
        </ActionContainer>
      </CommentDetails>
    </Container>
  );
}
