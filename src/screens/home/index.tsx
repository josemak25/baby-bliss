import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { OptimizedFlatList } from 'react-native-optimized-flatlist';
import { useStoreContext } from '../../store';
import { useThemeContext } from '../../theme';
import { ActivityIndicator } from 'react-native';
import postsActions from '../../store/posts/actions';
import { Ionicons } from '@expo/vector-icons';
import Post from '../../components/post';
import SearchIcon from '../../../assets/icons/search';
import { NavigationInterface } from '../../constants';
import {
  POST_ACTION_TYPES,
  PostInterface,
  POST_TYPES
} from '../../store/posts/types';

import {
  Container,
  SafeAreaView,
  Logo,
  LogoContainer,
  SearchContainer,
  EmptyPostContainer,
  EmptyPostText
} from './styles';

interface HomeScreenProp extends NavigationInterface {
  testID?: string;
}

export default function HomeScreen(props: HomeScreenProp) {
  const [
    { grid, postState, userState, connectionState },
    dispatch
  ] = useStoreContext();
  const [state, setState] = useState({ refresh: false });
  const { colors } = useThemeContext();

  useEffect(() => {
    postsActions(POST_ACTION_TYPES.LOAD_BLOG_POSTS)(dispatch, userState.token);
  }, [userState.token, state.refresh, connectionState.isConnected]);

  const onEndReached = () => {
    postsActions(POST_ACTION_TYPES.LOAD_BLOG_POSTS)(dispatch, null);
  };

  const onRefresh = () => {
    setState({ ...state, refresh: !state.refresh });
  };

  const handleLikePost = (
    id: string,
    postIndex: number,
    oldLikeState: boolean
  ) => {
    dispatch({
      type: POST_TYPES.LIKE_OR_UNLIKE_POST,
      payload: {
        likeCount: oldLikeState ? -1 : 1,
        id,
        postIndex
      }
    });

    postsActions(POST_ACTION_TYPES.LIKE_POST)(dispatch, {
      id,
      postIndex,
      authToken: userState.token,
      isLiked: !oldLikeState
    });
  };

  const navigateToPost = (post: PostInterface) => {
    //dispatch action to fetch comments for this post
    postsActions(POST_ACTION_TYPES.LOAD_POST_COMMENTS)(dispatch, {
      authToken: userState.token,
      postId: post._id
    });

    props.navigation.navigate('BlogDetailsScreen', { post });
  };
  const Loader = () => (
    <ActivityIndicator
      size="large"
      color={colors.POST_TIP_COLOR}
      style={{ position: 'absolute', top: 100 }}
    />
  );

  return (
    <SafeAreaView testID="HomeScreen">
      <StatusBar barStyle="dark-content" />
      <Container>
        {postState.posts.length ? (
          <OptimizedFlatList
            data={postState.posts}
            renderItem={({ item, index }) => (
              <Post
                {...item}
                postIndex={index}
                width={grid.cardSize}
                handleLikePost={() =>
                  handleLikePost(item._id, index, item.isLiked)
                }
                navigation={() => navigateToPost(item)}
                testID={`post-${index}`}
              />
            )}
            key={grid.numOfColumn}
            keyExtractor={(_, key: number) => `${key}`}
            numColumns={grid.numOfColumn}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 0, alignItems: 'center' }}
            style={{ width: '100%' }}
            refreshing={false}
            onEndReached={onEndReached}
            onRefresh={onRefresh}
            testID="postList"
          />
        ) : postState.isConnected ? (
          <Loader />
        ) : postState.isLoading ? (
          <Loader />
        ) : (
          <EmptyPostContainer
            onTouchStart={() => {
              onRefresh();
            }}
          >
            <EmptyPostText>Tap to refresh</EmptyPostText>
            <Ionicons name="ios-refresh" size={23} />
          </EmptyPostContainer>
        )}
      </Container>
    </SafeAreaView>
  );
}

HomeScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: () => null,
    headerRight: () => (
      <SearchContainer>
        <SearchIcon />
      </SearchContainer>
    ),
    headerLeft: () => (
      <LogoContainer>
        <Logo
          source={require('../../../assets/images/logo.png')}
          style={{ resizeMode: 'contain' }}
        />
      </LogoContainer>
    )
  };
};
