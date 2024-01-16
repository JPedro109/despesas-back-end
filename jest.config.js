module.exports = {
  roots: ['<rootDir>/tests'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  testEnvironment: 'node',
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    '<rootDir>/src/**',
    '!<rootDir>/src/app.module.ts',
    '!<rootDir>/src/shared/**',
    '!<rootDir>/src/core/domain/**/*.module.ts',
    '!<rootDir>/src/infra/**/*.module.ts',
    '!<rootDir>/src/infra/database/prisma/database.service.ts',
  ],
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  modulePathIgnorePatterns: ['.*__mocks__.*'],
};
