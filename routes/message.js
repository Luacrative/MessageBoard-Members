const express = require("express");
const router = express.Router();

const messageController = require("../controllers/messageController");

router.get("/:id", messageController.get);
router.post("/reply/:id", messageController.reply);

module.exports = router; 