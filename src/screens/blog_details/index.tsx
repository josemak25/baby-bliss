import React, { useState } from 'react';
import {
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
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
import { CommentInterface, POST_ACTION_TYPES } from '../../store/posts/types';
import postsActions from '../../store/posts/actions';

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
  const [{ postState, userState }, dispatch] = useStoreContext();
  const post = props.navigation.getParam('post');

  const { topic, description, noOfLikes, noOfViews, images, id } = post;

  const [state, setState] = useState({
    focus: false,
    message: '',
    commentId: null,
    actionType: null,
    waitTime: 250
  });

  const handleOnFocusRequest = (actionType: string, commentId: string) => {
    setState({ ...state, focus: !state.focus, commentId, actionType });
  };

  const dispatchMessage = () => {
    let { actionType } = state;
    actionType = actionType ? actionType : POST_ACTION_TYPES.POST_COMMENT;

    postsActions(actionType)(dispatch, {
      authToken: userState.token,
      id,
      commentId: state.commentId,
      content: state.message
    });
  };

  const setMessage = (message: string) => {
    setState({ ...state, message });
  };

  const handleLikeComment = (id: string, commentIndex: number) => {
    const waitTimer = setTimeout(() => {
      postsActions(POST_ACTION_TYPES.LIKE_COMMENT)(dispatch, {
        id,
        authToken: userState.token,
        commentIndex,
        userId: userState.user.id
      });

      clearTimeout(waitTimer);
    }, state.waitTime);
  };

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
              {postState.comments.length ? (
                postState.comments.map(
                  (comment: CommentInterface, index: number) => (
                    <Comment
                      key={index}
                      comment={comment}
                      commentIndex={index}
                      handleOnFocusRequest={handleOnFocusRequest}
                      handleLikeComment={handleLikeComment}
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
      <Message
        focus={state.focus}
        dispatchMessage={dispatchMessage}
        setNewMessage={setMessage}
        message={state.message}
      />
    </KeyboardAvoidingView>
  );
}

BlogDetails.navigationOptions = { headerShown: false };
