import Device from '../libs/responsiveImage/device';

export default function applyScale(size: number) {
  return Math.ceil(size * Device.scale);
}
