import React from 'react';
import {
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/header';
import { NavigationInterface } from '../../constants';
import { useThemeContext } from '../../theme';

import Comment from '../../components/comments';
import MessageIcon from '../../../assets/icons/message';
import Eye from '../../../assets/icons/eye';
import LoveIcon from '../../../assets/icons/love';
import Message from '../../components/message';
import { abbreviateNumber } from '../utils';
import { useStoreContext } from '../../store';
import { CommentInterface } from '../../store/posts/types';

import {
  Container,
  DetailsTip,
  DetailsTipContainer,
  HeaderImage,
  HeaderOverLay,
  HeaderContentContainer,
  DetailsTitle,
  HeaderTextContainer,
  GoBack,
  FloatingMessageButton,
  ActionContainer,
  NoOfViews,
  NoOfLikes,
  Description,
  CommentHeader,
  CommentsContainer,
  EmptyComment,
  EmptyCommentText
} from './styles';

interface BlogDetailsProp extends NavigationInterface {
  testID?: string;
}

export default function BlogDetails(props: BlogDetailsProp) {
  const { colors } = useThemeContext();
  const [{ postState }] = useStoreContext();
  const {
    topic,
    description,
    noOfLikes,
    noOfViews,
    images,
    _id
  } = props.navigation.getParam('post');

  const onLikeComment = () => {};

  return (
    <KeyboardAvoidingView
      behavior="height"
      style={{
        flex: 1,
        backgroundColor: colors.BD_DARK_COLOR
      }}
    >
      <StatusBar barStyle="light-content" />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: colors.BD_DARK_COLOR
        }}
        showsVerticalScrollIndicator={false}
      >
        <Header style={{ height: 400, paddingLeft: 0, paddingRight: 0 }}>
          <HeaderImage
            source={{
              uri: images.length > 0 ? images[0] : 'https://bit.ly/38c0U3G'
            }}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          >
            <HeaderOverLay />
            <HeaderContentContainer>
              <GoBack onPress={() => props.navigation.goBack()}>
                <Ionicons name="ios-arrow-back" size={25} color="white" />
              </GoBack>
              <HeaderTextContainer>
                <DetailsTipContainer>
                  <DetailsTip>Baby Tips</DetailsTip>
                </DetailsTipContainer>
                <DetailsTitle>{topic}</DetailsTitle>
              </HeaderTextContainer>
            </HeaderContentContainer>
          </HeaderImage>
        </Header>
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          style={{
            flex: 1,
            backgroundColor: colors.BD_DARK_COLOR
          }}
        >
          <Container testID="blog-details">
            <FloatingMessageButton
              start={{ x: 0, y: 1 }}
              end={{ x: 0, y: 0 }}
              colors={[colors.GRADIENT_COLOR_FROM, colors.GRADIENT_COLOR_TO]}
            >
              <MessageIcon />
            </FloatingMessageButton>
            <ActionContainer>
              <Eye style={{ position: 'relative', right: 9 }} width="30%" />
              <NoOfViews>{abbreviateNumber(noOfViews)}</NoOfViews>
              <LoveIcon
                style={{ position: 'relative', right: 10 }}
                width="30%"
                height="40%"
              />
              <NoOfLikes>{abbreviateNumber(noOfLikes)}</NoOfLikes>
            </ActionContainer>
            <Description>{description}</Description>
            <CommentHeader>comment</CommentHeader>
            <CommentsContainer>
              {postState.isLoading && (
                <ActivityIndicator
                  size="large"
                  color={colors.POST_TIP_COLOR}
                  style={{ top: 10 }}
                />
              )}
              {postState.comments.length ? (
                postState.comments.map(
                  (comment: CommentInterface, index: number) => (
                    <Comment
                      key={index}
                      comment={comment}
                      onPress={onLikeComment}
                    />
                  )
                )
              ) : (
                <EmptyComment>
                  <EmptyCommentText>No Comment!</EmptyCommentText>
                </EmptyComment>
              )}
            </CommentsContainer>
          </Container>
        </TouchableWithoutFeedback>
      </ScrollView>
      <Message />
    </KeyboardAvoidingView>
  );
}

BlogDetails.navigationOptions = { headerShown: false };
