const express = require("express");
//const users = require("../../userArray");
const User = require("../../models/User");
const Partner = require("../../models/Partner");
const validator = require("../../validations/partnerValidation");

const router = express.Router();
/*router.get("/", (req, res) => {
  const partners = users.filter(user => user.type === "partner");
  // hiding password
  const partnerDisplay = partners.map(user => {
    const { password, ...userData } = user;
    return userData;
  });
  return res.json({ data: partnerDisplay });
});*/

router.post("/create", async (req, res) => {
  const isValidated = validator.createValidation(req.body);
  if (isValidated.error) {
    return res
      .status(400)
      .send({ error: isValidated.error.details[0].message });
  }
  const { name, email, password, ...userData } = req.body;
  const {
    address,
    fax,
    phone,
    partners,
    members,
    fieldOfWork,
    projects
  } = userData;
  const partner = new Partner(
    address,
    fax,
    phone,
    partners,
    members,
    fieldOfWork,
    projects,
    []
  );
  const user = await User.create({
    type: "partner",
    name,
    email,
    userData: partner,
    password
  });
  return res.json({ data: user });
});
/*router.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find(user => id === user.id && user.type === "partner");
  const userIndex = users.indexOf(user);
  const isValidated = validator.updateValidation(req.body);
  if (userIndex < 0)
    // Bad request if not found
    return res.status(400).send({ error: "id not found" });
  if (isValidated.error) {
    return res
      .status(400)
      .send({ error: isValidated.error.details[0].message });
  }
  req.body.feedback = users[userIndex].userData.feedback;
  users[userIndex].userData = req.body;
  return res.sendStatus(200);
});*/

module.exports = router;
