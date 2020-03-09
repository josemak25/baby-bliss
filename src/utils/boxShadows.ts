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
  opacity = 0.4,
  radius = Math.floor((0.8 * elevation) / 2),
  width = 0,
  height = 0.5 * elevation
}: BoxShadowInterface) {
  return {
    elevation,
    shadowColor: color,
    shadowOffset: { width, height },
    shadowOpacity: opacity,
    shadowRadius: radius
  };
}

export default function boxShadow(properties: BoxShadowInterface) {
  const { shadow } = StyleSheet.create({
    shadow: createBoxShadowStyle(properties)
  });
  return shadow;
}
