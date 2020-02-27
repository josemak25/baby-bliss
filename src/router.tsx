import React from 'react';

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import { customHeaderStyle } from './constants';
import Screens from './screens';
import HomeIcon from '../assets/icons/home';
import UserIcon from '../assets/icons/user';
import CommunityIcon from '../assets/icons/community';

const AppNavigator = createStackNavigator(
  {
    // Splash Route
    SplashScreen: { screen: Screens.SplashScreen },

    // Get started Route
    GetStartedScreen: { screen: Screens.GetStartedScreen },

    // Sign up Route
    SignUpScreen: { screen: Screens.SignUpScreen },

    //Home Route
    HomeScreen: Screens.HomeScreen
  },

  {
    initialRouteName: 'SplashScreen',
    headerMode: 'screen',
    defaultNavigationOptions: { headerStyle: customHeaderStyle }
  }
);

const BottomTabNavigation = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: AppNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => {
          return <HomeIcon fillColor={tintColor} />;
        }
      }
    },
    Community: {
      screen: Screens.CommunityScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => {
          return <CommunityIcon fillColor={tintColor} />;
        }
      }
    },
    Profile: {
      screen: Screens.ProfileScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => {
          return <UserIcon fillColor={tintColor} />;
        }
      }
    }
  },
  {
    initialRouteName: 'Home',
    barStyle: { backgroundColor: '#F4F8FB' },
    labeled: false,
    activeColor: '#262F56'
  }
);

export default createAppContainer(BottomTabNavigation);
