import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { customHeaderStyle } from './constants';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Screens from './screens';
import { theme } from './theme/types';
import { Ionicons } from '@expo/vector-icons';
import HomeIcon from '../assets/icons/home';
import UserIcon from '../assets/icons/user';
import CommunityIcon from '../assets/icons/community';

const { colors, fonts } = theme;

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

const BottomTabNavigation = createBottomTabNavigator(
  {
    Home: {
      screen: AppNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <HomeIcon />
      }
    },
    Community: {
      screen: Screens.CommunityScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <CommunityIcon />
      }
    },
    Profile: {
      screen: Screens.ProfileScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <UserIcon />
      }
    }
  },
  {
    defaultNavigationOptions: {
      tabBarLabel: () => null
    },
    tabBarOptions: {
      activeTintColor: colors.POST_TIP_COLOR,
      labelStyle: {
        fontFamily: `${fonts.MONTSERRAT_REGULAR}`
      }
    }
  }
);

export default createAppContainer(BottomTabNavigation);
