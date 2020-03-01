import React from 'react';
import { Text, View } from 'react-native';
import { fireEvent, render } from '@testing-library/react-native';
import Theme from '../../../src/theme';
import Card from '../../../src/components/card';

describe('TEST CARD COMPONENT(<Card/>)', () => {
  const onPress = jest.fn();

  const { getByTestId } = render(
    <Theme>
      <Card testID="card-container" onPress={onPress}>
        <View>
          <Text>card component children</Text>
        </View>
      </Card>
    </Theme>
  );

  test('It renders the card <Card/> component accurately', () => {
    const cardContainer = getByTestId('card-container');
    expect(cardContainer).toBeTruthy();
  });

  test('It renders other components passed as children to the card <Card/> component accurately', () => {
    const cardContainer = getByTestId('card-container');
    expect(cardContainer.children).toBeTruthy();
  });

  test('card component on render can be clicked', () => {
    const cardContainer = getByTestId('card-container');
    expect(fireEvent.press(cardContainer)).toBeTruthy();
    expect(onPress).toHaveBeenCalled();
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
