var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.use("/econtract", require("./econtract"));
router.use("/pcontract", require("./pcontract"));
router.use("/auth", require("./auth"));
router.use("/auth-client", require("./authClient"));
router.use("/admins", require("./admin"));
router.use("/client", require("./client"));
router.use("/ship", require("./ship"));
router.use("/campanies", require("./companies"));

module.exports = router;
