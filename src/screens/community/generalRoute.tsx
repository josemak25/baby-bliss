import React from 'react';
import { OptimizedFlatList } from 'react-native-optimized-flatlist';
import { useStoreContext } from '../../store';
import UserPost from '../../components/userPost';
import { Container } from './styles';
import { NavigationInterface } from '../../constants';
import { ActivityIndicator } from 'react-native';
import { useThemeContext } from '../../theme';
import { PostInterface } from '../../store/posts/types';
interface GeneralRouteContainerProp extends NavigationInterface {
  testID?: string;
  handleLikePost(
    id: string,
    postIndex: number,
    categoryId: string,
    oldLikeState: boolean
  ): void;
  navigateToPost(item: PostInterface): void;
}

const GeneralRouteContainer = (props: GeneralRouteContainerProp) => {
  const [{ grid, categoryState }] = useStoreContext();
  const { colors } = useThemeContext();
  const posts = categoryState.generalPosts;

  const onEndReached = () => {};

  return (
    <Container>
      {categoryState.isLoading ? (
        <ActivityIndicator
          size="large"
          color={colors.POST_TIP_COLOR}
          style={{ position: 'absolute', top: 100 }}
        />
      ) : (
        <OptimizedFlatList
          data={posts}
          renderItem={({ item, index }) => (
            <UserPost
              {...item}
              postIndex={index}
              width={grid.cardSize}
              navigation={() => props.navigateToPost(item)}
              handleLikePost={(id, postIndex, categoryId, oldLikeState) =>
                props.handleLikePost(id, postIndex, null, oldLikeState)
              }
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
