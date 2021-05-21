const express = require("express");
const router = express.Router();

const projects_controller = require("../../controllers/projectsController");

router.get("/:id", projects_controller.get_project);
router.get("/dmProjects/:projectName", projects_controller.get_dm_project);

router.post("/", projects_controller.create_project);
// note: might want to use ID instead
router.patch("/:name/join", projects_controller.join_project);

router.patch(
  "/:id/submit_project_password",
  projects_controller.submit_project_password
);

router.patch("/:id/leave", projects_controller.leave_project);

router.patch("/:id/edit_project", projects_controller.edit_project);

router.patch("/:id/upload_icon", projects_controller.upload_icon);

router.delete("/:id", projects_controller.delete_project);

module.exports = router;
