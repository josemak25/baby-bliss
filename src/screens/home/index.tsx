import React, { Fragment } from 'react';
import { FlatList } from 'react-native';
import Post from '../../components/post';
import Header from '../../components/header';
import SearchIcon from '../../../assets/icons/search';
import post from '../../libs/dummyPost.json';

import { NavigationInterface } from '../../constants';
import { useStoreContext } from '../../store';

import {
  Container,
  SafeAreaView,
  Logo,
  LogoContainer,
  SearchContainer
} from './styles';
import { PostInterface } from '../../store/posts/types';

interface HomeScreenProp extends NavigationInterface {
  testID?: string;
  posts: PostInterface[];
}

export default function HomeScreen(props: HomeScreenProp) {
  const [store, dispatch] = useStoreContext();

  const onEndReached = () => {};

  return (
    <Fragment>
      <Header>
        <LogoContainer>
          <Logo
            source={require('../../../assets/images/logo.png')}
            style={{ resizeMode: 'cover' }}
          />
        </LogoContainer>
        <SearchContainer>
          <SearchIcon />
        </SearchContainer>
      </Header>
      <SafeAreaView testID="HomeScreen">
        <Container>
          <FlatList
            data={props.posts}
            renderItem={({ item, index }) => (
              <Post {...item} postIndex={index} />
            )}
            keyExtractor={(_, key) => `${key}`}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 0 }}
            onEndReachedThreshold={2}
            onEndReached={onEndReached}
            removeClippedSubviews={true}
            initialNumToRender={2}
            windowSize={7}
          />
        </Container>
      </SafeAreaView>
    </Fragment>
  );
}

HomeScreen.defaultProps = {
  posts: [...Array(10).fill(post)]
};
