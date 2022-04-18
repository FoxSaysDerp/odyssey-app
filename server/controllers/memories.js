const { v4 } = require("uuid");
const { validationResult } = require("express-validator");
const moment = require("moment");

const HttpError = require("../models/http-error");
const Memory = require("../models/memory");
const { findByIdAndDelete } = require("../models/memory");

let DUMMY_MEMORIES = [
   {
      id: "m1",
      title: "My dog",
      description: "Bla bla bla",
      createdOn: moment("1999-02-15 09:00:00"),
      creator: "u1",
   },
];

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

   res.json({ memory });
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

   try {
      await createdMemory.save();
   } catch (err) {
      const error = new HttpError(
         "Creating a Memory has failed, please try again.",
         500
      );
      return next(error);
   }

   res.status(201).json({ memory: createdMemory });
};

const updateMemory = async (req, res, next) => {
   const errors = validationResult(req);

   if (!errors.isEmpty()) {
      throw new HttpError(
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
      memory = await Memory.findById(memoryId);
      await Memory.findByIdAndDelete(memoryId);
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

   res.status(200).json({ message: `Deleted Memory with id: ${memoryId}` });
};

exports.getMemoryById = getMemoryById;
exports.getMemoriesByUserId = getMemoriesByUserId;
exports.createMemory = createMemory;
exports.updateMemory = updateMemory;
exports.deleteMemory = deleteMemory;
