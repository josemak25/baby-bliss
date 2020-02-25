import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { customHeaderStyle } from './constants';

import Screens from './screens';

const AppNavigator = createStackNavigator(
  {
    // Forgot Password Screen Route
    ForgotPasswordScreen: { screen: Screens.ForgotPasswordScreen },

    // Splash Route
    SplashScreen: { screen: Screens.SplashScreen },

    // Get started Route
    GetStartedScreen: { screen: Screens.GetStartedScreen },

    // Sign up Route
    SignUpScreen: { screen: Screens.SignUpScreen },

    // Home Route
    HomeScreen: { screen: Screens.HomeScreen }
  },

  {
    initialRouteName: 'SignUpScreen',
    headerMode: 'screen',
    defaultNavigationOptions: { headerStyle: customHeaderStyle }
  }
);

export default createAppContainer(AppNavigator);
