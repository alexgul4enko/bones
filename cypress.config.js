const { defineConfig } = require('cypress');

module.exports = defineConfig({
  viewportWidth: 1200,
  viewportHeight: 1200,
  e2e: {
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config);
      return config;
    }
  },

  component: {
    specPattern: 'cypress/component/**/*.{js,jsx,ts,tsx}',
    devServer: {
      framework: 'react',
      bundler: 'webpack'
    },
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config);
      return config;
    }
  },
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    reporterEnabled: 'spec, cypress-sonarqube-reporter, mocha-junit-reporter',
    mochaJunitReporterReporterOptions: {
      mochaFile: 'test-results/test-output-[hash].xml',
      toConsole: true
    },
    cypressSonarqubeReporterReporterOptions: {
      outputDir: 'reports',
      useAbsoluteSpecPath: true,
      preserveSpecsDir: false
    }
  }
});
