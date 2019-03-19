const express = require("express");
// Sub routes imports
//const lifeCoaches = require("./lifeCoaches");
//const members = require("./members");
const partners = require("./partners");
//const admins = require("./admins");
//const users = require("../../userArray");
const User = require("../../models/User");

const router = express.Router();
// sub routes redirect
router.use("/partners", partners);
/*
router.use("/admins", admins);
router.use("/lifeCoaches", lifeCoaches);
router.use("/members", members);
*/

router.get("/", async (req, res) => {
  // hiding password
  const usersDisplay = await User.find().map(user => {
    const { password, ...userData } = user;
    return userData;
  });
  return res.json({ data: usersDisplay });
});
/*router.get("/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find(user => id === user.id);
  const userIndex = users.indexOf(user);
  if (userIndex < 0)
    // Bad request if not found
    return res.status(400).send({ error: "id not found" });
  // To hide password
  const { password, ...userData } = users[userIndex];
  return res.json({ data: userData });
});*/
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBook = await User.findByIdAndRemove(id);
  } catch (error) {
    return res.status(400).send({ error: "id not found" });
  }
  return res.sendStatus(200);
});

module.exports = router;
