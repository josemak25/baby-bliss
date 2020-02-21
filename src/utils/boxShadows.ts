import { StyleSheet } from 'react-native';

interface BoxShadowInterface {
  elevation?: number;
  color?: string;
  opacity?: number;
  radius?: number;
  width?: number;
  height?: number;
}

function createBoxShadowStyle({
  elevation,
  color,
  opacity,
  radius,
  width,
  height
}: BoxShadowInterface) {
  return {
    elevation,
    shadowColor: color,
    shadowOffset: {
      width: width || 0,
      height: height || 0.5 * elevation
    },
    shadowOpacity: opacity || 0.4,
    shadowRadius: radius || Math.floor((0.8 * elevation) / 2)
  };
}

export default function boxShadow(properties: BoxShadowInterface) {
  const { shadow } = StyleSheet.create({
    shadow: createBoxShadowStyle(properties)
  });
  return shadow;
}
