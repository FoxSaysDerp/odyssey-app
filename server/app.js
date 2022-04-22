require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const memoriesRoutes = require("./routes/memories");
const usersRoutes = require("./routes/users");

const HttpError = require("./models/http-error");
const loading = require("./misc/loading");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
   res.setHeader("Access-Control-Allow-Origin", "*");
   res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
   );
   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE,");
   next();
});

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

let connection = false;

!connection ? loading : null;

mongoose
   .connect(
      `mongodb+srv://${process.env.LOGIN}:${process.env.PASSWORD}@odysseyapp.hhpok.mongodb.net/odysseyAppDB?retryWrites=true&w=majority`
   )
   .then(() => {
      connection = true;
      clearInterval(loading);
      app.listen(process.env.PORT || 5000);
      console.clear();
      console.log(
         `\x1b[32m[nodemon] \x1b[0mServer listening at port \x1b[31m${
            process.env.PORT ? process.env.PORT : 5000
         }\x1b[0m.`
      );
   })
   .catch((err) => {
      console.error(err);
   });
