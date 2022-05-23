/// <reference types="cypress" />
const injectDevServer = require("@cypress/react/plugins/next");

const { readPdf } = require("./read-pdf");
const path = require("path");
const fs = require("fs");

const downloadDirectory = path.join(__dirname, "..", "downloads");

const findPDF = (filename) => {
  const contents = fs.existsSync(filename);
  return contents;
};

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  if (config.testingType === "component") {
    injectDevServer(on, config);
  }
  if (config.testingType === "e2e") {
  }

  on("task", {
    readPdf,
    findPDF,
  });

  on("before:browser:launch", (browser, options) => {
    if (browser.family === "chromium") {
      if (!options.preferences.default) {
        options.preferences.default = {};
      }
      options.preferences.default["download"] = {
        default_directory: downloadDirectory,
      };
      return options;
    }
    if (browser.family === "firefox") {
      options.preferences["browser.download.dir"] = downloadDirectory;
      options.preferences["browser.download.folderList"] = 2;
      options.preferences["browser.helperApps.neverAsk.saveToDisk"] =
        "application/pdf";
      return options;
    }
  });
};
