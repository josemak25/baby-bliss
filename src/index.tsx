import React, { useEffect, useState } from 'react';
import Router from './router';
import ThemeProvider from './theme';
import showSnackbar from './commons/snackbar';

export default function AppRouter() {
  const [{ connectionState }] = useStoreContext();
  const [state, setState] = useState({ isFirstLaunch: true });

  useEffect(() => {
    if (state.isFirstLaunch) {
      return setState({ isFirstLaunch: false });
    }
    if (connectionState.isConnected) {
      showSnackbar('#50AE7C', 'Connection is back!');
    } else {
      showSnackbar('#F42850', 'No Internet Connection!', true);
    }
  }, [connectionState.isConnected]);

  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}
