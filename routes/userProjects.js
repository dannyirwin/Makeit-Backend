const express = require('express');
const router = express.Router();
const authenticate = require('./auth');

const userProjectsController = require('../controllers/user_project_controller');

router.post('/userProjects', authenticate, userProjectsController.create);

router.delete('/userProjects', authenticate, userProjectsController.delete);

module.exports = { userProjectsRouter: router };
