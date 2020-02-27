import * as React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import { IconProps } from '../../src/constants';
import { View } from 'react-native';

export default function CommunityIcon(props: IconProps) {
  const { fillColor } = props;

  return (
    <Svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M3 12c0-3.771 0-5.657 1.172-6.828C5.343 4 7.229 4 11 4h2.5c3.288 0 4.931 0 6.038.908a4 4 0 01.554.554C21 6.57 21 8.212 21 11.5v0c0 3.287 0 4.931-.908 6.038a4.001 4.001 0 01-.554.554C18.43 19 16.788 19 13.5 19H9.302c-.634 0-.952 0-1.255.047a4 4 0 00-1.755.727c-.247.18-.471.405-.92.854v0c-.553.553-.83.83-1.051.905a1 1 0 01-1.218-.504C3 20.819 3 20.428 3 19.645V12z"
        stroke={fillColor}
        fill={fillColor === '#262F56' ? fillColor : '#fff'}
        strokeWidth={1.8}
        strokeLinejoin="round"
      />
      <Circle
        cx={7.5}
        cy={11.5}
        r={0.75}
        stroke={fillColor === '#262F56' ? '#fff' : fillColor}
        strokeWidth={1.5}
      />
      <Circle
        cx={12}
        cy={11.5}
        r={0.75}
        stroke={fillColor === '#262F56' ? '#fff' : fillColor}
        strokeWidth={1.5}
      />
      <Circle
        cx={16.5}
        cy={11.5}
        r={0.75}
        stroke={fillColor === '#262F56' ? '#fff' : fillColor}
        strokeWidth={1.5}
      />
    </Svg>
  );
}
