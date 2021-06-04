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
  amount_donated: { type: Number, default: 0, required: true },
  target_goal: { type: Number, default: 1, required: true },
  deadline: { type: Date, default: Date.now(), min: Date.now() },
  status: {
    type: String,
    required: true,
    default: "active",
    enum: ["active", "inactive", "canceled", "failed", "completed"],
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});

ProjectSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Project", ProjectSchema);

/* note: properties that are not really necessary
donors: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
],
*/
