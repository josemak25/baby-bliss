import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from '../../src/constants';

export default function Checked(props: IconProps) {
  return (
    <Svg
      width="40%"
      height="40%"
      fillRule="evenodd"
      clipRule="evenodd"
      {...props}
    >
      <Path d="M19 22H0V3h19v2h-1V4H1v17h17v-9.502h1V22zm5-19.315L9.034 18.557 3.476 12l.762-.648 4.833 5.707L23.272 2l.728.685z" />
    </Svg>
  );
}
