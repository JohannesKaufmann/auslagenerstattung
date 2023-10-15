import fs from "fs";

export const findPDF = (filename) => {
  const contents = fs.existsSync(filename);
  return contents;
};

export const deleteFolder = (folderName) => {
  console.log("deleting folder %s", folderName);

  if (fs.existsSync(folderName)) {
    fs.rmdirSync(folderName, { maxRetries: 10, recursive: true });
  }

  return null;
};
