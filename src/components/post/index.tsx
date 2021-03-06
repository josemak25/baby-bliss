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
  width: number;
  navigation(): void;
  handleLikePost(): void;
}

export default function Post(post: PostProps) {
  const {
    topic,
    description,
    noOfLikes,
    noOfViews,
    testID,
    width,
    images,
    handleLikePost,
    postIndex
  } = post;

  const [animation, setAnimation] = useState({
    animateImage: new Animated.Value(0),
    hideContentLoader: true
  });

  const startLikeAnimation = () => {
    animation.animateImage.setValue(0);
    Animated.timing(animation.animateImage, {
      toValue: 1,
      duration: 1300,
      easing: Easing.linear,
      useNativeDriver: true
    }).start(() => handleLikePost());
  };

  const handleImageLoading = (error: any) => {
    if (!error) {
      setAnimation({ ...animation, hideContentLoader: false });
    }
  };

  return (
    <Card
      style={{
        width: applyScale(width),
        height: applyScale(417),
        margin: 15
      }}
      onPress={post.navigation}
    >
      <Container testID={testID}>
        <Topic testID="post-topic">{topic}</Topic>
        <ContentLoaderContainer>
          <ContentLoader
            isLoading={animation.hideContentLoader}
            containerStyle={{
              width: applyScale(width),
              height: applyScale(220)
            }}
            layout={[{ width: applyScale(width), height: applyScale(220) }]}
          />
          <ResponsiveImage
            imageUrl={images.length > 0 ? images[0] : 'https://bit.ly/38cCLKf'}
            width={width}
            height={220}
            onLoad={handleImageLoading}
            testID="postImage"
          />
        </ContentLoaderContainer>

        <DescriptionContainer>
          <Description numberOfLines={3} testID="postDescription">
            {description.length > 120
              ? `${description.substring(0, 120)}...`
              : description}
          </Description>
          <ReadMore testID="readMoreText">read more...</ReadMore>
        </DescriptionContainer>
        <ActionContainer>
          <TouchableWithoutFeedback
            testID="like-post-container"
            onPress={startLikeAnimation}
          >
            <LikeContainer testID="likeIcon">
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
          <LikeCount testID="postLikeCounter">{noOfLikes}</LikeCount>
          <CommentsIcon testID="commentIcon" />
          <CommentCount testID="postViewCounter">{noOfViews}</CommentCount>
        </ActionContainer>
      </Container>
      <PostDivider />
    </Card>
  );
}
