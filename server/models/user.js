const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    // note: not required for now because we are just using email and password for log (tella)
    // required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  passwordHash: {
    type: String,
    // not required for now because Googleauth users do not have a password
    // required: true,
  },
  projectsOwned: [],
  projectsSupported: [],
  created: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // note: put these back later when  email login finally works
    // the passwordHash should not be revealed
    // delete returnedObject.passwordHash;
  },
});

module.exports = mongoose.model("User", userSchema);
