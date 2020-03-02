import React, { Fragment, useState } from 'react';
import { OptimizedFlatList } from 'react-native-optimized-flatlist';

import { useStoreContext } from '../../store';

import Post from '../../components/post';
import Header from '../../components/header';
import SearchIcon from '../../../assets/icons/search';
import post from '../../libs/dummyPost.json';

import { NavigationInterface } from '../../constants';
import { PostInterface } from '../../store/posts/types';

import CARD_ITEM from '../../utils/getItemCardSize';

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
  const [store, dispatch] = useStoreContext();
  const [grid, setGrid] = useState({ numOfColumn: 1, cardSize: 320 });

  const onEndReached = () => {};

  const onLayout = () => {
    const { cardSize, numOfColumn } = CARD_ITEM;
    setGrid({ ...grid, cardSize, numOfColumn });
  };

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
        <Container onLayout={onLayout}>
          <OptimizedFlatList
            data={props.posts}
            renderItem={({ item, index }) => (
              <Post {...item} postIndex={index} width={grid.cardSize} />
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
    </Fragment>
  );
}

HomeScreen.defaultProps = { posts: [...Array(10).fill(post)] };
