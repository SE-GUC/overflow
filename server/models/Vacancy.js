const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = require("./User").schema;

const vacancySchema = new Schema({
  partner: {
    type: userSchema,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  duration: {
    type: String
  },
  monthlyWage: {
    type: String
  },
  location: {
    type: String
  },
  dailyHours: {
    type: String
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  state: {
    type: String
  },
  acceptedMember: {
    type: userSchema
  }
});

module.exports = Vacancy = mongoose.model("vacancies", vacancySchema);
