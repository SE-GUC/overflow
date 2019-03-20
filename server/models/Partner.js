const mongoose = require("mongoose");
const Schema = mongoose.Schema;
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
    partners: {
      type: [String]
    },
    members: {
      type: [String]
    },
    projects: {
      type: [String]
    }
  },
  { _id: false }
);
module.exports = User = mongoose.model("partners", partnerSchema);
