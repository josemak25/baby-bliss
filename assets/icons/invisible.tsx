import * as React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import { IconProps } from '../../src/constants';

export default function InvisibleIcon(props: IconProps) {
  return (
    <Svg width="40%" height="40%" viewBox="0 0 24 24" fill="none" {...props}>
      <Circle cx={12} cy={12} r={4} fill="#262F56" />
      <Path
        d="M3 9c.732 1.172 1.529 2.171 2.371 3M21 9c-.732 1.172-1.529 2.172-2.37 3m0 0L21 14.601M18.63 12c-1.293 1.271-2.692 2.138-4.13 2.601M5.371 12L3 14.601M5.371 12c1.292 1.271 2.691 2.138 4.13 2.601m4.999 0l1 3.399m-1-3.399a8.039 8.039 0 01-5 0m0 0L8.5 18"
        stroke="#262F56"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
