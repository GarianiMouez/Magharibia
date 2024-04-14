const multer = require("multer");
const path = require("path");
const fs = require("fs");
const util = require("util");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const filesPath = path.join(process.cwd(), "data", "static", "admins");
    if (!fs.existsSync(filesPath)) {
      fs.mkdirSync(filesPath, { recursive: true });
    }
    cb(null, filesPath);
  },
  filename: function (req, file, cb) {
    let filename = `${req.id}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, filename);
  },
});

const imageUploader = multer({ storage });

const setImage = (req, res, next) => {
  if (req.file) {
    req.body.image = req.file.filename;
  }
  next();
};

module.exports = { imageUploader, setImage };
