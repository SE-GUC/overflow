const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    type: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
      //select: false
    },
    image: {
      type: String
    },
    userData: {}
  },
  { strict: false }
);

module.exports = User = mongoose.model("users", UserSchema);
