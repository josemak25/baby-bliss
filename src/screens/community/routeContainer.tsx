import React, { useEffect, useState } from 'react';
import { OptimizedFlatList } from 'react-native-optimized-flatlist';
import { useStoreContext } from '../../store';
import { NavigationInterface } from '../../constants';
import { Container } from './styles';
import { ActivityIndicator } from 'react-native';
import { useThemeContext } from '../../theme';
import UserPost from '../../components/userPost';

interface RouteContainerProp extends NavigationInterface {
  testID?: string;
  categoryId: string;
  handleLikePost(id: string, postIndex: number): void;
}

const RouteContainer = (props: RouteContainerProp) => {
  const [{ grid, categoryState }, dispatch] = useStoreContext();
  const { colors } = useThemeContext();
  const posts = categoryState.communityPosts[props.categoryId];

  const onEndReached = () => {};

  return (
    <Container>
      {posts ? (
        <OptimizedFlatList
          data={posts}
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

export default React.memo(RouteContainer);
