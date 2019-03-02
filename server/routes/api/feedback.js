const express = require("express");
const validator = require("../../validations/feedbackValidations");
const router = express.Router();
const User = require("../../models/User");
const Feedback = require("../../models/Feedback");
const allUsers = require("../../userArray");
//
router.post("/create", (req, res) => {
  const { memberID, partnerID, feedbackText } = req.body;
  let userFound = false;
  const isValidated = validator.createValidation(req.body);
  if (isValidated.error)
    return res
      .status(400)
      .json({ error: isValidated.error.details[0].message });
  const member = allUsers.find(
    user => user.type === "member" && user.id === memberID
  );

  if (!member) return res.status(404).json({ error: "Member not Found" });
  const newFeedback = new Feedback(member, feedbackText, new Date());

  allUsers.map(user => {
    if (user.type === "partner" && user.id === partnerID) {
      user.userData.feedback.push(newFeedback);
      userFound = true;
    }
  });
  if (!userFound) {
    return res.status(404).json({ error: "Partner not Found" });
  }

  return res.json({ data: newFeedback });
});

router.get("/readPartnerFeedbacks/:partnerId", (req, res) => {
  const { partnerId } = req.params;
  const partner = allUsers.find(
    user => user.id === partnerId && user.type === "partner"
  );
  partner
    ? res.json({ data: partner.userData.feedback })
    : res.status(404).json({ err: "Partner Not Found" });
});

router.get("/readFeedback/:feedbackId", (req, res) => {
  const feedbackId = req.params.feedbackId;
  let fetchedFeedback = null;
  allUsers.map(user => {
    if (user.type === "partner") {
      fetchedFeedback = user.userData.feedback.find(
        Feedback => Feedback.id === feedbackId
      );
      if (fetchedFeedback) {
        return res.json({ data: fetchedFeedback });
      }
    }
  });

  return res.status(404).json({ err: "Feedback Not Found" });
});

// router.get("/read/", (req, res) => {
//   res.json({ data: Feedbacks });
// });

router.put("/update/:partnerId/:feedbackId", (req, res) => {
  const { partnerId, feedbackId } = req.params;
  const { memberID, feedbackText } = req.body;
  const isValidated = validator.updateValidation(req.body);
  if (isValidated.error)
    return res
      .status(400)
      .send({ error: isValidated.error.details[0].message });

  const member = allUsers.find(
    user => user.id === memberID && user.type === "member"
  );
  const partner = allUsers.find(
    user => user.id === partnerId && user.type === "partner"
  );
  if (!member) {
    return res.status(404).json({ error: "Member not found" });
  }
  if (!partner) {
    return res.status(404).json({ error: "Partner not found" });
  }
  const Feedback = partner.userData.feedback.find(
    Feedback => Feedback.id === feedbackId
  );
  if (!Feedback) {
    return res.status(404).json({ err: "Feedback Not Found" });
  }
  const datePosted = Feedback.datePosted;
  const FeedbackIndex = partner.userData.feedback.indexOf(Feedback);
  const partnerIndex = allUsers.indexOf(partner);
  const id = feedbackId;
  allUsers[partnerIndex].userData.feedback[FeedbackIndex] = {
    id,
    member,
    feedbackText,
    datePosted
  };

  return res.json({
    data: allUsers[partnerIndex].userData.feedback[FeedbackIndex]
  });
});

router.post("/delete/:partnerId/:feedbackId", (req, res) => {
  const { partnerId, feedbackId } = req.params;
  const partner = allUsers.find(
    user => user.id === partnerId && user.type === "partner"
  );
  if (!partner) {
    return res.status(404).send({ error: "Partner not found" });
  }
  const Feedback = partner.userData.feedback.find(
    Feedback => Feedback.id === feedbackId
  );
  if (!Feedback) {
    return res.status(404).json({ err: "Feedback Not Found" });
  }
  const FeedbackIndex = partner.userData.feedback.indexOf(Feedback);
  const removed = partner.userData.feedback.splice(FeedbackIndex, 1);

  res.sendStatus(200);
});

// router.get("/read/", (req, res) => {
//   res.json({ data: Feedbacks });
// });
module.exports = router;
