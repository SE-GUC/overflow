const express = require("express");
// API Imports go here
const app = express();
const feedback = require("./routes/api/feedback");
const review = require("./routes/api/review");
const slot = require("./routes/api/slot");
app.use(express.json());
app.use("/feedback", feedback);
app.use("/review", review);
app.use("/slot", slot);

app.get("/", (req, res) => {
  res.send("<h1>Overflow Lirten Hub</h1>");
});
// API Routes go here
const port = 3000;
app.listen(port, () => console.log(`Server up and running on port ${port}`));
