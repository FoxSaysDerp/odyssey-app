const { validationResult } = require("express-validator");
const moment = require("moment");
const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const Memory = require("../models/memory");
const User = require("../models/user");

const getMemoryById = async (req, res, next) => {
   const memoryId = req.params.mid;

   let memory;
   try {
      memory = await Memory.findById(memoryId);
   } catch (err) {
      const error = new HttpError(
         "Something went wrong, count not find a memory",
         500
      );
      return next(error);
   }

   if (!memory) {
      const error = new HttpError(
         `Could not find Memory for provided id: ${memoryId}`,
         404
      );
      return next(error);
   }

   res.json({ memory: memory.toObject({ getters: true }) });
};

const getMemoriesByUserId = async (req, res, next) => {
   const userId = req.params.uid;

   let memories;
   try {
      memories = await Memory.find({ creator: userId });
   } catch (err) {
      const error = new HttpError(
         "Something went wrong, count not find a memory",
         500
      );
      return next(error);
   }

   if (!memories || memories.length === 0) {
      return next(
         new HttpError(
            `Could not find Memories for provided user id: ${userId}.`,
            404
         )
      );
   }

   res.json({ memories });
};

const createMemory = async (req, res, next) => {
   const errors = validationResult(req);

   if (!errors.isEmpty()) {
      throw new HttpError(
         "Invalid inputs passed, please check your data.",
         422
      );
   }

   const { title, description, creator } = req.body;
   const createdMemory = new Memory({
      title,
      description,
      image: "https://play-lh.googleusercontent.com/8ddL1kuoNUB5vUvgDVjYY3_6HwQcrg1K2fd_R8soD-e2QYj8fT9cfhfh3G0hnSruLKec",
      createdOn: moment(),
      creator,
   });

   let user;
   try {
      user = await User.findById(creator);
   } catch (err) {
      return next(
         new HttpError("Creating a Memory has failed, please try again", 500)
      );
   }

   if (!user) {
      return next(new HttpError("Could not find user for provided id", 404));
   }

   try {
      const sess = await mongoose.startSession();
      sess.startTransaction();
      await createdMemory.save({ session: sess });
      user.memories.push(createdMemory);
      await user.save({ session: sess });
      await sess.commitTransaction();
   } catch (err) {
      const error = new HttpError(
         "Creating a Memory has failed, please try again .",
         500
      );
      return next(error);
   }

   res.status(201).json({ memory: createdMemory });
};

const updateMemory = async (req, res, next) => {
   const errors = validationResult(req);

   if (!errors.isEmpty()) {
      return new HttpError(
         "Invalid inputs passed, please check your data.",
         422
      );
   }

   const { title, description } = req.body;
   const memoryId = req.params.mid;

   let memory;

   try {
      memory = await Memory.findById(memoryId);
   } catch (err) {
      const error = new HttpError(
         "Creating a Memory has failed, please try again.",
         500
      );
      return next(error);
   }

   memory.title = title;
   memory.description = description;

   try {
      await memory.save();
   } catch (err) {
      const error = new HttpError(
         "Creating a Memory has failed, please try again.",
         500
      );
      return next(error);
   }

   res.status(200).json({ memory: memory.toObject({ getters: true }) });
};

const deleteMemory = async (req, res, next) => {
   const memoryId = req.params.mid;

   let memory;
   try {
      memory = await Memory.findById(memoryId).populate("creator");
   } catch (err) {
      const error = new HttpError(
         "Something went wrong, could not find a memory",
         500
      );
      return next(error);
   }

   try {
      const sess = await mongoose.startSession();
      sess.startTransaction();
      await memory.remove({ session: sess });
      memory.creator.memories.pull(memory);
      await memory.creator.save({ session: sess });
      await sess.commitTransaction();
   } catch (err) {
      console.log(err);
      return next(
         new HttpError("Somethign went wrong, could not delete a memory", 500)
      );
   }

   if (!memory) {
      const error = new HttpError(
         `Could not find Memory for provided id: ${memoryId}`,
         404
      );
      return next(error);
   }

   res.status(200).json({ message: `Deleted Memory with id: ${memoryId}` });
};

exports.getMemoryById = getMemoryById;
exports.getMemoriesByUserId = getMemoriesByUserId;
exports.createMemory = createMemory;
exports.updateMemory = updateMemory;
exports.deleteMemory = deleteMemory;
