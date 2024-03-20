// FS Import
import fs from "fs";

// URL Import
import { fileURLToPath } from "url";

// Const Direcotry
const __dirname = fileURLToPath(new URL(".", import.meta.url));

// Delete Middleware
export default function deleteFiles(filePaths) {
  filePaths.forEach((filePath) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      }
    });
  });
}
