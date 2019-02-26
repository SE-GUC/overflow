const express = require('express');
// API Imports go here
const app = express();
app.use(express.json());
app.get('/', (req, res) => {
  res.send('<h1>Overflow Lirten Hub</h1>');
});
// API Routes go here
const port = 3000;
app.listen(port, () => console.log(`Server up and running on port ${port}`));
