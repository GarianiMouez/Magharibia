const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const jsonwebtoken = require("jsonwebtoken");

function generateKeypair() {
  const keyPair = crypto.generateKeyPairSync("rsa", {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
  });

  fs.writeFileSync(
    path.join(path.join(process.cwd(), ".private", ".id_rsa_pub.pem")),
    keyPair.publicKey
  );

  fs.writeFileSync(
    path.join(process.cwd(), ".private", ".id_rsa_priv.pem"),
    keyPair.privateKey
  );
}

const getPrivKey = () => {
  const pathToKey = path.join(process.cwd(), ".private", ".id_rsa_priv.pem");
  return fs.readFileSync(pathToKey, "utf8");
};

const getPubKey = () => {
  const pathToKey = path.join(process.cwd(), ".private", ".id_rsa_pub.pem");
  return fs.readFileSync(pathToKey, "utf8");
};

const issueJWT = (sub, { accountType, maxAge = 3600 * 24 } = {}) => {
  const PRIV_KEY = getPrivKey();

  const payload = {
    sub,
    iam: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + maxAge,
    accountType,
  };

  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {
    algorithm: "RS256",
  });

  return signedToken;
};

const checkPassword = async (password, passwordHash) => {
  const [salt, key] = passwordHash.split("$");
  const derivedKey = crypto.scryptSync(password, salt, 64).toString("hex");
  return key === derivedKey;
};

const hashPassword = async (password) => {
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = crypto.scryptSync(password, salt, 64).toString("hex");
  return salt + "$" + derivedKey;
};

module.exports = {
  generateKeypair,
  getPrivKey,
  getPubKey,
  issueJWT,
  checkPassword,
  hashPassword,
};
