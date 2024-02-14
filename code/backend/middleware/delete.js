// Test to update name
// Delete middleware

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const deleteFile = (req, res, next) => {
  if (!req.params.filename) {
    return res.status(400).send("Filename is undefined.");
  }

  const filePath = path.join(__dirname, "../uploads/", req.params.filename);

  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Error deleting file:", err);
      return res.status(500).send("An error occurred while deleting the file.");
    }
    console.log("File deleted successfully.");
    next();
  });
};

export default deleteFile;
