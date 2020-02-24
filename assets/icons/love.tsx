import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { useThemeContext } from '../../src/theme';

type LoveIconProps = {
  isFill: boolean;
  width: string;
  height: string;
};

export default function PhoneIcon(props: LoveIconProps) {
  const { colors } = useThemeContext();

  return (
    <Svg width="70%" height="70%" viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M12 21.054C-8 10 6-2 12 5.588 18-2 32 10 12 21.054z"
        fill={
          props.isFill ? colors.LIKE_POST_COLOR : colors.INACTIVE_ICON_COLOR
        }
      />
    </Svg>
  );
}
