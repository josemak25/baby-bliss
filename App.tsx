import React, { useState } from 'react';
import { enableScreens } from 'react-native-screens';
import AppLoading from './src/components/AppLoading';
import { StoreProvider } from './src/store';
import AppRouter from './src';
import './src/config';

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);

  enableScreens();

  return isAppReady ? (
    <StoreProvider>
      <AppRouter />
    </StoreProvider>
  ) : (
    <AppLoading setIsAppReady={setIsAppReady} />
  );
}
