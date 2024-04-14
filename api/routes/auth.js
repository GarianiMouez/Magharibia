var express = require("express");
var router = express.Router();
const controllers = require("../controllers/auth");
const passport = require("passport");

router.get(
  "/check-token",
  passport.authenticate("jwt", { session: false }),
  controllers.checkToken
);

router.post(
  "/login",
  (req, res, next) => {
    req.accountType = "ADMIN";
    next();
  },
  passport.authenticate("local", { session: false }),
  controllers.adminLogin
);

module.exports = router;
