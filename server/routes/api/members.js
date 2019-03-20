const express = require("express");
const User = require("../../models/User");
const Member = require("../../models/Member");
const validator = require("../../validations/memberValidation");

const router = express.Router();
router.get("/", (req, res) => {
  const members = User.find();
  const filteredMembers = members.filter(
    member => member.type === "member"
  );
  return res.json({ data: filteredMembers });
});

router.post("/create", (req, res) => {
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
  const {name,
        dateOfBirth,
        gender,
        age,
        email,
        skills,
        interests,
        reviews
    
  } = userData;
  const member = new Member(userData);
  const user = await User.create({
    type: "member",
    name,
    email,
    userData: member,
    password: hashedPassword
  });
  return res.json({ data: user });
});
router.put("/update/:id", (req, res) => {
  try {
    const { id } = req.params;
    const query = { _id: id, type: "member" };
    const user = User.findOne(query);
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
    userData.reviews= user.userData.reviews;
    await User.updateOne(query, { name, email, userData });
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

module.exports = router;

// router.get("/", (req, res) => {
//   const members = users.filter(user => user.type === "member");
//   const memberDisplay = members.map(user => {
//     const { password, ...userData } = user;
//     return userData;
//   });
//   return res.json({ data: memberDisplay });
// });
// router.post("/create", (req, res) => {
//   const isValidated = validator.createValidation(req.body);
//   if (isValidated.error) {
//     return res
//       .status(400)
//       .send({ error: isValidated.error.details[0].message });
//   }
//   const { password, ...userData } = req.body;
//   const { name, dateOfBirth, gender, email, skills, interests } = userData;
//   const member = new Member(
//     name,
//     new Date(dateOfBirth),
//     gender,
//     new Date(),
//     email,
//     skills,
//     interests,
//     []
//   );
//   const user = new User("member", member, password);
//   users.push(user);
//   return res.json({ data: user });
// });
// router.put("/update/:id", (req, res) => {
//   const { id } = req.params;
//   const user = users.find(user => id === user.id && user.type === "member");
//   const userIndex = users.indexOf(user);
//   const isValidated = validator.updateValidation(req.body);
//   if (userIndex < 0)
//     // Bad request if not found
//     return res.status(400).send({ error: "id not found" });
//   if (isValidated.error) {
//     return res
//       .status(400)
//       .send({ error: isValidated.error.details[0].message });
//   }
//   const { dateOfBirth } = req.body;
//   const newAge = new Date().getFullYear() - new Date(dateOfBirth).getFullYear();
//   req.body.age = newAge;
//   req.body.reviews = users[userIndex].userData.reviews;
//   users[userIndex].userData = req.body;
//   return res.sendStatus(200);
// });

// module.exports = router;
