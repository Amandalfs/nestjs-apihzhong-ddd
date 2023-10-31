import { Config } from 'jest';

const config: Config = {
  roots: ['<rootDir>/src/'],
  collectCoverageFrom: ['<rootDir>/src/**/*.integration.ts'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  testMatch: ['**/*.integration.ts'],
  testPathIgnorePatterns: [
    'node_modules',
    'prisma',
    'test',
    '.github',
    '.husky',
  ],
  testTimeout: 10000,
  bail: true,
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
};

export default config;
