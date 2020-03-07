import { cleanup } from '@testing-library/react-native';

// Clean all mounted node elements after each test
afterEach(cleanup);

// Clean all mounted node elements after all tests
afterAll(cleanup);

// Reset the mocks before each test
beforeEach(() => jest.resetAllMocks());
