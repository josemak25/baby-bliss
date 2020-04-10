import React, { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';
import Router from './router';
import ThemeProvider from './theme';
import showSnackbar from './commons/snackbar';

export default function AppRouter() {
  const [isConnected, setIsConnected] = useState(true);

  const subscribe = () => {
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      handleConnectivityChange
    );
  };

  const unsubscribe = () => {
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      handleConnectivityChange
    );
  };

  useEffect(() => {
    subscribe();
    if (!isConnected) {
      showSnackbar('#F42850', 'No Internet Connection!', true);
      return;
    }
    return () => unsubscribe();
  }, [isConnected]);

  const handleConnectivityChange = (isConnected: boolean) => {
    setIsConnected(isConnected);
  };

  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}
