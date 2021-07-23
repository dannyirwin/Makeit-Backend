const express = require('express');
const router = express.Router();
const authenticate = require('../routes/auth');

const projectController = require('../controllers/project_controller');

router.post('/projects', authenticate, projectController.create);

module.exports = { projectsRouter: router };
