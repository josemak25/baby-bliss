import React from 'react';
import { createAppContainer } from 'react-navigation';
import { render } from '@testing-library/react-native';

import Theme from '../src/theme';
import { AppBottomTabNavigator } from '../src/router';
import { StoreProvider } from '../src/store';

jest.mock('react-navigation-stack', () => {
  return {
    ...require.requireActual('react-navigation-stack'),
    useHeaderHeight: jest.fn().mockReturnValue(60)
  };
});

jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock')
);

const mountComponent = () => {
  const BottomTabNav = createAppContainer(AppBottomTabNavigator);
  const tree = render(
    <StoreProvider>
      <Theme>
        <BottomTabNav />
      </Theme>
    </StoreProvider>
  ).asJSON();
  return tree;
};

describe('TEST APP BOTTOM TAB NAVIGATOR COMPONENT(<AppBottomTabNavigator/>)', () => {
  test('renders correctly', () => {
    const BottomTabNav = mountComponent();
    expect(BottomTabNav).toMatchSnapshot();
  });
});
