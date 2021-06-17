const config = {
  verbose: true,
  preset: 'ts-jest',
  collectCoverage: true,
  collectCoverageFrom: [
    '**/**/*.ts',
    '**/*.ts',
    '!jest.config.ts',
    '!**/node_modules/**',
    '!**/build/**',

  ]
};

export default config;