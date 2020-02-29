import React from 'react';
import { FlatList } from 'react-native';
import Post from '../../components/post';
import SearchIcon from '../../../assets/icons/search';

import Button from '../../components/button';
import { NavigationInterface } from '../../constants';
import { useStoreContext } from '../../store';
import postsActions from '../../store/posts/actions';

interface HomeScreenProp extends NavigationInterface {
  testID?: string;
}

export default function HomeScreen(props: HomeScreenProp) {
  const [store, dispatch] = useStoreContext();
  // postsActions(POST_ACTION_TYPES.LOAD_POSTS)(dispatch);


import {
  Container,
  SafeAreaView,
  Logo,
  LogoContainer,
  SearchContainer
} from './styles';


export default function HomeScreen({ post }) {
  return (
    <SafeAreaView testID="HomeScreen">
      <Container>
        <FlatList
          data={Array(10).fill(post)}
          renderItem={({ item, index }) => <Post {...item} postIndex={index} />}
          keyExtractor={(_, key) => `${key}`}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 0 }}
          onEndReachedThreshold={2}
          onEndReached={() => console.log('END REACHED')}
          removeClippedSubviews={true}
          initialNumToRender={2}
          windowSize={7}
        />
      </Container>
    </SafeAreaView>
  );
}

HomeScreen.navigationOptions = ({ navigationOptions, navigation }) => {
  const { navigationBackButton } = navigation.state;

  return {
    ...navigationBackButton,
    ...navigationOptions,
    headerTitle: () => null,
    headerLeft: () => (
      <LogoContainer>
        <Logo
          source={require('../../../assets/images/logo.png')}
          style={{ resizeMode: 'contain' }}
        />
      </LogoContainer>
    ),
    headerRight: () => (
      <SearchContainer>
        <SearchIcon />
      </SearchContainer>
    )
  };
};

HomeScreen.defaultProps = {
  post: {
    images: [],
    contentType: 'community',
    link: null,
    category: {
      _id: '5d5e640247fda3145df0d912',
      title: 'First trimester',
      id: '5d5e640247fda3145df0d912'
    },
    isFlagged: false,
    deleted: false,
    _id: '5de102cc7fcd6d248dbbf4ee',
    topic: 'Is it normal for my baby to move this way at 6 months?',
    description:
      'As conscious traveling Paupers we must always be concerned about our dear Mother Earth. If you think about it, you travel across her face.',
    user: {
      avatar:
        'https://babybliss-platform.sfo2.digitaloceanspaces.com/avatar/avatar-5fcae2-H1pRhXVAkUuJ0NunOgXAhKDdl-1567081512239.png',
      _id: '5d5fcae2848a873ccd4f1c58',
      name: 'BabyBliss Moderator',
      username: 'moderator',
      id: '5d5fcae2848a873ccd4f1c58'
    },
    createdAt: '2019-11-29T11:36:44.699Z',
    updatedAt: '2019-11-29T11:36:48.138Z',
    __v: 1,
    id: '5de102cc7fcd6d248dbbf4ee',
    noOfComments: 0,
    isLiked: false,
    noOfLikes: 900,
    noOfViews: 130,
    userId: '5d5fcae2848a873ccd4f1c58'
  }
};
