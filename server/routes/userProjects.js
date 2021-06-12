const express = require("express");
// this enables the userProjects router to get the params of the parent route users
const router = express.Router({ mergeParams: true });

const { get_all_user_projects } = require("../controllers/projects");

// get all the userProjects of the user
router.get("/", get_all_user_projects);

module.exports = router;
