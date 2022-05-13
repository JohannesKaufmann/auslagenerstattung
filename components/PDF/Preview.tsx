import React, { useEffect } from "react";
import PDFDocument from "./Document";

import { usePDF } from "@react-pdf/renderer";

import ClientOnly from "components/ClientOnly";
import { Button } from "components/Form";
import { IDocument } from ".../../lib/state";

const PreviewAndDownload = ({ children }) => {
  const [instance, updateInstance] = usePDF({
    document: children,
  });
  useEffect(updateInstance, [children]);

  if (instance.error) return;

  const showToolbar = false;
  const src = instance.url
    ? `${instance.url}#toolbar=${showToolbar ? 1 : 0}`
    : null;

  return (
    <div className="bg-gray-50 border-l border-gray-300 p-8 h-full flex flex-col">
      <div className="flex flex-col lg:flex-row justify-between space-y-2 lg:space-y-0">
        <Button
          onClick={() => {
            updateInstance();
          }}
          className={`${instance.loading ? "animate-pulse" : ""}`}
        >
          PDF Aktualisieren
        </Button>

        <Button
          as={"a"}
          primary
          href={instance.url}
          download="auslagenerstattung.pdf"
        >
          PDF Herunterladen
        </Button>
      </div>

      {instance.error && <div>Something went wrong: {instance.error}</div>}

      <iframe
        src={src}
        title={"Title"}
        className="h-full min-h-[500px] mt-4 rounded-md border border-gray-300"
      />
    </div>
  );
};

const DocumentPreview = React.memo<{ document: IDocument }>(({ document }) => {
  return (
    <ClientOnly className="h-full">
      <PreviewAndDownload>
        <PDFDocument document={document} />
      </PreviewAndDownload>
    </ClientOnly>
  );
});
export default DocumentPreview;
