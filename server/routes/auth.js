const express = require("express")

const authRouter = express.Router()
const { login, signup } = require("../controllers/auth")

authRouter.post("/login", login)
authRouter.post("/signup", signup)

module.exports = authRouter;


