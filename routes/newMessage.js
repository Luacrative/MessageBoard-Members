const express = require("express");
const router = express.Router();

const newMessageController = require("../controllers/newMessageController");

router.get("/", newMessageController.get);
router.post("/", newMessageController.post);

module.exports = router; 