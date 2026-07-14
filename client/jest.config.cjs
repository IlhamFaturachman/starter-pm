/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.cjs'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^react-router$': '<rootDir>/src/test/mocks/react-router.js',
    '^react-router/dom$': '<rootDir>/src/test/mocks/react-router.js',
  },
  transform: {
    '^.+\\.(t|j)sx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react|react-dom|@dnd-kit|react-router|react-data-table-component|react-querybuilder|@tanstack|@react-querybuilder|clsx|zustand|@react-stately)/)',
  ],
  testMatch: ['<rootDir>/src/**/*.(test|spec).(ts|tsx)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  clearMocks: true,
};
