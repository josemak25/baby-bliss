import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from '../../src/constants';

export default function ForgotPasswordIcon(props: IconProps) {
  return (
    <Svg width="100%" height="100%" viewBox="0 0 445 473" {...props}>
      <Path
        data-name="Polygon 6"
        d="M445 350.921a15 15 0 01-7.719 13.115l-189 104.923a15 15 0 01-14.561 0l-189-104.923A15 15 0 0137 350.921V142.079a15 15 0 017.719-13.115l189-104.923a15 15 0 0114.561 0l189 104.923a15 15 0 017.72 13.115z"
        fill="#e6e7e8"
      />
      <Path
        data-name="Polygon 5"
        d="M408 330.921a15 15 0 01-7.719 13.115l-189 104.923a15 15 0 01-14.561 0l-189-104.923A15 15 0 010 330.921V122.079a15 15 0 017.719-13.115l189-104.923a15 15 0 0114.561 0l189 104.923a15 15 0 017.72 13.115z"
        fill="#50ae7c"
      />
    </Svg>
  );
}
