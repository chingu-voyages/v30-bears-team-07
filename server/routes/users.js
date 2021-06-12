const express = require("express");
const router = express.Router();

// nested routes
const userProjectsRouter = require("./userProjects");
router.use("/:id/userProjects/", userProjectsRouter);

module.exports = router;
