import React, { useState, useEffect, useRef } from 'react';
import {
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import Animated from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../commons/header';
import { NavigationInterface } from '../../constants';
import { useThemeContext } from '../../theme';
import Constants from 'expo-constants';
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
import interpolateColors from '../../libs/interpolateColors';

interface BlogDetailsProp extends NavigationInterface {
  testID?: string;
}

type messageType = {
  authToken: string;
  id: string;
  commentId?: string;
  content?: string;
};

const HEADER_EXPANDED_HEIGHT = 400;
const HEADER_COLLAPSED_HEIGHT = 60 + Constants.statusBarHeight;

const AnimatedHeaderContentContainer = Animated.createAnimatedComponent(
  HeaderContentContainer
);

const AnimatedHeaderOverLay = Animated.createAnimatedComponent(HeaderOverLay);

const AnimatedFloatingMessageButton = Animated.createAnimatedComponent(
  FloatingMessageButton
);

const AnimatedSmallHeaderContentContainer = Animated.createAnimatedComponent(
  HeaderContentContainer
);

export default function BlogDetails(props: BlogDetailsProp) {
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
    scrollY: new Animated.Value(0)
  });

  const ref = useRef({
    scrollViewRef: null,
    commentSectionY: null,
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
    state.insertEmoji,
    ref.current.canScrollDown,
    postState.isLoading
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
    let message: messageType = { authToken: userState.token, id };
    let { actionType } = state;

    actionType = actionType ? actionType : POST_ACTION_TYPES.POST_COMMENT;
    const content = state.text.replace(state.replyToName, '');
    if (!content) return;

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

  const handleInsertEmoji = (status: boolean) => {
    if (status && state.insertEmoji) {
      return setState({ ...state, insertEmoji: !state.insertEmoji });
    }

    setState({ ...state, insertEmoji: status });
  };

  const HEADER_HEIGHT = Animated.interpolate(state.scrollY, {
    inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
    outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
    extrapolate: Animated.Extrapolate.CLAMP
  });

  const HEADER_BACKGROUND_OPACITY = Animated.interpolate(state.scrollY, {
    inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
    outputRange: [0.7, 1],
    extrapolate: Animated.Extrapolate.CLAMP
  });

  const HEADER_BACKGROUND_COLOR = interpolateColors(
    state.scrollY,
    [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
    [colors.FONT_DARK_COLOR, colors.POST_TIP_COLOR]
  );

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
        <HeaderImage
          source={{
            uri: images.length > 0 ? images[0] : 'https://bit.ly/38c0U3G'
          }}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
        >
          <AnimatedHeaderOverLay
            style={{
              backgroundColor: HEADER_BACKGROUND_COLOR,
              opacity: HEADER_BACKGROUND_OPACITY
            }}
          />
          <AnimatedHeaderContentContainer
            style={{ opacity: HEADER_CONTENT_CONTAINER_OPACITY }}
          >
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
          </AnimatedHeaderContentContainer>

          {/* SECOND SMALL HEADER */}
          <AnimatedSmallHeaderContentContainer
            style={{
              position: 'absolute',
              flexDirection: 'row',
              alignItems: 'center',
              opacity: SMALL_HEADER_CONTENT_CONTAINER_OPACITY,
              display: state.displayHeader ? 'flex' : 'none'
            }}
          >
            <GoBack
              onPress={() => props.navigation.goBack()}
              testID="backButton"
            >
              <Ionicons name="ios-arrow-back" size={25} color="white" />
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
        </HeaderImage>
      </Header>
      <TouchableWithoutFeedback
        onPress={() => {
          ref.current.scrollViewRef.getNode().scrollToEnd();
        }}
      >
        <AnimatedFloatingMessageButton
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          colors={[colors.GRADIENT_COLOR_FROM, colors.GRADIENT_COLOR_TO]}
          style={{
            top: Animated.sub(HEADER_HEIGHT, 40),
            opacity: HEADER_CONTENT_CONTAINER_OPACITY
          }}
        >
          <MessageIcon testID="messageIconButton" />
        </AnimatedFloatingMessageButton>
      </TouchableWithoutFeedback>
      <Animated.ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: colors.BD_DARK_COLOR,
          paddingTop: HEADER_EXPANDED_HEIGHT
        }}
        scrollEventThrottle={16}
        testID="postDetailScrollView"
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
        message={state.text}
        testID="postDetailMessageInput"
        handleInsertEmoji={handleInsertEmoji}
        scrollViewOnFocus={() =>
          ref.current.scrollViewRef.getNode().scrollToEnd()
        }
      />
    </KeyboardAvoidingView>
  );
}

BlogDetails.navigationOptions = { headerShown: false };
