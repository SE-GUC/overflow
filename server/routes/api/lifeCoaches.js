const express = require("express");
const users = require("../../userArray");
const User = require("../../models/User");
const validator = require("../../validations/lifeCoachesValidation");
const LifeCoach = require("../../models/LifeCoach");
const bcrypt = require("bcryptjs");

const router = express.Router();
router.get("/", (req, res) => {
  const lifeCoaches = await User.find();
  const filteredlifeCoach = lifeCoaches.filter(lifeCoach => lifeCoach.type === "lifeCoach");
  // hiding password
  const lifeCoachesDisplay = filteredlifeCoach.map(user => {
    const { password, ...userData } = user;
    return userData;
  });
  return res.json({ data: lifeCoachesDisplay });
});

router.post("/create", (req, res) => {
  const isValidated = validator.createValidation(req.body);
  if (isValidated.error) {
    return res
      .status(400)
      .send({ error: isValidated.error.details[0].message });
  }

  const { name, email, password, ...userData } = req.body;
  const emailCheck = await User.findOne({ email });
  if (emailCheck)
    return res.status(400).json({ error: "Email already exists" });
  //hashing password
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  const { dateOfBirth } = userData;
  const age = new Date().getFullYear() - new Date(dateOfBirth).getFullYear();
  userData.age = age;
  const lifeCoach = new LifeCoach(userData);
  const user = await User.create({
    type: "lifeCoach",
    name,
    email,
    userData: lifeCoach,
    password: hashedPassword
    
  });
  return res.json({ data: user });
});
router.put("/update/:id", (req, res) => {
 try{
   const { id } = req.params;
   const query = { _id: id, type: "lifeCoach" };
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
    const { dateOfBirth } = req.body;
    const newAge = new Date().getFullYear() - new Date(dateOfBirth).getFullYear();
    req.body.age = newAge;
    await User.updateOne(query, { name, email, userData });
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }  
});
module.exports = router;
