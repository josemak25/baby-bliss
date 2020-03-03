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
}

export default function Post(props: PostProps) {
  const { topic, description, noOfLikes, noOfViews, testID, width } = props;

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
    <Card
      style={{ width: applyScale(width), margin: 5 }}
      onPress={props.navigation}
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
            imageUrl="https://bit.ly/38c0U3G"
            width={width}
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