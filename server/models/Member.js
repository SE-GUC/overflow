const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const memberSchema = new Schema(
  {
    dateOfBirth: {
      type: Date
    },
    gender: {
      type: String
    },
    joinDate: {
      type: Date
    },
    skills: {
      type: [String]
    },
    interests: {
      type: [String]
    },
    reviews: {
      type: [String]
    },
    age: {
      type: Number
    }
  },
  { _id: false }
);
module.exports = Member = mongoose.model("members", memberSchema);
