const express = require("express");
// Sub routes
const lifeCoaches = require("./lifeCoaches");
const members = require("./members");
const partners = require("./partners");
const admins = require("./admins");
const users = require("../../userArray");

const router = express.Router();
router.use("/partners", partners);
router.use('/lifeCoaches', lifeCoaches);
/* SUB ROUTES

router.use('/members', members);
router.use('/admins', admins); */
router.get("/", (req, res) => {
  // hiding password
  const usersDisplay = users.map(user => {
    const { password, ...userData } = user;
    return userData;
  });
  return res.json({ data: usersDisplay });
});
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find(user => id === user.id);
  const userIndex = users.indexOf(user);
  if (userIndex < 0)
    // Bad request if not found
    return res.status(400).send({ error: "id not found" });
  // To hide password
  const { password, ...userData } = users[userIndex];
  return res.json({ data: userData });
});
router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find(user => id === user.id);
  const userIndex = users.indexOf(user);
  if (userIndex < 0)
    // Bad request if not found
    return res.status(400).send({ error: "id not found" });
  users.splice(userIndex, 1);
  return res.sendStatus(200);
});

module.exports = router;
