import { cleanup } from '@testing-library/react-native';

// Clean all mounted node elements after each test
jest.mock('Linking', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  openURL: jest.fn().mockReturnValue(Promise.resolve()),
  canOpenURL: jest.fn().mockReturnValue(Promise.resolve()),
  getInitialURL: jest.fn().mockReturnValue(Promise.resolve())
}));

afterEach(cleanup);

// Clean all mounted node elements after all tests
afterAll(cleanup);

// Reset the mocks before each test
beforeEach(() => jest.resetAllMocks());
