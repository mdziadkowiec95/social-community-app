/* eslint-disable @typescript-eslint/no-var-requires */
const { defineConfig } = require('cypress');

require('dotenv').config();

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      config.baseUrl = process.env.E2E_BASE_URL || 'http://localhost:3000';

      return config;
    },
    experimentalSessionAndOrigin: true,
  },
});
