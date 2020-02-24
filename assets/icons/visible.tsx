import * as React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import { IconProps } from '../../src/constants';

export default function VisibleIcon(props: IconProps) {
  return (
    <Svg width="70%" height="70%" viewBox="0 0 24 24" fill="none" {...props}>
      <Circle cx={12} cy={12} r={4} fill="#262F56" />
      <Path
        d="M3 12c5-8 13-8 18 0M3 12c5 8 13 8 18 0"
        stroke="#262F56"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
