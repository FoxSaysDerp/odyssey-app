const moment = require("moment");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");
const User = require("../models/user");
const pathToUnix = require("../util/path-to-unix");

const getUsers = async (req, res, next) => {
   let users;
   try {
      users = await User.find({}, "-password");
   } catch (err) {
      return next(
         new HttpError("Fetching users failed, please try again later", 500)
      );
   }

   if (!users || users.length === 0) {
      throw new HttpError("There are no users", 401);
   }

   res.status(200).json({
      users: users.map((user) => user.toObject({ getters: true })),
   });
};

const getUserById = async (req, res, next) => {
   const userId = req.params.uid;

   let user;
   try {
      user = await User.findById(userId);
   } catch (err) {
      return next(
         new HttpError(
            "Fetching a users has failed, please try again later",
            500
         )
      );
   }

   if (!user) {
      throw new HttpError(`Could not retrieve user with ID: ${userId}.`, 404);
   }
   res.json({ user: user.toObject({ getters: true }) });
};

const createUser = async (req, res, next) => {
   const errors = validationResult(req);

   if (!errors.isEmpty()) {
      return next(
         new HttpError("Invalid inputs passed, please check your data.", 422)
      );
   }

   const { name, email, password } = req.body;

   let hashedPassword;
   try {
      hashedPassword = await bcrypt.hash(password, 12);
   } catch (err) {
      return next(
         new HttpError("Could not create user, please try agaih", 500)
      );
   }

   const createdUser = new User({
      name,
      email,
      image: "http://localhost:5000/" + pathToUnix(req.file.path),
      password: hashedPassword,
      memories: [],
      createdOn: moment(),
   });

   let existingUser;
   try {
      existingUser = await User.findOne({ email: email });
   } catch (err) {
      const error = new HttpError(
         "Registration has failed, please try again later",
         500
      );
      return next(error);
   }

   if (existingUser) {
      const error = new HttpError("This email is already in use", 422);
      return next(error);
   }

   try {
      await createdUser.save();
   } catch (err) {
      const error = new HttpError(
         "Registration has failed, please try again.",
         500
      );
      return next(error);
   }

   let token;
   try {
      token = jwt.sign({ userId: createdUser.id }, "supersecret_dont_share", {
         expiresIn: "1h",
      });
   } catch {
      return next(
         new HttpError("Signing up has failed, please try again later", 500)
      );
   }

   res.status(201).json({ userId: createdUser.id, token: token });
};

const loginUser = async (req, res, next) => {
   const { email, password } = req.body;

   let existingUser;
   try {
      existingUser = await User.findOne({ email: email });
   } catch (err) {
      const error = new HttpError("Login failed, please try again later", 500);
      return next(error);
   }

   if (!existingUser) {
      return next(new HttpError("Provided credentials are invalid."), 401);
   }

   let isValidPassword = false;
   try {
      isValidPassword = await bcrypt.compare(password, existingUser.password);
   } catch (err) {
      return next(
         new HttpError(
            "Could not authenticate provided credentials, please try again",
            500
         )
      );
   }

   if (!isValidPassword) {
      return next(
         new HttpError("Invalid credentials, please insert correct ones.", 401)
      );
   }

   let token;
   try {
      token = jwt.sign({ userId: existingUser.id }, "supersecret_dont_share", {
         expiresIn: "1h",
      });
   } catch {
      return next(
         new HttpError("Signing in has failed, please try again later", 500)
      );
   }

   res.status(200).json({
      message: `User with email ${existingUser.email} has successfully logged in.`,
      userId: existingUser.id,
      token: token,
   });
};

exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.createUser = createUser;
exports.loginUser = loginUser;
