import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from '../../src/constants';

export default function PhoneIcon(props: IconProps) {
  return (
    <Svg width="70%" height="70%" viewBox="0 0 24 24" fill="none" {...props}>
      <Path d="M352 8H160a40.045 40.045 0 00-40 40v416a40.045 40.045 0 0040 40h192a40.045 40.045 0 0040-40V48a40.045 40.045 0 00-40-40zm-41.758 16l-4.8 24h-98.883l-4.8-24zM376 464a24.027 24.027 0 01-24 24H160a24.027 24.027 0 01-24-24V48a24.027 24.027 0 0124-24h25.441l6.714 33.569A8 8 0 00200 64h112a8 8 0 007.845-6.431L326.559 24H352a24.027 24.027 0 0124 24z" />
      <Path d="M208 456h-48a8 8 0 000 16h48a8 8 0 000-16zM240 456h-8a8 8 0 000 16h8a8 8 0 000-16z" />
    </Svg>
  );
}
