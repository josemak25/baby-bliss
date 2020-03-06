import React from 'react';
import { OptimizedFlatList } from 'react-native-optimized-flatlist';
import { useStoreContext } from '../../store';
import UserPost from '../../components/userPost';

import { PostInterface } from '../../store/posts/types';
import post from '../../libs/dummyPost.json';

import { Container } from './styles';
import { NavigationInterface } from '../../constants';

interface GeneralRouteContainerProp extends NavigationInterface {
  testID?: string;
  posts?: PostInterface[];
}

const GeneralRouteContainer = (props: GeneralRouteContainerProp) => {
  const [{ grid }] = useStoreContext();

  const onEndReached = () => {};

  return (
    <Container>
      <OptimizedFlatList
        data={props.posts}
        renderItem={({ item, index }) => (
          <UserPost
            {...item}
            postIndex={index}
            width={grid.cardSize}
            navigation={() =>
              props.navigation.navigate('UserBlogDetailsScreen')
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
      />
    </Container>
  );
};

GeneralRouteContainer.defaultProps = { posts: [...Array(10).fill(post)] };

export default React.memo(GeneralRouteContainer);
