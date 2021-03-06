import React, { useState } from 'react';
import LottieView from 'lottie-react-native';
import {
  Animated,
  Easing,
  TouchableWithoutFeedback,
  Dimensions
} from 'react-native';
import ContentLoader from 'react-native-skeleton-content';
import boxShadow from '../../utils/boxShadows';
import { useThemeContext } from '../../theme';
import applyScale from '../../utils/applyScale';

import ResponsiveImage from '../../libs/responsiveImage';
import Card from '../card';
import CommentsIcon from '../../../assets/icons/comments';

import { PostInterface } from '../../store/posts/types';
import timeSince from '../../libs/timeSince';

import {
  Container,
  Topic,
  Description,
  DescriptionContainer,
  ActionContainer,
  LikeContainer,
  LikeCount,
  CommentCount,
  PostHeader,
  PostUserName,
  PostTime,
  ContentLoaderContainer
} from './styles';

interface UserPostProps extends PostInterface {
  postIndex: number;
  testID?: string;
  width: number;
  navigation(): void;
  handleLikePost(
    id: string,
    postIndex: number,
    categoryId: string,
    oldLikeState: boolean
  ): void;
}

const { width: DEVICE_WIDTH } = Dimensions.get('window');

export default function UserPost(props: UserPostProps) {
  const { colors } = useThemeContext();

  const {
    topic,
    description,
    noOfLikes,
    noOfViews,
    testID,
    width,
    user: { name, avatar },
    createdAt,
    handleLikePost,
    postIndex,
    category,
    isLiked,
    _id
  } = props;

  const postDescription =
    description.length > 120
      ? `${description.substring(0, 150)}...`
      : description;

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
    }).start(() => handleLikePost(_id, postIndex, category._id, isLiked));
  };

  const handleImageLoading = (error: any) => {
    if (!error) {
      setAnimation({ ...animation, hideContentLoader: false });
    }
  };

  return (
    <Card
      style={[
        {
          width: applyScale(width),
          margin: 10,
          height: DEVICE_WIDTH <= 375 ? applyScale(280) : applyScale(250)
        },
        boxShadow({
          width: 0,
          height: 0,
          color: colors.IDLE_INPUT_COLOR,
          opacity: 0.3,
          radius: 1,
          elevation: 2
        })
      ]}
      onPress={props.navigation}
    >
      <Container testID={testID} style={{}}>
        <ContentLoaderContainer>
          <ContentLoader
            isLoading={animation.hideContentLoader}
            containerStyle={{
              width: applyScale(70),
              height: applyScale(70),
              borderRadius: 70 / 2
            }}
            layout={[
              {
                width: applyScale(70),
                height: applyScale(70),
                borderRadius: 70 / 2
              },
              {
                width: applyScale(250),
                height: applyScale(20),
                left: 80,
                bottom: 55
              },
              {
                width: applyScale(120),
                height: applyScale(20),
                left: 80,
                bottom: 50
              },
              {
                width: applyScale(370),
                height: applyScale(50),
                left: 2,
                bottom: 18
              },
              {
                width: applyScale(370),
                height: applyScale(42),
                left: 2,
                bottom: 14
              }
            ]}
          />
          <ResponsiveImage
            imageUrl={avatar ? avatar : 'https://bit.ly/38c0U3G'}
            width={70}
            height={70}
            onLoad={handleImageLoading}
            style={{ borderRadius: 70 / 2, top: 10, left: 18 }}
          />
          <PostHeader>
            <PostUserName>
              {!animation.hideContentLoader ? name : null}
            </PostUserName>
            <PostTime>
              {!animation.hideContentLoader ? timeSince(createdAt) : null}
            </PostTime>
          </PostHeader>
        </ContentLoaderContainer>
        <Topic testID="user-post-topic">
          {!animation.hideContentLoader ? topic : null}
        </Topic>
        <DescriptionContainer>
          <Description numberOfLines={3}>
            {!animation.hideContentLoader ? postDescription : null}
          </Description>
        </DescriptionContainer>
        {!animation.hideContentLoader && (
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
        )}
      </Container>
    </Card>
  );
}
