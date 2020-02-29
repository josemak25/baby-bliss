import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { createNavigationTestProps } from '../constants';
import Theme from '../theme';
import { AppBottomTabNavigator } from '../router';
import { createAppContainer } from 'react-navigation';
import { StoreProvider } from '../store';
import renderer from 'react-test-renderer';

const mountComponent = () => {
  const BottomTabNav = createAppContainer(AppBottomTabNavigator);
  const tree = renderer
    .create(
      <StoreProvider>
        <Theme>
          <BottomTabNav />
        </Theme>
      </StoreProvider>
    )
    .toJSON();
  return tree;
};

describe('TEST APP BOTTOM TAB NAVIGATOR COMPONENT(<AppBottomTabNavigator/>)', () => {
  test('renders correctly', () => {
    // const BottomTabNav = mountComponent();
    // expect(BottomTabNav).toMatchSnapshot();
  });
});
