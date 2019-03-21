const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const LifeCoachSchema = new Schema({
    SdateOfBirth: {
      type: Date
    },
    gender: {
      type: String
    },
    joinDate: {
      type: Date.now
    },
    hourlyRate: {
      type: String
    },
   
    monthlySlots: {
      type: [String]
    }
  }); 
module.exports = LifeCoach = mongoose.model("lifeCoaches",LifeCoachSchema);
