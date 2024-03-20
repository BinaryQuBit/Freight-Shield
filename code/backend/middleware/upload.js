// Path Import
import path from "path";

// Multer Import
import multer from "multer";

// Storage Declaration and Defination
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    let uniqueSuffix =
      Date.now() + "-" + Math.random().toString(36).substr(2, 8);
    cb(null, uniqueSuffix + ext);
  },
});

// Upload Middleware
var upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    if (
      [
        "image/png",
        "image/jpg",
        "image/jpeg",
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ].includes(file.mimetype)
    ) {
      callback(null, true);
    } else {
      callback(new Error("Unsupported file type!"), false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 12,
  },
});

// Exporting Upload
export default upload;
