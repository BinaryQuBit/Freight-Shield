// Delete Middleware

import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const deleteFiles = (filePaths) => {
  filePaths.forEach(filePath => {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      } else {
        console.log(`File deleted successfully: ${filePath}`);
      }
    });
  });
};


export default deleteFiles;
