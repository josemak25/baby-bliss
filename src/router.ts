import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { customHeaderStyle } from './constants';

import Screens from './screens';

const AppNavigator = createStackNavigator(
  {
    // Splash Route
    SplashScreen: { screen: Screens.SplashScreen },

    // Get started Route
    GetStartedScreen: {
      screen: Screens.GetStartedScreen,
      navigationOptions: {
        title: null,
        headerLeft: () => null
      }
    },

    // Sign up Route
    SignUpScreen: {
      screen: Screens.SignUpScreen,
      navigationOptions: {
        title: null,
        headerLeft: () => null
      }
    },

    // Home Route
    HomeScreen: {
      screen: Screens.HomeScreen,
      navigationOptions: {
        headerLeft: () => null,
        title: null
      }
    }
  },

  {
    initialRouteName: 'SignUpScreen',
    headerMode: 'screen',
    defaultNavigationOptions: { headerStyle: customHeaderStyle }
  }
);

export default createAppContainer(AppNavigator);
