import React from 'react';
import { StatusBar } from 'react-native';
import { OptimizedFlatList } from 'react-native-optimized-flatlist';
import { useStoreContext } from '../../store';
import Post from '../../components/post';
import SearchIcon from '../../../assets/icons/search';
import post from '../../libs/dummyPost.json';
import { NavigationInterface } from '../../constants';

import { PostInterface } from '../../store/posts/types';

import {
  Container,
  SafeAreaView,
  Logo,
  LogoContainer,
  SearchContainer
} from './styles';

interface HomeScreenProp extends NavigationInterface {
  testID?: string;
  posts: PostInterface[];
}

export default function HomeScreen(props: HomeScreenProp) {
  const [{ grid }, dispatch] = useStoreContext();

  const onEndReached = () => {};

  return (
    <SafeAreaView testID="HomeScreen">
      <StatusBar barStyle="dark-content" />
      <Container>
        <OptimizedFlatList
          data={props.posts}
          renderItem={({ item, index }) => (
            <Post
              {...item}
              postIndex={index}
              width={grid.cardSize}
              navigation={() => props.navigation.navigate('BlogDetailsScreen')}
            />
          )}
          key={grid.numOfColumn}
          keyExtractor={(_, key) => `${key}`}
          numColumns={grid.numOfColumn}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 0, alignItems: 'center' }}
          style={{ width: '100%' }}
          onEndReached={onEndReached}
        />
      </Container>
    </SafeAreaView>
  );
}

HomeScreen.defaultProps = { posts: [...Array(10).fill(post)] };

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
