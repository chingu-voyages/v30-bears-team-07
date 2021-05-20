const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  name: { type: String, required: true, minlength: 1 },
  description: { type: String, default: "Project has no description." },
  //note: I changed the name from creatorId to creator because this can turn into an object using .populate()
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amountDonated: { type: Number, default: 0, required: true },
  targetGoal: { type: Number, default: 1, required: true },
  donors: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
  ],
  deadline: { type: Date, default: Date.now(), min: Date.now() },
  created: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Project", ProjectSchema);
