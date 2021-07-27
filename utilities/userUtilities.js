const jwt = require('jsonwebtoken');
const User = require('../models/User');

const userGraphFetchedValues = () =>
  `[followers, following, myProjects.[author, comments, images], followed_projects.[author, comments]]`;

const sendUserWithToken = async (userId, response) => {
  const payload = { user_id: userId };
  const secret = process.env.AUTH_SECRET;
  const token = jwt.sign(payload, secret);
  return await User.query()
    .findById(userId)
    .withGraphFetched(userGraphFetchedValues())
    .then(user =>
      response.status(200).json({
        token,
        user: user
      })
    );
};

const sendUser = async (userId, response) => {
  return await User.query()
    .findById(userId)
    .withGraphFetched(userGraphFetchedValues())
    .then(user =>
      response.status(200).json({
        user: user
      })
    );
};

const sendUserWithProject = async (userId, response, project) => {
  return await User.query()
    .findById(userId)
    .withGraphFetched(userGraphFetchedValues())
    .then(user => {
      response.status(200).json({
        user: user,
        project: project
      });
    });
};

module.exports = { sendUserWithToken, sendUser, sendUserWithProject };
