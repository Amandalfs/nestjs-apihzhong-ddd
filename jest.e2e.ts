import { Config } from 'jest';

const config: Config = {
  roots: ['<rootDir>/src/'],
  collectCoverageFrom: ['<rootDir>/src/**/*.e2e.ts'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./test/setup-e2e.ts'],
  injectGlobals: true,
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  testMatch: ['**/*.e2e.ts'],
  testPathIgnorePatterns: ['node_modules', 'test', '.github', '.husky'],
  testTimeout: 10000,
  bail: true,
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
};

export default config;
