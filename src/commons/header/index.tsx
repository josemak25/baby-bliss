import React, { FunctionComponent, useEffect } from 'react';
import { useHeaderHeight } from 'react-navigation-stack';

import { Container } from './styles';

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
    <Container style={[{ height: HEADER }, style]} testID={testID}>
      {children}
    </Container>
  );
};

export default Header;
