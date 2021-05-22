const express = require("express");
const router = express.Router();

const { create_project } = require("../controllers/projects");

// router.get("/:id", get_project);
router.post("/", create_project);
// router.patch("/:id/cancel", cancel_project);
// router.patch("/:id/edit_project", edit_project);
// router.delete("/:id", delete_project);

module.exports = router;
