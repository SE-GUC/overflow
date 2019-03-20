const express = require("express");
const User = require("../../models/User");
const Partner = require("../../models/Partner");
const validator = require("../../validations/partnerValidation");
const bcrypt = require("bcryptjs");

const router = express.Router();
router.get("/", async (req, res) => {
  const partners = await User.find();
  const filteredPartners = partners.filter(
    partner => partner.type === "partner"
  );
  return res.json({ data: filteredPartners });
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
  const {
    address,
    fax,
    phone,
    partners,
    members,
    fieldOfWork,
    projects
  } = userData;
  const partner = new Partner(userData);
  const user = await User.create({
    type: "partner",
    name,
    email,
    userData: partner,
    password: hashedPassword
  });
  return res.json({ data: user });
});
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const query = { _id: id, type: "partner" };
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
    //saving feedback (can only be updated from feedback routes)
    userData.feedback = user.userData.feedback;
    await User.updateOne(query, { name, email, userData });
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

module.exports = router;
