const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

const usersControllers = require("../controllers/users");

router.get("/:uid", usersControllers.getUserById);
router.post(
   "/register/",
   [
      check(["name", "email", "password"]).not().isEmpty(),
      check("email").normalizeEmail().isEmail(),
      check("password").isLength({ min: 10 }),
   ],
   usersControllers.createUser
);
router.post("/login/", usersControllers.loginUser);

module.exports = router;
