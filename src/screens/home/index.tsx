import React from 'react';

import Button from '../../components/button';
import { Container, Welcome } from './styles';

export default function HomeScreen() {
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
