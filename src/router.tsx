import React from 'react';

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import { customHeaderStyle, navigationBackButton } from './constants';
import Screens from './screens';
import HomeIcon from '../assets/icons/home';
import UserIcon from '../assets/icons/user';
import CommunityIcon from '../assets/icons/community';

// APP BOTTOM NAVIGATOR
export const AppBottomTabNavigator = createMaterialBottomTabNavigator(
  {
    // Home Route For Bottom Nav
    HomeScreen: {
      screen: Screens.HomeScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => {
          return <HomeIcon fillColor={tintColor} />;
        }
      }
    },

    // Community Route For Bottom Nav
    CommunityScreen: {
      screen: Screens.CommunityScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => {
          return <CommunityIcon fillColor={tintColor} />;
        }
      }
    },

    // Profile Route For Bottom Nav
    ProfileScreen: {
      screen: Screens.ProfileScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => {
          return <UserIcon fillColor={tintColor} />;
        }
      }
    }
  },
  {
    initialRouteName: 'HomeScreen',
    barStyle: { backgroundColor: '#F4F8FB' },
    labeled: false,
    activeColor: '#262F56'
  }
);

// APP AUTH NAVIGATOR
export const AppNavigator = createStackNavigator(
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
    HomeScreen: AppBottomTabNavigator
  },

  {
    initialRouteName: 'SplashScreen',
    headerMode: 'screen',
    defaultNavigationOptions: ({ navigation }) => {
      navigation.state['navigationBackButton'] = navigationBackButton;
      return { headerStyle: customHeaderStyle };
    }
  }
);

export default createAppContainer(AppNavigator);
