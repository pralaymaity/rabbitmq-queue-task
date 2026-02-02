const express = require("express");
const multer = require("multer");
const uploadController = require("../controller/upload");

const router = express.Router();
const upload = require("../config/multer");

router.post("/upload", upload.single("file"), uploadController.uploadExcel);

module.exports = router;
