import * as React from 'react';
import Svg, { Path, Ellipse } from 'react-native-svg';
import { IconProps } from '../../src/constants';

export default function UserIcon(props: IconProps) {
  const { isFilled = false } = props;
  return (
    <Svg width="40%" height="40%" viewBox="0 0 24 24" fill="none" {...props}>
      <Ellipse
        cx={12}
        cy={6.5}
        rx={4}
        ry={4.5}
        stroke="#262F56"
        fill={isFilled ? '#262F56' : '#fff'}
        strokeWidth={1.8}
      />
      <Path
        d="M20 19c0 3.5-4 2.5-8 2.5s-8 1-8-2.5c0-2 3.582-4.5 8-4.5s8 2.5 8 4.5z"
        stroke="#262F56"
        strokeWidth={1.8}
        fill={isFilled ? '#262F56' : '#fff'}
      />
    </Svg>
  );
}
