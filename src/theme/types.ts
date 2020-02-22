import 'styled-components';

// All app colors
enum COLORS {
  BD_DARK_COLOR = '#FFFFFF',
  BG_LIGHT_COLOR = '#FFFFFF',
  FONT_DARK_COLOR = '#0D0E10',
  FONT_LIGHT_COLOR = '#2E2D2D',
  INACTIVE_ICON_COLOR = '#D7D8DA',
  LIKE_POST_COLOR = '#F42850',
  POST_TIP_COLOR = '#50AE7C',
  FLOATING_MESSAGE_COLOR = '#3CB6AB'
}

// All app font sizes
enum FONTS {
  SMALL_SIZE = 10,
  MEDIUM_SIZE = 12,
  LARGE_SIZE = 15,
  FAMILY_REGULAR = 'montserrat-regular',
  FAMILY_MEDIUM = 'montserrat-medium',
  FAMILY_BOLD = 'montserrat-bold',
  FAMILY_SEMI_BOLD = 'montserrat-semi-bold',
  FAMILY_IBM = 'IBM-regular',
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
      FONT_MILK_COLOR: string;
    };

    // All Global App Font Sizes
    fonts: {
      SMALL_SIZE: number;
      MEDIUM_SIZE: number;
      LARGE_SIZE: number;
      FAMILY_REGULAR: string;
      FAMILY_MEDIUM: string;
      FAMILY_BOLD: string;
      FAMILY_SEMI_BOLD: string;
      FAMILY_IBM: string;
      FONT_WEIGHT_LIGHT: number;
      FONT_WEIGHT_MEDIUM: number;
      FONT_WEIGHT_HEAVY: number;
    };
  }
}

// App theme
export const theme = { colors: COLORS, fonts: FONTS };
