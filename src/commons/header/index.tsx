import React, { FunctionComponent, useEffect } from 'react';
import Animated from 'react-native-reanimated';
import { useHeaderHeight } from 'react-navigation-stack';

import { Container } from './styles';

const AnimatedContainer = Animated.createAnimatedComponent(Container);

type HeaderProps = {
  testID?: string;
  style?: object;
};

let HEADER: number | null = null;
const Header: FunctionComponent<HeaderProps> = ({
  children,
  testID,
  style
}) => {
  const height = useHeaderHeight();
  useEffect(() => {
    if (HEADER) return;
    HEADER = height;
  }, []);

  return (
    <AnimatedContainer style={[{ height: HEADER }, style]} testID={testID}>
      {children}
    </AnimatedContainer>
  );
};

export default Header;
