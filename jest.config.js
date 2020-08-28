module.exports = {
  roots: ['<rootDir>/packages'],
  testMatch: [
    "<rootDir>/packages/**/?(*.)+(spec|test).[jt]s?(x)"
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    'templates'
  ],
  transform: {
    "^.+\\.jsx?$": require.resolve('babel-jest'),
    "^.+\\.tsx?$": require.resolve('ts-jest')
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  watchPlugins: [
    require.resolve('jest-watch-typeahead/filename'),
    require.resolve('jest-watch-typeahead/testname')
  ]
}