import React from 'react';
import boxShadow from '../../utils/boxShadows';

import { Container, ButtonText } from './styles';

type ButtonProps = {
  buttonStyle?: {};
  textStyle?: {};
  testID?: string;
  title: string;
  onPress?(): void;
};

export default function Button(props: ButtonProps) {
  const { title, buttonStyle, textStyle } = props;

  return (
    <Container style={buttonStyle} {...props}>
      <ButtonText style={textStyle}>{title}</ButtonText>
    </Container>
  );
}
