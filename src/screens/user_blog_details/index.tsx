import React, { useState, useEffect, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions
} from 'react-native';
import Constants from 'expo-constants';
import Animated from 'react-native-reanimated';
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

const HEADER_EXPANDED_HEIGHT = 300;
const HEADER_COLLAPSED_HEIGHT = 60 + Constants.statusBarHeight;

const AnimatedHeaderContentContainer = Animated.createAnimatedComponent(
  HeaderContentContainer
);

const AnimatedSmallHeaderContentContainer = Animated.createAnimatedComponent(
  HeaderContentContainer
);

const AnimatedDetailsTitle = Animated.createAnimatedComponent(DetailsTitle);

const { width: DEVICE_WIDTH } = Dimensions.get('window');

export default function UserBlogDetails(props: BlogDetailsProp) {
  const { colors, fonts } = useThemeContext();

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
    insertEmoji: false,
    displayHeader: false,
    scrollY: new Animated.Value(0),
    inputType: 'smile'
  });

  const ref = useRef({
    scrollViewRef: null,
    messageComponentY: null,
    canScrollDown: false
  });

  Animated.useCode(() => {
    return Animated.call([state.scrollY], ([scrollY]) => {
      if (!state.displayHeader && Math.ceil(scrollY) >= 100) {
        return setState({ ...state, displayHeader: true });
      }

      if (state.displayHeader && Math.ceil(scrollY) <= 100) {
        return setState({ ...state, displayHeader: false });
      }
    });
  }, [state.displayHeader]);

  useEffect(() => {
    if (state.insertEmoji) Keyboard.dismiss();

    if (!state.text) setState({ ...state, replyToName: '' });

    if (ref.current.canScrollDown && !postState.isLoading) {
      ref.current.scrollViewRef.getNode().scrollToEnd({ animated: true });
      ref.current.canScrollDown = false;
    }
  }, [
    state.text,
    ref.current.canScrollDown,
    postState.isLoading,
    state.insertEmoji
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
    let message: messageType = { authToken: userState.token, id };
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

  const setMessage = (message: string) => setState({ ...state, text: message });

  const handleLikeComment = (
    id: string,
    commentIndex: number,
    oldLikeState: boolean
  ) => {
    dispatch({
      type: POST_TYPES.LIKE_COMMENT,
      payload: { commentIndex, userId: id }
    });

    postsActions(POST_ACTION_TYPES.LIKE_COMMENT)(dispatch, {
      id,
      authToken: userState.token,
      commentIndex,
      userId: userState.user.id,
      isLiked: !oldLikeState
    });
  };

  const isInputEmoji = (status: boolean) => {
    const inputType = state.inputType === 'smile' ? 'keyboard' : 'smile';

    if (status) {
      setState({ ...state, insertEmoji: !state.insertEmoji, inputType });
      return;
    }

    setState({ ...state, insertEmoji: status, inputType: 'smile' });
  };

  const HEADER_HEIGHT = Animated.interpolate(state.scrollY, {
    inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
    outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
    extrapolate: Animated.Extrapolate.CLAMP
  });

  const HEADER_CONTENT_CONTAINER_OPACITY = Animated.interpolate(state.scrollY, {
    inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
    outputRange: [1, 0],
    extrapolate: Animated.Extrapolate.CLAMP
  });

  const SMALL_HEADER_CONTENT_CONTAINER_OPACITY = Animated.interpolate(
    state.scrollY,
    {
      inputRange: [
        HEADER_COLLAPSED_HEIGHT,
        HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT
      ],
      outputRange: [0, 1],
      extrapolate: Animated.Extrapolate.CLAMP
    }
  );

  const HEADER_TITLE = Animated.interpolate(state.scrollY, {
    inputRange: [0, fonts.LARGE_SIZE + 10 - fonts.MEDIUM_SIZE],
    outputRange: [fonts.LARGE_SIZE + 10, fonts.MEDIUM_SIZE],
    extrapolate: Animated.Extrapolate.CLAMP
  });

  return (
    <KeyboardAvoidingView
      behavior="height"
      style={{
        flex: 1,
        backgroundColor: colors.BD_DARK_COLOR
      }}
    >
      <StatusBar barStyle="dark-content" />
      <Header
        style={{
          height: HEADER_HEIGHT,
          paddingLeft: 0,
          paddingRight: 0,
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 999
        }}
      >
        <AnimatedHeaderContentContainer
          style={{ opacity: HEADER_CONTENT_CONTAINER_OPACITY }}
        >
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
            <AnimatedDetailsTitle style={{ fontSize: HEADER_TITLE }}>
              {topic}
            </AnimatedDetailsTitle>
          </HeaderTextContainer>
        </AnimatedHeaderContentContainer>

        {/* SECOND SMALL HEADER */}
        <AnimatedSmallHeaderContentContainer
          style={{
            position: 'absolute',
            flexDirection: 'row',
            alignItems: 'center',
            opacity: SMALL_HEADER_CONTENT_CONTAINER_OPACITY,
            display: state.displayHeader ? 'flex' : 'none',
            backgroundColor: colors.POST_TIP_COLOR
          }}
        >
          <GoBack onPress={() => props.navigation.goBack()} testID="backButton">
            <Ionicons
              name="ios-arrow-back"
              size={25}
              color={colors.BG_LIGHT_COLOR}
            />
          </GoBack>

          <DetailsTip
            style={{
              color: colors.BG_LIGHT_COLOR,
              fontSize: fonts.LARGE_SIZE,
              paddingRight: 10
            }}
          >
            Baby Tips
          </DetailsTip>
        </AnimatedSmallHeaderContentContainer>
      </Header>
      <Animated.ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: colors.BD_DARK_COLOR,
          paddingTop: HEADER_EXPANDED_HEIGHT
        }}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        ref={scrollRef => (ref.current.scrollViewRef = scrollRef)}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: state.scrollY } } }],
          { useNativeDriver: true }
        )}
      >
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
      </Animated.ScrollView>
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
        message={state.replyToName ? `@${state.replyToName} ` : state.text}
        testID="postDetailMessageInput"
        scrollViewOnFocus={() =>
          ref.current.scrollViewRef.getNode().scrollToEnd()
        }
        isInputEmoji={isInputEmoji}
        inputType={state.inputType}
      />
    </KeyboardAvoidingView>
  );
}

UserBlogDetails.navigationOptions = { headerShown: false };
