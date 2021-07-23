const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const users = require('../routes/users');

const { sendUserWithToken } = require('../utilities/userUtilities');

exports.index = async (request, response) => {
  const searchString = request.query.search.toLowerCase();
  const user = request.user;
  if (searchString) {
    const searchArray = searchString.split(' ');
    const usernamesAndIds = await User.query().select('username', 'id');
    let matchingIds = new Set();
    searchArray.map(subString => {
      const matching = usernamesAndIds.filter(({ username, id }) => {
        return username.toLowerCase().includes(subString) && id !== user.id;
      });
      const ids = matching.map(user => user.id);
      matchingIds = [...matchingIds, ...ids];
      User.query()
        .findByIds(matchingIds)
        .then(users => response.json({ users }));
    });
  }
};

exports.create = (request, response) => {
  const { user } = request.body;
  const saltRounds = 13;
  bcrypt.hash(user.password, saltRounds).then(hashedPassword => {
    User.query()
      .insert({
        username: user.username,
        password_digest: hashedPassword
      })
      .then(newUser => {
        sendUserWithToken(newUser.id, response);
      });
  });
};

exports.login = (request, response) => {
  const { user } = request.body;

  User.query()
    .findOne({ username: user.username || '' })
    .then(existingUser => {
      if (!existingUser) {
        response.status(401).json({ error: 'Invalid username or password' });
      } else {
        bcrypt
          .compare(user.password, existingUser.password_digest)
          .then(isMatch => {
            if (!isMatch) {
              response
                .status(401)
                .json({ error: 'Invalid username or password' });
            } else {
              sendUserWithToken(existingUser.id, response);
            }
          });
      }
    });
};
