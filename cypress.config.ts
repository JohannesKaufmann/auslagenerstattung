import { defineConfig } from "cypress";

import { readPdf } from "./cypress/plugins/read-pdf";
import { deleteFolder, findPDF } from "./cypress/plugins/filesystem";

export default defineConfig({
  downloadsFolder: "cypress/downloads",

  e2e: {
    setupNodeEvents(on, config) {
      // Register our plugins
      on("task", {
        readPdf,
        findPDF,
        deleteFolder,
      });
    },

    baseUrl: "http://localhost:3000",
    specPattern:
      "{./cypress/integration/**/*.e2e_test.*,./components/**/*.e2e_test.*,./pages/**/*.e2e_test.*}",
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
