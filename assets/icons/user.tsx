import * as React from 'react';
import Svg, { Path, Ellipse } from 'react-native-svg';
import { IconProps } from '../../src/constants';
import { useThemeContext } from '../../src/theme';

export default function UserIcon(props: IconProps) {
  const { fillColor, useCase } = props;
  const { colors } = useThemeContext();

  return (
    <Svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" {...props}>
      <Ellipse
        cx={12}
        cy={6.5}
        rx={4}
        ry={4.5}
        stroke={colors.ACTIVE_TAB_COLOR}
        fill={
          fillColor === colors.ACTIVE_TAB_COLOR
            ? useCase
              ? colors.BG_LIGHT_COLOR
              : fillColor
            : colors.BG_LIGHT_COLOR
        }
        strokeWidth={1.8}
      />
      <Path
        d="M20 19c0 3.5-4 2.5-8 2.5s-8 1-8-2.5c0-2 3.582-4.5 8-4.5s8 2.5 8 4.5z"
        stroke={colors.ACTIVE_TAB_COLOR}
        strokeWidth={1.8}
        fill={
          fillColor === colors.ACTIVE_TAB_COLOR
            ? useCase
              ? colors.BG_LIGHT_COLOR
              : fillColor
            : colors.BG_LIGHT_COLOR
        }
      />
    </Svg>
  );
}
