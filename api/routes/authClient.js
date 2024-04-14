var express = require("express");
var router = express.Router();
const controllers = require("../controllers/authClient");
const passport = require("passport");

router.get(
  "/check-token",
  passport.authenticate("jwt", { session: false }),
  controllers.checkToken
);

router.post(
  "/login",
  (req, res, next) => {
    req.accountType = "CLIENT";
    next();
  },
  passport.authenticate("local", { session: false }),
  controllers.clientLogin
);

module.exports = router;
