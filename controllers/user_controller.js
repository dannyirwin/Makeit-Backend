const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.index = (_, response) => {
  User.query()
    .withGraphFetched('[followers, following, myProjects]')
    .then(users => response.status(200).json(users));
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
        const payload = { user_id: newUser.id };
        const secret = process.env.AUTH_SECRET;
        const token = jwt.sign(payload, secret);
        response.status(200).json({ token, user: newUser });
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
              const payload = { user_id: existingUser.id };
              const secret = process.env.AUTH_SECRET;
              const token = jwt.sign(payload, secret);
              response.status(200).json({ token, user: existingUser });
            }
          });
      }
    });
};
