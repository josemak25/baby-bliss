import React from 'react';
import { Text, View } from 'react-native';
import { render } from '@testing-library/react-native';
import Theme from '../../../src/theme';
import Header from '../../../src/commons/header';

jest.mock('react-navigation-stack', () => ({
  useHeaderHeight: jest.fn().mockReturnValue(60)
}));

describe('TEST HEADER COMPONENT(<Header/>)', () => {
  const { getByTestId } = render(
    <Theme>
      <Header testID="header-container">
        <View>
          <Text>header content</Text>
        </View>
      </Header>
    </Theme>
  );

  test('It renders the header <Header/> component accurately', () => {
    const cardContainer = getByTestId('header-container');
    expect(cardContainer).toBeTruthy();
  });

  test('It renders other components passed as children to the header <Header/> component accurately', () => {
    const cardContainer = getByTestId('header-container');
    expect(cardContainer.children).toBeTruthy();
  });
});
