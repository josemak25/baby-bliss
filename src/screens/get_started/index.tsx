import React, { useContext } from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import { ThemeContext } from 'styled-components';
import {
  NavigationScreenProp,
  NavigationParams,
  NavigationState
} from 'react-navigation';
import Button from '../../components/button';
import boxShadow from '../../utils/boxShadows';
import { Container, SlideFooter, ReadMoreText } from './styles';
import SlideScreenItem from './SlideScreenItem';

export type SlideItem = {
  key: string;
  title: string;
  text: string;
  image: string;
};

interface GetStartedProp {
  slides: SlideItem[];
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const GetStarted = (props: GetStartedProp) => {

  const { colors, fonts } = useContext(ThemeContext);

  return (
    <Container>
      <AppIntroSlider
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
        <ReadMoreText>
          Swipe to learn more
      </ReadMoreText>
        <Button
          buttonStyle={[{
            backgroundColor: colors.POST_TIP_COLOR,
            borderRadius: 2
          }, boxShadow({
            elevation: 2,
            color: 'rgba(175, 163, 180, 1)',
            opacity: 0.3,
            radius: 1,
            height: 2.5
          })]}
          textStyle={{
            color: colors.BG_LIGHT_COLOR,
            textTransform: 'uppercase',
            fontFamily: fonts.MONTSERRAT_SEMI_BOLD,
            fontSize: fonts.MEDIUM_SIZE - 1
          }}
          title="Get Started"
          onPress={() => props.navigation.navigate('HomeScreen')}
        />
        <Button
          title="Log in"
          onPress={() => props.navigation.navigate('HomeScreen')}
          textStyle={{
            color: colors.POST_TIP_COLOR,
            fontFamily: fonts.MONTSERRAT_SEMI_BOLD,
            fontSize: fonts.MEDIUM_SIZE,
            textTransform: 'capitalize',
          }}
          buttonStyle={[{
            borderRadius: 2
          }, boxShadow({
            elevation: 0.1,
            color: 'rgba(175, 163, 180, 0.45)',
            opacity: 0.3,
            radius: 10,
            height: 0
          })]}
        />
      </SlideFooter>
    </Container>
  );
};

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
export default GetStarted;
