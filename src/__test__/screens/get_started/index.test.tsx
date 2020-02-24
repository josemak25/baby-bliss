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

let props: any;
let queryByTestIdGlobal: any;

beforeEach(() => {
    props = createNavigationTestProps({ slides });
    const { queryByTestId } = render(
        <Theme>
            <GetStarted {...props} />
        </Theme>
    );
    queryByTestIdGlobal = queryByTestId;
});

describe('<GetStarted/>', () => {

    test('It renders the App intro Slider component', () => {
        const appSliderComponent = queryByTestIdGlobal('slider');
        expect(appSliderComponent).toBeTruthy();
        const readMoreText = queryByTestIdGlobal('readMore');
        expect(readMoreText).toBeTruthy();
    });

    test('the length of the slides in the props to be 2', () => {
        expect(props.slides.length).toBe(2);
        expect(props.slides).toEqual(slides);
    });

    test('That the login button was pressed', () => {
        const loginButton = queryByTestIdGlobal('loginButton');
        expect(loginButton).toBeTruthy();
        fireEvent.press(queryByTestIdGlobal('loginButton'));
        expect(props.navigation.navigate).toHaveBeenCalledTimes(1);
        expect(props.navigation.navigate).toHaveBeenCalledWith('HomeScreen');
    });

    test('That the sigUp button was pressed', () => {
        const signUpButton = queryByTestIdGlobal('getStartedButton');
        expect(signUpButton).toBeTruthy();
        fireEvent.press(queryByTestIdGlobal('getStartedButton'));
        expect(props.navigation.navigate).toHaveBeenCalledTimes(1);
        expect(props.navigation.navigate).toHaveBeenCalledWith('SignUp');
    });
});
