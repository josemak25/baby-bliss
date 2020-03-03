import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import { IconProps } from '../../src/constants';

export default function Eye(props: IconProps) {
  return (
    <Svg width="50%" height="50%" viewBox="0 0 24 24" fill="none" {...props}>
      <Circle cx={12} cy={12} r={4} fill="#D7D8DA" />
      <Path
        d="M3 12c5-8 13-8 18 0M3 12c5 8 13 8 18 0"
        stroke="#D7D8DA"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
