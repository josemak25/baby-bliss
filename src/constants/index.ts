import {
  NavigationScreenProp,
  NavigationParams,
  NavigationState
} from 'react-navigation';

interface NavigationScreenType
  extends NavigationScreenProp<NavigationState, NavigationParams> {
  replace: (T: string) => void;
  push: (T: string) => void;
}

// App Navigation prop types

export interface NavigationInterface {
  navigation: NavigationScreenType;
}

// App Navigation test prop types
export const createNavigationTestProps = (props: object = {}) => ({
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

// App Icons prop types
export type IconProps = {
  testID?: string;
  width?: string;
  height?: string;
  fillColor?: string;
  useCase?: boolean;
  style?: object;
  onPress?(): void;
};

// App header custom style
export const customHeaderStyle = {
  borderBottomWidth: 0,
  elevation: 0,
  shadowOpacity: 0,
  backgroundColor: '#F4F8FB'
};

// Navigation Header back button default
export const navigationBackButton = {
  headerBackTitle: 'back',
  headerBackColor: '#0D0E10',
  headerTintColor: '#0D0E10',
  headerBackTitleStyle: {
    color: '#0D0E10',
    fontFamily: 'montserrat-semi-bold',
    textTransform: 'capitalize',
    fontSize: 12
  }
};

export const STORE_USER_PROFILE = '@USER_PROFILE_TESTS_';
export const USER_FIRST_LAUNCH = '@FIRST_TIME_LAUNCH=';
export const EMOJI_HISTORY_KEY = '@react-native-emoji-selector:HISTORY';
