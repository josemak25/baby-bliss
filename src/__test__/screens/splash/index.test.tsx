import React from 'react';
import { render, act } from '@testing-library/react-native';
import SplashScreen from '../../../screens/splash';
import Theme from '../../../theme';
import { createNavigationTestProps } from '../../../constants';

const mountComponent = () => {
  const props: any = createNavigationTestProps();
  const renderedProps = render(
    <Theme>
      <SplashScreen {...props} />
    </Theme>
  );
  return { props, ...renderedProps };
};

describe('TEST SPLASH COMPONENT(<SplashScreen/>)', () => {
  test('It renders splash component correctly', () => {
    const { queryByTestId } = mountComponent();
    const SplashComponent = queryByTestId('app-container');
    expect(SplashComponent).toBeTruthy();
  });

  test('App Icon Image was successfully loaded and rendered into DOM', () => {
    const { queryByTestId } = mountComponent();
    const appIconImage = queryByTestId('app-icon');
    expect(appIconImage).toBeTruthy();
  });

  test('Pregnancy Action Image was successfully rendered into DOM after App Icon display', async () => {
    jest.useFakeTimers();
    const { queryByTestId } = mountComponent();
    act(() => jest.advanceTimersByTime(4000));
    const PregnancyImage = queryByTestId('pregnancy-photo');
    expect(PregnancyImage).toBeTruthy();
  });

  test('App successfully navigated to home page after splash screen is done loading', async () => {
    jest.useFakeTimers();
    const { props } = mountComponent();
    act(() => jest.advanceTimersByTime(4000));
    expect(props.navigation.replace).toHaveBeenCalled();
    expect(props.navigation.replace).toBeCalledWith('HomeScreen');
    expect(props.navigation.replace).toHaveBeenCalledTimes(1);
  });
});
