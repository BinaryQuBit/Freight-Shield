// Upload Middleware

import path from "path";
import multer from "multer";

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "backend/uploads/");
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    if (
      [
        "image/png",
        "image/jpg",
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
