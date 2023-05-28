import { File } from "buffer";

export const generateFileName = (file: File) => {
  const fileName = file.name;
  const rawName = fileName.slice(0, fileName.lastIndexOf("."));
  const timeStamp = Date.now();
  const extension = fileName.slice(fileName.lastIndexOf(".") + 1);

  const newFileName = `${rawName}-${timeStamp}.${extension}`;

  return newFileName;
};
