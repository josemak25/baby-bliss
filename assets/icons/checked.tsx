import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from '../../src/constants';

export default function CheckedIcon(props: IconProps) {
  return (
    <Svg
      width="100%"
      height="100%"
      viewBox="0 0 512 512"
      {...props}
    >
      <Path
        d="M256 0C114.844 0 0 114.844 0 256s114.844 256 256 256 256-114.844 256-256S397.156 0 256 0zm146.207 182.625L217.75 367.083a21.263 21.263 0 01-15.083 6.25 21.261 21.261 0 01-15.083-6.25L88.46 267.958c-4.167-4.165-4.167-10.919 0-15.085l15.081-15.082c4.167-4.165 10.919-4.165 15.086 0l84.04 84.042L372.04 152.458c4.167-4.165 10.919-4.165 15.086 0l15.081 15.082c4.167 4.166 4.167 10.92 0 15.085z"
        data-original="#000000"
        data-old_color="#000000"
        fill="#00AA39"
      />
    </Svg>
  );
}
