const { v4 } = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");

let DUMMY_MEMORIES = [
   {
      id: "m1",
      title: "My dog",
      description: "Bla bla bla",
      address: "Test street 213B",
      location: {
         lat: 40.7484474,
         lng: -73.9871516,
      },
      creator: "u1",
   },
];

const getMemoryById = (req, res, next) => {
   const memoryId = req.params.mid;
   const memory = DUMMY_MEMORIES.find((m) => {
      return m.id === memoryId;
   });

   if (!memory) {
      throw (error = new HttpError(
         `Could not find Memory for provided id: ${memoryId}`,
         404
      ));
   }

   res.json({ memory });
};

const getMemoriesByUserId = (req, res, next) => {
   const userId = req.params.uid;
   const memories = DUMMY_MEMORIES.filter((m) => {
      return m.creator === userId;
   });

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

const createMemory = (req, res, next) => {
   const errors = validationResult(req);

   if (!errors.isEmpty()) {
      throw new HttpError(
         "Invalid inputs passed, please check your data.",
         422
      );
   }

   const { title, description, address, coordinates, creator } = req.body;
   const createdMemory = {
      id: v4(),
      title,
      description,
      address,
      location: coordinates,
      creator,
   };

   DUMMY_MEMORIES.push(createdMemory);

   res.status(201).json({ memory: createdMemory });
};

const updateMemory = (req, res, next) => {
   const errors = validationResult(req);

   if (!errors.isEmpty()) {
      throw new HttpError(
         "Invalid inputs passed, please check your data.",
         422
      );
   }

   const { title, description } = req.body;
   const memoryId = req.params.mid;

   const updatedMemory = { ...DUMMY_MEMORIES.find((m) => (m.id = memoryId)) };
   const memoryIndex = DUMMY_MEMORIES.findIndex((m) => m.id === memoryId);

   updatedMemory.title = title;
   updatedMemory.description = description;

   DUMMY_MEMORIES[memoryIndex] = updatedMemory;

   res.status(200).json({ memory: updatedMemory });
};

const deleteMemory = (req, res, next) => {
   const memoryId = req.params.mid;
   if (!DUMMY_MEMORIES.find((m) => m.id === memoryId)) {
      throw new HttpError(
         `Could not find a Memory with that ID: ${memoryId}`,
         404
      );
   }

   DUMMY_MEMORIES = DUMMY_MEMORIES.filter((m) => m.id !== memoryId);

   res.status(200).json({ message: `Deleted Memory with id: ${memoryId}` });
};

exports.getMemoryById = getMemoryById;
exports.getMemoriesByUserId = getMemoriesByUserId;
exports.createMemory = createMemory;
exports.updateMemory = updateMemory;
exports.deleteMemory = deleteMemory;
