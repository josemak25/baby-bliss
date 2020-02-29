import Device from './device';

export default function applyScale(size: number) {
  return Math.ceil(size * Device.scale);
}
