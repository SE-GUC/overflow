const express = require("express");
// API Imports go here
const users = require("./routes/api/users");
const review = require("./routes/api/review");
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("<h1>Overflow Lirten Hub</h1>");
});
// API Routes go here
app.use("/api/users", users);
app.use("/api/review",review );
const port = 3000;
app.listen(port, () => console.log(`Server up and running on port ${port}`));
