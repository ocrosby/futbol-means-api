import type { JestConfigWithTsJest } from 'ts-jest';

import { defaults as tsjPreset } from 'ts-jest/presets';
// import { defaultsESM as tsjPreset } from 'ts-jest/presets';
// import { jsWithTs as tsjPreset } from 'ts-jest/presets';
// import { jsWithTsESM as tsjPreset } from 'ts-jest/presets';
// import { jsWithBabel as tsjPreset } from 'ts-jest/presets';
// import { jsWithBabelESM as tsjPreset } from 'ts-jest/presets';

const jestConfig: JestConfigWithTsJest = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  coverageDirectory: 'coverage',
  verbose: true,
  testEnvironment: 'node',
  coverageThreshold: {
    global: {
      branches: 2,
      functions: 9,
      lines: 5,
      statements: 5,
    },
  },
  // [...]
  transform: {
    ...tsjPreset.transform,
    // [...]
  },
};

export default jestConfig;
