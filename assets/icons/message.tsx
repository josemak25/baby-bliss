import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from '../../src/constants';

export default function MessageIcon(props: IconProps) {
  return (
    <Svg width="40%" height="40%" viewBox="0 0 18.342 18.342" {...props}>
      <Path
        d="M17.813.529A1.742 1.742 0 0016.534 0H1.808A1.807 1.807 0 000 1.808v11.023a1.816 1.816 0 00.529 1.3 1.708 1.708 0 001.279.551h12.874l3.66 3.659V1.808a1.742 1.742 0 00-.529-1.279z"
        fill="#fff"
      />
    </Svg>
  );
}
