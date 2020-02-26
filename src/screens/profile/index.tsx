import React from 'react';

import Button from '../../components/button';
import { Container, Welcome } from './styles';
import { NavigationInterface } from '../../constants';

interface ProfileScreenProp extends NavigationInterface {
  testID?: string;
}

export default function ProfileScreen(props: ProfileScreenProp) {
  return (
    <Container>
      <Button title="Profile screen button" />
      <Welcome>Profile Screen</Welcome>
    </Container>
  );
}

ProfileScreen.navigationOptions = ({ navigationOptions }) => {
  return {
    ...navigationOptions,
    headerTitle: () => null,
    headerLeft: () => null,
    headerStyle: { backgroundColor: '#F4F8FB' }
  };
};
