import 'styled-components';

// All app colors
enum COLORS {
  BD_DARK_COLOR = '#00B1BB',
  BG_LIGHT_COLOR = '#FFFFFF',
  FONT_DARK_COLOR = '#333333',
  FONT_MILK_COLOR = '#F5F5F5'
}

// All app font sizes
enum FONTS {
  SMALL_SIZE = 10,
  MEDIUM_SIZE = 12,
  LARGE_SIZE = 15,
  FAMILY_REGULAR = 'notosans-regular',
  FAMILY_BOLD = 'notosans-bold',
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
      FAMILY_BOLD: string;
      FONT_WEIGHT_LIGHT: number;
      FONT_WEIGHT_MEDIUM: number;
      FONT_WEIGHT_HEAVY: number;
    };
  }
}

// App theme
export const theme = { colors: COLORS, fonts: FONTS };
