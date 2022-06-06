const config = {
  i18n: {
    locales: ["de"],
    defaultLocale: "de",
  },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
module.exports = withBundleAnalyzer(config);
