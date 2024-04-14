require("dotenv").config();
const path = require("path");
const fs = require("fs");

const privatePath = path.join(process.cwd(), ".private");
if (!fs.existsSync(privatePath)) {
  fs.mkdirSync(privatePath);
}

const dataPath = path.join(process.cwd(), "data");
if (!fs.existsSync(dataPath)) {
  fs.mkdirSync(dataPath);
}

require("../utils/crypto").generateKeypair();

require("./passport");
