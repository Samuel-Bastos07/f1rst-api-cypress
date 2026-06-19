const { defineConfig } = require("cypress");
const { beforeRunHook, afterRunHook } = require("cypress-mochawesome-reporter/lib");

module.exports = defineConfig({
  defaultCommandTimeout: 10000,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    reportFilename: 'relatorio',
    overwrite: true,
    html: true,
    json: false,
    embeddedScreenshots: true,
    inlineAssets: true,
  },
  e2e: {
    specPattern: 'cypress/integration/**/*.cy.js',
    baseUrl: 'https://serverest.dev',
    env: {
      TRELLO_KEY: '',
      TRELLO_TOKEN: '',
    },
    async setupNodeEvents(on, config) {
      on("before:run", async (details) => { await beforeRunHook(details); });
      on("after:run", async () => { await afterRunHook(); });
      return config;
    },
  },
});
