import { cleanup } from '@testing-library/react-native';

import MockAsyncStorage from 'mock-async-storage';

const mockImpl = new MockAsyncStorage();

jest.mock('@react-native-community/async-storage', () => mockImpl);

afterEach(cleanup);

afterAll(cleanup);
