//collection imports
const User = require("../models/User");

//defining options for the update to avoid updating the same collection several
//times
const updateOptions = {
  update_user: true,
  update_feedback: true
};

//updateGlobal expecting a member Object and options
const updateGlobal = async (member, options) => {
  const { _id } = member;
  const promises = [];
  const optionKeys = Object.keys(options);
  optionKeys.forEach((option, index) => {
    if (options[option]) promises.push(updates[index](_id, member));
  });
  await Promise.all(promises);
  return;
};
//format: update_collection1_collection2 -> update member in collection1
//in collection2
//ex: update member in vacancy in jobApplication.
//updates member in user collection
const update_user = async (_id, member) => {
  await User.updateOne({ _id }, member);
  return;
};
//updates member in feedback collection
const update_feedback = async (_id, member) => {
  const query = { "userData.feedback.member._id": _id };
  delete member.userData.reviews;
  await User.updateMany(query, {
    $set: { "userData.feedback.$.member": member }
  });
  //partner global update goes here
};

//grouping update functions
const updates = [update_user, update_feedback];
module.exports = { updateGlobal, updateOptions };
