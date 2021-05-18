const User = require("../models/users");

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

exports.user_register = async (req, res) => {
  const { email, username, password, auth_method } = req.body;
  console.log(req.body);
  let errors = [];

  // check if any of the following fields are empty
  if (!username || !email || (!password && auth_method !== "google"))
    errors.push({ msg: "Please fill in all the fields." });
  // minimum length for the password, unless Google sign in was used as the auth method
  if (password.length < 6 && auth_method !== "google")
    errors.push({ msg: "Password must be at least 6 characters" });

  if (errors.length > 0) {
    res.status(400).json({ errors });
  } else {
    try {
      const emailLowerCase = email.toLowerCase();
      // check if e-mail is already taken
      const userWithSameEmail = await User.findOne({ email: emailLowerCase });
      // if Google sign in is used, just return success and do not register the user
      if (auth_method == "google" && userWithSameEmail)
        res.status(200).json({ registeredGoogleUser: true });
      if (userWithSameEmail) throw Error("Email is already taken.");
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

      const newUser = new User({
        email: emailLowerCase,
        username,
        password: hash,
      });
      const savedUser = await newUser.save();
      if (!savedUser) throw Error("Failed to register the user.");
      // synchronous signing of JWT token

      const token = jwt.sign({ id: savedUser._id }, SECRETKEY, {
        expiresIn: 28800,
      });
      //
      console.log(token);
      console.log(savedUser);
      res.status(200).json({
        token,
        user: {
          _id: savedUser._id,
          username: savedUser.username,
          friends: [],

          email: savedUser.email.toLowerCase(),
          image_url: "",
        },
        rooms: [],
        dmRooms: [],
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({ msg: e.message });
    }
  }
};

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  /*
    ADD CODE HERE
    */
  return res.json({
    statuCode: 200,
    message: "User created successfully.",
  });
};

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

const login = async (req, res) => {
  const { username, email, password } = req.body;
  /*
    ADD CODE HERE
    */
  return res.json({
    statuCode: 200,
    message: "User created successfully.",
  });
};
