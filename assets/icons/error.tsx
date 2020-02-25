import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from '../../src/constants';

export default function ErrorIcon(props: IconProps) {
  return (
    <Svg viewBox="0 0 512 512" width="100%" height="100%" {...props}>
      <Path
        d="M257 0C116.39 0 0 114.39 0 255s116.39 257 257 257 255-116.39 255-257S397.61 0 257 0zm126.22 338.79c11.7 11.7 11.7 30.73 0 42.44-11.61 11.6-30.64 11.79-42.44 0L257 297.42l-85.79 83.82c-11.7 11.7-30.73 11.7-42.44 0-11.7-11.7-11.7-30.73 0-42.44l83.8-83.8-83.8-83.8c-11.7-11.71-11.7-30.74 0-42.44 11.71-11.7 30.74-11.7 42.44 0L257 212.58l83.78-83.82c11.68-11.68 30.71-11.72 42.44 0 11.7 11.7 11.7 30.73 0 42.44l-83.8 83.8 83.8 83.79z"
        data-original="#000000"
        data-old_color="#000000"
        fill="#EE1717"
      />
    </Svg>
  );
}
