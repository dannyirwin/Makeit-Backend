const User = require('../models/User');
const jwt = require('jsonwebtoken');

const authenticate = (request, response, next) => {
  const { authorization } = request.headers;

  if (!authorization) {
    response.status(403).send({ error: 'Bearer token must be present' });
  } else {
    const token = authorization.split(' ')[1];
    const secret = process.env.AUTH_SECRET;
    try {
      const decoded_token = jwt.verify(token, secret);
      const { user_id } = decoded_token;
      User.query()
        .findById(user_id)
        .then(existingUser => {
          request.user = existingUser;
          next();
        });
    } catch (error) {
      response.status(403).send({ error: 'Invalid token' });
    }
  }
};

module.exports = authenticate;
