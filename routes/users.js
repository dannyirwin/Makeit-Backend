const express = require('express');
const router = express.Router();
const authenticate = require('../routes/auth');

const userController = require('../controllers/user_controller');

router.get('/users', authenticate, userController.index);

router.post('/users', userController.create);

router.post('/login', userController.login);

router.patch('/users/:id', authenticate, userController.update);

module.exports = { usersRouter: router };
