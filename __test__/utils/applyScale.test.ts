import applyScale from '../../src/utils/applyScale';
import Devices from '../../src/libs/responsiveImage/device';

describe('TEST IMAGE SCALING FUNCTIONALITY', () => {
  test('get device screen size and return scaled value', () => {
    const scaledScreenSize = applyScale(Devices.scale);
    expect(scaledScreenSize).toBeTruthy();
  });
});
