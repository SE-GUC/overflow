const express = require("express");
const validator = require("../../validations/slotValidations");
const router = express.Router();


const Slot = require("../../models/Slots");
const Feedback = require("../../models/Feedback");

const slots = [
  new Slot(
    true,
    new Date(),
    "rehab",
    {
      name: "Youssef",
      dateOfBirth: new Date(12 / 11 / 1999),
      gender: "male",
      joinDate: new Date(),
      email: "hiks@yahoo.com",
      skills: ["dp", "cd"],
      interests: ["hddockey", "baseball"],
      reviews: null
    },
    false
  )
];

router.post("/create", (req, res) => {
  const { booked, date, location, member, confirmed } = req.body;
  const isValidated = validator.createValidation(req.body);
  if (isValidated.error)
    return res
      .status(400)
      .json({ error: isValidated.error.details[0].message });
  const newSlot = new Slot(booked, date, location, member, confirmed);
  slots.push(newSlot);
  res.json({ data: newSlot });
});

router.get("/read/:id", (req, res) => {
  const id = req.params.id;
  let found = false;
  let currentSlot = null;
  slots.forEach(Slot => {
    if (Slot.id == id) {
      found = true;
      currentSlot = Slot;
    }
  });
  found
    ? res.json({ data: currentSlot })
    : res.json({ err: "Slot Not Found" });
});

router.get("/read/", (req, res) => {
  res.json({ data: slots });
});

router.post("/update/:id", (req, res) => {
  const id = req.params.id;
  const isValidated = validator.createValidation(req.body);
  if (isValidated.error)
    return res
      .status(400)
      .send({ error: isValidated.error.details[0].message });
  const newSlot = req.body;
  let tempFeed;
  let found = false;
  slots.map((Slot, i) => {
    if (Slot.id == id) {
      found = true;

      Slot = {
        id,
        ...newSlot
      };
      slots.splice(i, 1, Slot);
      tempSlot = Slot;
    }
  });
  found
    ? res.json({ data: tempSlot })
    : res.json({ err: "Slot Not Found" });
});

router.post("/delete/:id", (req, res) => {
  const id = req.params.id;
  let found = false;
  slots.map((Slot, i) => {
    if (Slot.id == id) {
      found = true;
      tempFeed = slots.splice(i, 1);
    }
  });
  found ? res.json({ data: tempFeed }) : res.json({ err: "Slot Not Found" });
});

router.get("/read/", (req, res) => {
  res.json({ data: slots });
});
module.exports = router;
