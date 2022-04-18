const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const memorySchema = new Schema({
   title: { type: String, required: true },
   description: { type: String, required: true },
   image: { type: String, required: true },
   createdOn: { type: String, required: true },
   creator: { type: String, required: true },
});

module.exports = mongoose.model("Memory", memorySchema);
