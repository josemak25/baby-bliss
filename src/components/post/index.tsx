import React, { useState } from 'react';
import LottieView from 'lottie-react-native';
import { Animated, Easing, TouchableWithoutFeedback } from 'react-native';
import ContentLoader from 'react-native-skeleton-content';
import applyScale from '../../utils/applyScale';

import ResponsiveImage from '../../libs/responsiveImage';
import Card from '../card';
import CommentsIcon from '../../../assets/icons/comments';

import { PostInterface } from '../../store/posts/types';

import {
  Container,
  Topic,
  Description,
  DescriptionContainer,
  ReadMore,
  ActionContainer,
  LikeContainer,
  LikeCount,
  CommentCount,
  PostDivider,
  ContentLoaderContainer
} from './styles';

interface PostProps extends PostInterface {
  postIndex: number;
  testID?: string;
}

export default function Post(post: PostProps) {
  const { topic, description, noOfLikes, noOfViews, testID } = post;

  const [animation, setAnimation] = useState({
    animateImage: new Animated.Value(0),
    hideContentLoader: true
  });

  const handleLikePost = () => {};

  const startLikeAnimation = () => {
    animation.animateImage.setValue(0);
    Animated.timing(animation.animateImage, {
      toValue: 1,
      duration: 1300,
      easing: Easing.linear,
      useNativeDriver: true
    }).start(() => handleLikePost);
  };

  const handleImageLoading = (error: any) => {
    if (!error) {
      setAnimation({ ...animation, hideContentLoader: false });
    }
  };

  return (
    <Card>
      <Container testID={testID}>
        <Topic testID="post-topic">{topic}</Topic>
        <ContentLoaderContainer>
          <ContentLoader
            isLoading={animation.hideContentLoader}
            containerStyle={{ width: applyScale(414), height: applyScale(220) }}
            layout={[{ width: applyScale(414), height: applyScale(220) }]}
          />
          <ResponsiveImage
            imageUrl="https://bit.ly/38cCLKf"
            width={415}
            height={220}
            onLoad={handleImageLoading}
          />
        </ContentLoaderContainer>

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
                progress={animation.animateImage}
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
