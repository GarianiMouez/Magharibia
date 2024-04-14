const clientServices = require("../services/client");
const { issueJWT, hashPassword } = require("../utils/crypto");

const checkToken = (req, res, next) => {
  try {
    res.status(200).json({
      userData: req.user,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const clientLogin = (req, res, next) => {
  try {
    const accessToken = issueJWT(req.user.id, { accountType: "CLIENT" });
    delete req.user.password;
    res.status(200).json({
      accessToken,
      userData: req.user,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  clientLogin,
  checkToken,
};
