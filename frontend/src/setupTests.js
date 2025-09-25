// Jest setup file for Vaannilai Seithigal tests
import '@testing-library/jest-dom';

// Global test configuration
global.console = {
  ...console,
  // Suppress console.log, console.warn, etc. during tests
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

// Mock environment variables
process.env.REACT_APP_WEATHER_API_KEY = 'test_api_key_123';
process.env.REACT_APP_BACKEND_URL = 'https://test-backend.com';

// Mock axios defaults
jest.mock('axios', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
    create: jest.fn(() => ({
      get: jest.fn(),
      post: jest.fn(),
    })),
  },
}));

// Global test timeout
jest.setTimeout(10000);