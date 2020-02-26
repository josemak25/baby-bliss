import React from 'react';

import Button from '../../components/button';
import { Container, Welcome } from './styles';
import { NavigationInterface } from '../../constants';

interface HomeScreenProp extends NavigationInterface {
  testID?: string;
}

export default function HomeScreen(props: HomeScreenProp) {
  return (
    <Container>
      <Button title="HomeScreen screen button" />
      <Welcome>HomeScreen Screen</Welcome>
    </Container>
  );
}

HomeScreen.navigationOptions = ({ navigationOptions }) => {
  return {
    ...navigationOptions,
    headerTitle: () => null,
    headerLeft: () => null,
    headerStyle: { backgroundColor: '#F4F8FB' }
  };
};
