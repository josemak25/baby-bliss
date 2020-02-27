import React from 'react';

import Button from '../../components/button';
import { Container, Welcome, SafeAreaView } from './styles';
import { NavigationInterface } from '../../constants';
import { useStoreContext } from '../../store';
import postsActions from '../../store/posts/actions';
import { POST_ACTION_TYPES } from '../../store/posts/types';

interface HomeScreenProp extends NavigationInterface {
  testID?: string;
}

export default function HomeScreen(props: HomeScreenProp) {
  const [store, dispatch] = useStoreContext();
  console.log(store);
  postsActions(POST_ACTION_TYPES.LOAD_POSTS)(dispatch);
  return (
    <SafeAreaView>
      <Container>
        <Button title="HomeScreen screen button" />
        <Welcome>HomeScreen Screen</Welcome>
      </Container>
    </SafeAreaView>
  );
}

HomeScreen.navigationOptions = ({ navigationOptions }) => {
  return {
    ...navigationOptions,
    headerTitle: () => null,
    headerLeft: () => null
  };
};
