import React, { useState, useEffect, useRef } from 'react';
import {
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Header from '../../commons/header';
import { NavigationInterface } from '../../constants';
import { useThemeContext } from '../../theme';
import Comment from '../../components/comments';
import MessageIcon from '../../../assets/icons/message';
import Eye from '../../../assets/icons/eye';
import LoveIcon from '../../../assets/icons/love';
import Message from '../../components/message';
import abbreviateNumber from '../../utils/abbreviateNumber';
import { useStoreContext } from '../../store';
import {
  CommentInterface,
  POST_ACTION_TYPES,
  PostInterface,
  POST_TYPES
} from '../../store/posts/types';
import postsActions from '../../store/posts/actions';
import EmojiSelector, { Categories } from '../../libs/emojiSelector';

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
  EmptyCommentText,
  EmojiSelectorContainer
} from './styles';

interface BlogDetailsProp extends NavigationInterface {
  testID?: string;
}

type messageType = {
  authToken: string;
  id: string;
  commentId?: string;
  content?: string;
};

export default function BlogDetails(props: BlogDetailsProp) {
  const { colors } = useThemeContext();
  const {
    store: { postState, userState, connectionState },
    dispatch
  } = useStoreContext();

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
    actionType: null,
    replyToName: '',
    text: '',
    insertEmoji: false
  });

  const ref = useRef({
    scrollViewRef: null,
    commentSectionY: null,
    messageComponentY: null,
    scrollViewHeight: null,
    canScrollDown: false
  });

  useEffect(() => {
    if (!state.text) {
      setState({
        ...state,
        replyToName: ''
      });
    }

    if (ref.current.canScrollDown && !postState.isLoading) {
      ref.current.scrollViewRef.scrollTo({
        y: ref.current.scrollViewHeight,
        animated: true
      });
      ref.current.canScrollDown = false;
    }
  }, [
    state.text,
    ref.current.canScrollDown,
    postState.isLoading,
    ref.current.scrollViewHeight
  ]);

  const handleOnFocusRequest = (
    actionType: string,
    replyTo: { userName: string; contentId: string }
  ) => {
    const { userName, contentId: commentId } = replyTo;

    setState({
      ...state,
      commentId,
      actionType,
      replyToName: `@${userName} ` //this holds reference of the reply name to strip off before dispatching the message
    });
  };

  const dispatchMessage = () => {
    let message: messageType = {
      authToken: userState.token,
      id
    };
    let { actionType } = state;
    actionType = actionType ? actionType : POST_ACTION_TYPES.POST_COMMENT;
    const content = state.text.replace(state.replyToName, '');
    if (!content) {
      return;
    }

    if (state.replyToName) {
      message = { ...message, content, commentId: state.commentId };
    } else {
      message = { ...message, content: state.text };
    }

    postsActions(actionType)(dispatch, message);
    ref.current.canScrollDown = true;
  };

  const setMessage = (message: string) => {
    setState({ ...state, text: message });
  };

  const handleLikeComment = (
    id: string,
    commentIndex: number,
    oldLikeState: boolean
  ) => {
    dispatch({
      type: POST_TYPES.LIKE_COMMENT,
      payload: {
        commentIndex,
        userId: id
      }
    });

    postsActions(POST_ACTION_TYPES.LIKE_COMMENT)(dispatch, {
      id,
      authToken: userState.token,
      commentIndex,
      userId: userState.user.id,
      isLiked: !oldLikeState
    });
  };

  const handleInsertEmoji = (status: boolean) => {
    if (status && state.insertEmoji) {
      return setState({ ...state, insertEmoji: !state.insertEmoji });
    }

    setState({ ...state, insertEmoji: status });
  };

  useEffect(() => {
    if (state.insertEmoji) {
      Keyboard.dismiss();
    }
  }, [state.insertEmoji]);

  return (
    <KeyboardAvoidingView
      behavior="height"
      style={{
        flex: 1,
        backgroundColor: colors.BD_DARK_COLOR
      }}
      testID="postDetailScreen"
    >
      <StatusBar barStyle="light-content" />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: colors.BD_DARK_COLOR
        }}
        showsVerticalScrollIndicator={false}
        ref={scrollRef => (ref.current.scrollViewRef = scrollRef)}
        onContentSizeChange={(_width, height) =>
          (ref.current.scrollViewHeight = height)
        }
        testID="postDetailScrollView"
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
              <GoBack
                onPress={() => props.navigation.goBack()}
                testID="backButton"
              >
                <Ionicons name="ios-arrow-back" size={25} color="white" />
              </GoBack>
              <HeaderTextContainer>
                <DetailsTipContainer>
                  <DetailsTip testID="babyTipsButton">Baby Tips</DetailsTip>
                </DetailsTipContainer>
                <DetailsTitle testID="postDetailTopic">{topic}</DetailsTitle>
              </HeaderTextContainer>
            </HeaderContentContainer>
          </HeaderImage>
        </Header>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
            setState({ ...state, insertEmoji: false });
          }}
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
              <MessageIcon
                onPress={() => {
                  ref.current.scrollViewRef.scrollTo({
                    y: ref.current.commentSectionY,
                    animated: true
                  });
                }}
                testID="messageIconButton"
              />
            </FloatingMessageButton>
            <ActionContainer>
              <Eye
                testID="eyeIcon"
                style={{ position: 'relative', right: 9 }}
                width="30%"
              />
              <NoOfViews testID="postDetailViewCounter">
                {abbreviateNumber(noOfViews)}
              </NoOfViews>
              <LoveIcon
                style={{ position: 'relative', right: 10 }}
                width="30%"
                height="40%"
                testID="postDetailLikeIcon"
              />
              <NoOfLikes testID="postDetailLikeCounter">
                {abbreviateNumber(noOfLikes)}
              </NoOfLikes>
            </ActionContainer>
            <Description>{description}</Description>
            <CommentHeader>comment</CommentHeader>
            <CommentsContainer
              onLayout={e => {
                ref.current.commentSectionY = e.nativeEvent.layout.y;
              }}
            >
              {postState.comments.length && connectionState.isConnected ? (
                postState.comments.map(
                  (comment: CommentInterface, index: number) => (
                    <Comment
                      key={index}
                      comment={comment}
                      commentIndex={index}
                      handleOnFocusRequest={handleOnFocusRequest}
                      handleLikeComment={() =>
                        handleLikeComment(comment._id, index, comment.isLiked)
                      }
                      avatar={avatar}
                      commentRef={commentComponentRef =>
                        (ref.current.messageComponentY = commentComponentRef)
                      }
                      testID={`commentComponent${index}`}
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
      {state.insertEmoji && (
        <EmojiSelectorContainer>
          <EmojiSelector
            theme={colors.POST_TIP_COLOR}
            category={Categories.all}
            onEmojiSelected={emoji => {
              setState({ ...state, text: state.text + emoji });
            }}
          />
        </EmojiSelectorContainer>
      )}
      <Message
        dispatchMessage={dispatchMessage}
        setNewMessage={setMessage}
        message={state.text}
        testID="postDetailMessageInput"
        handleInsertEmoji={handleInsertEmoji}
      />
    </KeyboardAvoidingView>
  );
}

BlogDetails.navigationOptions = { headerShown: false };
