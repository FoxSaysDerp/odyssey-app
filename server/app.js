require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const memoriesRoutes = require("./routes/memories");
const usersRoutes = require("./routes/users");

const HttpError = require("./models/http-error");
const app = express();

app.use(bodyParser.json());

app.use("/api/memories", memoriesRoutes);
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
   const error = new HttpError("Could not find this route.", 404);
   throw error;
});

app.use((error, req, res, next) => {
   if (res.headerSent) {
      return next(error);
   }
   res.status(error.code || 500).json({
      message: error.message || "An unknown error has occurred!",
   });
});

mongoose
   .connect(
      `mongodb+srv://${process.env.LOGIN}:${process.env.PASSWORD}@odysseyapp.hhpok.mongodb.net/odysseyAppDB?retryWrites=true&w=majority`
   )
   .then(() => {
      app.listen(process.env.PORT || 5000);
      console.log(
         `Server listening at port ${
            process.env.PORT ? process.env.PORT : 5000
         }`
      );
   })
   .catch((err) => {
      console.error(err);
   });
