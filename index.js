require("dotenv").config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const noCache = require("nocache");
const logger = require("morgan");
const loginRouter = require("./server/controllers/login");

const app = express();
app.use(cors());
app.use(logger("dev"));
// helmet security
app.use(noCache());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// get routes
const authRouter = require("./server/routes/auth");
//  routes
/*
app.use("/", function (req, res) {
  const dbState =
    mongoose.connection.readyState === 1
      ? "Connected to db."
      : "Not connected to db";
  res.send("Welcome to Go-on api. " + dbState);
});
*/

app.use("/auth", authRouter);

const connect = async () => {
  // database connection
  const SERVER_PORT = process.env.PORT || 5000;
  const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost/";
  const MONGO_CONFIG = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  try {
    mongoose.Promise = global.Promise;
    await mongoose.connect(MONGO_URL, MONGO_CONFIG);
    console.log("Successfully connected MongoDB!");
  } catch (err) {
    console.log("Mongoose error", err);
  }
  // start express server
  app.listen(SERVER_PORT);
  console.log(`Server listening on localhost:${SERVER_PORT}`);
};

connect();
