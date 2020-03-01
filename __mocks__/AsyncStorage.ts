jest.mock('react-native', () => {
  const STORAGE = {};

  return {
    AsyncStorage: {
      setItem: jest.fn((item, value) => {
        return new Promise((resolve, reject) => {
          STORAGE[item] = value;
          resolve(value);
        });
      }),
      multiSet: jest.fn((item, value) => {
        return new Promise((resolve, reject) => {
          STORAGE[item] = value;
          resolve(value);
        });
      }),
      getItem: jest.fn((item, value) => {
        return new Promise((resolve, reject) => {
          resolve(STORAGE[item]);
        });
      }),
      multiGet: jest.fn(item => {
        return new Promise((resolve, reject) => {
          resolve(STORAGE[item]);
        });
      }),
      removeItem: jest.fn(item => {
        return new Promise((resolve, reject) => {
          resolve(delete STORAGE[item]);
        });
      }),
      getAllKeys: jest.fn(STORAGE => {
        return new Promise(resolve => {
          resolve(STORAGE.keys());
        });
      })
    }
  };
});
