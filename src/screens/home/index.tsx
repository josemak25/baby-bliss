import React from 'react';

import Button from '../../components/button';
import { Container, Welcome, SafeAreaView } from './styles';

export default function HomeScreen() {
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
