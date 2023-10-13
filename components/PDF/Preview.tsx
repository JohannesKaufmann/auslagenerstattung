import React, { useEffect } from "react";
import Link from "next/link";
import PDFDocument from "./Document";

import { usePDF } from "@react-pdf/renderer";

import ClientOnly from "components/ClientOnly";
import { Button } from "components/Form";
import { IDocument } from ".../../lib/state";
import { usePlausible } from "next-plausible";

import { NPSModal, useNps } from "components/NPS";

const PreviewAndDownload = ({ children }) => {
  const [isOpen, setIsOpen, score, setScore, screen, setScreen] = useNps();

  const plausible = usePlausible();

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
    <div className="p-4 md:p-8 h-full flex flex-col">
      <div className="flex flex-col lg:flex-row justify-between space-y-2 lg:space-y-0">
        <Button
          onClick={() => {
            plausible("PDF:Refresh");

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
          onClick={() => {
            plausible("PDF:Download");

            setIsOpen(true);
          }}
        >
          PDF Herunterladen
        </Button>

        <NPSModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          score={score}
          setScore={setScore}
          screen={screen}
          setScreen={setScreen}
        />
      </div>

      {instance.error && <div>Something went wrong: {instance.error}</div>}

      <iframe
        src={src}
        title={"Title"}
        className="h-full min-h-[500px] mt-4 rounded-md border border-gray-300"
      />

      <div className="mt-2 flex justify-end">
        <Link href="/privacy">
          <a className="underline text-sm text-gray-500 hover:text-blue-500">
            Impressum und Datenschutzerklärung
          </a>
        </Link>
      </div>
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
