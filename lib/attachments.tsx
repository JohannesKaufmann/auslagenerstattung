import {
  DataURL,
  dataURLToObjectURL,
  fileToObjectURL,
  IAttachment,
  IAttachmentPage,
  ObjectURL,
} from "./state";

import { PDFDocumentProxy, loadPDFDoc, renderPDFPage } from "./canvas";
import { IRendererScheduler } from "../components/HiddenCanvas";

const _isPDF = (attachment: IAttachment) =>
  attachment.filetype === "application/pdf";

const _renderPage = async (
  scheduler: IRendererScheduler,
  doc: PDFDocumentProxy,
  p: IAttachmentPage
): Promise<DataURL> => {
  const page = await doc.getPage(p.page_num);

  let result = await scheduler.runExclusive((canvas, ctx) => {
    return renderPDFPage(page, canvas, ctx);
  });

  return result;
};

const _filesToAttachments = (files: File[]): IAttachment[] => {
  return [...files].map(_fileToAttachment);
};
const _fileToAttachment = (file: File): IAttachment => ({
  filename: file.name,
  filetype: file.type,
  // Maybe also "lastModified" and "size"?

  file_object_url: fileToObjectURL(file),

  pages: null,
});
const _imageToPages = (file_object_url: ObjectURL): IAttachmentPage[] => [
  {
    page_num: 1,
    img_object_url: file_object_url,
  },
];
const _defaultPages = (amountOfPages: number): IAttachmentPage[] => {
  const pages = Array.from(Array(amountOfPages));

  return pages.map((_, index) => ({
    page_num: index + 1,
    img_object_url: "" as ObjectURL,
  }));
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //

interface ICallbacks {
  onAttachments: (attachments: IAttachment[]) => void;
  onPage: (attachment: string, page: IAttachmentPage) => void;
  onComplete: () => void;
}

export const handleFiles = async (
  files: File[],

  scheduler: IRendererScheduler,
  callbacks: ICallbacks
) => {
  let attachments = _filesToAttachments(files);

  let tasksPromises: Promise<void>[] = [];
  let attachmentsPromises = attachments.map(
    async (attachment): Promise<IAttachment> => {
      // A: is a normal image
      if (!_isPDF(attachment)) {
        return {
          ...attachment,
          pages: _imageToPages(attachment.file_object_url),
        };
      }

      // B: is a pdf, which means we need to convert all pages to images
      const doc = await loadPDFDoc(attachment.file_object_url);
      const pages = _defaultPages(doc.numPages);

      pages.forEach((page) => {
        tasksPromises.push(
          (async function () {
            const dataURL = await _renderPage(scheduler, doc, page);
            const imgObjectURL = await dataURLToObjectURL(dataURL);

            console.log("RESULT:", imgObjectURL);

            // 2) one individual page has finished rendering
            callbacks.onPage(attachment.file_object_url, {
              ...page,
              img_object_url: imgObjectURL,
            });

            return;
          })()
        );
      });

      return {
        ...attachment,
        pages,
      };
    }
  );

  // 1) We assembled the attachments with all their pages
  attachments = await Promise.all(attachmentsPromises);
  callbacks.onAttachments(attachments);

  // 3) We are finished with everything
  await Promise.all(tasksPromises);
  callbacks.onComplete();
};
