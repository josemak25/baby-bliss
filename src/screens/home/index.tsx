import React from 'react';

import Button from '../../components/button';
import { Container, Welcome } from './styles';

export default function Home() {
  return (
    <Container>
      <Button title="Home screen button" />
      <Welcome>Home Screen</Welcome>
    </Container>
  );
}
