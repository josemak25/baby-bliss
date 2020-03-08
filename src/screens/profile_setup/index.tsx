import React, { useState, useRef, useEffect } from 'react';
import { AsyncStorage, Dimensions, StatusBar } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Ionicons } from '@expo/vector-icons';
import Animated, { Easing } from 'react-native-reanimated';
import QuestionScreenItem from './QuestionScreenItem';
import { useThemeContext } from '../../theme';
import { useStoreContext } from '../../store';
import { NavigationInterface } from '../../constants';
import { questions as profileSetupQuestion } from '../../libs/profileSetupQuestion.json';
import applyScale from '../../utils/applyScale';

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
  const { colors } = useThemeContext();
  const [, dispatch] = useStoreContext();

  let questionRef = useRef(null);

  const [profile, setProfile] = useState({
    scrollIndex: 0,
    animation: new Animated.Value(0),
    payload: {
      birthDueDate: new Date().toDateString(),
      address: '',
      birthHospital: '',
      hasHMO: '',
      antenatalInterest: '',
      userInterest: ''
    }
  });

  useEffect(() => {
    startScrollBarAnimation();
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
    setProfile({ ...profile, scrollIndex });
  };

  const handleSubmit = () => {
    // dispatch user profile setup here
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
            <SlideNumber>0{++profile.scrollIndex} </SlideNumber>
            <SlideNumberLength>
              / 0{profileSetupQuestion.length}
            </SlideNumberLength>
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
