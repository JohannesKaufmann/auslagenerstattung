import React, { useCallback, useRef, useContext } from "react";
import dynamic from "next/dynamic";
import SignatureCanvas from "react-signature-canvas";

import Introduction from "components/Introduction";
import Table from "components/Table";
import { Fieldset } from "components/Form";

import { IDocument, dataURLToObjectURL } from "lib/state";
import DataCompany from "./DataCompany";
import DataRecipient from "./DataRecipient";

const DataAttachments = dynamic(() => import("./DataAttachments"), {
  loading: () => <p className="py-10 text-center">Lade Anhänge...</p>,
  ssr: false,
});

const DataEntry = ({
  document,
  setDocument,
  isStale,
  update,

  changeField,
}: {
  document: IDocument;
  [key: string]: any;
}) => {
  const signatureRef = useRef();

  const onSignatureEnd = useCallback(() => {
    if (!signatureRef.current) return;

    // @ts-ignore
    const b64Data = signatureRef.current.toDataURL();

    dataURLToObjectURL(b64Data).then((objectURL) => {
      setDocument((d) => ({
        ...d,
        signature: objectURL,
      }));

      setTimeout(update, 0);
    });
  }, [signatureRef.current, setDocument, update]);

  // const onRemoveAttachment = useCallback((document) => {
  //   setDocuments(documents.filter((_, i) => i !== index));
  //   URL.revokeObjectURL(document.object_url);
  // }, [setDocument]);

  const updateRecords = useCallback(
    (fn) => {
      setDocument((d) => ({
        ...d,
        records: fn(d.records),
      }));

      setTimeout(update, 0);
    },
    [setDocument, update]
  );
  return (
    <main>
      <Introduction />

      <form
        className="p-4 md:p-8"
        onBlur={() => {
          console.log("onblur");
          update();
        }}
      >
        <DataCompany company={document.company} changeField={changeField} />
        <DataRecipient
          recipient={document.recipient}
          changeField={changeField}
        />

        <Fieldset title="Auflistung">
          <Table records={document.records} updateRecords={updateRecords} />
        </Fieldset>

        <Fieldset title="Anhänge">
          <DataAttachments
            document={document}
            setDocument={setDocument}
            update={update}
          />
        </Fieldset>

        <Fieldset title="Unterschrift (optional)">
          <p className="mb-4 text-gray-500">
            Die Signatur bleibt auf diesem Rechner und wird{" "}
            <span className="underline">nicht</span> auf den Server hochgeladen.
          </p>
          <SignatureCanvas
            ref={signatureRef}
            onEnd={onSignatureEnd}
            //
            penColor="black"
            canvasProps={{
              className:
                "rounded-lg bg-gray-100 border border-gray-300 w-full h-[300px]",
            }}
          />
        </Fieldset>
      </form>
    </main>
  );
};
export default DataEntry;
