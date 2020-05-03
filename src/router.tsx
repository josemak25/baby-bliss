import React from 'react';

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import { customHeaderStyle, navigationBackButton } from './constants';
import Screens from './screens';
import HomeIcon from '../assets/icons/home';
import UserIcon from '../assets/icons/user';
import CommunityIcon from '../assets/icons/community';

// HOME AND POST DETAILS PAGE AUTHORIZATION NAVIGATOR
const HomeNavigator = createStackNavigator(
  {
    // Home Screen Route
    HomeScreen: { screen: Screens.HomeScreen },

    // Blog Details Screen Route
    BlogDetailsScreen: { screen: Screens.BlogDetailsScreen }
  },
  {
    initialRouteName: 'HomeScreen',
    headerMode: 'screen',
    defaultNavigationOptions: ({ navigation }) => {
      navigation.state['navigationBackButton'] = navigationBackButton;
      return { headerStyle: customHeaderStyle };
    }
  }
);

// COMMUNITY AND POST DETAILS PAGE AUTHORIZATION NAVIGATOR
const CommunityNavigator = createStackNavigator(
  {
    // Community Screen Route
    CommunityScreen: { screen: Screens.CommunityScreen },

    // BlogDetails Screen Route
    BlogDetailsScreen: { screen: Screens.BlogDetailsScreen },

    // Post Question Screen Route
    PostQuestionScreen: { screen: Screens.PostQuestionScreen },

    // User Blog Details Screen Route
    UserBlogDetailsScreen: { screen: Screens.UserBlogDetailsScreen }
  },
  {
    initialRouteName: 'CommunityScreen',
    headerMode: 'screen',
    defaultNavigationOptions: ({ navigation }) => {
      navigation.state['navigationBackButton'] = navigationBackButton;
      return { headerStyle: customHeaderStyle };
    }
  }
);

// APP BOTTOM NAVIGATOR
export const AppBottomTabNavigator = createMaterialBottomTabNavigator(
  {
    HomeScreen: {
      screen: HomeNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => {
          return <HomeIcon fillColor={tintColor} />;
        }
      }
    },
    CommunityScreen: {
      screen: CommunityNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => {
          return (
            <CommunityIcon fillColor={tintColor} testID="CommunityTabIcon" />
          );
        }
      }
    },
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

// APP AUTHENTICATION NAVIGATOR
const AppNavigator = createStackNavigator(
  {
    // Forgot Password Screen Route
    ForgotPasswordScreen: { screen: Screens.ForgotPasswordScreen },

    // Splash Screen Route
    SplashScreen: { screen: Screens.SplashScreen },

    // Profile Setup Screen Route
    ProfileSetupScreen: { screen: Screens.ProfileSetupScreen },

    // Get started Screen Route
    GetStartedScreen: { screen: Screens.GetStartedScreen },

    // Sign Up Screen Route
    SignUpScreen: { screen: Screens.SignUpScreen },

    // Sign In Screen Route
    SignInScreen: { screen: Screens.SignInScreen },

    // Home Screen Route
    HomeScreen: {
      screen: AppBottomTabNavigator,
      navigationOptions: { headerStyle: customHeaderStyle, headerShown: false }
    }
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
