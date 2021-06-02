const async = require("async");
const User = require("../models/user");

/*
note: potentially useful stuff in the future, currently not used now (tella)
don't remove


exports.user_upload_avatar = async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "amussement_setups",
      public_id: `${req.params.id}-user-avatar`,
      width: 350,
      height: 350,
      crop: "limit",
    });

    const avatarUrl = uploadedResponse.secure_url;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          image_url: avatarUrl,
        },
      },
      {
        new: true,
      }
    );
    if (!updatedUser) throw Error("Failed to update the user.");
    console.log("succeeded in uploading the avatar");
    res.status(200).json({
      user: {
        image_url: avatarUrl,
      },
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: e.message });
  }
};

exports.user_edit_account = async (req, res) => {
  const { email, username, password } = req.body;
  console.log(req.body);
  let errors = [];

  // check if any of the following fields are empty
  if (!username || !email || !password) {
    errors.push({ msg: "Please fill in all the fields." });
  }
  // minimum length for the password
  if (password.length < 6) {
    errors.push({ msg: "Password must be at least 6 characters" });
  }
  // if there are errors, re-\ render the page but with the values that were filled in
  // note: figure out how to send errors to thefrontend
  if (errors.length > 0) {
    res.status(400).json({ errors });
  } else {
    try {
      const emailLowerCase = email.toLowerCase();
      const user = await User.findById(req.params.id);
      if (!user) throw Error("User does not exist.");
      // Check if username is already taken
      const userWithSameUsername = await User.findOne({
        username,
      });
      if (userWithSameUsername) {
        if (userWithSameUsername._id != req.params.id)
          throw Error("Username is already taken.");
      }

      // Check if email is already taken
      const userWithSameEmail = await User.findOne({
        email: emailLowerCase,
      });
      if (userWithSameEmail) {
        if (userWithSameEmail._id != req.params.id)
          throw Error("Email is already taken.");
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw Error("Invalid credentials.");

      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            email: emailLowerCase,
            username,
          },
        },
        {
          new: true,
        }
      );
      if (!updatedUser) throw Error("Failed to update the user.");
      console.log(updatedUser);

      res.status(200).json({
        user: {
          username: updatedUser.username,
          email: updatedUser.email.toLowerCase(),
        },
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({ msg: e.message });
    }
  }
};

exports.user_change_password = async (req, res) => {
  const { password, new_password, new_password_2 } = req.body;
  console.log(req.body);
  let errors = [];

  // check if any of the following fields are empty
  if (!password || !new_password || !new_password_2) {
    errors.push({ msg: "Please fill in all the fields." });
  }

  // minimum length for the password
  if (
    password.length < 6 ||
    new_password.length < 6 ||
    new_password_2.length < 6
  ) {
    errors.push({ msg: "Password must be at least 6 characters" });
  }

  // check if the password confirmation matches
  if (new_password !== new_password_2) {
    errors.push({ msg: "Password confirmation does not match." });
  }

  // if there are errors, re-\ render the page but with the values that were filled in
  // note: figure out how to send errors to thefrontend
  if (errors.length > 0) {
    res.status(400).json({ errors });
  } else {
    try {
      const user = await User.findById(req.params.id);
      if (!user) throw Error("User does not exist.");

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw Error("Invalid credentials.");

      // check if salt generation has any errors
      const salt = await bcrypt.genSalt(10);
      if (!salt)
        throw Error("Something went wrong with encrypting the password.");
      // check if hashing the password has any errors
      const hash = await bcrypt.hash(new_password, salt);
      if (!hash) throw Error("Something went wrong hashing the password.");
      console.log(JWT_SECRETKEY);

      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            password: hash,
          },
        },
        {
          new: true,
        }
      );
      if (!updatedUser) throw Error("Failed to update the user.");
      console.log(updatedUser);
      res.status(200).json({
        user: {},
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({ msg: e.message });
    }
  }
};

exports.user_remove_avatar = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          image_url: "",
        },
      },
      {
        new: true,
      }
    );
    if (!updatedUser) throw Error("Failed to update the user.");
    console.log(updatedUser);
    res.status(200).json({
      user: {
        image_url: "",
      },
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: e.message });
  }
};

exports.user_disable_account = async (req, res) => {
  const { password } = req.body;
  console.log(req.body);
  let errors = [];

  // check if any of the following fields are empty
  if (!password) {
    errors.push({ msg: "Please fill in the password field." });
  }
  // minimum length for the password
  if (password.length < 6) {
    errors.push({ msg: "Password must be at least 6 characters" });
  }
  // if there are errors, re-\ render the page but with the values that were filled in
  // note: figure out how to send errors to thefrontend
  if (errors.length > 0) {
    res.status(400).json({ errors });
  } else {
    try {
      const user = await User.findById(req.params.id);
      if (!user) throw Error("User does not exist.");

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw Error("Invalid credentials.");

      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            disabled: true,
          },
        },
        {
          new: true,
        }
      );
      if (!updatedUser) throw Error("Failed to update the user.");
      res.status(200).json({ success: true });
    } catch (e) {
      console.log(e);
      res.status(400).json({ msg: e.message });
    }
  }
};

exports.user_delete_account = async (req, res) => {
  const { password } = req.body;
  // console.log(req);
  // console.log(req.data);
  // console.log(req.body);
  console.log("430 delete account;");
  let errors = [];

  // check if any of the following fields are empty
  if (!password) {
    errors.push({ msg: "Please fill in the password field." });
  }
  console.log(password);
  // minimum length for the password
  if (password.length < 6) {
    errors.push({ msg: "Password must be at least 6 characters" });
  }
  // if there are errors, re-\ render the page but with the values that were filled in
  // note: figure out how to send errors to thefrontend
  if (errors.length > 0) {
    res.status(400).json({ errors });
  } else {
    try {
      const user = await User.findById(req.params.id);
      if (!user) throw Error("User does not exist.");

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw Error("Invalid credentials.");

      User.findById(req.params.id)
        .then((user) => {
          user.remove().then(() => {
            res.status(200).json({ success: true });
          });
        })
        .catch((e) => {
          res.status(400).json({ msg: e.message });
        });
    } catch (e) {
      console.log(e);
      res.status(400).json({ msg: e.message });
    }
  }
};

*/
