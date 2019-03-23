const express = require("express");
const User = require("../../models/User");
const Admin = require("../../models/Admin");
const validator = require("../../validations/adminValidation");
const bcrypt = require("bcryptjs");

const router = express.Router();
router.get("/", async (req, res) => {
  const admins = await User.find({ type: "admin" });
  return res.json({ data: admins });
});

router.post("/create", async (req, res) => {
  const isValidated = validator.createValidation(req.body);
  if (isValidated.error) {
    return res
      .status(400)
      .send({ error: isValidated.error.details[0].message });
  }
  const { name, email, password, ...userData } = req.body;
  //checking email
  const emailCheck = await User.findOne({ email });
  if (emailCheck)
    return res.status(400).json({ error: "Email already exists" });
  //hashing password
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  const { dateOfBirth } = userData;
  const age = new Date().getFullYear() - new Date(dateOfBirth).getFullYear();
  userData.age = age;
  const admin = new Admin(userData);
  const user = await User.create({
    type: "admin",
    name,
    email,
    userData: admin,
    password: hashedPassword
  });
  return res.json({ data: user });
});

router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const query = { _id: id, type: "admin" };
    const user = await User.findOne(query);
    const isValidated = validator.updateValidation(req.body);
    if (!user)
      // Bad request if not found
      return res.status(400).send({ error: "id not found" });
    if (isValidated.error) {
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    }
    const { name, email, ...userData } = req.body;
    const emailCheck = await User.findOne({ _id: { $ne: id }, email });
    if (emailCheck)
      return res.status(400).json({ error: "Email already exists" });
    const { dateOfBirth } = userData;
    const age = new Date().getFullYear() - new Date(dateOfBirth).getFullYear();
    userData.age = age;
    await User.updateOne(query, { name, email, userData });
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

module.exports = router;