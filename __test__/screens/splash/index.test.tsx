import React from 'react';
import { render, act } from '@testing-library/react-native';
import SplashScreen from '../../../src/screens/splash';
import Theme from '../../../src/theme';
import { createNavigationTestProps } from '../../../src/constants';
import { StoreProvider } from '../../../src/store';

const mountComponent = () => {
  const props: any = createNavigationTestProps();
  const renderedProps = render(
    <StoreProvider>
      <Theme>
        <SplashScreen {...props} />
      </Theme>
    </StoreProvider>
  );
  return { props, ...renderedProps };
};

describe('TEST SPLASH COMPONENT(<SplashScreen/>)', () => {
  test('It renders splash component correctly', () => {
    jest.useFakeTimers();
    const { queryByTestId } = mountComponent();
    act(() => jest.advanceTimersByTime(4000));
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
});
