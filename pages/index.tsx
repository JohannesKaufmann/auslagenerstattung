import React, { useCallback } from "react";
import Head from "next/head";

import { HiddenCanvas } from "components/HiddenCanvas";
import PDFDocumentPreview from "components/PDF/Preview";
import DataEntry from "components/DataEntry";

import { getInitialDocument, useThrottledState, IDocument } from "lib/state";

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
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
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

          <div className="w-full lg:h-full lg:w-1/2">
            <PDFDocumentPreview document={throttledDocument} />
          </div>
        </div>
      </HiddenCanvas>
    </div>
  );
}
