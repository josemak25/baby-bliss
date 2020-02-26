import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from '../../src/constants';

export default function HomeIcon(props: IconProps) {
  return (
    <Svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M20 18.5v-8.139a3 3 0 00-1.024-2.257l-5-4.375a3 3 0 00-3.952 0l-5 4.375A3 3 0 004 10.36V18.5A1.5 1.5 0 005.5 20h2A1.5 1.5 0 009 18.5V16a3 3 0 116 0v2.5a1.5 1.5 0 001.5 1.5h2a1.5 1.5 0 001.5-1.5z"
        stroke="#262F56"
        strokeWidth={1.8}
        fill={props.fillColor}
      />
    </Svg>
  );
}
