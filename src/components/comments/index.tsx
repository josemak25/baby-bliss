import React, { useState } from 'react';
import { Animated, Easing, TouchableWithoutFeedback } from 'react-native';
import LottieView from 'lottie-react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useThemeContext } from '../../theme';
import ResponsiveImage from '../../libs/responsiveImage';

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
  ImageOutlineBar
} from './styles';
import LoveIcon from '../../../assets/icons/love';

type CommentProps = {
  style?: {};
  testID?: string;
  onPress?(): void;
};

export default function Comment(props: CommentProps) {
  const { colors } = useThemeContext();

  const [animation, setAnimation] = useState({
    animateImage: new Animated.Value(0),
    likedComment: false
  });

  const handleLikeComment = () => {};

  const handleCommentReply = () => {};

  const startLikeAnimation = () => {
    if (animation.likedComment) return;

    setAnimation({ ...animation, likedComment: true });
    Animated.timing(animation.animateImage, {
      toValue: 1,
      duration: 1300,
      easing: Easing.linear,
      useNativeDriver: true
    }).start(() => handleLikeComment());
  };

  return (
    <Container testID={props.testID}>
      <ImageContainer>
        <ImageWrapper>
          <ResponsiveImage
            imageUrl="https://bit.ly/2TcUWv4"
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
          <CommenterName>Josephine Damilola</CommenterName>
          <CommenterTime>54m</CommenterTime>
        </CommentDetailsHeader>
        <UserComment>
          Billions are spent each year on cosmetic products to delete wrinkles
        </UserComment>
        <ActionContainer>
          <TouchableWithoutFeedback
            testID="like-comment-container"
            onPress={startLikeAnimation}
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
                progress={animation.animateImage}
              />

              {!animation.likedComment && (
                <LoveIcon
                  style={{ position: 'relative', right: -8, top: 8 }}
                  width="60%"
                  height="60%"
                />
              )}
            </LikeContainer>
          </TouchableWithoutFeedback>
          <LikeComment>like</LikeComment>
          <ReplyContainer
            onPress={handleCommentReply}
            onPressIn={() => console.log('HELLO')}
          >
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
