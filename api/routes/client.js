var express = require("express");
var router = express.Router();
const controllers = require("../controllers/clientController");
const { imageUploader, setImage } = require("../middlewares/client");

router.get("/:id", controllers.getById);

router.get("/", controllers.get);
router.post("/", imageUploader.single("image"), setImage, controllers.create);

router.put("/:id", imageUploader.single("image"), setImage, controllers.update);

router.delete("/:id", controllers.deleteId);

module.exports = router;
