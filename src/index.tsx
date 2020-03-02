import React, { useEffect, useState } from 'react';
import Router from './router';
import ThemeProvider from './theme';
import NetInfo from '@react-native-community/netinfo';
import showSnackbar from './components/UI/snackbar';
import { useStoreContext } from './store';
import postsActions from './store/posts/actions';
import { POST_ACTION_TYPES } from './store/posts/types';

export default function AppRouter() {
  const [isConnected, setIsConnected] = useState(true);
  const [, dispatch] = useStoreContext();

  const subscribe = () => {
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      handleConnectivityChange
    );
  };

  const unsubscribe = () => {
    console.log('unsubscribe');

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
    postsActions(POST_ACTION_TYPES.LOAD_POSTS)(dispatch);
    return () => unsubscribe();
  }, []);
  const handleConnectivityChange = (isConnected: boolean) => {
    console.log('handleConnectivityChange', isConnected);

    setIsConnected(isConnected);
  };

  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}
