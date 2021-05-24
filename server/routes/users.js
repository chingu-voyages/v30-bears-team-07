const express = require("express");
const router = express.Router();

const {} = require("../../controllers/userController");

// nested routes
const userProjectsRouter = require("./userProjects");
router.use("/:id/userProjects/", userProjectsRouter);

/* note: I left these here for future purposes (tella)
// please do not remove

// edit user settings
// note: all of these should be patch below
router.patch(
  "/:id/settings/edit-account",
  user_edit_account
);

router.patch(
  "/:id/settings/change-password",
  user_change_password
);

router.patch(
  "/:id/settings/upload-avatar",
  user_upload_avatar
);

router.patch(
  "/:id/settings/remove-avatar",
  user_remove_avatar
);

router.patch(
  "/:id/settings/disable-account",
  user_disable_account
);

router.delete(
  "/:id/settings/delete-account",
  user_delete_account
);

*/
module.exports = router;
