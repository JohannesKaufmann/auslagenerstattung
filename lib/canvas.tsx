import * as pdfjsLib from "pdfjs-dist/build/pdf";
import { PDFDocumentProxy, PDFPageProxy } from "pdfjs-dist";
import { DataURL } from "./state";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export type { PDFDocumentProxy, PDFPageProxy };

export const loadPDFDoc = (url: string): Promise<PDFDocumentProxy> => {
  return pdfjsLib.getDocument(url).promise;
};

export const renderPDFPage = async (
  page: PDFPageProxy,
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  scale = 0.8
): Promise<DataURL> => {
  const viewport = page.getViewport({ scale });
  // Support HiDPI-screens.
  const outputScale = window.devicePixelRatio || 1;

  canvas.width = Math.floor(viewport.width * outputScale);
  canvas.height = Math.floor(viewport.height * outputScale);
  canvas.style.width = Math.floor(viewport.width) + "px";
  canvas.style.height = Math.floor(viewport.height) + "px";

  const transform =
    outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null;

  // Render PDF page into canvas context
  const renderContext = {
    canvasContext: ctx,
    transform: transform,
    viewport: viewport,
  };
  await page.render(renderContext).promise;

  return canvas.toDataURL("image/png") as DataURL;
};
