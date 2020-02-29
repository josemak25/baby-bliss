import React, { useState } from 'react';
import LottieView from 'lottie-react-native';
import { Animated, Easing, TouchableWithoutFeedback } from 'react-native';
import ResponsiveImage from '../../lib/responsiveImage';
import Card from '../card';
import CommentsIcon from '../../../assets/icons/comments';

import { PostInterface } from '../../store/posts/types';

import {
  Container,
  Title,
  Description,
  DescriptionContainer,
  ReadMore,
  ActionContainer,
  LikeContainer,
  LikeCount,
  CommentCount,
  PostDivider
} from './styles';

export default function Post(post: PostInterface) {
  const { topic, description, noOfLikes, noOfViews } = post;

  const [animation] = useState(new Animated.Value(0));

  const handleLikePost = () => {};

  const startLikeAnimation = () => {
    animation.setValue(0);
    Animated.timing(animation, {
      toValue: 1,
      duration: 1300,
      easing: Easing.linear,
      useNativeDriver: true
    }).start(() => handleLikePost);
  };

  return (
    <Card>
      <Container>
        <Title>{topic}</Title>
        <ResponsiveImage
          imageUrl="https://bit.ly/2VtcAMJ"
          width={415}
          height={220}
        />
        <DescriptionContainer>
          <Description numberOfLines={3}>
            {description.length > 120
              ? `${description.substring(0, 120)}...`
              : description}
          </Description>
          <ReadMore>read more...</ReadMore>
        </DescriptionContainer>
        <ActionContainer>
          <TouchableWithoutFeedback
            testID="like-post-container"
            onPress={startLikeAnimation}
          >
            <LikeContainer>
              <LottieView
                source={require('../../../assets/animations/twitter-heart.json')}
                style={{
                  height: 220,
                  width: 220,
                  position: 'absolute',
                  top: -27,
                  alignSelf: 'center'
                }}
                progress={animation}
              />
            </LikeContainer>
          </TouchableWithoutFeedback>
          <LikeCount>{noOfLikes}</LikeCount>
          <CommentsIcon />
          <CommentCount>{noOfViews}</CommentCount>
        </ActionContainer>
      </Container>
      <PostDivider />
    </Card>
  );
}
