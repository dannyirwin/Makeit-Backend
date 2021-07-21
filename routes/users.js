const express = require('express');
const router = express.Router();
const authenticate = require('../routes/auth');

const userController = require('../controllers/user_controller');

router.get('/users', authenticate, userController.index);

router.post('/users', userController.create);

router.post('/login', userController.login);

module.exports = { usersRouter: router };
