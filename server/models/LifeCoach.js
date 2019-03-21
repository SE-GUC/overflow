const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const LifeCoachSchema = new Schema({
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
    hourlyRate: {
      type: Number
    },
    email: {
      type: String
    },
    monthlySlots: {
      type: Number
    }
  }); 
module.exports = LifeCoach = mongoose.model("lifeCoaches",LifeCoachSchema);
