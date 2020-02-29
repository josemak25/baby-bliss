import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import GetStarted from '../../../screens/get_started';
import Theme from '../../../theme';
import { createNavigationTestProps } from '../../../constants';

const slides = [
  {
    key: 'getAnswer',
    title: 'GET ANSWERS',
    text:
      'Become a part of pregnancy and parenting tribe and have all your question answered by member and expect',
    image: require('../../../../assets/images/get-answers.png')
  },
  {
    key: 'newsFeed',
    title: 'NEWS FEED',
    text: 'Get all Insight on everything Pregnancy and Motherhood',
    image: require('../../../../assets/images/news.png')
  }
];

const mountComponent = () => {
  const props: any = createNavigationTestProps({ slides });
  const renderedProps = render(
    <Theme>
      <GetStarted {...props} />
    </Theme>
  );
  return { props, ...renderedProps };
};

describe(' TEST GET_STARTED COMPONENT(<GetStarted/>)', () => {
  test('It renders the App intro Slider component', () => {
    const { queryByTestId } = mountComponent();
    const appSliderComponent = queryByTestId('slider');
    expect(appSliderComponent).toBeTruthy();
    const readMoreText = queryByTestId('readMore');
    expect(readMoreText).toBeTruthy();
  });

  test('the length of the slides in the props to be 2', () => {
    const { props } = mountComponent();
    expect(props.slides.length).toBe(2);
    expect(props.slides).toEqual(slides);
  });

  test('That the login button was pressed', () => {
    const { props, queryByTestId } = mountComponent();
    const loginButton = queryByTestId('loginButton');
    expect(loginButton).toBeTruthy();
    fireEvent.press(queryByTestId('loginButton'));
    expect(props.navigation.replace).toHaveBeenCalledTimes(1);
    expect(props.navigation.replace).toHaveBeenCalledWith('SignInScreen');
  });

  test('That the sigUp button was pressed', () => {
    const { props, queryByTestId } = mountComponent();
    const signUpButton = queryByTestId('getStartedButton');
    expect(signUpButton).toBeTruthy();
    fireEvent.press(queryByTestId('getStartedButton'));
    expect(props.navigation.replace).toHaveBeenCalledTimes(1);
    expect(props.navigation.replace).toHaveBeenCalledWith('SignUpScreen');
  });
});
