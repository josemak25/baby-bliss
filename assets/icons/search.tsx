import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from '../../src/constants';

export default function SearchIcon(props: IconProps) {
  return (
    <Svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M20 20l-4.904-4.904m0 0a6.5 6.5 0 10-9.192-9.192 6.5 6.5 0 009.192 9.192z"
        stroke="#68696F"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
