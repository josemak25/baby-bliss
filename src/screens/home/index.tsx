import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { OptimizedFlatList } from 'react-native-optimized-flatlist';
import { useStoreContext } from '../../store';
import { useThemeContext } from '../../theme';
import { ActivityIndicator } from 'react-native';

import Post from '../../components/post';
import SearchIcon from '../../../assets/icons/search';
import { NavigationInterface } from '../../constants';
import { POST_ACTION_TYPES, PostInterface } from '../../store/posts/types';
import postsActions from '../../store/posts/actions';

import {
  Container,
  SafeAreaView,
  Logo,
  LogoContainer,
  SearchContainer
} from './styles';

interface HomeScreenProp extends NavigationInterface {
  testID?: string;
}

export default function HomeScreen(props: HomeScreenProp) {
  const [{ grid, postState, userState }, dispatch] = useStoreContext();

  const [state, setState] = useState({ isLiked: true });

  const { colors } = useThemeContext();

  useEffect(() => {
    postsActions(POST_ACTION_TYPES.LOAD_POSTS)(dispatch, userState.token);
  }, [userState.isLoading]);

  const onEndReached = () => {
    postsActions(POST_ACTION_TYPES.LOAD_POSTS)(dispatch, null);
  };

  const handleLikePost = (id: string, postIndex: number) => {
    postsActions(POST_ACTION_TYPES.LIKE_POST)(dispatch, {
      id,
      postIndex,
      authToken: userState.token,
      isLiked: state.isLiked
    });
    setState({
      ...state,
      isLiked: !state.isLiked //toggle the like property
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
                handleLikePost={() => handleLikePost(item._id, index)}
                navigation={() => navigateToPost(item)}
              />
            )}
            key={grid.numOfColumn}
            keyExtractor={(_, key: number) => `${key}`}
            numColumns={grid.numOfColumn}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 0, alignItems: 'center' }}
            style={{ width: '100%' }}
            onEndReached={onEndReached}
            onRefresh={false}
          />
        ) : (
          <ActivityIndicator
            size="large"
            color={colors.POST_TIP_COLOR}
            style={{ position: 'absolute', top: 100 }}
          />
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
