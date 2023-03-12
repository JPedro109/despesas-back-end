module.exports = {
  roots: ['<rootDir>/tests'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  testEnvironment: 'node',
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    '!<rootDir>/src/app.module.ts',
    '!<rootDir>/src/main',
    '!<rootDir>/src/custom/**',
    '!<rootDir>/src/core/domain/**/*.module.ts',
    '!<rootDir>/src/infra/**/*.module.ts',
  ],
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  modulePathIgnorePatterns: ['.*__mocks__.*'],
};
