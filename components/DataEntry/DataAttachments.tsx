import React, { useCallback, useContext } from "react";

import { IDocument } from "lib/state";

import { RendererSchedulerContext } from "components/HiddenCanvas";
import { handleFiles } from "lib/attachments";

import Attachments from "components/Attachments/Attachments";

const DataAttachments = ({ document, setDocument, update }) => {
  const scheduler = useContext(RendererSchedulerContext);

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

  return (
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
  );
};
export default DataAttachments;
