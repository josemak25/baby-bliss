import React, { useState } from 'react';

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { customHeaderStyle } from './constants';
import Screens from './screens';
import { theme } from './theme/types';
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

const BottomTabNavigation = createBottomTabNavigator(
  {
    Home: {
      screen: AppNavigator,
      navigationOptions: ({ navigation: { getParam } }) => {
        return {
          tabBarIcon: ({ focused }) => {
            const home = getParam('home');
            return <HomeIcon isFilled={home} />;
          },
          tabBarOnPress: ({ navigation: { setParams } }) => {
            setParams({
              home: true,
              community: null,
              userIcon: null
            });
          }
        };
      }
    },
    Community: {
      screen: Screens.CommunityScreen,
      navigationOptions: ({ navigation: { getParam } }) => {
        return {
          tabBarIcon: ({ focused }) => {
            const community = getParam('community');

            return <CommunityIcon isFilled={community} />;
          },
          tabBarOnPress: ({ navigation: { setParams } }) => {
            setParams({
              home: null,
              community: true,
              userIcon: null
            });
          }
        };
      }
    },
    Profile: {
      screen: Screens.ProfileScreen,
      navigationOptions: ({ navigation: { getParam } }) => {
        return {
          tabBarIcon: ({ focused }) => {
            const userIcon = getParam('userIcon');

            return <UserIcon isFilled={userIcon} />;
          },
          tabBarOnPress: ({ navigation: { setParams } }) => {
            setParams({
              home: false,
              community: false,
              userIcon: true
            });
          }
        };
      }
    }
  },
  {
    defaultNavigationOptions: {
      tabBarLabel: () => null //to turn off the labe that normally appears under the bottom tab icon.
    },
    initialRouteName: 'Home'
  }
);

export default createAppContainer(BottomTabNavigation);
