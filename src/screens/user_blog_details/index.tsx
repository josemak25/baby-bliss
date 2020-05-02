import React, { useState, useEffect, useRef } from 'react';
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
  PostInterface,
  POST_TYPES
} from '../../store/posts/types';
import postsActions from '../../store/posts/actions';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../commons/header';
import { NavigationInterface } from '../../constants';

import Comment from '../../components/comments';
import Eye from '../../../assets/icons/eye';
import LoveIcon from '../../../assets/icons/love';
import abbreviateNumber from '../../utils/abbreviateNumber';
import EmojiSelector, { Categories } from '../../libs/emojiSelector';

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

const { width: DEVICE_WIDTH } = Dimensions.get('window');

export default function UserBlogDetails(props: BlogDetailsProp) {
  const { colors } = useThemeContext();

  const {
    store: { postState, userState },
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
      replyToName: `@${userName} `, //this holds reference of the reply name to strip off before dispatching the message
      text: `@${userName} ` //State that hold the text user is entering
    });
  };

  const dispatchMessage = () => {
    let message: messageType = {
      authToken: userState.token,
      id
    };
    let { actionType } = state;
    actionType = actionType ? actionType : POST_ACTION_TYPES.POST_COMMENT;
    if (state.replyToName) {
      message = {
        ...message,
        content: state.text.replace(state.replyToName, ''),
        commentId: state.commentId
      };
    } else {
      message = {
        ...message,
        content: state.text
      };
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
    >
      <StatusBar barStyle="dark-content" />
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
                      handleLikeComment={() =>
                        handleLikeComment(comment._id, index, comment.isLiked)
                      }
                      avatar={avatar}
                      commentRef={commentComponentRef =>
                        (ref.current.messageComponentY = commentComponentRef)
                      }
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
        // focus={false}
        dispatchMessage={dispatchMessage}
        setNewMessage={setMessage}
        message={state.text}
        testID="postDetailMessageInput"
        handleInsertEmoji={handleInsertEmoji}
      />
    </KeyboardAvoidingView>
  );
}

UserBlogDetails.navigationOptions = { headerShown: false };
