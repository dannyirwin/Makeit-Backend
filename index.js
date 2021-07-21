require('dotenv').config();
const express = require('express');
const cors = require('cors');

const PORT = 4000;

const { usersRouter } = require('./routes/users');

const app = express();
app.use(cors());
app.use(express.json());
app.use(usersRouter);

app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});
