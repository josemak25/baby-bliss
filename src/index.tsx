import React from 'react';
import Router from './router';
import ThemeProvider from './theme';
import { useNetInfo } from '@react-native-community/netinfo';
import showSnackbar from './commons/snackbar';

export default function AppRouter() {
  const { isConnected, isInternetReachable } = useNetInfo();

  switch (true) {
    case isConnected && !isInternetReachable:
      showSnackbar('#F42850', 'Internet is not reachable!');
      break;

    case !isConnected && !isInternetReachable:
      showSnackbar('#F42850', 'You are not connected to Internet!', true);
      break;

    default:
      showSnackbar('#50AE7C', 'Internet is back!');
  }

  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}
