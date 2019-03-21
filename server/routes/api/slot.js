const express = require("express");
const validator = require("../../validations/slotValidations");
const LifeCoach = require("../../models/LifeCoach");
const Slot = require("../../models/Slots");
const User = require("../../models/User");

const router = express.Router();

router.get("/LifeCoachSlots/:lifeCoachId", async (req, res) => {
  try {
    const { lifeCoachId } = req.params;
    const lifeCoach = await User.findOne({
      _id: lifeCoachId,
      type: "lifeCoach"
    });
    if (!lifeCoach)
      // Bad request if not found
      return res.status(400).send({ error: "life coach not found" });
    return res.json({ data: lifeCoach.userData.monthlySlots });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

router.get("/readSlot/:slotId", async (req, res) => {
  try {
    const { slotId } = req.params;
    const lifeCoaches = await User.find({ type: "lifeCoach" });
    let resultSlot;
    lifeCoaches.map(lifeCoach => {
      const slot = lifeCoach.userData.monthlySlots.find(
        slot => slot._id == slotId
      );
      if (slot) resultSlot = slot;
    });
    if (!resultSlot) return res.status(400).send({ error: "slot not found" });
    return res.json({ data: resultSlot });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

router.post("/create", async (req, res) => {
  try {
    const { memberId, lifeCoachId, ...slotData } = req.body;
    const isValidated = validator.createValidation(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .json({ error: isValidated.error.details[0].message });
    const lifeCoach = await User.findOne({
      _id: lifeCoachId,
      type: "lifeCoach"
    });
    if (!lifeCoach)
      // Bad request if not found
      return res.status(400).send({ error: "life coach not found" });
    let member;
    if (memberId) {
      member = await User.findOne({ _id: memberId, type: "member" });
      if (!member)
        // Bad request if not found
        return res.status(400).send({ error: "member not found" });
    }
    let newSlot;
    if (member) {
      newSlot = new Slot({ member, ...slotData });
    } else {
      newSlot = new Slot(slotData);
    }
    lifeCoach.userData.monthlySlots.push(newSlot);
    await User.updateOne({ _id: lifeCoachId, type: "lifeCoach" }, lifeCoach);
    return res.json({ data: newSlot });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

router.put("/update/:lifeCoachId/:slotId", async (req, res) => {
  try {
    const { memberId, ...slotData } = req.body;
    const { lifeCoachId, slotId } = req.params;
    const isValidated = validator.updateValidation(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .json({ error: isValidated.error.details[0].message });
    const lifeCoach = await User.findOne({
      _id: lifeCoachId,
      type: "lifeCoach"
    });
    if (!lifeCoach)
      // Bad request if not found
      return res.status(400).send({ error: "life coach not found" });
    const slot = lifeCoach.userData.monthlySlots.find(
      slot => slot._id == slotId
    );
    if (!slot)
      // Bad request if not found
      return res.status(400).send({ error: "slot not found" });
    let member;
    if (memberId) {
      member = await User.findOne({ _id: memberId, type: "member" });
      if (!member)
        // Bad request if not found
        return res.status(400).send({ error: "member not found" });
    }
    let newSlot;
    if (member) {
      newSlot = new Slot({ member, ...slotData });
    } else {
      newSlot = new Slot(slotData);
    }
    const slotIndex = lifeCoach.userData.monthlySlots.indexOf(slot);
    lifeCoach.userData.monthlySlots[slotIndex] = newSlot;
    await User.updateOne({ _id: lifeCoachId, type: "lifeCoach" }, lifeCoach);
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

router.delete("/delete/:lifeCoachId/:slotId", async (req, res) => {
  try {
    const { lifeCoachId, slotId } = req.params;
    const lifeCoach = await User.findOne({
      _id: lifeCoachId,
      type: "lifeCoach"
    });
    if (!lifeCoach)
      return res.status(400).send({ error: "life coach not found" });
    const removedSlot = lifeCoach.userData.monthlySlots.find(
      slot => slot._id == slotId
    );
    if (!removedSlot) return res.status(400).json({ error: "slot not found" });
    const removedSlotIndex = lifeCoach.userData.monthlySlots.indexOf(
      removedSlot
    );
    lifeCoach.userData.monthlySlots.splice(removedSlotIndex, 1);
    await User.updateOne({ _id: lifeCoachId, type: "lifeCoach" }, lifeCoach);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

module.exports = router;
