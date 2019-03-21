const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const adminSchema = new Schema({
   name: {
    type: String
   },
   dateOfBirth: {
    type: Date
  },
  gender: {
    type: String
  },
  joinDate: {
    type: Date
  },
  salary: {
    type: String
  },
  email: {
    type: String
  },
  isSuper: {
    type: Boolean
  },
  age: {
    type: Number
  },
});
module.exports = Admin = mongoose.model("admins", adminSchema);
