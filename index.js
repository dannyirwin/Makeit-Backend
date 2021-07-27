require('dotenv').config();
const express = require('express');
const cors = require('cors');

const PORT = 4000;

const { usersRouter } = require('./routes/users');
const { projectsRouter } = require('./routes/projects');
const { followRouter } = require('./routes/follow');
const { userProjectsRouter } = require('./routes/userProjects');
const { commentsRouter } = require('./routes/comments');
const { imagesRouter } = require('./routes/images');

const app = express();
app.use(cors());
app.use(express.json());
app.use(usersRouter);
app.use(projectsRouter);
app.use(followRouter);
app.use(userProjectsRouter);
app.use(commentsRouter);
app.use(imagesRouter);

app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});
