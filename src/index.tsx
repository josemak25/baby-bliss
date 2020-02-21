import React, { useEffect } from 'react';
import Router from './router';
import { StoreProvider } from './store';
import ThemeProvider from './theme';

export default function AppRouter() {
  useEffect(() => {
    // call network for all post
  }, []);

  return (
    <StoreProvider>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </StoreProvider>
  );
}
