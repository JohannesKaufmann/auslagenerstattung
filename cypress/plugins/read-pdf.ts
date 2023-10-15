import fs from "fs";
import pdf from "pdf-parse";

export const readPdf = (filename) => {
  console.log("reading PDF file %s", filename);

  const dataBuffer = fs.readFileSync(filename);

  return pdf(dataBuffer).then(function (data) {
    return {
      numpages: data.numpages,
      text: data.text,
    };
  });
};
