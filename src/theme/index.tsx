import React, { FunctionComponent } from 'react';
import { ThemeProvider } from 'styled-components/native';

import { theme } from './types';

const Theme: FunctionComponent = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
