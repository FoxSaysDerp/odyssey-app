const { uuid } = require("uuidv4");

const HttpError = require("../models/http-error");

const DUMMY_MEMORIES = [
   {
      id: "m1",
      title: "My dog",
      description: "Bla bla bla",
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
         "Could not find Memory for provided id",
         404
      ));
   }

   res.json({ memory });
};

const getMemoryByUserId = (req, res, next) => {
   const userId = req.params.uid;
   const memory = DUMMY_MEMORIES.find((m) => {
      return m.creator === userId;
   });

   if (!memory) {
      return next(
         new HttpError("Could not find Memory for provided user id", 404)
      );
   }

   res.json({ memory });
};

const createMemory = (req, res, next) => {
   const { title, description, coordinates, creator } = req.body;
   const createdMemory = {
      id: uuid(),
      title,
      description,
      location: coordinates,
      creator,
   };

   DUMMY_MEMORIES.push(createdMemory);

   res.status(201).json({ memory: createdMemory });
};

exports.getMemoryById = getMemoryById;
exports.getMemoryByUserId = getMemoryByUserId;
exports.createMemory = createMemory;
