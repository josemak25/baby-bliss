import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { customHeaderStyle } from './constants';

import Screens from './screens';

const AppNavigator = createStackNavigator(
  {
    // Splash Route
    SplashScreen: { screen: Screens.SplashScreen },
    // Splash Route
    GetStartedScreen: {
      screen: Screens.GetStartedScreen,
      navigationOptions: {
        title: null
      }
    },

    // Home Route
    HomeScreen: {
      screen: Screens.HomeScreen,
      navigationOptions: {
        headerLeft: () => null
      }
    }
  },

  {
    initialRouteName: 'SplashScreen',
    headerMode: 'screen',
    defaultNavigationOptions: { headerStyle: customHeaderStyle }
  }
);

export default createAppContainer(AppNavigator);
