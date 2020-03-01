import boxShadows from '../../src/utils/boxShadows';

describe('TEST BOX SHADOW FUNCTIONALITY', () => {
  test('test shadow return shadow default styles when no arguments is passed', () => {
    const style = boxShadows({});
    expect(style).toHaveProperty('elevation');
    expect(style).toHaveProperty('shadowColor');
    expect(style).toHaveProperty('shadowOffset');
    expect(style).toHaveProperty('shadowOpacity');
    expect(style).toHaveProperty('shadowRadius');
  });

  test('test shadow return shadow style correctly', () => {
    const style = boxShadows({ elevation: 1, color: '#000FD3' });
    expect(style).toHaveProperty('elevation');
    expect(style).toHaveProperty('shadowColor');
    expect(style).toHaveProperty('shadowOffset');
    expect(style).toHaveProperty('shadowOpacity');
    expect(style).toHaveProperty('shadowRadius');
  });
});
