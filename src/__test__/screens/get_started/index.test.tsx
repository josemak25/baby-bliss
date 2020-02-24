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
let mockedNavigator: any;


// beforeAll(() => {
//     props = createNavigationTestProps({ slides })
//     console.log(props);

//     mockedNavigator = jest.fn(() => {
//         return props.navigation.navigate()
//     })
//     console.log("mockedNavigator", mockedNavigator);


// });

describe('<GetStarted/>', () => {
    props = createNavigationTestProps({ slides });

    const { getByText, queryByTestId } = render(
        <Theme>
            <GetStarted testID='slider' {...props} />
        </Theme>
    );

    test('It renders the App intro Slider component', () => {
        const appSliderComponent = queryByTestId('slider');
        expect(appSliderComponent).toBeTruthy();
        const readMoreText = queryByTestId('readMore');
        expect(readMoreText).toBeTruthy();
    });

    test('the length of the slides in the props to be 2', () => {
        // expect(props.navigation['slides']).toBe(1);
    });

    test('That the login button was pressed', () => {
        const loginButton = queryByTestId('loginButton');
        expect(loginButton).toBeTruthy();

        // fireEvent.press(queryByTestId('loginButton');
        // it('calls the onPress handler', () => {
        //     expect(mockedNavigator).toHaveBeenCalledTimes(1);
        // });
    });
});
