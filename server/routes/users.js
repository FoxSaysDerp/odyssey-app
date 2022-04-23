const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

const usersControllers = require("../controllers/users");
const fileUpload = require("../middleware/file-upload");

router.get("/", usersControllers.getUsers);
router.get("/:uid", usersControllers.getUserById);
router.post(
   "/register/",
   fileUpload.single("image"),
   [
      check(["name", "email", "password"]).not().isEmpty(),
      check("email").normalizeEmail().isEmail(),
      check("password").isLength({ min: 10 }),
   ],
   usersControllers.createUser
);
router.post("/login/", usersControllers.loginUser);

module.exports = router;
