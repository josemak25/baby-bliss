import React from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import Button from '../../components/button';
import SlideScreenItem from './SlideScreenItem';
import boxShadow from '../../utils/boxShadows';
import { NavigationInterface } from '../../constants';

import { useThemeContext } from '../../theme';
import { Container, SlideFooter, ReadMoreText, SafeAreaView } from './styles';

export type SlideItem = {
  key: string;
  title: string;
  text: string;
  image: string;
};

interface GetStartedProp extends NavigationInterface {
  slides: SlideItem[];
  testID?: string;
}

export default function GetStarted(props: GetStartedProp) {
  const { colors, fonts } = useThemeContext();

  return (
    <SafeAreaView>
      <Container>
        <AppIntroSlider
          testID="slider"
          slides={props.slides}
          renderItem={SlideScreenItem}
          renderDoneButton={() => null}
          renderNextButton={() => null}
          activeDotStyle={{ backgroundColor: colors.POST_TIP_COLOR }}
          dotStyle={{ backgroundColor: colors.INACTIVE_ICON_COLOR }}
          contentContainerStyle={{ height: '80%' }}
          paginationStyle={{ bottom: 40 }}
        />

        <SlideFooter>
          <ReadMoreText testID="readMore">Swipe to learn more</ReadMoreText>
          <Button
            testID="getStartedButton"
            buttonStyle={[
              {
                backgroundColor: colors.POST_TIP_COLOR,
                borderRadius: 2
              },
              boxShadow({
                elevation: 2,
                color: 'rgba(175, 163, 180, 1)',
                opacity: 0.3,
                radius: 1,
                height: 2.5
              })
            ]}
            textStyle={{
              color: colors.BG_LIGHT_COLOR,
              textTransform: 'uppercase',
              fontFamily: fonts.MONTSERRAT_SEMI_BOLD,
              fontSize: fonts.MEDIUM_SIZE - 1
            }}
            title="Get Started"
            onPress={() => props.navigation.replace('SignUpScreen')}
          />
          <Button
            title="Log in"
            testID="loginButton"
            onPress={() => props.navigation.replace('SignInScreen')}
            textStyle={{
              color: colors.POST_TIP_COLOR,
              fontFamily: fonts.MONTSERRAT_SEMI_BOLD,
              fontSize: fonts.MEDIUM_SIZE,
              textTransform: 'capitalize'
            }}
            buttonStyle={[
              {
                borderRadius: 2
              },
              boxShadow({
                elevation: 0.1,
                color: 'rgba(175, 163, 180, 0.45)',
                opacity: 0.3,
                radius: 10,
                height: 0
              })
            ]}
          />
        </SlideFooter>
      </Container>
    </SafeAreaView>
  );
}

GetStarted.defaultProps = {
  slides: [
    {
      key: 'getAnswer',
      title: 'GET ANSWERS',
      text:
        'Become a part of pregnancy and parenting tribe and have all your question answered by member and expect',
      image: require('../../../assets/images/get-answers.png')
    },
    {
      key: 'newsFeed',
      title: 'NEWS FEED',
      text: 'Get all Insight on everything Pregnancy and Motherhood',
      image: require('../../../assets/images/news.png')
    },
    {
      key: 'shop',
      title: 'SHOP',
      text: 'Easily Shop for everything you need for Your baby',
      image: require('../../../assets/images/shop.png')
    }
  ]
};

GetStarted.navigationOptions = ({ navigationOptions }) => {
  return {
    ...navigationOptions,
    headerTitle: () => null,
    headerLeft: () => null
  };
};
