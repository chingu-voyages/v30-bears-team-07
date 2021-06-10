const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

//these are just the addresses and HTTP methods
const {
  google_login,
  user_load,
  login,
  register,
} = require("../controllers/auth");

// load user
router.get("/user", auth, user_load);

// register a user
router.post("/register", register);

// Login
router.post("/login", login);

// log in with GoogleAuth
router.post("/google_login", google_login);

module.exports = router;

/*
// load user
router.get("/user", auth, user_load);
// register a user
router.post("/register", user_register);
// Login
router.post("/login", user_login);
*/

/*
// Logout
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/users/login");
});
*/
