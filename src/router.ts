import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { customHeaderStyle } from './constants';

import Screens from './screens';

const AppNavigator = createStackNavigator(
  {
    // Forgot Password Screen Route
    ForgotPasswordScreen: { screen: Screens.ForgotPasswordScreen },

    // Splash Screen Route
    SplashScreen: { screen: Screens.SplashScreen },

    // Get started Screen Route
    GetStartedScreen: { screen: Screens.GetStartedScreen },

    // Sign Up Screen Route
    SignUpScreen: { screen: Screens.SignUpScreen },

    // Home Screen Route
    HomeScreen: { screen: Screens.HomeScreen }
  },

  {
    initialRouteName: 'SplashScreen',
    headerMode: 'screen',
    defaultNavigationOptions: { headerStyle: customHeaderStyle }
  }
);

export default createAppContainer(AppNavigator);
