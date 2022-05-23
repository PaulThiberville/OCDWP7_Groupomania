const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
};

//Here is configuration for where we store our files and how we name it.
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, Date.now() + "." + extension);
  },
  fileFilter: (req, file, cb) => {
    uploadFilter(req, file, cb);
  },
});

module.exports = multer({ storage: storage }).single("image");
