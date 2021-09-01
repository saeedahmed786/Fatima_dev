const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controllers
const { uploadImage, remove } = require("../controllers/cloudinary");
const upload = require("../controllers/multer");

router.post("/uploadimages", authCheck, adminCheck, upload.single('file'), uploadImage);
router.post("/removeimage", authCheck, adminCheck, remove);

module.exports = router;