const express = require("express");

const memoriesControllers = require("../controllers/memories");

const router = express.Router();

router.get("/:mid", memoriesControllers.getMemoryById);

router.get("/user/:uid", memoriesControllers.getMemoriesByUserId);

router.post("/", memoriesControllers.createMemory);

router.patch("/:mid", memoriesControllers.updateMemory);

router.delete("/:mid", memoriesControllers.deleteMemory);

module.exports = router;
