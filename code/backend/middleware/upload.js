// Upload Middleware

import path from "path";
import multer from "multer";

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    let uniqueSuffix = Date.now() + '-' + Math.random().toString(36).substr(2, 8);
    cb(null, uniqueSuffix + ext);
},
});

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
      console.log("Unsupported file type!");
      callback(new Error("Unsupported file type!"), false);
    }
  },

  limits: {
    fileSize: 1024 * 1024 * 2,
  },
});

export default upload;
