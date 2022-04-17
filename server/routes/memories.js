const express = require("express");

const memoriesControllers = require("../controllers/memories");

const router = express.Router();

router.get("/:mid", memoriesControllers.getMemoryById);

router.get("/user/:uid", memoriesControllers.getMemoryByUserId);

router.post("/", memoriesControllers.createMemory);

module.exports = router;
