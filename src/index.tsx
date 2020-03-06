import React from 'react';
import Router from './router';
import { StoreProvider } from './store';
import ThemeProvider from './theme';

export default function AppRouter() {
  return (
    <StoreProvider>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </StoreProvider>
  );
}
