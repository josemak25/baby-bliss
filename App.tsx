import React, { useState } from 'react';
import AppLoading from './src/components/AppLoading';
import AppRouter from './src';
import './src/config';

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);

  return isAppReady ? (
    <AppRouter />
  ) : (
    <AppLoading setIsAppReady={setIsAppReady} />
  );
}
