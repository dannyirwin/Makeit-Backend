const bcrypt = require('bcrypt');
const User = require('../models/User');

const { sendUserWithToken, sendUser } = require('../utilities/userUtilities');

const userContainsSubString = (user, otherUser, subString) => {
  return (
    (otherUser.username.toLowerCase().includes(subString) ||
      otherUser.about_me.toLowerCase().includes(subString)) &&
    otherUser.id !== user.id
  );
};

exports.index = async (request, response) => {
  const searchString = request.query.search.toLowerCase();
  const user = request.user;
  if (searchString) {
    const searchArray = searchString.split(' ');
    const usernamesAndIds = await User.query().select(
      'username',
      'about_me',
      'id'
    );
    let matchingIds = new Set();
    searchArray.map(subString => {
      const matching = usernamesAndIds.filter(otherUser => {
        return userContainsSubString(user, otherUser, subString);
      });
      const ids = matching.map(user => user.id);
      matchingIds = [...matchingIds, ...ids];
    });
    User.query()
      .findByIds(matchingIds)
      .then(users => {
        response.status(200).json({ users });
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
        password_digest: hashedPassword,
        about_me: user.about_me
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

exports.update = (request, response) => {
  const id = request.params.id;
  const body = request.body;
  User.query()
    .findById(id)
    .update(body)
    .then(userId => sendUser(userId, response));
};

exports.show = (request, response) => {
  const id = request.params.id;
  sendUser(id, response);
};
