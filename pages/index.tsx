import React, { useCallback } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

import { HiddenCanvas } from "components/HiddenCanvas";
import DataEntry from "components/DataEntry";

import { getInitialDocument, useThrottledState, IDocument } from "lib/state";

const TITLE = "Auslagenerstattung im Browser ausfüllen";
const DESCRIPTION =
  "Spare Zeit bei der Auslagenerstattung! Einfach Daten ausfüllen und Belege anfügen. Ein PDF wird automatisch für dich generiert…";

const PDFDocumentPreview = dynamic(() => import("../components/PDF/Preview"), {
  loading: () => (
    <p data-cy="loading_preview_bundle" className="py-10 text-center">
      Lade Vorschau...
    </p>
  ),
  ssr: false,
});

export default function Home() {
  const [document, setDocument, isStale, throttledDocument, update] =
    useThrottledState<IDocument>(getInitialDocument());

  const changeField = useCallback(
    (group, key, val) => {
      setDocument((d) => ({
        ...d,
        [group]: {
          ...d[group],
          [key]: val,
        },
      }));
    },
    [setDocument]
  );

  return (
    <div className="w-full h-full">
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
      </Head>

      <HiddenCanvas className="h-full">
        <div className="w-full h-full flex flex-col lg:flex-row">
          <div className="w-full lg:h-full lg:w-1/2 lg:overflow-y-auto">
            <DataEntry
              document={document}
              setDocument={setDocument}
              isStale={isStale}
              update={update}
              //
              changeField={changeField}
            />
          </div>

          <div className="w-full lg:h-full lg:w-1/2 bg-gray-50 border-l border-gray-300">
            <PDFDocumentPreview document={throttledDocument} />
          </div>
        </div>
      </HiddenCanvas>
    </div>
  );
}
