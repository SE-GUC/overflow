const express = require("express");
const validator = require("../../validations/slotValidations");
const Slot = require("../../models/Slots");

const lifeCoach = new LifeCoach(
  "Aly Mazhar",
  new Date("3/4/1990"),
  "male",
  new Date("5/5/2001"),
  20.5,
  "test@hotmail.com",
  [
    new Slot(false, new Date(), "cairo", null, false),
    new Slot(true, new Date(), "alex", null, true)
  ]
);

const member = new Member(
  "philip",
  new Date("3/31/1997"),
  "female",
  new Date("5/5/2005"),
  "ff@yahoo.com",
  ["web", "java", "asp"],
  ["frontend", "AI"],
  [new Review(partnerUser, "tohfaaa", "3", new Date())]
);

const users = [
  new User("lifeCoach", lifeCoach, "sff"),
  new User("member", member, "ssss")
];

const router = express.Router();

router.get("/LifeCoachSlots/:lifeCoachId", (req, res) => {
  const { lifeCoachId } = req.params;
  const user = users.find(
    user => lifeCoachId === user.id && user.type === "lifeCoach"
  );
  const userIndex = users.indexOf(user);
  if (userIndex < 0)
    // Bad request if not found
    return res.status(400).send({ error: "life coach not found" });
  res.json({ data: user.userData.monthlySlots });
});

router.get("/:lifeCoachId/:slotId", (req, res) => {
  const { lifeCoachId, slotId } = req.params;
  const user = users.find(
    user => lifeCoachId === user.id && user.type === "lifeCoach"
  );
  const userIndex = users.indexOf(user);
  if (userIndex < 0)
    // Bad request if not found
    return res.status(400).send({ error: "life coach not found" });
  const slot = user.userData.monthlySlots.find(slot => slotId === slot.id);
  const slotIndex = user.userData.monthlySlots.indexOf(slot);
  if (slotIndex < 0)
    // Bad request if not found
    return res.status(400).send({ error: "slot not found" });
  res.json({ data: slot });
});

router.post("/create", (req, res) => {
  const { booked, date, location, confirmed, memberId, lifeCoachId } = req.body;
  const isValidated = validator.createValidation(req.body);
  if (isValidated.error)
    return res
      .status(400)
      .json({ error: isValidated.error.details[0].message });
  const lifeCoach = users.find(
    user => lifeCoachId === user.id && user.type === "lifeCoach"
  );
  const userIndex = users.indexOf(lifeCoach);
  if (userIndex < 0)
    // Bad request if not found
    return res.status(400).send({ error: "life coach not found" });
  let member;
  if (memberId) {
    member = users.find(user => memberId === user.id && user.type === "member");
    const userIndex = users.indexOf(member);
    if (userIndex < 0)
      // Bad request if not found
      return res.status(400).send({ error: "member not found" });
  }
  const newSlot = new Slot(booked, date, location, member, confirmed);
  lifeCoach.monthlySlots.push(newSlot);
  res.json({ data: newSlot });
});

router.post("/update/:lifeCoachId/:slotId", (req, res) => {
  const { booked, date, location, confirmed, memberId } = req.body;
  const { lifeCoachId, slotId } = req.params;
  const isValidated = validator.updateValidation(req.body);
  if (isValidated.error)
    return res
      .status(400)
      .json({ error: isValidated.error.details[0].message });
  const lifeCoach = users.find(
    user => lifeCoachId === user.id && user.type === "lifeCoach"
  );
  const userIndex = users.indexOf(lifeCoach);
  if (userIndex < 0)
    // Bad request if not found
    return res.status(400).send({ error: "life coach not found" });
  const slot = lifeCoach.userData.monthlySlots.find(slot => slotId === slot.id);
  const slotIndex = lifeCoach.userData.monthlySlots.indexOf(slot);
  if (slotIndex < 0)
    // Bad request if not found
    return res.status(400).send({ error: "slot not found" });
  let member;
  if (memberId) {
    member = users.find(user => memberId === user.id && user.type === "member");
    const userIndex = users.indexOf(member);
    if (userIndex < 0)
      // Bad request if not found
      return res.status(400).send({ error: "member not found" });
  }
  const id = slotId;
  lifeCoach.userData.monthlySlots[slotIndex] = {
    id,
    booked,
    date,
    location,
    member,
    confirmed
  };
});

router.post("/delete/:lifeCoachId/:slotId", (req, res) => {
  const { lifeCoachId, slotId } = req.params;
  const user = users.find(
    user => lifeCoachId === user.id && user.type === "lifeCoach"
  );
  const userIndex = users.indexOf(user);
  if (userIndex < 0)
    // Bad request if not found
    return res.status(400).send({ error: "life coach not found" });
  const slot = user.userData.monthlySlots.find(slot => slotId === slot.id);
  const slotIndex = user.userData.monthlySlots.indexOf(slot);
  if (slotIndex < 0)
    // Bad request if not found
    return res.status(400).send({ error: "slot not found" });
  user.userData.monthlySlots.splice(slotIndex, 1);

  res.sendStatus(200);
});

module.exports = router;
