import applyScale from '../../utils/applyScale';
import Devices from '../../lib/responsiveImage/device';

jest.mock('Dimensions');

describe('TEST IMAGE SCALING FUNCTIONALITY', () => {
  test('get device screen size and return scaled value', () => {
    const scaledScreenSize = applyScale(Devices.scale);
    expect(scaledScreenSize).toBeTruthy();
  });
});
