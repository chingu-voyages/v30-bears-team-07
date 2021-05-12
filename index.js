require("dotenv").config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const noCache = require("nocache");
const logger = require("morgan");

const app = express();
app.use(cors());
app.use(logger("dev"));
// helmet security
app.use(noCache());
app.use(helmet());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// get routes
const authRouter = require("./server/routes/auth");
//  routes
app.use("/auth", authRouter);

const connect = async () => {
  // database connection
  const SERVER_PORT = process.env.SERVER_PORT || 5000;
  const MONGO_URL = process.env.MONGO_URL;
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
