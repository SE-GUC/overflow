const express = require("express");
const mongoose = require("mongoose");
const Vacancy = require("../../models/Vacancy");
const User = require("../../models/User");
const JobApplication = require("../../models/JobApplication");
const validator = require("../../validations/vacancyValidation");

const router = express.Router();

router.get("/", async (req, res) => {
  const vacancies = await Vacancy.find();
  return res.json({ data: vacancies });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const vacancy = await Vacancy.findById(id);
    if (!vacancy)
      // Bad request if not found
      return res.status(400).send({ error: "vacancy not found" });
    return res.json({ data: vacancy });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

router.get("/partnerVacancies/:partnerId", async (req, res) => {
  try {
    const { partnerId } = req.params;
    const partner = await User.findOne({ _id: partnerId, type: "partner" });
    if (!partner)
      // Bad request if not found
      return res.status(400).send({ error: "partner not found" });
    const vacancies = await Vacancy.find({ "partner._id": partnerId });
    return res.json({ data: vacancies });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

router.post("/create", async (req, res) => {
  try {
    const isValidated = validator.createValidation(req.body);
    if (isValidated.error) {
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    }
    const partnerId = req.body.partnerId;
    const partner = await User.findOne({ _id: partnerId, type: "partner" });
    if (!partner)
      // Bad request if not found
      return res.status(400).send({ error: "partner not found" });
    req.body.partner = partner;
    delete req.body.partnerId;
    const vacancy = await Vacancy.create(req.body);
    return res.json({ data: vacancy });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const vacancy = await Vacancy.findById(id);
    const isValidated = validator.updateValidation(req.body);
    if (!vacancy)
      // Bad request if not found
      return res.status(400).send({ error: "vacancy not found" });
    if (isValidated.error) {
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    }
    if (vacancy.partner._id != req.body.partnerId)
      return res.status(400).send({ error: "partner cannot be changed" });
    let acceptedMember;
    if (req.body.acceptedMemberId) {
      acceptedMember = await User.findOne({
        _id: req.body.acceptedMemberId,
        type: "member"
      });
      if (!acceptedMember)
        // Bad request if not found
        return res.status(400).send({ error: "member not found" });
    }
    const { partnerId, acceptedMemberId, ...vacancyData } = req.body;
    const { partner } = vacancy;
    let newVacancy;
    if (acceptedMember) {
      newVacancy = await Vacancy.findByIdAndUpdate(
        id,
        {
          partner,
          ...vacancyData,
          acceptedMember
        },
        { new: true }
      );
    } else {
      newVacancy = await Vacancy.findByIdAndUpdate(
        id,
        {
          partner,
          ...vacancyData
        },
        { new: true }
      );
    }
    await JobApplication.updateMany(
      { "vacancy._id": newVacancy._id },
      { vacancy: newVacancy }
    );
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedVacancy = await Vacancy.findByIdAndRemove(id);
    if (!deletedVacancy)
      // Bad request if not found
      return res.status(400).send({ error: "vacancy not found" });
    await JobApplication.deleteMany({ "vacancy._id": deletedVacancy._id });
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

module.exports = router;