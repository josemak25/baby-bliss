import React, { useEffect, useState } from 'react';
import { OptimizedFlatList } from 'react-native-optimized-flatlist';
import { useStoreContext } from '../../store';
import UserPost from '../../components/userPost';
import { Container } from './styles';
import { NavigationInterface } from '../../constants';
import { ActivityIndicator } from 'react-native';
import { useThemeContext } from '../../theme';
import API from '../../lib/api';
import { ResponseInterface } from '../../store/posts/types';

interface GeneralRouteContainerProp extends NavigationInterface {
  testID?: string;
  handleLikePost(id: string, postIndex: number, categoryId: string): void;
}

const GeneralRouteContainer = (props: GeneralRouteContainerProp) => {
  const [{ grid, userState }] = useStoreContext();
  const { colors } = useThemeContext();
  const [state, setState] = useState({
    posts: [],
    isLoading: true
  });

  useEffect(() => {
    fetchGeneralPosts();
  }, []);

  const onEndReached = () => {};

  async function fetchGeneralPosts() {
    try {
      const request = await API.get(`/posts`, userState.token, '');

      const response: ResponseInterface = await request.json();

      if (response.statusCode === 200) {
        setState({ ...state, posts: response.payload, isLoading: false });
      }
    } catch (error) {
      console.warn(error);
    }
  }

  return (
    <Container>
      {state.isLoading ? (
        <ActivityIndicator
          size="large"
          color={colors.POST_TIP_COLOR}
          style={{ position: 'absolute', top: 100 }}
        />
      ) : (
        <OptimizedFlatList
          data={state.posts}
          renderItem={({ item, index }) => (
            <UserPost
              {...item}
              postIndex={index}
              width={grid.cardSize}
              navigation={() =>
                props.navigation.navigate('UserBlogDetailsScreen', {
                  post: item
                })
              }
              handleLikePost={props.handleLikePost}
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
      )}
    </Container>
  );
};

export default React.memo(GeneralRouteContainer);
