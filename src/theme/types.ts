import 'styled-components';

// All app colors
enum COLORS {
  BD_DARK_COLOR = '#F4F8FB',
  BG_LIGHT_COLOR = '#FFFFFF',
  FONT_DARK_COLOR = '#0D0E10',
  FONT_LIGHT_COLOR = '#68696F',
  INACTIVE_ICON_COLOR = '#D7D8DA',
  LIKE_POST_COLOR = '#F42850',
  POST_TIP_COLOR = '#50AE7C',
  FLOATING_MESSAGE_COLOR = '#3CB6AB',
  IDLE_INPUT_COLOR = '#e6ebee',
  GRADIENT_COLOR_FROM = '#53AF7E',
  GRADIENT_COLOR_TO = '#3CB6AB',
  ACTIVE_TAB_COLOR = '#262F56'
}

// All app font sizes
enum FONTS {
  SMALL_SIZE = 10,
  MEDIUM_SIZE = 12,
  LARGE_SIZE = 15,
  MONTSERRAT_REGULAR = 'montserrat-regular',
  MONTSERRAT_MEDIUM = 'montserrat-medium',
  MONTSERRAT_BOLD = 'montserrat-bold',
  MONTSERRAT_SEMI_BOLD = 'montserrat-semi-bold',
  IBM_SANS_REGULAR = 'IBM-regular',
  PACIFICO_REGULAR = 'pacifico-regular',
  FONT_WEIGHT_LIGHT = 200,
  FONT_WEIGHT_MEDIUM = 600,
  FONT_WEIGHT_HEAVY = 800
}

declare module 'styled-components' {
  export interface DefaultTheme {
    // All Global App Colors
    colors: {
      BD_DARK_COLOR: string;
      BG_LIGHT_COLOR: string;
      FONT_DARK_COLOR: string;
      FONT_LIGHT_COLOR: string;
      INACTIVE_ICON_COLOR: string;
      LIKE_POST_COLOR: string;
      POST_TIP_COLOR: string;
      FLOATING_MESSAGE_COLOR: string;
      IDLE_INPUT_COLOR: string;
      GRADIENT_COLOR_FROM: string;
      GRADIENT_COLOR_TO: string;
      ACTIVE_TAB_COLOR: string;
    };

    // All Global App Font Sizes
    fonts: {
      SMALL_SIZE: number;
      MEDIUM_SIZE: number;
      LARGE_SIZE: number;
      MONTSERRAT_REGULAR: string;
      MONTSERRAT_MEDIUM: string;
      MONTSERRAT_BOLD: string;
      MONTSERRAT_SEMI_BOLD: string;
      IBM_SANS_REGULAR: string;
      PACIFICO_REGULAR: string;
      FONT_WEIGHT_LIGHT: number;
      FONT_WEIGHT_MEDIUM: number;
      FONT_WEIGHT_HEAVY: number;
    };
  }
}

// App theme
export const theme = { colors: COLORS, fonts: FONTS };
