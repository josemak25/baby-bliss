import React, { FunctionComponent } from 'react';

import { Container } from './styles';

type PostProps = {
  style?: {};
  testID?: string;
  onPress?(): void;
  onLayout?(): void;
};

const Post: FunctionComponent<PostProps> = props => {
  return <Container {...props}>{props.children}</Container>;
};

export default Post;
