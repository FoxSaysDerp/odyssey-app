const { v4 } = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");

let DUMMY_USERS = [
   {
      id: "u1",
      name: "Dsdasd Dsadasds",
      memories: "353",
      email: "test@test.com",
      password: "test",
   },
];

const getUserById = (req, res, next) => {
   const userId = req.params.uid;
   const user = DUMMY_USERS.find((u) => {
      return u.id === userId;
   });

   if (!user) {
      throw new HttpError(`Could not retrieve user with ID: ${userId}.`, 404);
   }
   res.json({ user });
};

const createUser = (req, res, next) => {
   const errors = validationResult(req);

   if (!errors.isEmpty()) {
      throw new HttpError(
         "Invalid inputs passed, please check your data.",
         422
      );
   }

   const { name, email, password } = req.body;
   const createdUser = {
      id: v4(),
      name,
      memories: 0,
      email,
      password,
   };

   if (DUMMY_USERS.find((u) => u.email === createUser.email)) {
      throw new HttpError("This email is already in use", 422);
   }

   DUMMY_USERS.push(createdUser);

   res.status(201).json({ user: createdUser });
};

const loginUser = (req, res, next) => {
   const { email, password } = req.body;

   const identifiedUser = DUMMY_USERS.find((u) => u.email === email);
   if (!identifiedUser || identifiedUser.password !== password) {
      throw new HttpError("There is no user with provided credentials.", 401);
   }

   res.status(200).json({
      message: `User with email ${identifiedUser.email} successfully logged in.`,
   });
};

exports.getUserById = getUserById;
exports.createUser = createUser;
exports.loginUser = loginUser;
