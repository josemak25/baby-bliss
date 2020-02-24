import {
  NavigationScreenProp,
  NavigationParams,
  NavigationState
} from 'react-navigation';

// App header custom style
export const customHeaderStyle = {
  borderBottomWidth: 0,
  elevation: 0,
  shadowOpacity: 0
};

export interface NavigationInterface {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export const createNavigationTestProps = (props: object) => ({
  navigation: {
    state: { params: {} },
    dispatch: jest.fn(),
    goBack: jest.fn(),
    dismiss: jest.fn(),
    navigate: jest.fn(),
    openDrawer: jest.fn(),
    closeDrawer: jest.fn(),
    toggleDrawer: jest.fn(),
    getParam: jest.fn(),
    setParams: jest.fn(),
    addListener: jest.fn(),
    push: jest.fn(),
    replace: jest.fn(),
    pop: jest.fn(),
    popToTop: jest.fn(),
    isFocused: jest.fn()
  },
  ...props
});

export type IconProps = {
  width?: string;
  height?: string;
};
