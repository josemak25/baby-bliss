import React from 'react';

import Button from '../../components/button';
import { Container, Welcome } from './styles';

export default function Splash() {
  return (
    <Container>
      <Welcome>Splash Screen</Welcome>
      <Button title="Splash screen button" />
    </Container>
  );
}
