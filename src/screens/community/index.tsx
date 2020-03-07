import React, { useState, useEffect, Fragment } from 'react';
import { Animated, Easing, Dimensions, StatusBar } from 'react-native';
import LottieView from 'lottie-react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import { useStoreContext } from '../../store';
import GeneralRouteContainer from './generalRoute';
import RouteContainer from './routeContainer';
import { useThemeContext } from '../../theme';
import { NavigationInterface } from '../../constants';

import { LogoContainer, Logo, AskQuestion } from './styles';
import postCategoryActions from '../../store/category/actions';
import { CATEGORY_ACTION_TYPES } from '../../store/category/types';
import postsActions from '../../store/posts/actions';
import { POST_ACTION_TYPES } from '../../store/posts/types';

interface CommunityScreenProp extends NavigationInterface {
  testID?: string;
}

export default function CommunityScreen(props: CommunityScreenProp) {
  const { colors, fonts } = useThemeContext();

  const [{ categoryState, userState }, dispatch] = useStoreContext();

  const [state, setState] = useState({
    animateMessageIcon: new Animated.Value(0),
    currentRoute: 0,
    communityRoutes: [
      { key: 'general', title: 'general' },
      ...categoryState.categories
    ],
    isLiked: true
  });

  const handleLikePost = (id: string, postIndex: number) => {
    postCategoryActions(CATEGORY_ACTION_TYPES.LIKE_POST)(dispatch, {
      id,
      postIndex,
      authToken: userState.token,
      isLiked: state.isLiked
    });
    setState({
      ...state,
      isLiked: !state.isLiked //toggle the like property
    });
  };

  useEffect(() => {
    startLikeAnimation(null);
    postCategoryActions(CATEGORY_ACTION_TYPES.FETCH_CATEGORY_POSTS)(dispatch, {
      authToken: userState.token,
      categories: [...state.communityRoutes.slice(1)]
    });
  }, []);

  const startLikeAnimation = (userPressed: string | null) => {
    state.animateMessageIcon.setValue(0);
    Animated.timing(state.animateMessageIcon, {
      toValue: 1,
      duration: 1300,
      easing: Easing.linear,
      useNativeDriver: true
    }).start(() => (userPressed ? askQuestion() : null));
  };

  const askQuestion = () => {
    props.navigation.navigate('PostQuestionScreen');
  };

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: colors.POST_TIP_COLOR,
        width: 60,
        marginLeft: 20
      }}
      style={{ backgroundColor: colors.BD_DARK_COLOR, paddingLeft: 18 }}
      activeColor={colors.FONT_DARK_COLOR}
      inactiveColor={colors.FONT_LIGHT_COLOR}
      labelStyle={{
        fontFamily: fonts.MONTSERRAT_BOLD,
        textTransform: 'capitalize',
        width: 150
      }}
      tabStyle={{ height: 50, width: 150 }}
      scrollEnabled={true}
    />
  );

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'general':
        return (
          <GeneralRouteContainer
            navigation={props.navigation}
            handleLikePost={handleLikePost}
          />
        );
      default:
        return (
          <RouteContainer
            navigation={props.navigation}
            categoryId={route._id}
            handleLikePost={handleLikePost}
          />
        );
    }
  };

  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <AskQuestion
        style={{
          shadowColor: colors.INACTIVE_ICON_COLOR,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 5,
          elevation: 4
        }}
        onPress={() => startLikeAnimation('userPressed')}
      >
        <LottieView
          source={require('../../../assets/animations/ask_question.json')}
          style={{
            height: 60,
            width: 60,
            alignContent: 'center',
            justifyContent: 'center',
            top: 1,
            right: 0.2
          }}
          progress={state.animateMessageIcon}
        />
      </AskQuestion>
      <TabView
        navigationState={{
          index: state.currentRoute,
          routes: state.communityRoutes
        }}
        renderScene={renderScene}
        onIndexChange={currentRoute => setState({ ...state, currentRoute })}
        initialLayout={{ width: Dimensions.get('window').width }}
        renderTabBar={renderTabBar}
        swipeVelocityImpact={10}
        lazy={true}
      />
    </Fragment>
  );
}

CommunityScreen.navigationOptions = () => ({
  headerTitle: () => null,
  headerLeft: () => (
    <LogoContainer>
      <Logo
        source={require('../../../assets/images/logo.png')}
        style={{ resizeMode: 'contain' }}
      />
    </LogoContainer>
  )
});
