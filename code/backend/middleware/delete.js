// FS Import
import fs from "fs";
import path from "path";

// URL Import
import { fileURLToPath } from "url";

// Const Direcotry
const __dirname = fileURLToPath(new URL(".", import.meta.url));

// Delete Middleware
export function deleteFiles(filePaths) {
  if (!Array.isArray(filePaths)) {
    filePaths = [filePaths];
  }

  filePaths.forEach((filePath) => {
    const fullPath = path.join(__dirname, "..", filePath);

    fs.unlink(fullPath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      } else {
        console.log(`File ${fullPath} was deleted successfully.`);
      }
    });
  });
}
