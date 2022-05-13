import React, { useCallback, useRef, useContext } from "react";
import SignatureCanvas from "react-signature-canvas";

import { RendererSchedulerContext } from "components/HiddenCanvas";
import Attachments from "components/Attachments/Attachments";
import Table from "components/Table";
import { Fieldset } from "components/Form";

import { handleFiles } from "lib/attachments";
import { IDocument, dataURLToObjectURL } from "lib/state";
import DataCompany from "./DataCompany";
import DataRecipient from "./DataRecipient";

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
  const scheduler = useContext(RendererSchedulerContext);
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

  const onDrop = useCallback(
    (acceptedFiles) => {
      const callbacks = {
        onAttachments: (attachments) => {
          setDocument((d) => ({
            ...d,
            attachments: [...d.attachments, ...attachments],
          }));
        },
        onPage: (file_object_url, page) => {
          // TODO: updatePage function
          setDocument((d: IDocument) => ({
            ...d,
            attachments: d.attachments.map((a) => {
              if (a.file_object_url !== file_object_url) {
                return a;
              }

              a.pages = a.pages.map((p) => {
                if (p.page_num !== page.page_num) {
                  return p;
                }

                return page;
              });
              return a;
            }),
          }));
        },
        onComplete: () => {
          update();
        },
      };

      handleFiles(acceptedFiles, scheduler, callbacks);
    },
    [scheduler]
  );

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
      <form
        className="p-8"
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
          <Attachments
            onDrop={onDrop}
            attachments={document.attachments
              .map((a) => a.pages)
              .flat()
              .map((p) => ({
                src: p.img_object_url,
                // @ts-ignore
                isLoading: p.img_object_url === "",
              }))}
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
