import React, { useState } from 'react';
import {
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions
} from 'react-native';

import { useThemeContext } from '../../theme';
import { useStoreContext } from '../../store';
import Message from '../../components/message';
import {
  POST_ACTION_TYPES,
  CommentInterface,
  PostInterface
} from '../../store/posts/types';
import postsActions from '../../store/posts/actions';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/header';
import { NavigationInterface } from '../../constants';

import Comment from '../../components/comments';
import Eye from '../../../assets/icons/eye';
import LoveIcon from '../../../assets/icons/love';
import { abbreviateNumber } from '../utils';

import {
  Container,
  DetailsTip,
  DetailsTipContainer,
  HeaderContentContainer,
  DetailsTitle,
  HeaderTextContainer,
  GoBack,
  ActionContainer,
  NoOfViews,
  NoOfLikes,
  Description,
  CommentHeader,
  CommentsContainer,
  PostImage,
  EmptyComment,
  EmptyCommentText
} from './styles';

interface BlogDetailsProp extends NavigationInterface {
  testID?: string;
}

const { width: DEVICE_WIDTH } = Dimensions.get('window');

export default function UserBlogDetails(props: BlogDetailsProp) {
  const { colors } = useThemeContext();

  const [{ postState, userState }, dispatch] = useStoreContext();
  const post: PostInterface = props.navigation.getParam('post');

  const {
    topic,
    description,
    noOfLikes,
    noOfViews,
    images,
    id,
    user: { avatar }
  } = post;

  const [state, setState] = useState({
    focus: false,
    message: '',
    commentId: null,
    actionType: null
  });

  const handleOnFocusRequest = (actionType: string, commentId: string) => {
    setState({ ...state, focus: !state.focus, commentId, actionType });
  };

  const dispatchMessage = () => {
    let { actionType } = state;
    actionType = actionType ? actionType : POST_ACTION_TYPES.POST_COMMENT;

    postsActions(actionType)(dispatch, {
      id,
      authToken: userState.token,
      commentId: state.commentId,
      content: state.message
    });
  };

  const setMessage = (message: string) => setState({ ...state, message });

  const handleLikeComment = (id: string, commentIndex: number) => {
    postsActions(POST_ACTION_TYPES.LIKE_COMMENT)(dispatch, {
      id,
      authToken: userState.token,
      commentIndex,
      userId: userState.user.id
    });
  };

  return (
    <KeyboardAvoidingView
      behavior="height"
      style={{
        flex: 1,
        backgroundColor: colors.BD_DARK_COLOR
      }}
    >
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: colors.BD_DARK_COLOR
        }}
        showsVerticalScrollIndicator={false}
      >
        <Header style={{ height: 350, paddingLeft: 0, paddingRight: 0 }}>
          <HeaderContentContainer>
            <GoBack onPress={() => props.navigation.goBack()}>
              <Ionicons
                name="ios-arrow-back"
                size={25}
                color={colors.FONT_LIGHT_COLOR}
              />
            </GoBack>
            <HeaderTextContainer>
              <DetailsTipContainer>
                <DetailsTip>Baby Tips</DetailsTip>
              </DetailsTipContainer>
              <DetailsTitle>{topic}</DetailsTitle>
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
            </HeaderTextContainer>
          </HeaderContentContainer>
        </Header>
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          style={{
            flex: 1,
            backgroundColor: colors.BD_DARK_COLOR
          }}
        >
          <Container testID="blog-details">
            <PostImage
              source={{
                uri: images.length > 0 ? images[0] : 'https://bit.ly/2THZ4SC'
              }}
              style={{
                height: DEVICE_WIDTH > 414 ? 400 : 250,
                borderRadius: 2
              }}
              resizeMode="cover"
            />
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
                      avatar={avatar}
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

UserBlogDetails.navigationOptions = { headerShown: false };
