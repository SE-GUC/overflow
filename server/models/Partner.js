const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const feedback = require("./Feedback.js");
const partnerSchema = new Schema(
  {
    address: {
      type: String
    },
    fax: {
      type: String
    },
    phone: {
      type: Number
    },
    fieldOfWork: {
      type: String
    },
    partners: {
      type: [String]
    },
    members: {
      type: [String]
    },
    projects: {
      type: [String]
    },
    feedback: {
      type: [String] //Should be of type feedback,[pending schema]
    }
  },
  { _id: false }
);
module.exports = Partner = mongoose.model("partners", partnerSchema);
