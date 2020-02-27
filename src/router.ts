import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { customHeaderStyle, navigationBackButton } from './constants';

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

    // Sign In Screen Route
    SignInScreen: { screen: Screens.SignInScreen },

    // Home Screen Route
    HomeScreen: { screen: Screens.HomeScreen }
  },

  {
    initialRouteName: 'SignInScreen',
    headerMode: 'screen',
    defaultNavigationOptions: ({ navigation }) => {
      navigation.state['navigationBackButton'] = navigationBackButton;
      return { headerStyle: customHeaderStyle };
    }
  }
);

export default createAppContainer(AppNavigator);
