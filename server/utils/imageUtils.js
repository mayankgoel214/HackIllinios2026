import fs from "fs";

export function fileToBase64(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  return fileBuffer.toString("base64");
}

export function bufferToBase64(buffer) {
  return buffer.toString("base64");
}
