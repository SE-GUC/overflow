const express = require("express");
const Joi = require("joi");
// Sub routes imports
//const lifeCoaches = require("./lifeCoaches");
//const members = require("./members");
const partners = require("./partners");
//const admins = require("./admins");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const router = express.Router();
// sub routes redirect
router.use("/partners", partners);
/*
router.use("/admins", admins);
router.use("/lifeCoaches", lifeCoaches);
router.use("/members", members);
*/
router.get("/", async (req, res) => {
  const usersDisplay = await User.find();
  return res.json({ data: usersDisplay });
});
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(400).send({ error: "id not found" });
    return res.json({ data: user });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndRemove(id);
    if (!deletedUser) {
      return res.status(400).send({ error: "id not found" });
    }
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});
router.put("/updatePassword/:id", async (req, res) => {
  const { id } = req.params;
  const { oldPassword, newPassword } = req.body;
  const schema = {
    newPassword: Joi.string().required(),
    oldPassword: Joi.string().required()
  };
  const result = Joi.validate(req.body, schema);
  if (result.error)
    return res.status(400).send({ error: result.error.details[0].message });
  try {
    const user = await User.findById(id);
    if (!user) return res.status(400).send({ error: "id not found" });
    const { password } = user;
    const passwordCheck = bcrypt.compareSync(oldPassword, password);
    if (!passwordCheck)
      return res.status(400).send({ error: "Passwords don't match" });
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(newPassword, salt);
    await User.updateOne({ _id: id }, { password: hashedPassword });
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
});

module.exports = router;
