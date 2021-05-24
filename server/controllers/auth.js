require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const async = require("async");
const User = require("../models/user");
const SECRETKEY = process.env.SECRETKEY;

// note to self: this is way too long, find a way to split this into 2 (tella)
exports.google_login = async (req, res) => {
  const { email, username } = req.body;
  let errors = [];
  // check if any of the following properties are empty
  if (!username || !email)
    errors.push({ msg: "Username or email are missing." });
  console.log(email);
  if (errors.length > 0) {
    res.status(400).json({ errors });
  } else {
    try {
      const emailLowerCase = email.toLowerCase();
      // check if e-mail is already taken
      const userWithSameEmail = await User.findOne({ email: emailLowerCase });
      // if user already exists, just return login success and do not register the user to the database
      if (userWithSameEmail) {
        //////////////////// LOGIN ////////////////////
        // variable reassignment to make it more readable
        const user = userWithSameEmail;
        // user object to be used for token
        const userForToken = {
          username: user.username,
          id: user._id.toString(),
        };
        // synchronous signing of JWT token
        const token = jwt.sign(userForToken, SECRETKEY, {
          // TTL so it expires around 8 hours, and does not stay forever
          expiresIn: 28800,
        });

        // this will be the user returned to the frontend
        const responseUserObject = {
          id: user._id.toString(),
          username: user.username,
          email: user.email,
          projectsOwned: [],
          projectsSupported: [],
        };
        //return JSON object to the frontend
        res.status(200).json({
          token,
          user: responseUserObject,
        });
      }
      // go through the registration process, to add the user to the database
      else {
        ////////////////////REGISTRATION////////////////////
        // create a new user mongoose
        const newUser = new User({
          email: emailLowerCase,
          username,
        });
        const savedUser = await newUser.save();
        if (!savedUser) throw Error("Failed to register the user.");
        // user object to be used for token
        const userForToken = {
          username: savedUser.username,
          id: savedUser._id.toString(),
        };

        // synchronous signing of JWT token
        const token = jwt.sign(userForToken, SECRETKEY, {
          // TTL so it expires around 8 hours, and does not stay forever
          expiresIn: 28800,
        });

        // this will be the user returned to the frontend
        const responseUserObject = {
          id: savedUser._id.toString(),
          username: savedUser.username,
          email: savedUser.email,
          projectsOwned: [],
          projectsSupported: [],
        };
        //return JSON object to the frontend
        res.status(200).json({
          token,
          user: responseUserObject,
        });
      }
    } catch (e) {
      console.log(e);
      res.status(400).json({ msg: e.message });
    }
  }
};

/*
const login = async (req, res) => {
  const { username, email, password } = req.body;
  //  ADD CODE HERE

  return res.json({
    statuCode: 200,
    message: "User created successfully.",
  });
};
*/

// note: this is definitely not updated, ignore this documentation for now
/**
 * @api {post} /user/create/ user/create
 * @apiName auth/register
 * @apiGroup Auth
 *
 * @apiDescription Creates a user.
 *
 * @apiParam {String} username username of user.
 * @apiParam {String} email email of user.
 * @apiParam {String} password password of user.
 *
 * @apiParamExample {json} Request-Example:
 * {
 *   "username": "test",
 *   "email": "email@bears.com",
 *   "password": "test",
 *  }
 *
 * @apiSuccess {String} message User created successfully..
 *
 * @apiSuccessExample {String} Success-Response:
 *
 *  {
 *     "statusCode": 200,
 *     "message": "User created successfully."
 *  }
 *
 * @apiError (500 Internal server error) message Internal server error.
 *
 * @apiErrorExample Error-Response:
 *  {
 *     "statusCode": 500,
 *     "message": "Internal server error"
 *  }
 */

/*
 exports.register = async (req, res) => {
   const { username, password } = req.body;
   console.log(req.body);
   let errors = [];

   // check if any of the following fields are empty
   if (!username || !password) {
     errors.push({ msg: "Please fill in all the fields." });
   }

   // minimum length for the password
   if (password.length < 6) {
     errors.push({ msg: "Password must be at least 6 characters" });
   }

   if (errors.length > 0) {
     res.status(400).json({ errors });
   } else {
     try {
       // Check if username is already taken
       const userWithSameUsername = await User.findOne({
         username,
       });
       if (userWithSameUsername) throw Error("Username is already taken.");
       // check if salt generation has any errors
       const salt = await bcrypt.genSalt(10);
       if (!salt)
         throw Error("Something went wrong with encrypting the password.");
       // check if hashing the password has any errors
       const hash = await bcrypt.hash(password, salt);
       if (!hash) throw Error("Something went wrong hashing the password.");
       console.log(SECRETKEY);

       // create new user object in mongoose
       const newUser = new User({
         username,
         password: hash,
       });
       const savedUser = await newUser.save();
       if (!savedUser) throw Error("Failed to register the user.");

       // user object to be used for token
       const userForToken = {
         username: savedUser.username,
         id: user._id,
       };
       // synchronous signing of JWT token
       const token = jwt.sign(userForToken, SECRETKEY, {
         // TTL so it expires around 8 hours, and does not stay forever
         expiresIn: 28800,
       });

       // this will be the user returned to the frontend
       const responseUserObject = {
         _id: savedUser._id,
         username: savedUser.username,
         // note: these will be properties to be added and used most likely on Sprint 3-4
         // projectsOwned: []
         // projectsSupported: []
       };
       //return JSON object to the frontend
       res.status(200).json({
         token,
         user: responseUserObject,
       });
     } catch (e) {
       console.log(e);
       res.status(400).json({ msg: e.message });
     }
   }
 };
 */

/**
 * @api {post} /user/login/ user/login
 * @apiName user/login
 * @apiGroup User
 *
 * @apiDescription Returns an access token for the user.
 *
 * @apiParam {String} username username of user.
 * @apiParam {String} password password of user.
 *
 * @apiParamExample {json} Request-Example:
 * {
 *   "username": "test",
 *   "password": "test",
 *  }
 *
 * @apiSuccess {String} message accessToken eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJlbWFpbCI6ImVtYWlsQG1tby5jb20iLCJpYX...
 *
 * @apiSuccessExample {String} Success-Response:
 *
 *  {
 *     "statusCode": 200,
 *     "message": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJlbWFpbCI6ImVtYWlsQG1tby5jb20iLCJpYXQiOjE2MDI4NTU2MDgsImV4cCI6MTYwMjg1OTIwOH0.sG0afJbmNSrf-MAMWMqyeqZR7rqEwerfRIJvIvhOnoo"
 *  }
 *
 * @apiError (500 Internal server error) message Internal server error.
 *
 * @apiErrorExample Error-Response:
 *  {
 *     "statusCode": 500,
 *     "message": "Internal server error"
 *  }
 */
