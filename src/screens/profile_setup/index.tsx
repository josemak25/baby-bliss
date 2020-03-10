import React, { useState, useRef, useEffect } from 'react';
import { Dimensions, StatusBar, AsyncStorage } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Ionicons } from '@expo/vector-icons';
import Animated, { Easing } from 'react-native-reanimated';
import QuestionScreenItem from './QuestionScreenItem';
import { useThemeContext } from '../../theme';
import { useStoreContext } from '../../store';
import { NavigationInterface, STORE_USER_PROFILE } from '../../constants';
import { questions as profileSetupQuestion } from '../../libs/profileSetupQuestion.json';
import applyScale from '../../utils/applyScale';
import userActions from '../../store/user/actions';
import { USER_ACTION_TYPES } from '../../store/user/types';
import interestActions from '../../store/interest/actions';

import {
  Container,
  QuestionContainer,
  QuestionHeader,
  SlideNumber,
  SlideNumberLength,
  SlideNumberContainer,
  GoBack,
  ProgressBar,
  QuestionHeaderContent,
  ProgressBarContainer
} from './styles';

const AnimatedProgressBar = Animated.createAnimatedComponent(ProgressBar);

export type SlideItem = {
  key: string;
  question: string;
  id: number;
};

interface ProfileSetupScreenProp extends NavigationInterface {
  questions: SlideItem[];
  testID?: string;
}

const { width: sliderWidth } = Dimensions.get('window');

export default function ProfileSetupScreen({
  navigation,
  testID,
  questions
}: ProfileSetupScreenProp) {
  const MAX_SLIDES = 6;

  const { colors } = useThemeContext();
  const [{ interestState, userState }, dispatch] = useStoreContext();
  let questionRef = useRef(null);

  const [profile, setProfile] = useState({
    scrollIndex: 0,
    animation: new Animated.Value(62.1),
    userScrolled: false,
    payload: {
      state: null,
      dueDateStart: null,
      hasBirthHospital: false,
      hasHealthMaintenanceOrg: false,
      hasInterestInAntenatalServices: false,
      userInterest: []
    }
  });

  useEffect(() => {
    if (profile.userScrolled) startScrollBarAnimation();

    if (!profile.scrollIndex) interestActions(dispatch);
  }, [profile.scrollIndex]);

  // @ts-ignore
  const handleBackButton = () => questionRef.snapToPrev();

  const startScrollBarAnimation = () => {
    Animated.timing(profile.animation, {
      toValue: applyScale(62.1 * profile.scrollIndex),
      duration: 500,
      easing: Easing.ease
    }).start();
  };

  const handleStateChange = (scrollIndex: number) => {
    setProfile({ ...profile, userScrolled: true, scrollIndex });
  };

  const handleSubmit = async () => {
    if (profile.payload['dueDateStart'] === null) {
      delete profile.payload['dueDateStart'];
    }

    if (profile.payload['state'] === null) {
      delete profile.payload['state'];
    }

    const payload = {
      ...profile.payload,
      userInterest: interestState.interests.reduce((acc, { title, id }) => {
        if (title === profile.payload.userInterest) acc.push(id);
        return acc;
      }, [])
    };

    // dispatch user profile setup here
    await userActions(USER_ACTION_TYPES.COMPLETE_PROFILE)(dispatch, {
      payload,
      id: userState.user.id,
      token: userState.token
    });

    await AsyncStorage.setItem(
      STORE_USER_PROFILE,
      JSON.stringify({
        user: userState.user,
        token: userState.token
      })
    );

    navigation.replace('HomeScreen');
  };

  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      <QuestionHeader>
        <QuestionHeaderContent>
          <GoBack onPress={handleBackButton}>
            {profile.scrollIndex !== 0 && (
              <Ionicons
                name="ios-arrow-back"
                size={25}
                color={colors.FONT_LIGHT_COLOR}
              />
            )}
          </GoBack>
          <SlideNumberContainer>
            <SlideNumber>
              0
              {profile.userScrolled
                ? profile.scrollIndex < MAX_SLIDES
                  ? ++profile.scrollIndex
                  : MAX_SLIDES
                : 1}
            </SlideNumber>
            <SlideNumberLength>/ 0{MAX_SLIDES}</SlideNumberLength>
          </SlideNumberContainer>
        </QuestionHeaderContent>
        <ProgressBarContainer>
          <AnimatedProgressBar
            style={{
              width: profile.animation,
              backgroundColor: colors.FLOATING_MESSAGE_COLOR,
              zIndex: 999
            }}
          />
          <ProgressBar />
        </ProgressBarContainer>
      </QuestionHeader>
      <QuestionContainer>
        <Carousel
          testID="profile-setup-slider"
          ref={c => (questionRef = c)}
          data={questions}
          renderItem={props => (
            <QuestionScreenItem
              {...props}
              questionRef={questionRef}
              setProfile={setProfile}
              profile={profile.payload}
              handleSubmit={handleSubmit}
            />
          )}
          sliderWidth={sliderWidth}
          itemWidth={sliderWidth}
          layout={'stack'}
          layoutCardOffset={10}
          shouldOptimizeUpdates={true}
          onSnapToItem={scrollIndex => handleStateChange(scrollIndex)}
        />
      </QuestionContainer>
    </Container>
  );
}

ProfileSetupScreen.defaultProps = { questions: profileSetupQuestion };

ProfileSetupScreen.navigationOptions = { headerShown: false };
