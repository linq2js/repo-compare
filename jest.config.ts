import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['__tests__/utils.ts', 'dist/'],
};
export default config;
