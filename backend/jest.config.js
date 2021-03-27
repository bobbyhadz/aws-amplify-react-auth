module.exports = {
  // A list of paths to directories that Jest should use to search for files in
  roots: ['<rootDir>/src', '<rootDir>/infra'],

  // The glob patterns Jest uses to detect test files
  testMatch: ['**/*.test.ts'],

  // tell Jest to use ts-jest for ts/tsx files
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },

  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  transformIgnorePatterns: ['<rootDir>/node_modules/'],

  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: ['src/**/*.{ts,tsx,js,jsx,mjs}'],

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: ['\\\\node_modules\\\\'],

  // An array of file extensions your modules use
  moduleFileExtensions: ['ts', 'js', 'json'],

  // A list of paths to modules that run some code to configure or set up the testing framework before each test file in the suite is executed.
  setupFilesAfterEnv: ['./jest.setup.js'],

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: [
    '\\\\node_modules\\\\',
    '<rootDir>/src/__tests__/utils/',
  ],

  // This option sets the URL for the jsdom environment. It is reflected in properties such as location.href
  testURL: 'http://localhost',

  // Setting this value to "fake" allows the use of fake timers for functions such as "setTimeout"
  // If the value is modern, @sinnonjs/fake-timers will be used as implementation instead of Jest's own legacy implementation.
  timers: 'modern',

  // Indicates whether each individual test should be reported during the run
  verbose: false,
};
