import React from 'react';

import Button from '../../components/button';
import { Container, Welcome } from './styles';
import { NavigationInterface } from '../../constants';

interface CommunityScreenProp extends NavigationInterface {
  testID?: string;
}

export default function CommunityScreen(props: CommunityScreenProp) {
  return (
    <Container>
      <Button title="Community Screen button" />
      <Welcome>Community Screen</Welcome>
    </Container>
  );
}

CommunityScreen.navigationOptions = ({ navigationOptions, navigation }) => {
  const { navigationBackButton } = navigation.state;

  return {
    ...navigationBackButton,
    ...navigationOptions,
    headerTitle: () => null,
    headerLeft: () => null,
    headerStyle: { backgroundColor: '#F4F8FB' }
  };
};
