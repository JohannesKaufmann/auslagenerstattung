import "../styles/globals.css";
import PlausibleProvider from "next-plausible";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <PlausibleProvider domain="auslagenerstattung-vorlage.de">
      <Component {...pageProps} />
    </PlausibleProvider>
  );
}
