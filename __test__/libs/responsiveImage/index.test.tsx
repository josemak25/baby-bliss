import React from 'react';
import { View } from 'react-native';
import { render } from '@testing-library/react-native';
import Theme from '../../../src/theme';
import ResponsiveImage from '../../../src/libs/responsiveImage';

jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock')
);

const mountComponent = () => {
  const renderedProps = render(
    <Theme>
      <View testID="image-container">
        <ResponsiveImage imageUrl="1" />
      </View>
    </Theme>
  );
  return { ...renderedProps };
};

describe('TEST RESPONSIVE IMAGE COMPONENT(<ResponsiveImage/>)', () => {
  test('It renders the responsive image <ResponsiveImage/> component accurately', () => {
    const { getByTestId } = mountComponent();
    const ImageContainer = getByTestId('image-container');
    expect(ImageContainer).toBeTruthy();
  });

  test('It renders the images currently', () => {
    const { getByTestId } = mountComponent();
    const imageThumbnail = getByTestId('image-thumbnail');
    const imageData = getByTestId('image-data');
    expect(imageThumbnail).toBeTruthy();
    expect(imageData).toBeTruthy();
  });
});
