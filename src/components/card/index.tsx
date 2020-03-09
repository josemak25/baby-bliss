import React, { FunctionComponent } from 'react';

import { Container } from './styles';

type PostProps = {
  style?: {};
  testID?: string;
  onPress?(): void;
  onLayout?(): void;
};

const Card: FunctionComponent<PostProps> = props => {
  return <Container {...props}>{props.children}</Container>;
};

export default Card;
