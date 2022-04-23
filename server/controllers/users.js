const moment = require("moment");
const { validationResult } = require("express-validator");

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

   const filePath = req.file.path;
   const correctPath = pathToUnix(filePath);
   console.log(correctPath);

   const createdUser = new User({
      name,
      email,
      image: "http://localhost:5000/" + correctPath,
      password,
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

   res.status(201).json({ user: createdUser.toObject({ getters: true }) });
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

   if (!existingUser || existingUser.password !== password) {
      return next(new HttpError("Provided credentials are invalid."), 401);
   }

   res.status(200).json({
      message: `User with email ${existingUser.email} has successfully logged in.`,
      user: existingUser.toObject({ getters: true }),
   });
};

exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.createUser = createUser;
exports.loginUser = loginUser;
