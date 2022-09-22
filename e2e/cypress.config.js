const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      config.baseUrl = config.baseUrl || 'http://localhost:3000';

      return config;
    },
    experimentalSessionAndOrigin: true,
  },
});
