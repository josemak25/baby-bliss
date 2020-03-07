import React, { useEffect, useState } from 'react';
import { OptimizedFlatList } from 'react-native-optimized-flatlist';
import { useStoreContext } from '../../store';
import UserPost from '../../components/userPost';
import { Container } from './styles';
import { NavigationInterface } from '../../constants';
import { ActivityIndicator } from 'react-native';
import { useThemeContext } from '../../theme';

interface GeneralRouteContainerProp extends NavigationInterface {
  testID?: string;
  handleLikePost(id: string, postIndex: number): void;
}

const GeneralRouteContainer = (props: GeneralRouteContainerProp) => {
  const [{ grid, categoryState }] = useStoreContext();
  const { colors } = useThemeContext();
  const [state, setState] = useState([]);

  useEffect(() => {
    let posts = [];
    for (const key in categoryState.communityPosts) {
      posts = [...posts, ...categoryState.communityPosts[key]];
    }
    setState(posts);
  }, [categoryState.communityPosts]);

  const onEndReached = () => {};

  return (
    <Container>
      {state.length ? (
        <OptimizedFlatList
          data={state}
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
      ) : (
        <ActivityIndicator
          size="large"
          color={colors.POST_TIP_COLOR}
          style={{ position: 'absolute', top: 100 }}
        />
      )}
    </Container>
  );
};

export default React.memo(GeneralRouteContainer);
