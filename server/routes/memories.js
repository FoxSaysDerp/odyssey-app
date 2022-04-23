const express = require("express");
const { check } = require("express-validator");

const memoriesControllers = require("../controllers/memories");
const fileUpload = require("../middleware/file-upload");

const router = express.Router();

router.get("/all", memoriesControllers.getAllMemories);

router.get("/:mid", memoriesControllers.getMemoryById);

router.get("/user/:uid", memoriesControllers.getMemoriesByUserId);

router.post(
   "/",
   fileUpload.single("image"),
   [
      (check("title").not().isEmpty(),
      check("description").isLength({ min: 5 })),
   ],
   memoriesControllers.createMemory
);

router.patch(
   "/:mid",
   [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
   memoriesControllers.updateMemory
);

router.delete("/:mid", memoriesControllers.deleteMemory);

module.exports = router;
